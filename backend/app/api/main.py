from fastapi import APIRouter

from app.api.routes import items, login, users, utils, cameras, aparts, applogs, bulvars, events

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
api_router.include_router(items.router, prefix="/items", tags=["items"])
api_router.include_router(cameras.router, prefix="/cameras", tags=["cameras"])
api_router.include_router(aparts.router, prefix="/aparts", tags=["aparts"])
api_router.include_router(applogs.router, prefix="/applogs", tags=["applogs"])
api_router.include_router(bulvars.router, prefix="/bulvars", tags=["bulvars"])
api_router.include_router(events.router, prefix="/events", tags=["events"])