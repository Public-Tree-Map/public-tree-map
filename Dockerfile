FROM python:3
EXPOSE 8000
ENV TIME_ZONE 'America/Los_Angeles'

ADD streetTreeMap /opt/streetTreeMap

WORKDIR /opt/streetTreeMap
RUN  pip3 install -r /opt/streetTreeMap/requirements.txt
#  && python manage.py collectstatic --noinput
#  && python ./manage.py bower install 
#like rake precomplie assets
#Just until non-sqlite database is setup
RUN python /opt/streetTreeMap/make_fixture.py
RUN python /opt/streetTreeMap/manage.py makemigrations \
  && python /opt/streetTreeMap/manage.py migrate \
  && python /opt/streetTreeMap/manage.py loaddata /opt/streetTreeMap/trees.json

CMD python /opt/streetTreeMap/manage.py runserver 0.0.0.0:8000
