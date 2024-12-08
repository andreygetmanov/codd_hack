import csv
import datetime
import uuid
from typing import Any, Optional
import io

from fastapi import APIRouter, Depends, HTTPException, Response
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep

from app.models import LogsAppBase, LogsApp, LogsList

router = APIRouter()

@router.get("/{id}", response_model=LogsApp)
def get_log_app(session: SessionDep, user: CurrentUser, id_log: int) -> Any:
    log_app = session.get(LogsApp, id_log)
    if not log_app:
        raise HTTPException(status_code=404, detail="Log not found")
    return log_app

@router.get("/", response_model=LogsList)
def get_logs_app(session: SessionDep, user: CurrentUser, skip: int = 0, limit: int = 100,
                 obj: Optional[str] = None, user_uid: Optional[uuid.UUID] = None,
                 start_date: Optional[datetime.date] = None, end_date: Optional[datetime.date] = None) -> Any:
    # Формируем запрос для подсчета общего количества логов
    count_statement = select(func.count()).select_from(LogsApp)
    count = session.exec(count_statement).one()

    # Формируем запрос для получения логов с фильтрацией
    statement = select(LogsApp).offset(skip).limit(limit)

    # Добавляем фильтры
    if obj:
        statement = statement.where(LogsApp.object == obj)
    if user_uid:
        statement = statement.where(LogsApp.user_uid == user_uid)
    if start_date:
        statement = statement.where(LogsApp.last_date >= start_date)
    if end_date:
        statement = statement.where(LogsApp.last_date <= end_date)

    # Получаем логи
    logs_app = session.exec(statement).all()

    return LogsList(data=logs_app, count=count)


@router.post("/create", response_model=LogsApp)
def create_log_app(session: SessionDep, user: CurrentUser, log_app: LogsAppBase) -> Any:
    new_log = LogsApp(
        **log_app.dict(),  # Копируем поля из базовой модели
        user_uid=user.id  # Добавляем user_uid вручную
    )
    session.add(new_log)
    session.commit()
    session.refresh(new_log)
    return new_log


@router.get("/csv/", response_class=Response)
def export_logs_to_csv(session: SessionDep, user: CurrentUser,
                       object: Optional[str] = None, user_uid: Optional[uuid.UUID] = None,
                       start_date: Optional[datetime.date] = None, end_date: Optional[datetime.date] = None) -> Response:
    # Формируем запрос
    statement = select(LogsApp)

    if object:
        statement = statement.where(LogsApp.object == object)
    if user_uid:
        statement = statement.where(LogsApp.user_uid == user_uid)
    if start_date:
        statement = statement.where(LogsApp.last_date >= start_date)
    if end_date:
        statement = statement.where(LogsApp.last_date <= end_date)

    # Получаем логи
    logs_app = session.exec(statement).all()

    # Создаем CSV
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["ID Log", "Object", "Action", "Comment", "User UID", "Date", "Time"])

    # Записываем логи в CSV
    for log in logs_app:
        writer.writerow([log.id_log, log.object, log.action, log.comment, log.user_uid, log.last_date, log.last_time])

    # Отправляем CSV как ответ
    output.seek(0)
    return Response(content=output.getvalue(), media_type="text/csv", headers={"Content-Disposition": "attachment; filename=logs_report.csv"})