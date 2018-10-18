import sqlite3

import pandas as pd

conn = sqlite3.connect('database.sqlite3')

# Read in family data
sm_family_data_file = 'plant_family_names_EOL_IDs.csv'
df = pd.read_csv(sm_family_data_file)
df.drop('EOL - overview', axis=1, inplace=True)
df.rename(index=int, columns={"plant family - botanical name": "name_botanical",
                              "plant family - common name": "name_common",
                              "EOL_ID": "eol_id"}, inplace=True)

df.to_sql('family', conn, if_exists='replace', index_label='id')
