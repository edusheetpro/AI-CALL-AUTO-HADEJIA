
/* ==========================================
   AI CALL CONNECT
   VOICE ASSISTANT SYSTEM
   Hausa + English
========================================== */


/* 1. GET HTML ELEMENTS */

const languageSelect = document.getElementById("language");
const voiceSelect = document.getElementById("voiceType");

const speakBtn = document.getElementById("speakBtn");
const listenBtn = document.getElementById("listenBtn");

const statusText = document.getElementById("status");
const responseText = document.getElementById("response");


/* 2. CHECK BROWSER SUPPORT */

const speechSupported =
    "speechSynthesis" in window;

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

const listeningSupported = Boolean(SpeechRecognition);


/* 3. VOICE SETTINGS */

let availableVoices = [];
let recognition = null;
let isListening = false;


/* 4. TEXT MESSAGES */

const messages = {

    "ha-NG": {
        greeting:
            "Sannu! Barka da zuwa AI CALL CONNECT. Ina nan domin taimaka maka.",

        listening:
            "Ina sauraronka. Yi magana yanzu.",

        stopped:
            "Na dakatar da sauraro.",

        notSupported:
            "Yi hakuri, wannan browser ba ya goyon bayan microphone.",

        permission:
            "Ba a samu damar amfani da microphone ba. Ka duba permission na browser.",

        error:
            "An samu matsala wajen sauraron muryarka."
    },

    "en-NG": {
        greeting:
            "Hello! Welcome to AI CALL CONNECT. I am here to assist you.",

        listening:
            "I am listening. Please speak now.",

        stopped:
            "Listening has stopped.",

        notSupported:
            "Sorry, this browser does not support microphone recognition.",

        permission:
            "Microphone access was denied. Please check your browser permissions.",

        error:
            "An error occurred while listening."
    }

};


/* 5. UPDATE STATUS */

function updateStatus(message) {

    if (statusText) {
        statusText.textContent = message;
    }

}


/* 6. UPDATE RESPONSE */

function updateResponse(message) {

    if (responseText) {
        responseText.textContent = message;
    }

}


/* 7. GET CURRENT LANGUAGE */

function getLanguage() {

    return languageSelect.value || "ha-NG";

}


/* 8. LOAD AVAILABLE VOICES */

function loadVoices() {

    if (!speechSupported) return;

    availableVoices =
        window.speechSynthesis.getVoices();

}

if (speechSupported) {

    loadVoices();

    window.speechSynthesis.onvoiceschanged =
        loadVoices;

}


/* 9. SELECT VOICE */

function selectVoice(language, gender) {

    loadVoices();

    const languageCode =
        language.split("-")[0].toLowerCase();

    const matchingVoices =
        availableVoices.filter(voice =>
            voice.lang.toLowerCase().startsWith(languageCode)
        );

    const genderPattern =
        gender === "female"
            ? /female|woman|zira|samantha|victoria|karen|susan|google uk english female/i
            : /male|man|david|mark|daniel|james|george/i;

    const preferredVoice =
        matchingVoices.find(voice =>
            genderPattern.test(voice.name)
        );

    return preferredVoice ||
        matchingVoices[0] ||
        availableVoices[0] ||
        null;

}


/* 10. SPEAK FUNCTION */

function speakMessage(message) {

    if (!speechSupported) {

        updateStatus(
            "Your browser does not support voice playback."
        );

        return;

    }

    window.speechSynthesis.cancel();

    const language = getLanguage();
    const gender = voiceSelect.value;

    const utterance =
        new SpeechSynthesisUtterance(message);

    utterance.lang = language;
    utterance.rate = 0.88;
    utterance.pitch =
        gender === "female" ? 1.08 : 0.88;

    const selectedVoice =
        selectVoice(language, gender);

    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    utterance.onstart = function () {

        updateStatus("AI Voice is speaking...");

    };

    utterance.onend = function () {

        updateStatus("AI Voice System Ready");

    };

    utterance.onerror = function (event) {

        updateStatus(
            "Voice error: " + event.error
        );

    };

    window.speechSynthesis.speak(utterance);

}


/* 11. TEST VOICE BUTTON */

speakBtn.addEventListener("click", function () {

    const language = getLanguage();

    const message =
        messages[language].greeting;

    updateResponse(message);

    speakMessage(message);

});


/* 12. CREATE MICROPHONE RECOGNITION */

if (listeningSupported) {

    recognition = new SpeechRecognition();

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.maxAlternatives = 1;

    recognition.lang = getLanguage();


    recognition.onstart = function () {

        isListening = true;

        listenBtn.innerHTML =
            '<span class="btn-icon">■</span><span>Stop Listening</span>';

        updateStatus("Listening to your voice...");

        updateResponse(
            messages[getLanguage()].listening
        );

    };


    recognition.onresult = function (event) {

        const spokenText =
            event.results[0][0].transcript;

        updateResponse(
            "You said: " + spokenText
        );

        updateStatus("Voice received successfully");


    };


    recognition.onerror = function (event) {

        isListening = false;

        listenBtn.innerHTML =
            '<span class="btn-icon">🎙</span><span>Start Listening</span>';

        if (event.error === "not-allowed" ||
            event.error === "service-not-allowed") {

            updateStatus(
                messages[getLanguage()].permission
            );

        } else {

            updateStatus(
                "Microphone error: " + event.error
            );

        }

    };


    recognition.onend = function () {

        isListening = false;

        listenBtn.innerHTML =
            '<span class="btn-icon">🎙</span><span>Start Listening</span>';

        if (statusText.textContent ===
            "Listening to your voice...") {

            updateStatus("AI Voice System Ready");

        }

    };

}


/* 13. START / STOP LISTENING BUTTON */

listenBtn.addEventListener("click", function () {

    if (!listeningSupported) {

        updateStatus(
            messages[getLanguage()].notSupported
        );

        updateResponse(
            messages[getLanguage()].notSupported
        );

        return;

    }

    if (isListening) {

        recognition.stop();

        return;

    }

    recognition.lang = getLanguage();

    try {

        recognition.start();

    } catch (error) {

        updateStatus(
            "Unable to start microphone. Please try again."
        );

    }

});


/* 14. LANGUAGE CHANGE */

languageSelect.addEventListener("change", function () {

    if (isListening) {
        recognition.stop();
    }

    updateStatus(
        "Language changed to " +
        (getLanguage() === "ha-NG" ? "Hausa" : "English")
    );

});


/* 15. VOICE CHANGE */

voiceSelect.addEventListener("change", function () {

    updateStatus(
        voiceSelect.value === "female"
            ? "Female voice selected"
            : "Male voice selected"
    );

});


/* 16. INITIALIZE SYSTEM */

if (!speechSupported) {

    updateStatus(
        "Voice playback is not supported by this browser."
    );

} else {

    updateStatus("AI Voice System Ready");

}
