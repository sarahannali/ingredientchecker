import requests
from bs4 import BeautifulSoup
from time import sleep
import json

pcscraping = input("Re-Scrape Paula's Choice? (Y/N) ").upper()

pcUrl = "https://www.paulaschoice.com/ingredient-dictionary?crefn1=name-first-letter&crefv1="


def pcReadFunction(readpage):
    response = requests.get(f"{pcUrl}{readpage}")
    soup = BeautifulSoup(response.text, "html.parser")
    ingredients = soup.find_all(class_="ingredient-result")

    ingrList = []
    done = 0

    for ingredient in ingredients:
        ingrName = ingredient.find("a").get_text()
        print(f"now SCRAPING {pcUrl}{readpage}")
        ingrRating = ingredient.find(class_="col-rating").get_text()

        ingrDescPage = ingredient.find("a")["href"]
        descResponse = requests.get(ingrDescPage)
        descSoup = BeautifulSoup(descResponse.text, "html.parser")
        ingrDesc = descSoup.find(class_="upper-body")
        
        if ingrDesc:
            ingrDesc = ingrDesc.get_text()
            print(f"now READING {ingrDescPage}")
        else:
            ingrDesc = "N/A"

        ingrList.append({
            "ingredient": ingrName,
            "rating": ingrRating,
            "description": ingrDesc
        })
        done += 1
        timeLeft = (len(ingredients) - done)*3
        print(
            f"Completed {done}/{len(ingredients)} for page {readpage}, est time left for this page = {timeLeft} seconds")
        sleep(3)

    print(f"DONE Scraping {pcUrl}{readpage}")
    return(ingrList)


def pcWriteFunction(filename, pageletters):
    with open(f"pcingr_{filename}.json", "w") as File:
        totalingrList = []
        for page in pageletters:
            singleingrList = pcReadFunction(page)
            totalingrList.append(singleingrList)
            print(f"FINISHED {page}")
        json.dump(totalingrList, File)


if pcscraping == "Y":
    pcLetters = input(
    "Run: 1toC, DtoG, HtoL, MtoO, PtoR, StoU, and/or VtoZ? (separate by space) ").upper()
    pcRun = pcLetters.split()
    print(pcRun)

    if "1TOC" in pcRun:
        pcWriteFunction("1toC", ["1", "A", "B", "C"])

    if "DTOG" in pcRun:
        pcWriteFunction("DtoG", ["D", "E", "F", "G"])

    if "HTOL" in pcRun:
        pcWriteFunction("HtoL", ["H", "I", "J", "K", "L"])

    if "MTOO" in pcRun:
        pcWriteFunction("MtoO", ["M", "N", "O"])

    if "PTOR" in pcRun:
        pcWriteFunction("PtoR", ["P", "Q", "R"])

    if "STOU" in pcRun:
        pcWriteFunction("StoU", ["S", "T", "U"])

    if "VTOZ" in pcRun:
        pcWriteFunction("VtoZ", ["V","W","X","Y","Z"])

    pcscraping = "N"

if pcscraping == "N":
    print("DONE")
