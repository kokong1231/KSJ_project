FROM python:3.8

COPY . /app
WORKDIR /app
RUN python install_package.py PreProcess_package.txt
CMD python verify.py