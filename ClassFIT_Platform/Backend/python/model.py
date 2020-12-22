#라이브러리 호출
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from lightgbm import LGBMClassifier
import numpy as np
import pandas as pd
import pickle

#1. 데이터 프레임으로 구성된 데이터 읽어오기
dataset = pd.read_csv('ld1.csv')
# features = np.array(dataset.iloc[:, 1:-1].values)
# label = np.array(dataset.iloc[:, -1].values)

# X_train, X_test, y_train, y_test = train_test_split(features, label, test_size=0.2, shuffle=True, random_state=156)

#2. 훈련용 데이터셋 구성
X_train = np.array(dataset.iloc[:, 1:-1].values)
y_train = np.array(dataset.iloc[:, -1].values)

# print('*****************************************')
# print(X_train)
# print('*****************************************')
# print( X_test)
# print('*****************************************')
# print(y_train)
# print('*****************************************')
# print(y_test)

#3. 학습 데이터 적용해 훈련시키기(LGBM알고리즘 적용)
lgbm_wrapper = LGBMClassifier(n_estimaors =400)
clf = LGBMClassifier(boosting_type='gbdt', learning_rate=0.03, 
               n_estimators=400, objective='binary', metric='binary_logloss')
clf.fit(X_train, y_train)

pickle.dump(clf, open('lgbm.pkl', 'wb'))

#4. 새로운 임의의 데이터 입력
#dataframe 생성 및 값 가져오고 예측 값 추가
#test용 dataframe 생성
# r_dataset = pd.read_csv('ld2.csv')
#예측값 기입할 열 추가
# print(r_dataset)
# del r_dataset['url']
# r_dataset['label']=np.nan
# print(r_dataset)

# len(r_dataset)
# r_dataset.iloc[0].values
# X_new = np.array([r_dataset.iloc[i,:-1].values])
# print('X_NEW : ', X_new)

#새로운 데이터 입력 및 예측 값 저장
# for i in range(len(r_dataset)):
#    X_new = np.array([r_dataset.iloc[i,:-1].values])
#    print(X_new)
#    y_new = clf.predict(X_new)
#    r_dataset.iloc[i,-1] = y_new
    
# print(r_dataset)
    
# r_dataset.to_csv('LGBM_result.csv')

#데이터에 대한 결과 예측
#https://tensorflow.blog/%ED%8C%8C%EC%9D%B4%EC%8D%AC-%EB%A8%B8%EC%8B%A0%EB%9F%AC%EB%8B%9D/1-7-%EC%B2%AB-%EB%B2%88%EC%A7%B8-%EC%95%A0%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%EB%B6%93%EA%BD%83%EC%9D%98-%ED%92%88%EC%A2%85-%EB%B6%84%EB%A5%98/
# y_new = clf.predict(X_new)
# print("예측: {}".format(y_new))
# r_dataset[i,-1]=y_new

#정확도 측정
# y_pred = clf.predict(X_test)
# print("테스트 세트의 정확도: {:.2f}".format(np.mean(y_pred == y_test)))

#csv파일로 결과 출력
#https://programmerpsy.tistory.com/18
#filename.to_csv('lgbm_result.csv')
