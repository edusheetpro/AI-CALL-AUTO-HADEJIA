
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

const speechSupported = "speechSynthesis" in window;

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

const listeningSupported = Boolean(SpeechRecognition);


/* 3. SYSTEM VARIABLES */

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


/* 7. GET SELECTED LANGUAGE */

function getLanguage() {
    return languageSelect?.value || "ha-NG";
}


/* 8. GET SELECTED GENDER */

function getGender() {
    return voiceSelect?.value || "female";
}


/* 9. LOAD AVAILABLE VOICES */

function loadVoices() {
    if (!speechSupported) return [];

    availableVoices = window.speechSynthesis.getVoices();

    return availableVoices;
}


if (speechSupported) {
    loadVoices();

    window.speechSynthesis.onvoiceschanged = function () {
        loadVoices();
    };
}


/* 10. IDENTIFY VOICE GENDER */

function identifyVoiceGender(voice) {

    const name = voice.name.toLowerCase();

    const femalePattern =
        /\b(female|woman|zira|samantha|victoria|karen|susan|siri female)\b/i;

    const malePattern =
        /\b(male|man|david|mark|daniel|james|george|guy)\b/i;

    if (femalePattern.test(name)) {
        return "female";
    }

    if (malePattern.test(name)) {
        return "male";
    }

    return "unknown";
}


/* 11. SELECT THE BEST AVAILABLE VOICE */

function selectVoice(language, gender) {

    loadVoices();

    const languageCode =
        language.split("-")[0].toLowerCase();

    const matchingVoices = availableVoices.filter(voice =>
        voice.lang.toLowerCase().startsWith(languageCode)
    );

    if (matchingVoices.length === 0) {
        return null;
    }

    const genderMatch = matchingVoices.find(voice =>
        identifyVoiceGender(voice) === gender
    );

    return genderMatch || matchingVoices[0];
}


/* 12. SPEAK FUNCTION */

function speakMessage(message) {

    if (!speechSupported) {
        updateStatus("This browser does not support voice playback.");
        return;
    }

    window.speechSynthesis.cancel();

    const language = getLanguage();
    const gender = getGender();

    const utterance = new SpeechSynthesisUtterance(message);

    utterance.lang = language;

    // Natural speaking speed
    utterance.rate = 0.90;

    // Pitch adjustment only; this does not guarantee gender
    utterance.pitch = gender === "female" ? 1.05 : 0.95;

    const selectedVoice = selectVoice(language, gender);

    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    utterance.onstart = function () {

        updateStatus("AI Voice is speaking...");

        if (!selectedVoice) {
            updateResponse(
                message +
                "\n\nNote: A dedicated voice for this language was not found on this device."
            );
        }
    };

    utterance.onend = function () {

        updateStatus("AI Voice System Ready");

    };

    utterance.onerror = function (event) {

        updateStatus("Voice playback error: " + event.error);

    };

    window.speechSynthesis.speak(utterance);
}


/* 13. TEST VOICE BUTTON */

if (speakBtn) {

    speakBtn.addEventListener("click", function () {

        const language = getLanguage();

        const message = messages[language].greeting;

        updateResponse(message);

        speakMessage(message);

    });

}


/* 14. CREATE MICROPHONE RECOGNITION */

if (listeningSupported) {

    recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;

    recognition.lang = getLanguage();


    recognition.onstart = function () {

        isListening = true;

        listenBtn.innerHTML =
            '<span class="btn-icon">■</span><span>Stop Listening</span>';

        updateStatus("Listening to your voice...");

        updateResponse(messages[getLanguage()].listening);

    };


    recognition.onresult = function (event) {

        const result = event.results[0][0];

        const spokenText = result.transcript;

        updateResponse("You said: " + spokenText);

        updateStatus(
            "Voice received. Recognition confidence: " +
            Math.round(result.confidence * 100) + "%"
        );

    };


    recognition.onerror = function (event) {

        isListening = false;

        listenBtn.innerHTML =
            '<span class="btn-icon">🎙</span><span>Start Listening</span>';

        if (
            event.error === "not-allowed" ||
            event.error === "service-not-allowed"
        ) {

            updateStatus(messages[getLanguage()].permission);

        } else if (event.error === "language-not-supported") {

            updateStatus(
                "This browser does not support the selected recognition language."
            );

        } else if (event.error === "no-speech") {

            updateStatus("No speech detected. Please try again.");

        } else {

            updateStatus("Microphone error: " + event.error);

        }

    };


    recognition.onend = function () {

        isListening = false;

        listenBtn.innerHTML =
            '<span class="btn-icon">🎙</span><span>Start Listening</span>';

        if (
            statusText &&
            statusText.textContent === "Listening to your voice..."
        ) {
            updateStatus("AI Voice System Ready");
        }

    };

}


/* 15. START / STOP LISTENING */

if (listenBtn) {

    listenBtn.addEventListener("click", function () {

        if (!listeningSupported) {

            updateStatus(
                "Sorry, microphone recognition is not supported by this browser."
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

}


/* 16. LANGUAGE CHANGE */

if (languageSelect) {

    languageSelect.addEventListener("change", function () {

        if (isListening && recognition) {
            recognition.stop();
        }

        updateStatus(
            getLanguage() === "ha-NG"
                ? "Hausa selected"
                : "English selected"
        );

    });

}


/* 17. VOICE CHANGE */

if (voiceSelect) {

    voiceSelect.addEventListener("change", function () {

        const gender = getGender();

        const selectedVoice = selectVoice(getLanguage(), gender);

        if (selectedVoice) {

            updateStatus(
                gender === "female"
                    ? "Female voice selected: " + selectedVoice.name
                    : "Male voice selected: " + selectedVoice.name
            );

        } else {

            updateStatus(
                "No dedicated voice found. Your device may use its default voice."
            );

        }

    });

}


/* 18. INITIALIZE SYSTEM */

if (!speechSupported) {

    updateStatus("Voice playback is not supported by this browser.");

} else {

    updateStatus("AI Voice System Ready");

   }
       
