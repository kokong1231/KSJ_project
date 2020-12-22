import socket
import ssl
import re



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
