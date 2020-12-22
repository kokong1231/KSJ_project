import pandas as pd
import numpy as np

data = pd.read_csv('./feature_1.csv', encoding='utf-8')

average_activeDuration = int(data['activeDuration'].mean(axis=0, skipna=False))     # 평균값
median_href_count = int(data['href_count'].median())                                # 중앙값
average_url_split_count = int(data['url_split_count'].mean(axis=0, skipna=False))


# domain_name_count = 1, 2
# url rank = 10000000 else 0
# email_count 있으면 0 없으면 1
# status_count 3개 이상일 때 1
# dash_count 있으면 1 아니면 0


activeDuration = []
href_count = []
url_split_count = []
domain_name_count = []
url_rank = []
email_count = []
status_count = []
dash_count = []

for aD in data['activeDuration']:
    if aD <= average_activeDuration:
        activeDuration.append(0)
    else:
        activeDuration.append(1)

for cD in data['href_count']:
    if cD <= median_href_count:
        href_count.append(0)
    else:
        href_count.append(1)

for fD in data['url_split_count']:
    if fD <= average_url_split_count:
        url_split_count.append(0)
    else:
        url_split_count.append(1)

for hD in data['domain_name_count']:
    if hD == 1:
        domain_name_count.append(0)
    else:
        domain_name_count.append(1)

for iD in data['url_rank']:
    if iD == 10000000:
        url_rank.append(1)
    else:
        url_rank.append(0)

for jD in data['email_count']:
    if jD:
        email_count.append(1)
    else:
        email_count.append(0)

for kD in data['status_count']:
    if kD >= 3:
        status_count.append(1)
    else:
        status_count.append(0)

for lD in data['dash_count']:
    if lD:
        dash_count.append(1)
    else:
        dash_count.append(0)


favicon = list(data['favicon'])
state_code = list(data['state_code'])
ssl = list(data['ssl'])
url = list(data['url'])


data_set = pd.DataFrame(np.array([url,activeDuration,href_count,url_split_count,domain_name_count,url_rank,url_rank,status_count,dash_count,favicon,state_code,ssl]))
data_set_v = data_set.transpose()


column_name = ['url', 'activeDuration', 'href_count', 'url_split_count',\
 'domain_name_count', 'url_rank', 'email_count', 'status_count', 'dash_count', 'favicon', 'state_code', 'ssl']
test_d = pd.DataFrame(column_name)
test_t = test_d.transpose()
test_out = test_t.to_csv('./verification.csv', index=False, header=False)


data_set_v.to_csv('./verification.csv', mode='a', sep=',', encoding='utf-8', index=False, header=False)