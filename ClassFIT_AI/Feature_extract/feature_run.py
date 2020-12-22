# -*- coding: utf-8 -*-

from tqdm import tqdm           # 진행도 시각화
import pandas as pd
import re


# External file
from extraction import req_extraction

# Timeout file
from timeout import web_request_retry

# URL Protocol Insert file
from url_protocol import url_protocol_insert



p = re.compile('[h,H][t,T][t,T][p,P][s,S]?[://]')      # 프로토콜 지정자 확인 정규식

# 인코딩 관련 애러 처리
try:
    url_all = open("../Dataset/url.txt", 'r', encoding='utf-16')
    lines = url_all.read().split()     # TXT 파일 URL 배열
except:
    url_all = open("../Dataset/url.txt", 'r', encoding='utf-8')
    lines = url_all.read().split()     # TXT 파일 URL 배열



def url_connect(url_):      # 웹 사이트 연결
    try:
        return web_request_retry(method_name='GET', url=url_, num_retry=1)
    except:                 # 없는 사이트의 경우 수집 중지 시그널
        return 1



for value in tqdm(lines):
    vector_save = []        # 수집한 데이터를 저장할 배열

    # 프로토콜 지시자가 없을 시 확인 후 붙여 준다.
    if p.match(value) == None:
        _url_ = url_protocol_insert(value)
    else:
        _url_ = value

    if url_connect(_url_) == 1:     # 존재하지 않는 사이트 수집 중지
        continue

    try:
        vector_save.append(req_extraction(_url_))       # 수집 시작
        vector_save[0].insert(0,_url_)

    except:        # 타임아웃 예외 처리
        continue
    
    dataframe = pd.DataFrame(vector_save)       # 수집 데이터를 pandas로 읽어온다.
    dataframe.to_csv('../Dataset/feature.csv', mode='a', header=False, index=False)            # 값 csv로 저장
    vector_save = []    # 저장 후 배열 초기화
