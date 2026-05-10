from hash import hash_password, verify_password
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import json

import models
import schemas

from database import engine, SessionLocal

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return {"message": "LeafyAI Backend Running"}


@app.post("/signup")
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):

    new_user = models.User(
        full_name=user.full_name,
        email=user.email,
        password=hash_password(user.password),
        diet_goal=user.diet_goal,
        calorie_goal=user.calorie_goal
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "success": True,
        "message": "User created successfully",
        "user": {
            "id": new_user.id,
            "full_name": new_user.full_name,
            "email": new_user.email,
            "preferences": {
                "goal": new_user.diet_goal,
                "calorieGoal": new_user.calorie_goal
            }
        }
    }


@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if not db_user:
        return {
            "success": False,
            "message": "Invalid email"
        }

    if not verify_password(user.password, db_user.password):
        return {
            "success": False,
            "message": "Invalid password"
        }

    return {
        "success": True,
        "message": "Login successful",
        "user": {
            "id": db_user.id,
            "full_name": db_user.full_name,
            "email": db_user.email,
            "preferences": {
                "goal": db_user.diet_goal,
                "calorieGoal": db_user.calorie_goal
            }
        }
    }


@app.post("/save-recipe")
def save_recipe(recipe: schemas.SavedRecipeCreate, db: Session = Depends(get_db)):

    existing = db.query(models.SavedRecipe).filter(
        models.SavedRecipe.user_id == recipe.user_id,
        models.SavedRecipe.recipe_id == recipe.recipe_id
    ).first()

    if existing:
        return {
            "success": False,
            "message": "Recipe already saved"
        }

    new_recipe = models.SavedRecipe(
        user_id=recipe.user_id,
        recipe_id=recipe.recipe_id,
        recipe_name=recipe.recipe_name,
        recipe_data=recipe.recipe_data
    )

    db.add(new_recipe)
    db.commit()
    db.refresh(new_recipe)

    return {
        "success": True,
        "message": "Recipe saved successfully"
    }


@app.get("/saved-recipes/{user_id}")
def get_saved_recipes(user_id: int, db: Session = Depends(get_db)):

    recipes = db.query(models.SavedRecipe).filter(
        models.SavedRecipe.user_id == user_id
    ).all()

    return [
        {
            "id": recipe.id,
            "recipe_id": recipe.recipe_id,
            "recipe_name": recipe.recipe_name,
            "recipe_data": json.loads(recipe.recipe_data)
        }
        for recipe in recipes
    ]


@app.delete("/delete-recipe/{recipe_id}")
def delete_recipe(recipe_id: int, db: Session = Depends(get_db)):

    recipe = db.query(models.SavedRecipe).filter(
        models.SavedRecipe.id == recipe_id
    ).first()

    if not recipe:
        return {
            "success": False,
            "message": "Recipe not found"
        }

    db.delete(recipe)
    db.commit()

    return {
        "success": True,
        "message": "Recipe deleted"
    }