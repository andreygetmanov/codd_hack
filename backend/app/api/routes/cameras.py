import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import CameraBase, Camera, CamerasPublic

router = APIRouter()

@router.get("/", response_model=CamerasPublic)
def read_cameras(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve items.
    """
    count_statement = select(func.count()).select_from(Camera)
    count = session.exec(count_statement).one()
    statement = select(Camera).offset(skip).limit(limit)
    cameras = session.exec(statement).all()
    return CamerasPublic (data = cameras, count=count)


@router.get("/{id}", response_model=Camera)
def read_camera (session: SessionDep, current_user: CurrentUser, id: int) -> Any:
    camera = session.get(Camera, id)
    if not camera:
        raise HTTPException(status_code=404, detail="Item not found")
    return camera