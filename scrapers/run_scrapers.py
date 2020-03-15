import sys
import json
from cosDNA_ingredient_checker import cosScraper
from inci_ingredient_checker import inciScraper

given = input('given? ')
cosDNA = cosScraper(given)
# inci = inciScraper(sys.argv[1])

found_ids = [cosDNA]
found_union = set().union(*found_ids)

created_obj = {
    "ids": list(found_union)
}

print(json.dumps(created_obj))