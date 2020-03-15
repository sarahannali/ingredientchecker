import requests
from bs4 import BeautifulSoup
import update
from random import choice

cos_url = "http://cosdna.com/eng/ingredients.php"

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
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Host': 'cosdna.com',
    'Origin': 'http://cosdna.com',
    'Referer': 'http://cosdna.com/eng/ingredients.php',
    'User-Agent': choice(USER_AGENTS),
}


def request_formatter(requested_ingrs):

    data = {
        'q': requested_ingrs
    }

    return data


def cosScraper(requested_ingrs):

    created_ids = []

    data = request_formatter(requested_ingrs)

    response = requests.post(cos_url, data=data, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    ingredients_on_site = soup.find_all(class_="tr-i")

    for ingredient in ingredients_on_site:
        ingr_name = ingredient.find(class_="colors").get_text().strip()
        ingr_link = ingredient.find(class_="linkb1")['href']
        ingr_desc = ingredient.find(
            class_="text-vampire").get_text().replace("\n", "").split()
        
        ingr_desc = " ".join(ingr_desc)

        ingr_more_info = ingredient.find_all(class_="text-center")
        ingr_acne = ingr_more_info[0].get_text().replace("\n", "").strip()

        if (ingr_acne == ""):
            ingr_acne = "N/A"

        ingr_irritant = ingr_more_info[1].get_text().replace("\n", "").strip()

        if (ingr_irritant == ""):
            ingr_irritant = "N/A"

        ingr_source = "cosDNA"

        created = update.db_update(ingr_name, ingr_source, ingr_link,
                         ingr_desc, acne=ingr_acne, irritant=ingr_irritant)

        created_ids.append(str(created))
    
    return created_ids