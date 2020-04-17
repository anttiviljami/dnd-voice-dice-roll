# DnD Voice Dice Roller
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/anttiviljami/openapicmd/blob/master/LICENSE)
![CI](https://github.com/anttiviljami/dnd-voice-dice-roll/workflows/CI/badge.svg)
[![Buy me a coffee](https://img.shields.io/badge/donate-buy%20me%20a%20coffee-orange)](https://buymeacoff.ee/anttiviljami)

A Voice-Controlled App to roll role-playing dice. Because why not.

Built with [Speechly](https://github.com/speechly/browser-client)

[Screenshot](#screenshot)

## Development

```bash
npm install
npm run dev # running in http://localhost:5000
```

## Production build

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).

## Screenshot

![Screenshot](screenshot.png)
