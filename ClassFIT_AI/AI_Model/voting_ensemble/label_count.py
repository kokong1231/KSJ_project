import pandas as pd

data = pd.read_csv('./result.csv')
data_I = pd.read_csv('./ld2.csv')
count = 0



for x in range(len(data)):
    if int(data['label'][x]) == int(data_I['label'][x]):
        count += 1

print(count / len(data) * 100)