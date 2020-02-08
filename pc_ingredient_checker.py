from pymongo import MongoClient
import requests
from bs4 import BeautifulSoup
from time import sleep

client = MongoClient()
db = client.ingredient_checker
descriptions = db.ingredient_descriptions
names = db.ingredient_names

pcscraping = input("Re-Scrape Paula's Choice? (Y/N) ").upper()

pcUrl = "https://www.paulaschoice.com/ingredient-dictionary?crefn1=name-first-letter&crefv1="


def pcScraper(readpage):
    response = requests.get(f"{pcUrl}{readpage.upper()}")
    soup = BeautifulSoup(response.text, "html.parser")
    ingredients = soup.find_all(class_="ingredient-result")

    done = 0

    for ingredient in ingredients:
        ingrName = ingredient.find("a").get_text()
        print(f"now SCRAPING {pcUrl}{readpage}")
        ingrRating = ingredient.find(class_="col-rating").get_text()

        ingrDescPage = ingredient.find("a")["href"]
        descResponse = requests.get(ingrDescPage)
        descSoup = BeautifulSoup(descResponse.text, "html.parser")
        ingrDesc = descSoup.find(class_="upper-body")

        if ingrDesc:
            ingrDesc = ingrDesc.get_text()
            print(f"now READING {ingrDescPage}")
        else:
            ingrDesc = "N/A"

        ingredientInfo = {
            "description": ingrDesc,
            "summary": ingrRating,
            "source": "Paula's Choice"
        }

        descriptions.update_one(
            {"description": ingrDesc},
            {"$set": ingredientInfo},
            upsert=True)

        description_id = descriptions.find_one(
            {"description": ingrDesc}).get('_id')

        ingredientName = {
            "ingredient": ingrName.upper()
        }

        names.update_one(
            {"ingredient": ingrName.upper()},
            {"$set": ingredientName},
            upsert=True)

        try:
            allDescriptions = names.find_one(
                {"ingredient": ingrName.upper()}).get('descriptions')

            if description_id not in allDescriptions:
                names.find_one_and_update(
                    {"ingredient": ingrName.upper()},
                    {"$push": {"descriptions": description_id}}
                )
        except TypeError:
            names.find_one_and_update(
                {"ingredient": ingrName.upper()},
                {"$push": {"descriptions": description_id}}
            )

        done += 1
        timeLeft = (len(ingredients) - done)*3
        print(
            f"Completed {done}/{len(ingredients)} for page {readpage}, est time left for this page = {timeLeft} seconds")
        sleep(3)

    print(f"DONE Scraping {pcUrl}{readpage}")
    return(0)


if pcscraping == "Y":
    lettersToRun = input("Run entire alphabet? (Y/N): ").upper()

    if lettersToRun == "Y":
        lettersToRun = list(map(chr, range(97, 123)))
    else:
        lettersToRun = input(
            "What letters would you like to run (separated by a space): ").upper()
        lettersToRun = lettersToRun.split()

    for letter in lettersToRun:
        pcScraper(letter)

    pcscraping = "N"

if pcscraping == "N":
    print("DONE")
