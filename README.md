# Elecshop - eCommerce app w/ Next.js and Nest.js

![Discord music bot preview image](./public/preview.png)

## The Challenge ⚡️

My friends challenged me to build a music discord bot for our server, and I thought it would be a very fun side project!

There are many options to fetch music with `node.js` such as using `ffmpeg` and the youtube API - but I went with `Lavalink` as it offers a more performant service.

Here was the challenge:

- Integrating typescript for bug-free code
- Installing lavalink server
- Using erela.js as a client for Lavalink
- Building a music command from scratch
- Building a playlist command from scratch

### Project Structure 📁

```bash
├───public
├───src/
    │   Bot.ts
    │   Client.ts
    │   index.ts
    │   Listener.ts
    │   types.d.ts
    ├───commands/
    ├───embeds/
    ├───handlers/
    │   └───playlist/
    ├───helpers/
    ├───interfaces/
    ├───models/
    └───utils
        │   index.ts
        └───music/
```

## Built With ✨

- [Node.js](https://nodejs.org/) - JS runtime
- [Dicsord.js](https://discord.js.org) - JS library
- Erela.js - Lavalink client
- MongoDB - Document database
- Typescript

## Deployment 🚀
 - Bot deployed on [Repl.it](https://replit.com/)
 - Lavlink server deployed on [Repl.it](https://replit.com/) based on Darren's repo: https://github.com/DarrenOfficial/lavalink-replit

## Author
- [@achrafdev](https://achrafdev.com)

**Thanks for sharing** 🚀

