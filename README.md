# Steam Achievements
Joseph Tomlinson

## Description
Uses steam API to compare achievements between multiple steam users

## Requirements
Node packet Manager (NPM)

A web browser that supports Javascript and HTML5.

## Installation
Download as zip, or clone to your machine.

open the terminal/command line and cd into the project's directory

download all dependices by entering the following commands in order:
```

$ npm install
$ bower install
$ gulp build
```
## API Key
This application requires a STEAM API Key.
You can get a key [Here](http://steamcommunity.com/dev/apikey)

Once that is created, you must make a `.env` file in the root directory.
Inside, enter your API key like this:
``` Javascript

exports.steamAPI = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
```

## Usage
to view or edit the website, enter:

```

$ gulp serve
```
then simply enter your birthday.

## Edit guide
* Scripts can be found in js/scripts.js
* styling is in css/styles.css

## Specs

Description: User can enter their Steam ID in a custom field to get their game info.
* Input: `76561198004895973`
* Output: `Bizzclaw's games`

Description: User can enter their friend's Steam ID to get their game info.
* Input: `76561198068982394`
* Output: `Oz's games`

Description: User will see a column containing both steam profile's shared games.
* Input: `user enters both SteamIDs`
* Output: `column fills with shared games`

Description: User will be able to select a game and view it's achievements
* Input: `user selects a game`
* Output: `a column on the left will display all of the achievements for the game`

Description: User can tell what achievements they have unlocked, but their friend hasn't
* Input: `user is viewing games Achievements`
* Output: `All achievements user has unlocked are displayed in the top row`

Description: user can tell what achievements are unlocked by both accounts.
* Input: `user is viewing games Achievements`
* Output: `Achievements both accounts have unlocked are displayed on the second row`

Description: user can tell what achievements they haven't unlocked, but their friend has.
* Input: `user is viewing games Achievements`
* Output: `Achievements only the friend's account have unlocked are displayed on the third row`

Description: user can tell what achievements neither profile has unlocked
* Input: `user is viewing games Achievements`
* Output: `Achievements that neither account have unlocked are displayed on the fourth row`

## legal
Uses bootstrap and jQuery.

all Images belong to their respective owners.
