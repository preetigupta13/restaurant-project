from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from schemas import OrderCreate, OrderResponse
from crud import create_order, get_orders
from models import User
from auth.security import get_current_user


router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


@router.post("/", response_model=OrderResponse)
def add_order(
    order: OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
   
    return create_order(
        db, 
        order,
        current_user.id
    )


@router.get("/", response_model=list[OrderResponse])
def read_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_orders(db, current_user.id)


@router.get("/me")
def get_my_profile(
    current_user: User = Depends(get_current_user)
):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email
    }



# ////////////////////////////////////////////
# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session

# from database import get_db
# from schemas import OrderCreate, OrderResponse
# from crud import create_order, get_orders


# router = APIRouter(
#     prefix="/orders",
#     tags=["Orders"]
# )


# @router.post(
#     "/",
#     response_model=OrderResponse
# )
# def add_order(
#     order: OrderCreate,
#     db: Session = Depends(get_db)
# ):

#     return create_order(db, order)


# @router.get(
#     "/",
#     response_model=list[OrderResponse]
# )
# def read_orders(
#     db: Session = Depends(get_db)
# ):

#     return get_orders(db)