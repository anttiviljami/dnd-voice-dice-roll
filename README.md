# DnD Voice Dice Roller
![CI](https://github.com/anttiviljami/dnd-voice-dice-roll/workflows/CI/badge.svg)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/anttiviljami/openapicmd/blob/master/LICENSE)

A Voice-Controlled App to roll role-playing dice. Because why not.

Built with [Speechly](https://github.com/speechly/browser-client)

Try it out now! [https://anttiviljami.github.io/dnd-voice-dice-roll/](https://anttiviljami.github.io/dnd-voice-dice-roll/)

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
