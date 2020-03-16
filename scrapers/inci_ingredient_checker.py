import requests
from bs4 import BeautifulSoup
import update
from random import choice

inci_url = "https://incidecoder.com/decode-inci/text"

USER_AGENTS = [
    ('Mozilla/5.0 (X11; Linux x86_64) '
     'AppleWebKit/537.36 (KHTML, like Gecko) '
     'Chrome/57.0.2987.110 '
     'Safari/537.36'),  # chrome
    ('Mozilla/5.0 (X11; Linux x86_64) '
     'AppleWebKit/537.36 (KHTML, like Gecko) '
     'Chrome/61.0.3163.79 '
     'Safari/537.36'),  # chrome
    ('Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:55.0) '
     'Gecko/20100101 '
     'Firefox/55.0'),  # firefox
    ('Mozilla/5.0 (X11; Linux x86_64) '
     'AppleWebKit/537.36 (KHTML, like Gecko) '
     'Chrome/61.0.3163.91 '
     'Safari/537.36'),  # chrome
    ('Mozilla/5.0 (X11; Linux x86_64) '
     'AppleWebKit/537.36 (KHTML, like Gecko) '
     'Chrome/62.0.3202.89 '
     'Safari/537.36'),  # chrome
    ('Mozilla/5.0 (X11; Linux x86_64) '
     'AppleWebKit/537.36 (KHTML, like Gecko) '
     'Chrome/63.0.3239.108 '
     'Safari/537.36'),  # chrome
]

headers = {
    'user-agent': choice(USER_AGENTS),
    'origin': 'https://incidecoder.com',
    'referer': 'https://incidecoder.com/decode-inci',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

def request_formatter(requested_ingrs):
    requested_ingrs_str = "[\"" + requested_ingrs.lower() + "\"]"

    data = {
        'texts': f'{requested_ingrs_str}',
        'mode': "txttxt"
    }

    return data

def inciScraper(requested_ingrs):

    all_created = []

    data = request_formatter(requested_ingrs)
    response = requests.post(inci_url, data=data, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    ingredients_table = soup.find("tbody").find_all("tr")
    ingredients_explained = soup.find_all(class_="\\\"ingreddescbox\\\"")

    for i, ingredient in enumerate(ingredients_table):
        ingr_columns = ingredient.find_all("td")

        ingr_name_col = ingr_columns[0]
        what_it_does_col = ingr_columns[1]
        irr_com_col = ingr_columns[2]
        rating_col = ingr_columns[3]

        ingr_name = ingr_name_col.get_text().replace("\\n", "").strip()
        ingr_link = ingr_name_col.find(class_='\\"black')['href'].replace("\\","")

        ingr_purpose = what_it_does_col.get_text().replace(
            "\\n", "").replace("/\\u200b","/")

        if (irr_com_col.find("span")):
            ingr_more_info = irr_com_col.find(
                "span").get_text().replace("\\n", "").split()
            ingr_irritant = ingr_more_info[0].strip()
            ingr_acne = ingr_more_info[1].strip()
        else:
            ingr_irritant = "N/A"
            ingr_acne = "N/A"

        ingr_rating = rating_col.get_text().replace("\\n", "")

        if (ingr_rating == ""):
            ingr_rating = "N/A"
        
        ingr_desc = ingredients_explained[i].get_text().replace("\\r","").replace("\\n","").replace("\\","").replace("Expand to read more", "")

        ingr_source = "INCIdecoder"

        created = update.db_update(ingr_name, ingr_source, ingr_link, ingr_desc, purpose=ingr_purpose, rating=ingr_rating, acne=ingr_acne, irritant=ingr_irritant)

        all_created.append(created)
    
    return all_created