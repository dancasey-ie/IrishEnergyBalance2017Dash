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

coal = ["BituminousCoal", "Anthracite+ManufacturedOvoids", "Coke",
        "Lignite\\BrownCoalBriquettes"]
peat = ["MilledPeat", "SodPeat", "Briquettes"]
oil = ["Crude", "RefineryGas", "Gasoline", "Kerosene", "JetKerosene",
       "Fueloil", "LPG", "Gasoil/Diesel/DERV", "PetroleumCoke", "Naphta"]
natgas = ['NaturalGas']
RE = ["Hydro", "Wind", "Biomass&RenewableWaste", "LandfillGas", "Biogas",
      "LiquidBiofuel", "Solar", "Geothermal"]
nonRwWaste = ["Non-RenewableWaste"]
elect = ["Electricity"]

primary_energy_req_data = []
transformation_data = []
final_energy_consumption_data = []
all_data_new = []


for doc in data:
    for obj in doc:
        if obj != "group" and obj != "subgroup" and obj != "record":
            if obj in coal:
                fuel_type = "Coal"
            elif obj in peat:
                fuel_type = "Peat"
            elif obj in oil:
                fuel_type = "Oil"
            elif obj in natgas:
                fuel_type = "Nat.Gas"
            elif obj in RE:
                fuel_type = "Renewables"
            elif obj in nonRwWaste:
                fuel_type = "Non-Re.Waste"
            elif obj in elect:
                fuel_type = "Electricity"
            else:
                fuel_type = "NA"

            new_doc = {"group": doc["group"], "subgroup": doc["subgroup"],
                       "record": doc["record"], "fuelType": fuel_type,
                       "fuel": obj, "value": doc[obj]}
            # append to file containing all data
            all_data_new.append(new_doc)
            # append to files seperating out groups
            if doc["group"] == "PrimaryEnergyRequirement":
                primary_energy_req_data.append(new_doc)
            elif doc["group"] == "TransformationInput" or \
                doc["group"] == "TransformationOutput" or \
                doc["group"] == "ExchangesAndTransfers":
                transformation_data.append(new_doc)
            elif doc["group"] == "FinalEnergyConsumption":
                final_energy_consumption_data.append(new_doc)
            else:
                print(new_doc)

write_json_data(all_data_new, 'EnergyBalance2017.json')
write_json_data(primary_energy_req_data, 'EnergyBalance2017PrimaryEnergyReq.json')
write_json_data(transformation_data, 'EnergyBalance2017Transformation.json')
write_json_data(final_energy_consumption_data, 'EnergyBalance2017FinalEnergyConsumption.json')