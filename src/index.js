/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
'use strict';

const Alexa = require('alexa-sdk');
const http = require('http');

const APP_ID = undefined;

var START_MESSAGE = "Hello hungry child!"

var NO_CONSENT_MESSAGE = "You have not given consent to use your location. Because of this, I cannot use this skill. If you change your mind, re-enable the skill and consent to giving your location."

var ASK_RESTURANT = "Which fast food establishment would you like to purchase tendies from?"

var STOP_MESSAGE = "Goodbye"

const handlers = {
    'LaunchRequest': function () {
        this.emit('Start');
    },
    'GetTendiesIntent': function () {
        this.emit('GetTendies');
    },
    'LocationIntent': function () {
      this.emit('FindNearestLocation');
    },
    'Start': function () {
      this.emit(':tell', START_MESSAGE);
    },
    'GetTendies': function () {
        //Before going forward, we need to check if they gave consent to provide location data
        if(!givenConsent()) {
          this.emit(':tell',NO_CONSENT_MESSAGE,STOP_MESSAGE)
        }

        //now ask them where they want tendies from
        this.emit(":ask",ASK_RESTURANT)
    },
    'FindNearestLocation': function () {
      var resturant = this.event.request.intent.slots["Location"].value;
      var deviceid = this.event.context.System.device.deviceId;
      var consentToken = this.event.context.System.user.permissions.consentToken;

      //construct http request to get location
      var options = {
        host:'api.amazonalexa.com',
        port: 80,
        path:'/v1/devices/deviceId/settings/address/countryAndPostalCode',
        method: 'GET',
        auth: 'Bearer Atc|consentToken'
      };

      callback = function(response) {
        var str = '';

  //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
          str += chunk;
        });

  //the whole response has been recieved, so we just print it out here
      response.on('end', function () {
        console.log(str);
      });
    }

      http.request(options, callback).end();
    }
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

function givenConsent() {
  var consentToken = this.event.context.System.user.permissions.consentToken;

  return isEmpty(consentToken);
}
