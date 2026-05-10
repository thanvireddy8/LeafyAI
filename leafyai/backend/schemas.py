from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    diet_goal: str
    calorie_goal: int


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class SavedRecipeCreate(BaseModel):
    user_id: int
    recipe_id: str
    recipe_name: str
    recipe_data: str