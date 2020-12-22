import requests



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