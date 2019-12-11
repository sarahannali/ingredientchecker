import json

ingredientRequest = input("What ingredient would you like to check? ").upper()
ingredients = ingredientRequest.split(", ")

def fileOpener(letter):
    if letter.isdigit() or "A" <= letter <= "C":
        listOrder = ["1","A","B","C"]
        chosenFile = "pcingr_1toC"
    elif "D" <= letter <= "G":
        listOrder = ["D","E","F","G"]
        chosenFile = "pcingr_DtoG"
    elif "H" <= letter <= "L":
        listOrder = ["H","I","J","K","L"]
        chosenFile = "pcingr_HtoL"
    elif "M" <= letter <= "O":
        listOrder = ["M","N","O"]
        chosenFile = "pcingr_MtoO"
    elif "P" <= letter <= "R":
        listOrder = ["P","Q","R"]
        chosenFile = "pcingr_PtoR"
    elif "S" <= letter <= "U":
        listOrder = ["S","T","U"]
        chosenFile = "pcingr_StoU"
    elif "V" <= letter <= "Z":
        listOrder = ["V","W","X","Y","Z"]
        chosenFile = "pcingr_VtoZ"

    return chosenFile, listOrder

for ingredient in ingredients:
    foundFile = fileOpener(ingredient[0])
    fileName = foundFile[0]
    fileLetter = foundFile[1].index(ingredient[0])
    print(f"The ingredient {ingredient}:")

    with open(f"{fileName}.json","r") as File:
        data = json.load(File)

        for ingredientDict in data[fileLetter]:
            if ingredientDict["ingredient"].upper() == ingredient:
                rating = ingredientDict["rating"]
                desc = ingredientDict["description"]
                break
            else:
                rating = "NOT FOUND"
                desc = "NOT FOUND"
        print(f"Rating: {rating}\nDescription: {desc}")