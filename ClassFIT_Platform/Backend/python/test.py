import sys
import pickle
import pandas as pd
import numpy as np

def integrate() :
   modelName = sys.argv[1]
   dataName = sys.argv[2]
   print(modelName)
   print(dataName)
   model = pickle.load(open(modelName, 'rb'))

   #4. 새로운 임의의 데이터 입력
   # dataframe 생성 및 값 가져오고 예측 값 추가
   # test용 dataframe 생성
   r_dataset = pd.read_csv(dataName)
   # 예측값 기입할 열 추가
   # print(r_dataset)
   del r_dataset['url']
   r_dataset['label']=np.nan
   # print(r_dataset)

   # len(r_dataset)
   # r_dataset.iloc[0].values
   # X_new = np.array([r_dataset.iloc[i,:-1].values])
   # print('X_NEW : ', X_new)

   #새로운 데이터 입력 및 예측 값 저장
   for i in range(len(r_dataset)):
      X_new = np.array([r_dataset.iloc[i,:-1].values])
   #    print(X_new)
      y_new = model.predict(X_new)
      r_dataset.iloc[i,-1] = y_new
      
   print(r_dataset)
   
   resultFile = modelName[:-4] + "_result.csv"
   r_dataset.to_csv(resultFile)

def main() :
   integrate()

if __name__=="__main__":
   main()