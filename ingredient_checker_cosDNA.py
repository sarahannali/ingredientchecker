import requests
from bs4 import BeautifulSoup
from time import sleep
import json
from selenium import webdriver

cosRequest = input("What ingredient would you like to check? ").lower()

cosURL = "http://www.cosdna.com"
searchURL = "eng/stuff.php?q="
ingredientSearch = cosRequest.replace(" ","+")
firstLetter = cosRequest[0]

def render(page):
    driver = webdriver.Chrome(executable_path="C:\\bin\\chromedriver.exe")
    driver.get(page)
    sleep(1)
    result = driver.page_source
    return result

# if firstLetter.isdigit() or "A" <= firstLetter <= "C":
#     listOrder = ["1","A","B","C"]
#     fileName = "pcingr_1toC"
# elif "D" <= firstLetter <= "G":
#     listOrder = ["D","E","F","G"]
#     fileName = "pcingr_DtoG"
# elif "H" <= firstLetter <= "L":
#     listOrder = ["H","I","J","K","L"]
#     fileName = "pcingr_HtoL"
# elif "M" <= firstLetter <= "O":
#     listOrder = ["M","N","O"]
#     fileName = "pcingr_MtoO"
# elif "P" <= firstLetter <= "R":
#     listOrder = ["P","Q","R"]
#     fileName = "pcingr_PtoR"
# elif "S" <= firstLetter <= "U":
#     listOrder = ["S","T","U"]
#     fileName = "pcingr_StoU"
# elif "V" <= firstLetter <= "Z":
#     listOrder = ["V","W","X","Y","Z"]
#     fileName = "pcingr_VtoZ"

# with open(f"{chosenFile}.json","w") as File:
#     data = json.load(File)

print(f"{cosURL}/{searchURL}{ingredientSearch}")
response = requests.get(f"{cosURL}/{searchURL}{ingredientSearch}")
soup = BeautifulSoup(response.text, "html.parser")
ingredient = soup.find(class_="text-info").get_text()
ingredientURL = soup.find(class_="d-block")["href"]

print(f"{cosURL}{ingredientURL}")
ingredientResponse = render(f"{cosURL}{ingredientURL}")
print(ingredientResponse)
# ingrSoup = BeautifulSoup(ingredientResponse, "html.parser")
# print(ingrSoup)
# if ingrDesc != None:
#     print(ingrDesc)
# else:
#     print("N/A")
#     letterSelection = listOrder.index(firstLetter)
#     data[letterSelection]
#         if ingredientDict["ingredient"].upper() == ingredientRequest:
#             print(ingredientDict)