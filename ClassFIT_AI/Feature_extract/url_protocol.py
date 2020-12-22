# ssl_check file import
from ssl_check import ssl_check


# URL 프로토콜 확인 후 붙여준다.
def url_protocol_insert(url_):
    if ssl_check(url_) == 0:
        url_ = 'https://' + url_

    else:
        url_ = 'http://' + url_

    return url_
