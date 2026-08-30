from fastapi.security import OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from schemas import UserCreate, UserLogin, UserResponse
from crud import create_user, get_user_by_email
from auth.security import (
    hash_password,
    verify_password,
    create_access_token
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# ---------------- REGISTER ----------------

@router.post(
    "/register",
    response_model=UserResponse
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = get_user_by_email(
        db,
        user.email
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = create_user(
        db,
        user
    )

    return new_user


# ---------------- LOGIN ----------------

@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    existing_user = get_user_by_email(
        db,
        form_data.username
    )

    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    password_valid = verify_password(
        form_data.password,
        existing_user.password
    )

    if not password_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        {
            "sub": str(existing_user.id),
            "email": existing_user.email
        }
    )

    return {
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": existing_user.id,
            "name": existing_user.name,
            "email": existing_user.email
        }
    }




# ///////////////////////////////////////
# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session

# from database import get_db
# from schemas import UserCreate, UserLogin, UserResponse
# from crud import create_user, get_user_by_email
# from auth.security import verify_password, create_access_token


# router = APIRouter(
#     prefix="/auth",
#     tags=["Authentication"]
# )


# # ==================== REGISTER ====================

# @router.post("/register", response_model=UserResponse)
# def register(
#     user: UserCreate,
#     db: Session = Depends(get_db)
# ):
#     # Check if email already exists
#     existing_user = get_user_by_email(
#         db,
#         user.email
#     )

#     if existing_user:
#         raise HTTPException(
#             status_code=400,
#             detail="Email already registered"
#         )

#     return create_user(db, user)


# # ==================== LOGIN ====================

# @router.post("/login")
# def login(
#     user: UserLogin,
#     db: Session = Depends(get_db)
# ):
#     # Find user by email
#     existing_user = get_user_by_email(
#         db,
#         user.email
#     )

#     if not existing_user:
#         raise HTTPException(
#             status_code=401,
#             detail="Invalid email or password"
#         )

#     # Verify password
#     if not verify_password(
#         user.password,
#         existing_user.password
#     ):
#         raise HTTPException(
#             status_code=401,
#             detail="Invalid email or password"
#         )

#     # Create JWT token
#     access_token = create_access_token(
#         {
#             "sub": str(existing_user.id),
#             "email": existing_user.email
#         }
#     )

#     return {
#         "message": "Login successful",
#         "access_token": access_token,
#         "token_type": "bearer",
#         "user": {
#             "id": existing_user.id,
#             "name": existing_user.name,
#             "email": existing_user.email
#         }
#     }










# # -------------------------------------------------------------
# # from fastapi import APIRouter, Depends, HTTPException
# # from sqlalchemy.orm import Session

# # from database import get_db
# # from schemas import (
# #     UserCreate,
# #     UserLogin,
# #     UserResponse
# # )
# # from crud import (
# #     create_user,
# #     get_user_by_email
# # )


# # router = APIRouter(
# #     prefix="/auth",
# #     tags=["Authentication"]
# # )


# # @router.post(
# #     "/register",
# #     response_model=UserResponse
# # )
# # def register(
# #     user: UserCreate,
# #     db: Session = Depends(get_db)
# # ):

# #     existing_user = get_user_by_email(
# #         db,
# #         user.email
# #     )

# #     if existing_user:
# #         raise HTTPException(
# #             status_code=400,
# #             detail="Email already registered"
# #         )

# #     return create_user(db, user)


# # @router.post("/login")
# # def login(
# #     user: UserLogin,
# #     db: Session = Depends(get_db)
# # ):

# #     existing_user = get_user_by_email(
# #         db,
# #         user.email
# #     )

# #     if not existing_user:
# #         raise HTTPException(
# #             status_code=401,
# #             detail="Invalid email or password"
# #         )

# #     if existing_user.password != user.password:
# #         raise HTTPException(
# #             status_code=401,
# #             detail="Invalid email or password"
# #         )

# #     return {
# #         "message": "Login successful",
# #         "user": {
# #             "id": existing_user.id,
# #             "name": existing_user.name,
# #             "email": existing_user.email
# #         }
# #     }