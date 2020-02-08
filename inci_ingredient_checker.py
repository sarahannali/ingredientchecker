from pymongo import MongoClient
import requests
from bs4 import BeautifulSoup

client = MongoClient()
db = client.ingredient_checker
descriptions = db.ingredient_descriptions
names = db.ingredient_names

requestedIngr = input(
    "What ingredients would you like to run? ").upper()
requestedIngr = requestedIngr.split(", ")
strRequestedIngr = f'{requestedIngr}'.replace('\'',"\"")

inciUrl = "https://incidecoder.com/decode-inci/text"

data = {
    'texts': strRequestedIngr,
    'mode': "txttxt"
}

headers = {
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
  'origin': 'https://incidecoder.com',
  'referer': 'https://incidecoder.com/decode-inci',
  'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

def inciScraper():
    response = requests.post(inciUrl, data=data, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    ingredientsTable = soup.find("tbody").find_all("tr")
    ingredientsExplained = soup.find_all(class_="\\\"ingreddescbox\\\"")

    #Description number in ingredientsExplained needs to match row number of ingredientsTable:
    ingrRun = 0
    
    for ingredient in ingredientsTable:

        #Summary info is in a table:
        ingrColumns = ingredient.find_all("td")

        #Formatting strange whitespaces and removing commas in response texts:
        ingrName = ingrColumns[0].get_text().replace("\\n","").strip()
        ingrPurpose = ingrColumns[1].get_text().replace("\\n","").replace(",", "").split()

        if (ingrColumns[2].find("span")):
            ingrMoreInfo = ingrColumns[2].find("span").get_text().replace("\\n","").split()
            ingrIrritant = ingrMoreInfo[0]
            ingrAcne = ingrMoreInfo[1]

        else:
            ingrIrritant = "N/A"
            ingrAcne = "N/A"
            
        ingrRating = ingrColumns[3].get_text().replace("\\n","").split()
        
        #Description info served separately:
        ingrDesc = ingredientsExplained[ingrRun].get_text()
        ingrRun += 1

        #Putting info into mongoDB:
        ingredientInfo = {
            "description": ingrDesc,
            "purpose": ingrPurpose,
            "irritant": ingrIrritant,
            "acne": ingrAcne,
            "rating": ingrRating,
            "source": "INCIdecoder"
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

inciScraper()