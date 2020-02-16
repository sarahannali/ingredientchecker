from access import descriptions, names


def db_update(ingr_name, ingr_source, ingr_link, ingr_desc, **kwargs):
    ingredient_name = {
        "ingredient": ingr_name.upper()
    }

    description = descriptions.find_one({"link": ingr_link})

    ingredient_info = {
        "source": ingr_source,
        "link": ingr_link,
        "description": ingr_desc
    }

    for title, data in kwargs.items():
        ingredient_info[title] = data

    if (description == None):
        description_id = descriptions.insert_one(
            ingredient_info).inserted_id

        created = names.find_one_and_update(
            {"ingredient": ingr_name.upper()},
            {"$set": ingredient_name, "$push": {"descriptions": description_id}},
            upsert=True)

        if (created == None):
            created = names.find_one({"ingredient": ingr_name.upper()})
    else:
        created = names.find_one({"ingredient": ingr_name.upper()})

    return created['_id']
