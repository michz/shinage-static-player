Shinage Static Player
=====================

Build
-----

```bash
nvm use
corepack enable
yarn install
NODE_ENV=development yarn run build-dev
#NODE_ENV=production yarn run  build-prod
```

Testing
-------

```bash
php -S 0.0.0.0:8081 -t ./dist/
```

Then open a screen URL, for example:

http://localhost:8081/player.html?current_presentation_url=https://shinage.server.test/screen-remote/current-for/very-long-uuid-of-screen
