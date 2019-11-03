FROM mapoxu/testbase:latest

RUN mkdir /backend
WORKDIR /backend
COPY . /backend

RUN make clean
RUN make test
RUN make
RUN python3 hello.py
