import whois
import datetime



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



    def domain_time():
        try:
            if type(domain_info['expiration_date']) == list:
                if domain_info['expiration_date'][0].year - (datetime.datetime.now()).year >= 1:
                    return 0
                else:
                    return 1

            else:
                if domain_info['expiration_date'].year - (datetime.datetime.now()).year >= 1:
                    return 0
                else:
                    return 1

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



    def domain_name_count():
        try:
            if type(domain_info['domain_name']) == list:
                return len(domain_info['domain_name'])

            elif type(domain_info['domain_name']) == str:
                return 1

            else:
                return 0
        except:
            return -1


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
    save_value.append(domain_time())
    save_value.append(activeDuration())
    save_value.append(domain_name_count())
    save_value.append(domain_name_len())


    return save_value
