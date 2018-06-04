import pandas as pd
import json


sm_tree_data_url = 'https://data.smgov.net/resource/w8ue-6cnd.csv?$limit=50000'

download = False 

if download:
    import requests
    data = requests.get(sm_tree_data_url)
    with open('trees.csv', 'w') as f:
        f.write(data.text)

df = pd.read_csv('./trees.csv')

db_rows = []
model = "treeMap.Tree"
for row in df.iterrows():
    entry = row[1]
    db_rows.append({
        "model": model,
        "pk": entry["Tree ID"],
        "fields": {
            "latitude": entry["Latitude"],
            "longitude": entry["Longitude"],
            }
        })

with open('trees.json', 'w') as outfile:
    outfile.write(json.dumps(db_rows))
