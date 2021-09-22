# Tech test

## Run locally
Simply run:
'npm run dev' to run the app locally.
Run unit tests only:
'npm run test:unit'

### FYI
I used a previous project of mine as a template, but upon inspection of the data
it appears this would be queried quite often for the currentPowerConsumption and the current state. 

I would use [Fastify](https://github.com/fastify/fastify) in this case to ensure the fastest response times, but didn't have a project to template from. Fastify is significantly faster than express and we could quite easily convert an Express
based server into a Fastify one.

I would also have used protobuf for the communication to the API containing the device state, but as this is
a simple technical test I haven't written a protobuf schema or mock device API server.