# GoList

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Build Status](https://travis-ci.com/Gan-Tu/GoList.svg?branch=main)](https://travis-ci.com/Gan-Tu/GoList)
![Docker Image CI](https://github.com/Gan-Tu/GoList/workflows/Docker%20Image%20CI/badge.svg?branch=main)

Quickly browse a list of links and files with one simple URL!

View it live at https://goli.st

## Development Commands

To install necessary packages, make sure you have NodeJS installed, and then run `npm install`.

To run the admin app, run `npm run admin-app`.

To run the client app, run `npm run client-app`.

To run the API app, run `npm run api`. Note this will only work if you have a valid Google Cloud Platform Application Credential. For more, read the Authentication section below.

To run any of the app in development mode, with live reload, `cd` into the app directory, and run `npm run dev`.

Alternatively, you can run the code in docker. Either `cd` into any of the app pdirectory, and run

```
docker build . -t golist-app
docker run -it --rm -p 8080:8080 golist-app
```

Or, use any of the continuously built Docker images published in this repo.

## Authentication

We use Google Cloud Platform (GCP) for this project. For the servers to work, you will need to have a valid GCP service account credential in your environment, and have its path pointed by an environment variable `GOOGLE_APPLICATION_CREDENTIALS`.

For more, learn at Google Developers ["Quickstart: Using Client Libraries"](https://developers.google.com/analytics/devguides/config/admin/v1/quickstart-client-libraries) page, and https://cloud.google.com/docs/authentication/production.
