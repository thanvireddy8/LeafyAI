from sqlalchemy import Column, Integer, String, Text, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100))
    email = Column(String(100), unique=True)
    password = Column(String(255))
    diet_goal = Column(String(100))
    calorie_goal = Column(Integer)


class SavedRecipe(Base):
    __tablename__ = "saved_recipes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    recipe_id = Column(String(100))
    recipe_name = Column(String(255))
    recipe_data = Column(Text)
    saved_at = Column(TIMESTAMP, server_default=func.now())