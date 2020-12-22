from bs4 import BeautifulSoup
import urllib.request

def url_rank(url):
    rank_str =BeautifulSoup(urllib.request.urlopen("https://www.alexa.com/minisiteinfo/" +url),'html.parser').table.a.get_text()

    try:
        return int(rank_str.replace(',',''))

    except:
        return 10000000
