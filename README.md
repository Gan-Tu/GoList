# GoList

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Build Status](https://travis-ci.com/Michael-Tu/GoList.svg?branch=main)](https://travis-ci.com/Michael-Tu/GoList)
![Docker Image CI](https://github.com/Michael-Tu/GoList/workflows/Docker%20Image%20CI/badge.svg?branch=main)

Quickly browse a list of links and files with one simple URL!

View it live at https://goli.st

## Development Commands

To install necessary packages, make sure you have NodeJS installed, and then run `npm install`.

To run the server code, run `npm run server`.

To run the client code, run `npm run client`.

To build the client code for production release, run `npm run build`.

To run both server and client code for development purposes, with live-reload, run `npm run dev`.

To run in production, run the following series of commands:

```
npm install
npm test
npm start
```

Alternatively, you can run it in Docker:

```
docker build . -t golist
docker run -it --rm -p 8080:8080 golist
```