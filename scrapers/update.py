from access import descriptions, names, vegan


def db_update(ingr_name, ingr_source, ingr_link, ingr_desc, **kwargs):
    ingredient_name = {
        "ingredient": ingr_name.upper()
    }

    description = descriptions.find_one({"link": ingr_link})
    isvegan_list = list(vegan.find({"$text": {"$search": ("\"" + ingr_name + "\""), "$caseSensitive": False}}))

    if (isvegan_list == []):
        isvegan = 'Yes'
    else:
        isvegan = ''
        for document in isvegan_list:
            isvegan += document['vegan']

    if (description == None):
        ingredient_info = {
            "source": ingr_source,
            "link": ingr_link,
            "description": ingr_desc
        }

        for title, data in kwargs.items():
            ingredient_info[title] = data
        
        description_id = descriptions.insert_one(
            ingredient_info).inserted_id
    else:
        description_id = description['_id']

    created = names.find_one_and_update(
            {"ingredient": ingr_name.upper()},
            {"$set": ingredient_name, "$push": {
                "descriptions": description_id, "vegan": isvegan}},
            upsert=True)

    if (created == None):
        created = names.find_one({"ingredient": ingr_name.upper()})

    return created
