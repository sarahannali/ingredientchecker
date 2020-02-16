import requests
from bs4 import BeautifulSoup
import sys
import update
from random import choice
import json

vegan_url = "https://doublecheckvegan.com/wp-admin/admin-ajax.php"

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
    'origin': 'https://doublecheckvegan.com',
    'referer': 'https://doublecheckvegan.com/',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
}


def request_formatter(requested_ingrs):
    if type(requested_ingrs) is list:
        separator = ', '
        requested_ingrs_str = separator.join(requested_ingrs)
    else:
        requested_ingrs_str = requested_ingrs

    data = {
        'action': "search_ingredients",
        'data': requested_ingrs_str
    }

    return requested_ingrs_str, data


def veganScraper(requested_ingrs):
    created_ids = []

    requested_ingrs_str, data = request_formatter(requested_ingrs)
    response = requests.post(vegan_url, data=data, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    not_vegan_on_site = soup.find_all(class_="single-ingredient")

    not_vegan_names = []
    for ingr in not_vegan_on_site:
        ingr_name_formatted = ingr.find(class_="ingredient-title").get_text()
        not_vegan_ingr_name = ingr_name_formatted.replace(' ', '').replace('Vegan', '').replace(
            'Probably', '').replace('but…', '').replace('Not', '').replace('Maybe', '').upper()

        not_vegan_names.append(not_vegan_ingr_name)

    ingredients = requested_ingrs_str.split(",")
    for ingredient in ingredients:
        ingredient = ingredient.upper()
        if ingredient in not_vegan_names:
            i = not_vegan_names.index(ingredient)
            ingr_vegan = not_vegan_on_site[i].find(
                class_="vegan-status").get_text()
            ingr_desc = not_vegan_on_site[i].find(
                class_="ingredient-desc").get_text()
        else:
            ingr_vegan = "Yes"
            ingr_desc = "Ingredient is vegan"

        ingr_name = ingredient.upper()
        ingr_source = "Vegan"
        ingr_link = ingr_name  # for faster description identification

        created = update.db_update(ingr_name, ingr_source, ingr_link,
                         ingr_desc, vegan=ingr_vegan)

        created_ids.append(str(created))
    
    created_obj = {
        "ids": created_ids
    }

    print(json.dumps(created_obj))

veganScraper(sys.argv[1])