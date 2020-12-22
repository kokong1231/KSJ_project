import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv('dataset/label_data.csv')

def correlation(data):
    plt.figure(figsize=(16,16))

    colormap = plt.cm.gist_heat
    sns.heatmap(df.corr(), linewidths = 0.1, vmax = 0.5, cmap = plt.cm.gist_heat, linecolor='white', annot = True)

    plt.show()

def graph(data):
    grid = sns.FacetGrid(df, col = 'label')
    # 가운데 컬럼을 바꿔서 라벨값과 관계 비교
    grid.map(plt.hist, 'meta_data', bins = 10)

    plt.show()

correlation(df)
#graph(df)