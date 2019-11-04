FROM mapoxu/mwfgobase:1.0.0
COPY . /baseimg
WORKDIR /baseimg

EXPOSE 8000

#RUN make clean
#RUN make test
#RUN make
#RUN python3 hello.py

CMD export LC_ALL=C.UTF-8; \
    export LANG=C.UTF-8; \
    export FLASK_DEBUG=True; \
    export FLASK_APP=api; \
    export APP_SETTINGS=config.py; \
    flask run --host 0.0.0.0 --port 8000