from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep

from app.models import Apart, ApartBase, ApartList
from sqlalchemy import desc

router = APIRouter()

@router.get("/", response_model=ApartList)
def read_aparts(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    count_statement = select(func.count()).select_from(Apart)
    count = session.exec(count_statement).one()
    statement = select(Apart).offset(skip).limit(limit).order_by(Apart.checked.asc(), desc(Apart.last_date), desc(Apart.last_time))

    aparts = session.exec(statement).all()
    return ApartList (data = aparts, count=count)


@router.get("/{id}", response_model=Apart)
def read_apart (session: SessionDep, current_user: CurrentUser, id_rep: int) -> Any:
    apart = session.get(Apart, id_rep)
    if not apart:
        raise HTTPException(status_code=404, detail="Item not found")
    return apart

@router.post("/create", response_model=Apart)
def create_apart(session: SessionDep, apart: ApartBase) -> Any:
    db_apart = Apart(**apart.dict())
    session.add(db_apart)
    session.commit()
    session.refresh(db_apart)
    return db_apart

@router.put("/checked", response_model=Apart)
def checked_apart(session: SessionDep, id_rep: int) -> Any:
    apart = session.get(Apart, id_rep)
    apart.checked = True
    session.commit()
    session.refresh(apart)
    return apart