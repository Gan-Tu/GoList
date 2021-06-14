# Continuous Deployment

## Production Instances

On new tags, a new production backend will be built and pushed to `https://backend.goli.st`


## Staging Instances

On new push to `main` branch, a new staging backend will be built and pushed to `https://staging-backend.goli.st`.

This backend will allow access to people within the google group: `golist-developers@googlegroups.com`

For access to this staging backend in command line, refer to [Google GCP Documentation](https://cloud.google.com/run/docs/authenticating/developers). Specifically, you can use:

```
curl --header "Authorization: Bearer $(gcloud auth print-identity-token)" https://staging-backend.goli.st/...
```

For access to this staging endpoint in browser, you can install the ["Modify Header Value" chrome extension](https://mybrowseraddon.com/modify-header-value.html), and configure to add an additional Bearer authentication for yourself upon visiting this staging endpoint.