include .env
export $(shell sed 's/=.*//' .env)

SERVICE_NAME=${CONTAINER_NAME}-php
USER=${WWWUSER}

build:
	docker compose build

up:
	docker compose up --build -d

down:
	docker compose down --remove-orphans

composer-init:
	docker exec --user ${USER} app composer create-project laravel/laravel .

composer-install:
	docker exec --user ${USER} -it ${SERVICE_NAME} /usr/bin/composer install

enter-user:
	docker exec --user ${USER} -it ${SERVICE_NAME} /bin/bash

enter-root:
	docker exec -it ${SERVICE_NAME} /bin/bash

laravel-artisan:
	@$(eval ARGS := $(wordlist 2, $(words $(MAKECMDGOALS)), $(MAKECMDGOALS)))
	docker exec --user ${USER} -it ${SERVICE_NAME} /usr/bin/php artisan $(ARGS)

laravel-artisan-seed:
	docker exec --user ${USER} -it ${SERVICE_NAME} /usr/bin/php artisan migrate:fresh --seed

mysql-user:
	docker exec -it $(shell docker ps -qf "name=practice-mysql") mysql -u$(DB_USERNAME) -p$(DB_PASSWORD) -h127.0.0.1 -P3306 $(DB_DATABASE)

ps:
	docker ps

%:
	@:
