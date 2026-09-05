from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from database import get_db
from models import User


SECRET_KEY = "foodie-restaurant-secret-key-change-this"
ALGORITHM = "HS256"


# ==================== PASSWORD HASHING ====================

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(
    plain_password: str,
    hashed_password: str
):
    return pwd_context.verify(
        plain_password,
        hashed_password
    )


# ==================== JWT ====================

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="auth/login"
)


def create_access_token(data: dict):
    return jwt.encode(
        data,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


# ==================== CURRENT USER ====================

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={
            "WWW-Authenticate": "Bearer"
        }
    )

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise credentials_exception

    except (JWTError, ValueError, TypeError):
        raise credentials_exception

    user = db.query(User).filter(
        User.id == int(user_id)
    ).first()

    if user is None:
        raise credentials_exception

    return user


# //////////////////////////////////////////////////
# from fastapi import Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer
# from jose import JWTError, jwt
# from sqlalchemy.orm import Session
# from passlib.context import CryptContext

# from database import get_db
# from models import User


# SECRET_KEY = "foodie-restaurant-secret-key-change-this"
# ALGORITHM = "HS256"


# # Password hashing
# pwd_context = CryptContext(
#     schemes=["bcrypt"],
#     deprecated="auto"
# )


# # JWT authentication
# oauth2_scheme = OAuth2PasswordBearer(
#     tokenUrl="auth/login"
# )


# # ---------------- PASSWORD ----------------

# def hash_password(password: str):
#     return pwd_context.hash(password)


# def verify_password(
#     plain_password: str,
#     hashed_password: str
# ):
#     return pwd_context.verify(
#         plain_password,
#         hashed_password
#     )


# # ---------------- JWT ----------------

# def create_access_token(data: dict):
#     return jwt.encode(
#         data,
#         SECRET_KEY,
#         algorithm=ALGORITHM
#     )


# # ---------------- CURRENT USER ----------------

# def get_current_user(
#     token: str = Depends(oauth2_scheme),
#     db: Session = Depends(get_db)
# ):

#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={
#             "WWW-Authenticate": "Bearer"
#         }
#     )

#     try:
#         payload = jwt.decode(
#             token,
#             SECRET_KEY,
#             algorithms=[ALGORITHM]
#         )

#         user_id = payload.get("sub")

#         if user_id is None:
#             raise credentials_exception

#     except JWTError:
#         raise credentials_exception

#     user = db.query(User).filter(
#         User.id == int(user_id)
#     ).first()

#     if user is None:
#         raise credentials_exception

#     return user



