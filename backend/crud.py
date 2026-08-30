from sqlalchemy.orm import Session

from models import Food, User, Order, OrderItem
from schemas import FoodCreate, UserCreate, OrderCreate
from auth.security import hash_password


# ==================== FOOD ====================

def get_foods(db: Session):
    return db.query(Food).all()


def get_food(db: Session, food_id: int):
    return db.query(Food).filter(
        Food.id == food_id
    ).first()


def create_food(db: Session, food: FoodCreate):

    new_food = Food(
        name=food.name,
        category=food.category,
        price=food.price,
        rating=food.rating,
        image=food.image,
        description=food.description
    )

    db.add(new_food)
    db.commit()
    db.refresh(new_food)

    return new_food


# ==================== USER ====================

def create_user(db: Session, user: UserCreate):

    hashed_password = hash_password(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def get_user_by_email(db: Session, email: str):

    return db.query(User).filter(
        User.email == email
    ).first()


# ==================== ORDER ====================

def create_order(db: Session, order: OrderCreate):

    # 1. Create order
    new_order = Order(
        user_id=order.user_id,
        total_amount=order.total_amount,
        status="Pending"
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    # 2. Save all cart items
    for item in order.items:

        new_item = OrderItem(
            order_id=new_order.id,
            food_id=item.food_id,
            quantity=item.quantity,
            price=item.price
        )

        db.add(new_item)

    # 3. Save all items
    db.commit()

    # 4. Refresh order so relationship contains items
    db.refresh(new_order)

    return new_order


def get_orders(db: Session, user_id: int):
    return db.query(Order).filter(
        Order.user_id == user_id
    ).all()