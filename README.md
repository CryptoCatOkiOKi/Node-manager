# Node-manager

## https://github.com/nvm-sh/nvm
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

## "node" is an alias for the latest version
nvm install node 

git clone https://github.com/CryptoCatOkiOKi/Node-manager.git

cd Node-manager

npm install --save

* change IP in nuxt.config.js !
NODEIP=$(curl -s4 icanhazip.com)
sed -i s/0.0.0.0/${NODEIP}/g nuxt.config.js

npm run dev

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

npm run lint -- --fix
