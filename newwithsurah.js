const Alexa = require('ask-sdk-core');
const AWS = require('aws-sdk');
const ddbAdapter = require('ask-sdk-dynamodb-persistence-adapter');
const Util = require('./util.js');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest' ||
            (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'CanFulfillIntentRequest');
    },
    handle(handlerInput) {
        if (Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest') {
            const speakOutput = 'Welcome, you can say "play audio" to start listening to music. What would you like to do?';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        } else if (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'CanFulfillIntentRequest') {
            // Implement logic to determine if your skill can fulfill the user's request
            const canFulfill = determineIfCanFulfill(handlerInput);
            return handlerInput.responseBuilder
                .withCanFulfillIntent({
                    "canFulfill": canFulfill ? "YES" : "NO",
                    // Optionally provide more detailed information about what the skill can fulfill
                })
                .getResponse();
        }
    }
};

/**
 * Intent handler to start playing the Morning Azkar audio.
 */
const PlayMorningAzkarIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlayMorningAzkarIntent';
    },
    async handle(handlerInput) {
        const playbackInfo = await getPlaybackInfo(handlerInput);

        playbackInfo.offsetInMilliseconds = 0;

        const speakOutput = '';
        const playBehavior = 'REPLACE_ALL';
        const podcastUrl = 'https://ia903409.us.archive.org/34/items/sheikh-mishary-rashid-alafasy-azkar/Sheikh%20Mishary%20Rashid%20Alafasy%20-%20%D8%A3%D8%B0%D9%83%D8%A7%D8%B1%20%D8%A7%D9%84%D8%B5%D8%A8%D8%A7%D8%AD.mp3';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerPlayDirective(
                playBehavior,
                podcastUrl,
                playbackInfo.token,
                playbackInfo.offsetInMilliseconds
            )
            .getResponse();
    }
};

/**
 * Intent handler to start playing the Evening Azkar audio.
 */
const PlayEveningAzkarIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlayEveningAzkarIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.ResumeIntent');
    },
    async handle(handlerInput) {
        const playbackInfo = await getPlaybackInfo(handlerInput);

        playbackInfo.offsetInMilliseconds = 0;

        const speakOutput = '';
        const playBehavior = 'REPLACE_ALL';
        const podcastUrl = 'https://ia903409.us.archive.org/34/items/sheikh-mishary-rashid-alafasy-azkar/Sheikh%20Mishary%20Rashid%20Alafasy%20-%20%D8%A3%D8%B0%D9%83%D8%A7%D8%B1%20%D8%A7%D9%84%D9%85%D8%B3%D8%A7%D8%A1.mp3';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerPlayDirective(
                playBehavior,
                podcastUrl,
                playbackInfo.token,
                playbackInfo.offsetInMilliseconds
            )
            .getResponse();
    }
};

/**
 * Intent handler to start playing the Surah Mulk audio.
 */
const PlaySurahMulkIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlaySurahMulkIntent';
    },
    async handle(handlerInput) {
        const playbackInfo = await getPlaybackInfo(handlerInput);

        playbackInfo.offsetInMilliseconds = 0;

        const speakOutput = '';
        const playBehavior = 'REPLACE_ALL';
        const podcastUrl = 'https://ia903409.us.archive.org/34/items/sheikh-mishary-rashid-alafasy-azkar/Sheikh%20Mishary%20Rashid%20Alafasy%20-%20%D8%A3%D8%B0%D9%83%D8%A7%D8%B1%20%D8%A7%D9%84%D8%B5%D8%A8%D8%A7%D8%AD.mp3';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerPlayDirective(
                playBehavior,
                podcastUrl,
                playbackInfo.token,
                playbackInfo.offsetInMilliseconds
            )
            .getResponse();
    }
};

/**
 * Intent handler to start playing the Surah Kahaf audio.
 */
const PlaySurahKahafIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlaySurahKahafIntent';
    },
    async handle(handlerInput) {
        const playbackInfo = await getPlaybackInfo(handlerInput);

        playbackInfo.offsetInMilliseconds = 0;

        const speakOutput = '';
        const playBehavior = 'REPLACE_ALL';
        const podcastUrl = 'https://ia903409.us.archive.org/34/items/sheikh-mishary-rashid-alafasy-azkar/Sheikh%20Mishary%20Rashid%20Alafasy%20-%20%D8%A3%D8%B0%D9%83%D8%A7%D8%B1%20%D8%A7%D9%84%D8%B5%D8%A8%D8%A7%D8%AD.mp3';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerPlayDirective(
                playBehavior,
                podcastUrl,
                playbackInfo.token,
                playbackInfo.offsetInMilliseconds
            )
            .getResponse();
    }
};

/**
 * Intent handler to start playing the Surah Waqiah audio.
 */
const PlaySurahWaqiahIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlaySurahWaqiahIntent';
    },
    async handle(handlerInput) {
        const playbackInfo = await getPlaybackInfo(handlerInput);

        playbackInfo.offsetInMilliseconds = 0;

        const speakOutput = '';
        const playBehavior = 'REPLACE_ALL';
        const podcastUrl = 'https://ia903409.us.archive.org/34/items/sheikh-mishary-rashid-alafasy-azkar/Sheikh%20Mishary%20Rashid%20Alafasy%20-%20%D8%A3%D8%B0%D9%83%D8%A7%D8%B1%20%D8%A7%D9%84%D8%B5%D8%A8%D8%A7%D8%AD.mp3';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerPlayDirective(
                playBehavior,
                podcastUrl,
                playbackInfo.token,
                playbackInfo.offsetInMilliseconds
            )
            .getResponse();
    }
};

/**
 * Intent handler to pause audio playback.
 * */
const PauseIntentHandler = {
    canHandle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (intentName === 'AMAZON.PauseIntent'
                || intentName === 'PauseMorningAzkarIntent'
                || intentName === 'PauseEveningAzkarIntent'
                || intentName === 'PauseSurahMulkIntent'
                || intentName === 'PauseSurahKahafIntent'
                || intentName === 'PauseSurahWaqiahIntent');
    },
    async handle(handlerInput) {
        return handlerInput.responseBuilder
            .addAudioPlayerStopDirective()
            .getResponse();
    }
};

/**
 * Intent handler for built-in intents that aren't supported in this sample skill.
 * As this is a sample skill for a single stream, these intents are irrelevant to this skill.
 * Regardless, the skill needs to handle this gracefully, which is why this handler exists.
 * */
const UnsupportedIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (
                (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.LoopOffIntent'
                    || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.LoopOnIntent'
                    || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NextIntent'
                    || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.PreviousIntent'
                    || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RepeatIntent'
                    || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.ShuffleOffIntent'
                    || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.ShuffleOnIntent'
                    || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StartOverIntent')
                ||
                (Alexa.getIntentName(handlerInput.requestEnvelope) === 'UnsupportedMorningAzkarIntent')
                ||
                (Alexa.getIntentName(handlerInput.requestEnvelope) === 'UnsupportedEveningAzkarIntent')
                ||
                (Alexa.getIntentName(handlerInput.requestEnvelope) === 'UnsupportedSurahMulkIntent')
                ||
                (Alexa.getIntentName(handlerInput.requestEnvelope) === 'UnsupportedSurahKahafIntent')
                ||
                (Alexa.getIntentName(handlerInput.requestEnvelope) === 'UnsupportedSurahWaqiahIntent')
            );
    },
    async handle(handlerInput) {
        const speakOutput = 'Sorry, I can\'t support that action for the audio.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say "play audio" to start playing music! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
        }
    };
    
    const CancelAndStopIntentHandler = {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                    || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
        },
        handle(handlerInput) {
            const speakOutput = 'Goodbye!';
    
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        }
    };
    
    /* *
     * AudioPlayer events can be triggered when users interact with your audio playback, such as stopping and 
     * starting the audio, as well as when playback is about to finish playing or playback fails.
     * This handler will save the appropriate details for each event and log the details of the exception,
     * which can help troubleshoot issues with audio playback.
     * */
    const AudioPlayerEventHandler = {
        canHandle(handlerInput) {
            return handlerInput.requestEnvelope.request.type.startsWith('AudioPlayer.');
        },
        async handle(handlerInput) {
            const playbackInfo = await getPlaybackInfo(handlerInput);
            
            const audioPlayerEventName = handlerInput.requestEnvelope.request.type.split('.')[1];
            console.log(`AudioPlayer event encountered: ${handlerInput.requestEnvelope.request.type}`);
            let returnResponseFlag = false;
            switch (audioPlayerEventName) {
                case 'PlaybackStarted':
                    playbackInfo.token = handlerInput.requestEnvelope.request.token;
                    playbackInfo.inPlaybackSession = true;
                    playbackInfo.hasPreviousPlaybackSession = true;
                    returnResponseFlag = true;
                    break;
                case 'PlaybackFinished':
                    playbackInfo.inPlaybackSession = false;
                    playbackInfo.hasPreviousPlaybackSession = false;
                    playbackInfo.nextStreamEnqueued = false;
                    returnResponseFlag = true;
                    break;
                case 'PlaybackStopped':
                    playbackInfo.token = handlerInput.requestEnvelope.request.token;
                    playbackInfo.inPlaybackSession = true;
                    playbackInfo.offsetInMilliseconds = handlerInput.requestEnvelope.request.offsetInMilliseconds;
                    break;
                case 'PlaybackNearlyFinished':
                    break;
                case 'PlaybackFailed':
                    playbackInfo.inPlaybackSession = false;
                    console.log('Playback Failed : %j', handlerInput.requestEnvelope.request.error);
                    break;
                default:
                    break;
            }
            setPlaybackInfo(handlerInput, playbackInfo);
            return returnResponseFlag ? handlerInput.responseBuilder.getResponse() : null;
        },
    };
    
    /* *
     * PlaybackController events can be triggered when users interact with the audio controls on a device screen.
     * starting the audio, as well as when playback is about to finish playing or playback fails.
     * This handler will save the appropriate details for each event and log the details of the exception,
     * which can help troubleshoot issues with audio playback.
     * */
    const PlaybackControllerHandler = {
        canHandle(handlerInput) {
            return handlerInput.requestEnvelope.request.type.startsWith('PlaybackController.');
        },
        async handle(handlerInput) {
            const playbackInfo = await getPlaybackInfo(handlerInput);
            const playBehavior = 'REPLACE_ALL';
            const podcastUrl = 'https://audio1.maxi80.com';
            const playbackControllerEventName = handlerInput.requestEnvelope.request.type.split('.')[1];
            let response;
            switch (playbackControllerEventName) {
                case 'PlayCommandIssued':
                    response = handlerInput.responseBuilder
                        .addAudioPlayerPlayDirective(
                            playBehavior,
                            podcastUrl,
                            playbackInfo.token,
                            playbackInfo.offsetInMilliseconds
                        )
                        .getResponse();
                    break;
                case 'PauseCommandIssued':
                    response = handlerInput.responseBuilder
                        .addAudioPlayerStopDirective()
                        .getResponse();
                    break;
                default:
                    break;
            }
            setPlaybackInfo(handlerInput, playbackInfo);
    
            console.log(`PlayCommandIssued event encountered: ${handlerInput.requestEnvelope.request.type}`);
            return response;
        },
    };
    /* *
     * SystemExceptions can be triggered if there is a problem with the audio that is trying to be played.
     * This handler will log the details of the exception and can help troubleshoot issues with audio playback.
     * */
    const SystemExceptionHandler = {
        canHandle(handlerInput) {
            return handlerInput.requestEnvelope.request.type === 'System.ExceptionEncountered';
        },
        handle(handlerInput) {
            console.log(`System exception encountered: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
        },
    };
    
    /* *
     * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
     * It must also be defined in the language model (if the locale supports it)
     * This handler can be safely added but will be ingnored in locales that do not support it yet 
     * */
    const FallbackIntentHandler = {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
        },
        handle(handlerInput) {
            const speakOutput = 'Sorry, I don\'t know about that. Please try again.';
    
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
    };
    /* *
     * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
     * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
     * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
     * */
    const SessionEndedRequestHandler = {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
        },
        handle(handlerInput) {
            console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
            // Any cleanup logic goes here.
            return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
        }
    };
    /* *
     * The intent reflector is used for interaction model testing and debugging.
     * It will simply repeat the intent the user said. You can create custom handlers for your intents 
     * by defining them above, then also adding them to the request handler chain below 
     * */
    const IntentReflectorHandler = {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
        },
        handle(handlerInput) {
            const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
            const speakOutput = `You just triggered ${intentName}`;
    
            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
                .getResponse();
        }
    };
    /**
     * Generic error handling to capture any syntax or routing errors. If you receive an error
     * stating the request handler chain is not found, you have not implemented a handler for
     * the intent being invoked or included it in the skill builder below 
     * */
    const ErrorHandler = {
        canHandle() {
            return true;
        },
        handle(handlerInput, error) {
            const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
            console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

            return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    },
};

/* HELPER FUNCTIONS */

async function getPlaybackInfo(handlerInput) {
    const attributes = await handlerInput.attributesManager.getPersistentAttributes();
    return attributes.playbackInfo;
}

async function setPlaybackInfo(handlerInput, playbackInfoObject) {
    await handlerInput.attributesManager.setPersistentAttributes({
        playbackInfo: playbackInfoObject
    });
}

// Request and response interceptors using the DynamoDB table associated with Alexa-hosted skills

const LoadPersistentAttributesRequestInterceptor = {
    async process(handlerInput) {
        const persistentAttributes = await handlerInput.attributesManager.getPersistentAttributes();

        /**
         * Check if the user is invoking the skill for the first time and initialize preset values
         * playbackInfo: {
         *    offsetInMilliseconds - this is used to set the offset of the audio file 
         *    to save the position between sessions
         *    token - save an audio token for this play session
         *    inPlaybackSession - used to record the playback state of the session
         *    hasPreviousPlaybackSession - used to help confirm previous playback state
         * }
         */
        if (Object.keys(persistentAttributes).length === 0) {
            handlerInput.attributesManager.setPersistentAttributes({
                playbackInfo: {
                    offsetInMilliseconds: 0,
                    token: 'sample-audio-token',
                    inPlaybackSession: false,
                    hasPreviousPlaybackSession: false,
                },
            });
        }
    },
};

const SavePersistentAttributesResponseInterceptor = {
    async process(handlerInput) {
        await handlerInput.attributesManager.savePersistentAttributes();
    },
};

const CanFulfillIntentRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'CanFulfillIntentRequest';
    },
    handle(handlerInput) {
        // Implement logic to determine if your skill can fulfill the user's request
        const canFulfill = true; // Example: always return true
        return handlerInput.responseBuilder
            .withCanFulfillIntent({
                "canFulfill": canFulfill ? "YES" : "NO",
                // Optionally provide more detailed information about what the skill can fulfill
            })
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        PlayMorningAzkarIntentHandler,
        PlayEveningAzkarIntentHandler,
        PlaySurahMulkIntentHandler,
        PlaySurahKahafIntentHandler,
        PlaySurahWaqiahIntentHandler,
        PauseIntentHandler,
        UnsupportedIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        AudioPlayerEventHandler,
        PlaybackControllerHandler,
        SystemExceptionHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler,
        CanFulfillIntentRequestHandler // Add the CanFulfillIntentRequestHandler here
    )
    .addErrorHandlers(ErrorHandler)
    .addRequestInterceptors(LoadPersistentAttributesRequestInterceptor)
    .addResponseInterceptors(SavePersistentAttributesResponseInterceptor)
    .withCustomUserAgent('sample/audioplayer-nodejs/v2.0')
    .withPersistenceAdapter(
        new ddbAdapter.DynamoDbPersistenceAdapter({
            tableName: process.env.DYNAMODB_PERSISTENCE_TABLE_NAME,
            createTable: false,
            dynamoDBClient: new AWS.DynamoDB({apiVersion: 'latest', region: process.env.DYNAMODB_PERSISTENCE_REGION})
        })
    )
    .lambda();

    