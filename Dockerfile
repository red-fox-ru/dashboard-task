FROM ubuntu:20.04
FROM python:3.9.5
LABEL Author="PaninStanislav"

WORKDIR /code

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y python3-pip python3-dev libpq-dev postgresql postgresql-contrib nginx curl

RUN pip install --upgrade pip
COPY ./requirements.txt /code/
RUN pip install -r requirements.txt

COPY . /code/
EXPOSE 8000