import pandas as pd

data = pd.read_csv('./feature.csv', encoding='utf-8')

for x in range(len(data.columns)):
    print('[', x+1, ']', data.columns[x])

column_code = input('사용할 컬럼 입력 : ').split(',')

print('사용할 컬럼의 코드를 이력하세요.')
print('각 코드는 ","으로 구분합니다.')

save_column = []

for y in column_code:
    save_column.append(data.columns[int(y)-1])

comp = data[save_column]
print(data[save_column])

(pd.DataFrame(comp)).to_csv('./feature_1.csv', sep=',', na_rep='NaN', encoding='utf-8', index=False)
