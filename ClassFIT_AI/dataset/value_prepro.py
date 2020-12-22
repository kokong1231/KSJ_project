from numpy.lib.shape_base import column_stack
import pandas as pd
import numpy as np

data = pd.read_csv('./label_data.csv', encoding='utf-8')

average_activeDuration = int(data['activeDuration'].mean(axis=0, skipna=False))     # 평균값
average_domain_name_len = int(data['activeDuration'].mean(axis=0, skipna=False))
median_href_count = int(data['href_count'].median())                                # 중앙값
median_url_length = int(data['url_length'].median())
average_meta_data = int(data['meta_data'].mean(axis=0, skipna=False))
average_url_split_count = int(data['url_split_count'].mean(axis=0, skipna=False))
average_name_server = int(data['name_server_count'].mean(axis=0, skipna=False))


# domain_name_count = 1, 2
# url rank = 10000000 else 0
# email_count 있으면 0 없으면 1
# status_count 3개 이상일 때 1
# dash_count 있으면 1 아니면 0

activeDuration = []
domain_name_len = []
href_count = []
url_length = []
meta_data = []
url_split_count = []
name_server_count = []
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

for bD in data['domain_name_len']:
    if bD <= average_domain_name_len:
        domain_name_len.append(0)
    else:
        domain_name_len.append(1)

for cD in data['href_count']:
    if cD <= median_href_count:
        href_count.append(0)
    else:
        href_count.append(1)

for dD in data['url_length']:
    if dD <= median_url_length:
        url_length.append(0)
    else:
        url_length.append(1)

for eD in data['meta_data']:
    if eD <= average_meta_data:
        meta_data.append(0)
    else:
        meta_data.append(1)

for fD in data['url_split_count']:
    if fD <= average_url_split_count:
        url_split_count.append(0)
    else:
        url_split_count.append(1)

for gD in data['name_server_count']:
    if gD <= average_name_server:
        name_server_count.append(0)
    else:
        name_server_count.append(1)

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

short_url = list(data['short_url'])
sub_domain = list(data['sub_domain'])
favicon = list(data['favicon'])
state_code = list(data['state_code'])
ssl = list(data['ssl'])
page_redirect = list(data['page_redirect'])
url_at_sign = list(data['url_at_sign'])
domain_time = list(data['domain_time'])



data_set = pd.DataFrame(np.array([activeDuration,domain_name_len,href_count,url_length,meta_data,url_split_count,name_server_count,domain_name_count,url_rank,email_count,status_count,dash_count,short_url,sub_domain,favicon,state_code,ssl,page_redirect,url_at_sign,domain_time]))
data_set_v = data_set.transpose()

print(data_set_v)

# 끝