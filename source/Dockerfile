FROM mapoxu/mwfgobase:1.0.7

COPY . /baseimg
WORKDIR /baseimg

#RUN ls api

EXPOSE 8000

# RUN make clean
# RUN make test
# RUN make
# RUN python3 hello.py

#RUN ls
#RUN npm run build
#RUN ls api/static/js
#RUN cat api/js/member_bundle.js

CMD export LC_ALL=C.UTF-8; \
    export LANG=C.UTF-8; \
    export FLASK_DEBUG=True; \
    export FLASK_APP=api; \
    export APP_SETTINGS=config.py; \
    flask run --host 0.0.0.0 --port 8000