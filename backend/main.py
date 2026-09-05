from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from routers import food, auth, order


# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Foodie Restaurant API",
    description="Backend API for Digital Restaurant",
    version="1.0.0"
)


# ==================== CORS ====================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://restaurant-frontend-n08p.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==================== ROUTERS ====================

app.include_router(food.router)
app.include_router(auth.router)
app.include_router(order.router)


# ==================== HOME ====================

@app.get("/")
def home():
    return {
        "message": "Foodie Restaurant API is running 🚀"
    }

# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# from database import Base, engine
# from routers import food, auth, order


# # Create database tables
# Base.metadata.create_all(bind=engine)


# app = FastAPI(
#     title="Foodie Restaurant API",
#     description="Backend API for Digital Restaurant",
#     version="1.0.0"
# )


# # CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[ "http://localhost:5173",
#                    "https://restaurant-frontend-n08p.onrender.com"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# # Routers
# app.include_router(food.router)
# app.include_router(auth.router)
# app.include_router(order.router)


# @app.get("/")
# def home():

#     return {
#         "message": "Foodie Restaurant API is running 🚀"
#     }