FROM django

RUN apt-get update

ADD . /code

WORKDIR /code

RUN pip install -r requirements.txt

CMD ["python", "app/manage.py", "runserver", "0.0.0.0:8000"]
