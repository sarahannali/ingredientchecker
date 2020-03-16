import sys
import json
from cosDNA_ingredient_checker import cosScraper
from inci_ingredient_checker import inciScraper
from access import pc

# given = "ACAI"

# cosDNA = cosScraper(given)
# inci = inciScraper(given)

cosDNA = cosScraper(sys.argv[1])
inci = inciScraper(sys.argv[1])

#(sys.argv[1])
#ex: WATER,HONEY

found_union = []

for cosDNA_obj in cosDNA:
    for inci_obj in inci:
        if (inci_obj['name'] == cosDNA_obj['name']):
            pc_obj = pc.find_one({'name': inci_obj['name']})
            if (pc_obj == None):
                pc_obj = {'description': {'source': 'PC', 'moreinfo': 'N/A'}}
            new_obj = {'name': inci_obj['name'], 'descriptions': [cosDNA_obj['description'], inci_obj['description'], pc_obj['description']], 'vegan': inci_obj['vegan']}
            found_union.append(new_obj)

created_obj = {
    "objects": found_union
}

print(json.dumps(created_obj))