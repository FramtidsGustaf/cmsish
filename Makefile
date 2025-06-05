COMPOSE=docker-compose
COMPOSE_DEV=$(COMPOSE) -f docker-compose.dev.yml

dev:
	$(COMPOSE_DEV) up --build

dev-down:
	$(COMPOSE_DEV) down

prod:
	$(COMPOSE) up --build

prod-down:
	$(COMPOSE) down

restart:
	$(COMPOSE) restart app

logs:
	$(COMPOSE_DEV) logs -f app

migrate:
	$(COMPOSE_DEV) exec app bunx prisma migrate dev