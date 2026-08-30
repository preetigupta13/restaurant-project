from pydantic import BaseModel, EmailStr
from typing import Optional

# ==================== FOOD ====================
class FoodBase(BaseModel):
    name: str
    category: str
    price: float
    rating: float = 0
    image: Optional[str] = None
    description: Optional[str] = None


class FoodCreate(FoodBase):
    pass


class FoodResponse(FoodBase):
    id: int

    class Config:
        from_attributes = True

# ==================== USER ====================
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True

# ==================== ORDER ITEM ====================
class OrderItemCreate(BaseModel):
    food_id: int
    quantity: int
    price: float

class OrderItemResponse(BaseModel):
    id: int
    food_id: int
    quantity: int
    price: float

    class Config:
        from_attributes = True

# ==================== ORDER ====================


class OrderCreate(BaseModel):
    total_amount: float
    items: list[OrderItemCreate]


class OrderResponse(BaseModel):
    id: int
    user_id: int
    total_amount: float
    status: str
    items: list[OrderItemResponse] = []

    class Config:
        from_attributes = True


