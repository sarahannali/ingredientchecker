from pymongo import MongoClient
import requests
from bs4 import BeautifulSoup

client = MongoClient()
db = client.ingredient_checker
descriptions = db.ingredient_descriptions
names = db.ingredient_names

requestedIngr = input(
    "What ingredients would you like? (separated by a , and a space): ").upper()

cosUrl = "http://cosdna.com/eng/ingredients.php"

data = {
    'q': requestedIngr
}

headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'Content-Length': '19',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': 'PHPSESSID=rkd0su6biv83o2hgqn26aeb515; __gads=ID=5ffe022037d21f22:T=1581119263:S=ALNI_MZofSzF2Cp4IoKsehX-XciPXy8_pA; bfp_sn_rf_8b2087b102c9e3e5ffed1c1478ed8b78=Direct/External; bfp_sn_rt_8b2087b102c9e3e5ffed1c1478ed8b78=1581119395868; bafp=4c6df8d0-0a6d-11ea-aa79-45697a8b0972; session_depth=cosdna.com%3D9%7C700618553%3D5%7C932795551%3D4',
    'Host': 'cosdna.com',
    'Origin': 'http://cosdna.com',
    'Referer': 'http://cosdna.com/eng/ingredients.php',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
}


def cosScraper(requestedIngr):
    response = requests.post(cosUrl, data=data, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    ingredients = soup.find_all(class_="tr-i")

    for ingredient in ingredients:
        ingrName = ingredient.find(class_="colors").get_text()
        ingrDesc = ingredient.find(class_="text-vampire").get_text().split()
        ingrMoreInfo = ingredient.find_all(class_="text-center")
        ingrAcne = ingrMoreInfo[0].get_text().split()
        ingrIrritant = ingrMoreInfo[1].get_text().split()

        ingredientInfo = {
            "description": ingrDesc,
            "acne": ingrAcne,
            "irritant": ingrIrritant,
            "source": "cosDNA"
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


cosScraper(requestedIngr)

# for ingr in requestedIngr:
