FROM mapoxu/mwfgobase:1.1.1

COPY . /baseimg
WORKDIR /baseimg

EXPOSE 8000

#RUN make clean
#RUN export CPLUS_INCLUDE_PATH="$CPLUS_INCLUDE_PATH:/usr/include/python3.6m/"; make test
#RUN export CPLUS_INCLUDE_PATH="$CPLUS_INCLUDE_PATH:/usr/include/python3.6m/"; make
#RUN python3 hello.py

#RUN npm run build
#RUN ls api/static/js
#RUN cat api/js/member_bundle.js 

# CMD npm run dev
CMD export LC_ALL=C.UTF-8; \
 export LANG=C.UTF-8; \
 export FLASK_DEBUG=True; \
 export FLASK_APP=api; \
 export APP_SETTINGS=config.py; \
 flask run --host 0.0.0.0 --port 8000