from access import descriptions, names, vegan


def db_update(ingr_name, ingr_source, ingr_link, ingr_desc, **kwargs):
    ingredient_name = {
        "ingredient": ingr_name.upper()
    }

    description = descriptions.find_one({"link": ingr_link})
    isvegan_list = list(vegan.find(
        {"$text": {"$search": ("\"" + ingr_name + "\""), "$caseSensitive": False}}))

    if (isvegan_list == []):
        isvegan = ['Yes']
    else:
        isvegan = []
        for document in isvegan_list:
            isvegan.append(document['vegan'])

    if (description == None):
        ingredient_info = {
            "source": ingr_source,
            "link": ingr_link,
            "moreinfo": ingr_desc
        }

        for title, data in kwargs.items():
            ingredient_info[title] = data

        descriptions.insert_one(
            ingredient_info)

        description = descriptions.find_one({"link": ingr_link})
    
    description_id = description['_id']
    description['_id'] = str(description['_id'])

    names.find_one_and_update(
        {"ingredient": ingr_name.upper()},
        {"$set":
            ingredient_name,
         "$push": {
             "descriptions": description_id},
         "$setOnInsert": {
             "vegan": isvegan}},
        upsert=True)

    created = {'name': ingr_name.upper(), 'description': description, 'vegan': isvegan}

    return created
