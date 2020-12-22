import pandas as pd

data = pd.read_csv('./feature_1.csv', encoding='utf-8')

column_code = [1, 2, 7, 8, 11, 14 ,20]

save_column = []

for y in column_code:
    save_column.append(data.columns[int(y)-1])

comp = data[save_column]
print(data[save_column])

(pd.DataFrame(comp)).to_csv('./verification.csv', sep=',', na_rep='NaN', encoding='utf-8', index=False)
