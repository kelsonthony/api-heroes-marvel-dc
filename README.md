# api-heroes-marvel-dc
api-heroes-marvel-dc

# api-heroes-test
api-heroes-test


## Setup Docker to Enviroment Starts here

### 1 Docker to postgres DB
docker run \
    --name postgresheroesDCComics \
    -e POSTGRES_USER=adminpostgres \
    -e POSTGRES_PASSWORD=passwordpostgres \
    -e POSTGRES_DB=postgresheroesDCComics \
    -p 5432:5432 \
    -d \
    postgres

### 2 Docker to postgres Client

docker run \
    --name postgresAdmin \
    -p 8080:8080 \
    --link postgresheroesDCComics:postgresheroesDCComics \
    -d \
    adminer

### 3 Docker to Mongo DB

docker run \
    --name mongodbMarvelComics \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=adminmongo \
    -e MONGO_INITDB_ROOT_PASSWORD=passwordmongo \
    -d \
    mongo:4

### 4 Docker to Mongo Client

docker run \
    --name mongoAdmin \
    -p 3000:3000 \
    --link mongodbMarvelComics:mongodbMarvelComics \
    -d \
    mongoclient/mongoclient

### create mongo db
docker container exec -it mongodbMarvelComics /bin/bash
mongo --host localhost -u adminmongo -p 
user password: passwordmongo 

use heroesdb

db.createUser({
    user: 'herouser',
    pwd: 'passwordwordheroes',
    roles: [{role: 'readWrite', db: 'heroesdb'}]
})

## Setup Docker to Enviroment Ends here

## Access Mongo Client

mongodb://herouser:passwordwordheroes@localhost:27017/heroesdb

mongodb://herouser:passwordwordheroes@192.168.1.19:27017/heroesdb

Link http://192.168.1.19:3000/ 


## Access Postgres Client

Link http://192.168.1.19:8080/

Sistem PostgreSQL
Server postgresheroesDCComics
Username: adminpostgres
Password: passwordpostgres

### Setup dev ###

"boom": "^7.3.0",
    "hapi": "^17.0.0",
    "hapi-swagger": "^9.1.3",
    "inert": "^5.1.3",
    "joi": "^17.4.0",
    "mongoose": "5.11.15",
    "pg": "^8.5.1",
    "pg-hstore": "^2.3.3",
    "sequelize": "^6.6.2",
    "vision": "^5.4.4"


    npm i hapi@18.1.0 hapi-swagger@9.4.2


    "nyc": "^15.1.0"

     "test": "nyc --reporter=html mocha --timeout 10000 src/tests/*.js",


     https://github.com/glennjones/hapi-swagger