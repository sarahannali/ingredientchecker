#Runs by PC dictionary page instead of by requested ingredient, does not run with each form submission

import requests
from bs4 import BeautifulSoup
import sys
import update
from time import sleep

pcUrl = "https://www.paulaschoice.com/ingredient-dictionary?crefn1=name-first-letter&crefv1="

lettersToRun = input(
    "What letters would you like to run (separated by a space): ").upper()
lettersToRun = lettersToRun.split()

def pcScraper(readpage):
    response = requests.get(f"{pcUrl}{readpage.upper()}")
    soup = BeautifulSoup(response.text, "html.parser")
    ingredients = soup.find_all(class_="ingredient-result")

    done = 0

    for ingredient in ingredients:

        # Scraping the website:
        ingr_name = ingredient.find("a").get_text()
        ingr_rating = ingredient.find(class_="col-rating").get_text()

        ingr_link = ingredient.find("a")["href"]
        desc_response = requests.get(ingr_link)
        desc_soup = BeautifulSoup(desc_response.text, "html.parser")
        ingr_desc = desc_soup.find(class_="upper-body")

        if ingr_desc:
            ingr_desc = ingr_desc.get_text()
        else:
            ingr_desc = "N/A"

        ingr_source = "PC"

        update.db_update(ingr_name, ingr_source, ingr_link,
                         ingr_desc, rating=ingr_rating)

        done += 1
        timeLeft = (len(ingredients) - done)*3
        print(
            f"Completed {done}/{len(ingredients)} for page {readpage}, est time left for this page = {timeLeft} seconds")
        sleep(3)

    return(0)

for letter in lettersToRun:
        pcScraper(letter)