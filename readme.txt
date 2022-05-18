For general information go to https://michael-thiele-app.com/#/about/

Author:
    Michael Thiele
    michaelthiele673@gmail.com

Dependencies:
    Docker https://docs.docker.com/engine/install/
    Docker Compose https://docs.docker.com/compose/install/

Installation instructions:
    - clone the github repo
    git clone https://github.com/MichaelT233/web
    - run docker compose file, which will download all required images and run initial configurations
    cd web/server
    docker compose up -d
    - populate product database with population script
    bash product-server/database/dbPopulate.sh
    - stop all containers
    docker compose stop

Operating instructions:
    - run all containers in attached mode to see logs
    docker compose up
    -visit http://localhost/ from a web browser, or replace localhost with whichever hostname/IP you are requesting to