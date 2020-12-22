import numpy as np

#모델 생성
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.ensemble import VotingClassifier

from sklearn.metrics import accuracy_score


from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split

cancer_data = load_breast_cancer()

X_data = cancer_data.data
y_label = cancer_data.target

X_training, X_testing, y_training, y_testing = train_test_split(X_data, y_label, test_size = 0.2, random_state = 0)

#개별 ML 모델을 위한 Classifier 생성
rf_clf = RandomForestClassifier(n_estimators = 100, random_state = 0)
lr_clf = LogisticRegression(solver = 'liblinear', random_state = 0)
svm_clf = SVC(gamma = 'auto', probability = True, random_state = 0)

# 개별 모델들을 학습
rf_clf.fit(X_training , y_training)  
lr_clf.fit(X_training, y_training)
svm_clf.fit(X_training, y_training)

#학습된 개별 모델들이 각자 반환하는 예측 데이터 셋을 생성하고 개별 모델의 정확도 측정
rf_pred = rf_clf.predict(X_testing)
lr_pred = lr_clf.predict(X_testing)
svm_pred = svm_clf.predict(X_testing)

print('Random Forest 정확도 : {0:.4f}'.format(accuracy_score(y_testing, rf_pred)))
print('Logistic Regression 정확도 : {0:.4f}'.format(accuracy_score(y_testing, lr_pred)))
print('SVM 정확도 : {0:.4f}'.format(accuracy_score(y_testing, svm_pred)))

#투표 분류
voting_clf = VotingClassifier(
	estimators = [('rf', rf_clf), ('lr', lr_clf), ('svm', svm_clf)],
	voting='soft')

voting_clf.fit(X_training, y_training)

voting_pred = voting_clf.predict(X_testing)

print('CV 기반 앙상블 모델 정확도 : {0:.4f}'.format(accuracy_score(y_testing, voting_pred)))