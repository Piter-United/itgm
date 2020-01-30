.PHONY: test configure lint

setup: install
	cp .env.tpl .env

install:
	npm install

start:
	npm run start

build:
	npm run build

configure:
	npm run configure

test:
	npm run test

lint:
	npm run lint
