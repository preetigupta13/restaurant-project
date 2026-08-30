from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from schemas import FoodCreate, FoodResponse
from crud import get_foods, get_food, create_food


router = APIRouter(
    prefix="/foods",
    tags=["Foods"]
)


@router.get("/", response_model=list[FoodResponse])
def read_foods(db: Session = Depends(get_db)):

    return get_foods(db)


@router.get("/{food_id}", response_model=FoodResponse)
def read_food(
    food_id: int,
    db: Session = Depends(get_db)
):

    food = get_food(db, food_id)

    if not food:
        raise HTTPException(
            status_code=404,
            detail="Food not found"
        )

    return food


@router.post(
    "/",
    response_model=FoodResponse
)
def add_food(
    food: FoodCreate,
    db: Session = Depends(get_db)
):

    return create_food(db, food)