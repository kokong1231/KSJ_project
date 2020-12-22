# -*- coding: utf-8 -*-

from tqdm import tqdm       # 진행도 시각화
import pandas as pd
import re


# External file
from extraction import req_extraction

# Timeout file
from timeout import web_request_retry

# URL Protocol Insert file
from url_protocol import url_protocol_insert



data = pd.read_csv('../Dataset/phishing.csv')   # URL과 악성 유무 csv 파일을 불러온다.
url_all = data['domain']        # URL 저장
label = data['label']           # Label 값 저장
label_count = 0                 # 추출 후 라벨 값을 젖아하기 위해 데이터 자장
p = re.compile('[h,H][t,T][t,T][p,P][s,S]?[://]')      # 프로토콜 지정자 확인 정규식


def url_connect(url_):      # 웹 사이트 연결
    try:
        return web_request_retry(method_name='GET', url=url_, num_retry=1)
    except:                 # 없는 사이트의 경우 수집 중지
        return 1



for value in tqdm(url_all):
    vector_save = []        # 추출 데이터 저장

    # 프로토콜 지시자가 없을 시 확인 후 붙여 준다.
    if p.match(value) == None:
        _url_ = url_protocol_insert(value)
    else:
        _url_ = value


    if url_connect(_url_) == 1:     # 존재하지 않는 사이트 수집 중지
        label_count += 1        # 라벨값 입력을 위해 카운터
        continue

    try:
        vector_save.append(req_extraction(_url_))   # URL에서 데이터 추출
        vector_save[0].append(label[label_count])   # 추출한 데이터 마지막에 라벨링 값 삽입
        vector_save[0].insert(0,_url_)

    except:
        label_count += 1        # 라벨값 입력을 위해 카운터
        continue
    
    
    dataframe = pd.DataFrame(vector_save)       # 추출 값 pandas로 읽어온다.
    dataframe.to_csv('../Dataset/label_data.csv', mode='a', header=False, index=False)            # 값 csv로 저장
    
    label_count += 1        # 라벨값 입력을 위해 카운터
    vector_save = []        # 배열 초기화

