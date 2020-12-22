import pandas as pd
import csv


data = pd.read_csv('./label_data.csv')
zero_count = 0
one_count = 0


for x in data['label']:
    if x == 0:
        zero_count += 1

    else:
        one_count += 1

print('0 =',zero_count, '//', '1 =', one_count)
print(len(data))

print('columns_len : ',len(data.columns))