import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import BulvarBase, Bulvar, BulvarList
from sqlalchemy import desc


router = APIRouter()


@router.post("/create", response_model=Bulvar)
def create_bulvar(session: SessionDep, bulvar: BulvarBase) -> Any:
    db_bulvar = Bulvar(**bulvar.dict())
    session.add(db_bulvar)
    session.commit()
    session.refresh(db_bulvar)
    return db_bulvar

@router.get("/", response_model=BulvarList)
def read_bulvars(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    count_statement = select(func.count()).select_from(Bulvar)
    count = session.exec(count_statement).one()
    statement = select(Bulvar).offset(skip).limit(limit).order_by(desc(Bulvar.last_date), desc(Bulvar.last_time))

    bulvars = session.exec(statement).all()
    return BulvarList (data = bulvars, count=count)


@router.get("/depo", response_model=BulvarList)
def depo_bulvars(
        session: SessionDep, current_user: CurrentUser, depo: str
) -> Any:
    statement = select(Bulvar)
    statement = statement.where(Bulvar.depo == depo)
    count_statement = select(func.count()).select_from(Bulvar)
    count = session.exec(count_statement).one()
    bulvars = session.exec(statement).all()

    return BulvarList (data = bulvars, count=count)
