import json

ingredientRequest = input("What ingredient would you like to check? ").upper()
firstLetter = ingredientRequest[0]

if firstLetter.isdigit() or "A" <= firstLetter <= "C":
    listOrder = ["1","A","B","C"]
    chosenFile = "pcingr_1toC"
elif "D" <= firstLetter <= "G":
    listOrder = ["D","E","F","G"]
    chosenFile = "pcingr_DtoG"
elif "H" <= firstLetter <= "L":
    listOrder = ["H","I","J","K","L"]
    chosenFile = "pcingr_HtoL"
elif "M" <= firstLetter <= "O":
    listOrder = ["M","N","O"]
    chosenFile = "pcingr_MtoO"
elif "P" <= firstLetter <= "R":
    listOrder = ["P","Q","R"]
    chosenFile = "pcingr_PtoR"
elif "S" <= firstLetter <= "U":
    listOrder = ["S","T","U"]
    chosenFile = "pcingr_StoU"
elif "V" <= firstLetter <= "Z":
    listOrder = ["V","W","X","Y","Z"]
    chosenFile = "pcingr_VtoZ"

with open(f"{chosenFile}.json","r") as File:
    data = json.load(File)

    letterSelection = listOrder.index(firstLetter)
    for ingredientDict in data[letterSelection]:
        if ingredientDict["ingredient"].upper() == ingredientRequest:
            print(ingredientDict)