from w3c_validator import validate


def valid_error_count(url_):
    try:
        messages = validate(url_)['messages']
        
        if len(messages) >= 10:
            return 1
        else:
            return 0
    except:
        return 1
