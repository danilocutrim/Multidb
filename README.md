sudo docker run \
    --name postgres \
    -e POSTGRES_USER=danilocutrim \
    -e POSTGRES_PASSWORD=75475668 \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres
sudo docker ps
sudo docker exec -it postgres /bin/bash

sudo docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer

## ---- MONGODB
sudo docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
    -d \
    mongo:4

sud

sudo docker exec -it mongodb \
    mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin \
    --eval "db.getSiblingDB('herois').createUser({user: 'danilocutrim', pwd: '75475668', roles: [{role: 'readWrite', db: 'herois'}]})"



para remover todos os containers ativos e inativos//docker rm $(docker ps -aq)
sudo npm install -g cross-env
cross-env NODE_ENV=prod npm t // para rodar em ambiente de produção
cross-env NODE_ENV=dev npm t // para rodar em ambiente de desenvolvimento

