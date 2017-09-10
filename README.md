[![Build Status](https://travis-ci.org/Hector101/ask-feedback-bot.svg?branch=staging)](https://travis-ci.org/Hector101/ask-feedback-bot)
## Askify Feedback Bot

### Description
Growth is a very important part of our lives as Humans. We all want to grow our finances, value, or importance. One of the ways of growing and improving is by constantly getting feedback from people. Here at Andela, we are encouraged to give ASK (Actionable, Specific, Kind) feedback and sometimes people are reluctant about giving feedback for various reasons.

Askify is here to improve the whole process of giving ASK feedback. Askify makes it possible for Andelans to give and receive ASK feedback anonymously.

Askify is built on NodeJS and requires the following `Permission Scopes` from Slack:
   +  `chat:write:bot`
   +  `bot`
   +  `incoming-webhook`

### Features:
   +  Send anonymous ASKified feedback to Andelans
   +  Deny sending of message if not ASKified

### Benefits of using this app
+ This will encourage more people to give ASKified feedback to colleagues that they would rather not give in person
+ Encourage giving of feedback amongst the Andela community

## Prerequisite Requirement
```
Install nodejs version 6 and above
```

## Installation and setup
+  Navigate to a directory using your favourite `terminal`.
+  Clone this repository with the command
  +  Using HTTP;
    `$ git clone https://github.com/Hector101/ask-feedback-bot.git`

+  Navigate to the repo's directory
  +  `$ cd ask-feedback-bot`
+  Install the app's dependencies
  +  `$ npm install`
+  Run the app
  +  `$ npm start`

## Using the app
  +  `navigate to any channel on Andela Slack Channel`. (For test purposes, register and use this Slack account: `https://andela-ask-feedback.slack.com`)
  +  click the text box and enter the askify command: `/askify <@recipient_username> <message body>`

## Running the tests
+  The tests were written using Mocha, and supertest libraries
+  To run tests, navigate to the project's root directory
+  Run the following commands.
  +  `$ npm run test`


## Disclaimer
This app and its functions are limited by time constraint and is in no way at its best.

## Authors
Johnson Okoro, Michael Eboagu, Anthony Ngene, Joel Akwevagbe

## License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
