# Typescript Node + Express with DDD 
### Work in progress

- to see https://itnext.io/typescript-dependency-injection-setting-up-inversifyjs-ioc-for-a-ts-project-f25d48799d70
- to see https://github.com/AndrejsAbrickis/ts-inversify-blog


- this use https://github.com/inversify/inversify-express-utils
- this use https://github.com/inversify/inversify-restify-utils


``` 
 "scripts": {
    "test": "jest",
    "dev": "nodemon src/server.ts",
    "prebuild": "rimraf dist",
    "build": "sucrase ./src -d ./dist --transforms typescript,imports",
  },
```