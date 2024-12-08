import datetime
import uuid
from typing import Optional

from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel


# Shared properties
class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)


class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: EmailStr | None = Field(default=None, max_length=255)  # type: ignore
    password: str | None = Field(default=None, min_length=8, max_length=40)


class UserUpdateMe(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)


class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str
    items: list["Item"] = Relationship(back_populates="owner", cascade_delete=True)


# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: uuid.UUID


class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int


# Shared properties
class ItemBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=255)


# Properties to receive on item creation
class ItemCreate(ItemBase):
    pass


# Properties to receive on item update
class ItemUpdate(ItemBase):
    title: str | None = Field(default=None, min_length=1, max_length=255)  # type: ignore


# Database model, database table inferred from class name
class Item(ItemBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(max_length=255)
    owner_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE"
    )
    owner: User | None = Relationship(back_populates="items")


# Properties to return via API, id is always required
class ItemPublic(ItemBase):
    id: uuid.UUID
    owner_id: uuid.UUID


class ItemsPublic(SQLModel):
    data: list[ItemPublic]
    count: int


# Generic message
class Message(SQLModel):
    message: str


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: str | None = None


class NewPassword(SQLModel):
    token: str
    new_password: str = Field(min_length=8, max_length=40)


class CameraBase(SQLModel):
    lt_loc: float
    ln_loc: float
    name: str
    stream: Optional[str] = None



class Camera(CameraBase, table=True):
    id_cam: int = Field(default=None, primary_key=True)


class CamerasPublic(SQLModel):
    data: list[Camera]
    count: int


class ApartBase(SQLModel):
    latitude: float
    longitude: float
    incident: str
    description: Optional[str] = None
    checked: bool = False



class ApartTime(ApartBase):
    last_date: datetime.date = Field(default_factory=datetime.date.today)
    last_time: datetime.time = Field(default_factory=lambda: datetime.datetime.now().time())


class Apart(ApartTime, table=True):
    id_rep: int = Field(default=None, primary_key=True)



class ApartList(SQLModel):
    data: list[Apart]
    count: int

class LogsAppBase(SQLModel):
    object: str
    action: str
    comment: Optional[str] = None


class LogsUser(LogsAppBase):
    user_uid: uuid.UUID


class LogsApp(LogsAppBase, table=True):
    id_log: int = Field(default=None, primary_key=True)
    last_date: datetime.date = Field(default_factory=datetime.date.today)
    last_time: datetime.time = Field(default_factory=lambda: datetime.datetime.now().time())


class LogsList(SQLModel):
    data: list[LogsApp]
    count: int


class BulvarBase(SQLModel):
    nfs: float
    depo: str
    lt_loc_start: float
    ln_loc_start: float
    lt_loc_end: float
    ln_loc_end: float


class Bulvar(BulvarBase, table=True):
    id_bul: int  = Field(default=None, primary_key=True)
    last_date: datetime.date = Field(default_factory=datetime.date.today)
    last_time: datetime.time = Field(default_factory=lambda: datetime.datetime.now().time())


class BulvarList(SQLModel):
    data: list[Bulvar]
    count: int