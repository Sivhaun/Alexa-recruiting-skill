/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var START_MESSAGE = "Hello hungry child! "

var NO_CONSENT_MESSAGE = "You have not given consent to use your location. Because of this, I cannot use this skill. If you change your mind, re-enable the skill and consent to giving your location."

var STOP_MESSAGE = "Goodbye"

const handlers = {
    'LaunchRequest': function () {
        this.emit('Start');
    },
    'GetTendies': function () {
        this.emit('GetTendies');
    },
    'Start': function () {
      var deviceID = this.event.context.System.device.deviceId;
      var consentToken = this.event.context.System.user.permissions.consentToken;

      if (isEmpty(consentToken))
      {
        this.emit(':tell', NO_CONSENT_MESSAGE, STOP_MESSAGE);
      }

      this.emit(':tell', START_MESSAGE);
    },
    'GetTendies': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_MESSAGE;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
};

var handlers = Alexa.

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

//helper functions
function isEmpty(str) {
  return (!str || 0 === str.length);
}
