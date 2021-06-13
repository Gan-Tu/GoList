# GoList Backend

The new backend for GoList application.

## Docker

To build the image:

```
docker build . -t golist-backend
```

To run locally, with local google credentials, run

```
docker run --rm -it -p 8080:8080 -v ${PWD}/golist-backend-credentials.json:/app/golist-backend-credentials.json golist-backend
```

To run in prod mode within Google Cloud Platform,

```
docker run --rm -it -p 8080:8080 -e NODE_ENV=production golist-backend
```