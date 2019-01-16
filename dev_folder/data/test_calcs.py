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

file = 'EnergyBalance2017'
data = read_json_data('%s.json' % file)

coal = ["BituminousCoal", "Anthracite+ManufacturedOvoids", "Coke",
        "Lignite\\BrownCoalBriquettes"]
peat = ["MilledPeat", "SodPeat", "Briquettes"]
oil = ["Crude", "RefineryGas", "Gasoline", "Kerosene", "JetKerosene",
       "Fueloil", "LPG", "Gasoil/Diesel/DERV", "PetroleumCoke", "Naphta"]
natgas = ['Nat.Gas']
RE = ["Hydro", "Wind", "Biomass&RenewableWaste", "LandfillGas", "Biogas",
      "LiquidBiofuel", "Solar", "Geothermal"]
nonRwWaste = ["Non-RenewableWaste"]
elect = ["Electricity"]

brick_sum = 0
for doc in data:
    if doc['group'] == 'TransformationInput' and doc['record'] == 'Pumped Storage' and doc['value'] != 0:
        brick_sum += doc['value']
        print(brick_sum)