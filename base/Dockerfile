FROM ubuntu:latest

RUN apt-get update; \
    apt-get install -y curl python3.6 python3-pip wget \
    libboost-python-dev libboost-dev build-essential zlib1g-dev \
    libboost-system-dev libboost-program-options-dev

RUN apt-get install -y python3-pip

WORKDIR /baseimg
COPY . /baseimg

RUN apt-get install -y libmysqlclient-dev
RUN pip3 install --upgrade pip && pip install mysql && pip install -r requirements.txt