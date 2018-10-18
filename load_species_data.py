import sqlite3

import pandas as pd
import requests

conn = sqlite3.connect('database.sqlite3')

# Read in species data
sm_species_data_file = 'species_native_status_EOL_ID.csv'
df = pd.read_csv(sm_species_data_file)
df['EOL_ID'].fillna(-1, inplace=True)
df['EOL_ID'] = df['EOL_ID'].astype(int)
df.drop('EOL_overview_URL', axis=1, inplace=True)
df['eol_image'] = ''

# Get EOL images
for index, row in df.iterrows():
    eolid = row.get('EOL_ID')
    if eolid != -1:
        r = requests.get(
            f'http://eol.org/api/pages/1.0.json?id={eolid}&images_per_page=1&videos_per_page=0&sounds_per_page=0&maps_per_page=0&texts_per_page=0&details=true&taxonomy=false')
        resp = r.json()
        data = resp.get("dataObjects", "")
        if data:
            image = data[0]["eolMediaURL"]
            df.ix[index, 'eol_image'] = image

# Read in species-family data
sm_species_family_data_file = 'species_names.csv'
df2 = pd.read_csv(sm_species_family_data_file)
merged = pd.merge(df, df2, on='botanical_name')

merged.rename(index=int, columns={"botanical_name": "name_botanical",
                                  "common_name": "name_common",
                                  "EOL_ID": "eol_id"}, inplace=True)

merged.to_sql('species', conn, if_exists='replace', index_label='id')
