import requests     # URL 사이트 연결
import socket, struct       # IP 주소 추출을 위해 사용
from bs4 import BeautifulSoup       # 크롤링

# url_rank file import
from url_rank import url_rank

# ssl_check file import
from ssl_check import url_re

# whois_extraction file import
from whois_extra import whois_ext

# markup validation check file
#from validator import valid_error_count



def req_extraction(url_):   # 함수 시작
    extra_value = []        # 각 추출 값 저장을 위해 배열 선언 및 새로운 URL 진입 시 초기화

    with requests.Session() as s:       # 성능 향상을 위해 초기 연결 세션 유지
        req = s.get(url_)               # URL 연결
        req_html = req.text             # URL 소스 코드 출력



        def short_url_check():          # 짧은 URL 확인
            if url_ == req.url:         # 접속 시 URL과 문자열 비교 후 같으면 0 다르면 1
                return 0
            else:
                return 1
            


        def sub_domain_check():         # 서브 도메인 사용 여부 확인
            class_ = (req.url).split('://')     # 프로토콜 지시자를 기준으로 프로토콜 부분 구분
            class_sub = class_[1].split('.')    # '.'로 배열을 나누어 첫 번쨰의 문자열 확인

            if class_sub == 'www' or class_sub == 'WWW':    # www를 외에 다른 문자 사용시 서브 도매인을 사용한다고 판단.
                return 0
            else:
                return 1
            


        def favicon_check():        # 파비콘 검사
            soup = BeautifulSoup(req_html, 'html.parser')
            tag_link = soup.find('link', rel = 'shortcut icon')     # 파비콘 태그 부분을 캡쳐

            try:        # 파비콘을 사용 유무 확인
                href = tag_link.attrs['href']
            except:     # 파비콘이 없을 시 0
                return 0
            try:        # 파비콘을 찾을 수 없을 시 0
                if href == None:
                    return 0
                elif href[0] == '.' or href[0] == '/':  # 파비콘이 로컬 영역에서 불러온 경우 1
                    return 1
                else:           # 이외에 외부에서 불러온 경우 -1
                    return -1
            except:
                return 0
            


        def state_code_check():     # 상태코드 정상 접속 여부 확인 대부분의 정상 접속은 '200'이기 때문에 '200' 외에 나머지는 1
            if req.status_code == 200:
                return 0
            else:
                return 1
            


        def ip_extract():       # IP 주소 추출
            ip_address = socket.gethostbyname((((url_.split('//'))[1]).split('/'))[0])  # socket에서 호스트이름을 이용한 IP 추출

            return struct.unpack("!I", socket.inet_aton(ip_address))[0]     # IP는 10진수로 변환하여 저장
            

        
        def href_count():       # 하이퍼링크 수 확인
            soup = BeautifulSoup(req_html, 'html.parser')
            links = soup.find_all("a")      # 'a'태그를 확인하여 하이퍼링크 수를 확인한다.
            
            return len(links)
            


        def url_len():      # URL 길이를 확인한다.
            return len(req.url)     # 짧은 URL을 사용하는 경우가 있기 때문에 페이지 접속 후 URL 정보를 가져온다.
            

        '''
        def page_redirect():        # 페이지 리다이렉션이 있는지 확인한다.
            soup = BeautifulSoup(req_html, "html.parser")
            element = soup.find('meta', attrs={'http-equiv': 'refresh'})        # 리다이렉션에 필요한 메타데이터를 확인
            
            if element == None:
                return 0
            else:
                return 1
        '''

        def page_redirect():
            try:
                url_.index('--')
                return 1
            except:
                return 0


        
        def meta_data():        # 메타데이터 유무를 확인한다.
            soup = BeautifulSoup(req_html, "html.parser")
            element = soup.findAll('meta')
            
            if element == None:
                return 0
            else:
                return len(element)
            


        def url_split_count():
            return len((req.url).split('.'))

        

        def url_at_sign():
            try:
                url_.index('@')
                return 1
            except:
                return 0



        def dash_count():
            try:
                count = 0

                for x in url_:
                    if x == '-':
                        count += 1

                return count

            except:
                return 0


        # 모든 값을 'extra_value' 배열에 저장
        extra_value.append(short_url_check())
        extra_value.append(sub_domain_check())
        extra_value.append(favicon_check())
        extra_value.append(ip_extract())
        extra_value.append(href_count())
        extra_value.append(state_code_check())
        extra_value.append(url_len())
        extra_value.append(url_re(req.url))
        extra_value.append(page_redirect())
        extra_value.append(meta_data())
        extra_value.append(url_split_count())
        extra_value.append(url_at_sign())
        extra_value.append(dash_count())
        extra_value.append(url_rank(req.url))

        for x in whois_ext(req.url):
            extra_value.append(x)

        # 저장 값 반환
        return extra_value
