import json
"""
This program rearranges the json data derrived from
Energy-Balance-2017_for_converting_to_json.json and organises the data
in a more managable structure, seperating out the data into groups and
subgroups.
It needs to be run in the same directory as the original json data.
"""

def read_json_data(json_file):
    """
    Read data from json file
    """
    with open(json_file, "r") as json_data:
            data = json.load(json_data)
    return data

def write_json_data(data, json_file):
    """
    Write data to json file
    """
    with open(json_file, "w") as json_data:
        json.dump(data, json_data)

file = 'Energy-Balance-2017_for_converting_to_json'
data = read_json_data('%s.json' % file)

coal = ["BituminousCoal", "Anthracite+ManufacturedOvoids", "Coke"]
peat = ["Lignite\\BrownCoalBriquettes", "MilledPeat","SodPeat", "Briquettes"]
oil = ["Crude", "RefineryGas", "Gasoline", "Kerosene", "JetKerosene",
       "Fueloil", "LPG", "Gasoil/Diesel/DERV", "PetroleumCoke", "Naphta"]
natgas = ['NaturalGas']
RE = ["Hydro", "Wind", "Biomass&RenewableWaste", "LandfillGas", "Biogas",
      "LiquidBiofuel", "Solar", "Geothermal"]
nonRwWaste = ["Non-RenewableWaste"]
elect = ["Electricity"]

new_data = []
not_valid = []

for doc in data:
    for obj in doc:
        if obj != "group" and obj != "subgroup" and obj != "record":
            if obj in coal:
                fuel_type = "Coal"
            elif obj in peat:
                fuel_type = "Coal"
            elif obj in oil:
                fuel_type = "Oil"
            elif obj in natgas:
                fuel_type = "Nat.Gas"
            elif obj in RE:
                fuel_type = "Renewables"
            elif obj in nonRwWaste:
                fuel_type = "Non-RenewableWaste"
            elif obj in elect:
                fuel_type = "Electricity"
            else:
                fuel_type = "NA"
                print(obj)
                not_valid.append(doc)

            new_doc = {"group": doc["group"], "subgroup": doc["subgroup"],
                       "record": doc["record"], "fuelType": fuel_type,
                       "fuel": obj, "value": doc[obj]}
            new_data.append(new_doc)

write_json_data(new_data, 'EnergyBalance2017.json')
write_json_data(not_valid, '%sNotValid.json' % file)