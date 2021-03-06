# Install tyronZIL-js

> Getting ready:  
> - Make sure to have the latest version of npm: ```npm install -g npm```  
> - Also, install node-gyp: ```npm install -g node-gyp```  
On macOS ```xcode-select --install``` as well  
[Info about node-gyp](https://github.com/nodejs/node-gyp)

1. ```git clone https://github.com/julio-cabdu/tyronZIL-js```

2. ```cd tyronZIL-js```

3. ```git status```     // if you wanna start contributing, then create your topic branch: ```git checkout -b tyron```

4. ```npm install```

5. ```npm run build```

6. ```npm install -g .```       // to get the CLI ready

## tyronZIL-CLI

### DID-create

Create your brand new tyronZIL DID and resolve it into its corresponding DID-document:

```tyronzil did create``` and follow the instructions :zap:

> More info [here](https://www.tyronzil.com/operations/CRUD/did-create/)

### DID-resolve

Resolve any DID into its corresponding DID-document with:

```tyronzil resolve```

You have to provide the DID that you want to resolve.

> More info [here](https://www.tyronzil.com/operations/CRUD/did-resolve/)

### DID-recover

In case you want to reset your DID-state while keeping the same identifier. You only need your recovery private key, and the DID itself:

```tyronzil did recover``` and follow the instructions

> More info [here](https://www.tyronzil.com/operations/CRUD/did-recover/)

### DID-update

To update your tyronZIL DID you need your update private key, and the DID itself:

```tyronzil did update``` and follow the instructions

> More info [here](https://www.tyronzil.com/operations/CRUD/did-update/)

### DID-deactivate

To fully deactivate your DID:

```tyronzil did deactivate``` and follow the instructions

> After deactivation, the DID will not be useful anymore, nor able to be resolved

> More info [here](https://www.tyronzil.com/operations/CRUD/did-deactivate/)

## Documentation

Build the project documentation with:

```typedoc --out```
