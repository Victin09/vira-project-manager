# Docker Compose | mongo & node developing containers
If you have not node or mongo installed, you can develope with containers. Just run the containers, go to project directory ```/home/node/app``` and install with ```npm i```.  

Finally exec docker-compose.  

```
## frontend
docker run -it -v ./frontend:/home/node/app node:16-alpine3.11 sh

## backend
docker run -it -v ./backend:/home/node/app node:16-alpine3.11 sh
```
