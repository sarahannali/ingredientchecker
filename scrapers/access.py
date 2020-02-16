from dotenv import load_dotenv
import os
from pymongo import MongoClient

load_dotenv()

HOST_URL = "localhost"

if (os.getenv("ENV") == "Production"):
    HOST_URL = "mongodb+srv://" + os.getenv("MONGODB_USERNAME") + ":" + os.getenv(
        "MONGODB_PASSWORD") + os.getenv("MONGODB_HOST")

client = MongoClient(HOST_URL)
db = client.ingredient_checker
descriptions = db.ingredient_descriptions
names = db.ingredient_names