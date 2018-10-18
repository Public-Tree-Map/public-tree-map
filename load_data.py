import sqlite3
import pandas as pd

sm_tree_data_url = 'https://data.smgov.net/resource/w8ue-6cnd.csv?$limit=50000'
conn = sqlite3.connect('database.sqlite3')
download = False 

if download:
    import requests
    data = requests.get(sm_tree_data_url)
    with open('./data/trees.csv', 'w') as f:
        f.write(data.text)

df = pd.read_csv('./data/trees.csv')
df = df.rename(lambda x: x.replace(' ', '_').lower(), axis='columns')
df.to_sql('trees', conn, if_exists='replace')
