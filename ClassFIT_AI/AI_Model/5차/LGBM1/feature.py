import requests     # URL 사이트 연결
import socket, struct       # IP 주소 추출을 위해 사용
from bs4 import BeautifulSoup       # 크롤링
import whois
import datetime
import re
import pandas as pd
import ssl



def web_request(method_name, url, is_urlencoded=True, timeout_seconds=2):
    method_name = method_name.upper() # 메소드이름을 대문자로 바꾼다 
    if method_name not in ('GET', 'POST'):
        raise Exception('method_name is GET or POST plz...')
        
    if method_name == 'GET': # GET방식인 경우
        response = requests.get(url=url, timeout=timeout_seconds)
    


def web_request_retry(num_retry=1, **kwargs):
    try:
        return web_request(**kwargs)
    except requests.exceptions.Timeout:
        return 1
    return 1


#######################


context = ssl.create_default_context()

# URL에서 도매인 네임 부분만 추출한다.
def url_re(url_):
    m = re.search('(https?:\/\/[^:\/\n]+)', url_)

    if m:
        try:
            return ssl_check((m.group(1)).split('://')[1])
        except:
            return ssl_check(m.group(1))

    else:
        return ssl_check(url_)



# SSL 사용 여부를 확인하다. 포트 번호 443을 사용 시 SSL을 사용한다고 판단.
def ssl_check(url_):
    #url_ = socket.gethostbyname((((url_.split('//'))[1]).split('/'))[0])
    try:
        with socket.create_connection((url_, 443)) as sock:
            with context.wrap_socket(sock, server_hostname=url_) as ssock:
                return 0
    except:
        return 1

#######################

# URL 프로토콜 확인 후 붙여준다.
def url_protocol_insert(url_):
    if ssl_check(url_) == 0:
        url_ = 'https://' + url_

    else:
        url_ = 'http://' + url_

    return url_

#######################

p = re.compile('[h,H][t,T][t,T][p,P][s,S]?[://]')      # 프로토콜 지정자 확인 정규식

# 인코딩 관련 애러 처리
try:
    url_all = open("./url.txt", 'r', encoding='utf-16')
    lines = url_all.read().split()     # TXT 파일 URL 배열
except:
    url_all = open("./url.txt", 'r', encoding='utf-8')
    lines = url_all.read().split()     # TXT 파일 URL 배열



def url_connect(url_):      # 웹 사이트 연결
    try:
        return web_request_retry(method_name='GET', url=url_, num_retry=1)
    except:                 # 없는 사이트의 경우 수집 중지 시그널
        return 1

#######################


#short_url, favicon
def req_extraction(url_):   # 함수 시작
    extra_value = []        # 각 추출 값 저장을 위해 배열 선언 및 새로운 URL 진입 시 초기화

    with requests.Session() as s:       # 성능 향상을 위해 초기 연결 세션 유지
        req = s.get(url_)               # URL 연결
        req_html = req.text             # URL 소스 코드 출력

        #activeDuration, domain_name_len
        def whois_ext(url_):
            domain_info = whois.whois(url_)
            save_value = []

            def email_count():
                try:
                    if type(domain_info['emails']) == list:
                        return len(domain_info['emails'])
                        
                    elif domain_info['emails'] == str:
                        return 1

                    else:
                        return 0
                except:
                    return -1

            def name_server_count():
                try:
                    if type(domain_info['name_servers']) == list:
                        return len(domain_info['name_servers'])

                    elif type(domain_info['name_servers']) == str:
                        return 1

                    else:
                        return 0
                except:
                    return -1


            
            def status_count():
                try:
                    if type(domain_info['status']) == list:
                        return len(domain_info['status'])

                    elif type(domain_info['status']) == str:
                        return 1
                    
                    else:
                        return 0
                except:
                    return -1


            def activeDuration():
                #try:
                if type(domain_info['creation_date']) == list:
                    return (datetime.datetime.now() - domain_info['creation_date'][0]).days
                        
                else:
                    return (datetime.datetime.now() - domain_info['creation_date']).days
                #except:
                    #return -1

            def domain_name_len():
                try:
                    if type(domain_info['domain_name']) == list:
                        return len(domain_info['emails'][0])
                        
                    elif type(domain_info['domain_name']) == str:
                        return len(domain_info['domain_name'])

                    else:
                        return 0
                except:
                    return -1

            save_value.append(email_count())
            save_value.append(name_server_count())
            save_value.append(status_count())
            save_value.append(activeDuration())            
            save_value.append(domain_name_len())

            return save_value



        def href_count():       # 하이퍼링크 수 확인
            soup = BeautifulSoup(req_html, 'html.parser')
            links = soup.find_all("a")      # 'a'태그를 확인하여 하이퍼링크 수를 확인한다.
            
            return len(links)

        def url_len():      # URL 길이를 확인한다.
            return len(req.url)     # 짧은 URL을 사용하는 경우가 있기 때문에 페이지 접속 후 URL 정보를 가져온다.
          
        def meta_data():        # 메타데이터 유무를 확인한다.
            soup = BeautifulSoup(req_html, "html.parser")
            element = soup.findAll('meta')
            
            if element == None:
                return 0
            else:
                return len(element)



        # 모든 값을 'extra_value' 배열에 저장
        extra_value.append(href_count())
        extra_value.append(url_len())
        extra_value.append(meta_data())       


        for x in whois_ext(req.url):
            extra_value.append(x)

        # 저장 값 반환
        return extra_value


column_name = ['url','href_count','url_length','meta_data','email_count','name_server_count','status_count','activeDuration','domain_name_len']
test_d = pd.DataFrame(column_name)
test_t = test_d.transpose()
test_out = test_t.to_csv('./verification.csv', index=False, header=False)

for value in lines:
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
    dataframe.to_csv('./verification.csv', mode='a', header=False, index=False)            # 값 csv로 저장
    vector_save = []    # 저장 후 배열 초기화
       # 배열 초기화
