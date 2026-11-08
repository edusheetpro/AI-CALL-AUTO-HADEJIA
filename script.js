
/* =================================
   AI CALL AUTO HADEJIA
   Powered by Nagari Technologies
================================= */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    background: #f1f7f4;
    color: #18352b;
    min-height: 100vh;
}

/* HEADER */

.header {
    background: linear-gradient(
        135deg,
        #063b2b,
        #08734f,
        #00a878
    );

    color: white;
    text-align: center;
    padding: 35px 15px;
    border-radius: 0 0 25px 25px;
}

.logo {
    font-size: 48px;
    margin-bottom: 10px;
}

.header h1 {
    font-size: 25px;
    font-weight: bold;
    letter-spacing: 1px;
}

.header p {
    margin-top: 10px;
    font-size: 15px;
}

.powered {
    display: inline-block;
    margin-top: 15px;
    font-size: 12px;
    color: #d5ffeb;
}

/* MAIN CONTAINER */

.container {
    width: 100%;
    max-width: 650px;
    margin: 25px auto;
    padding: 0 15px;
}

/* WELCOME SECTION */

.welcome {
    text-align: center;
    margin-bottom: 25px;
}

.welcome h2 {
    color: #08734f;
    font-size: 23px;
    margin-bottom: 10px;
}

.welcome p {
    color: #60766c;
    font-size: 14px;
    line-height: 1.6;
}

/* ASSISTANT CARD */

.assistant {
    background: white;
    padding: 25px 18px;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 5px 20px rgba(0, 60, 40, 0.09);
    border: 1px solid #e0eee6;
}

.assistant-icon {
    width: 85px;
    height: 85px;
    margin: 0 auto 15px;
    border-radius: 50%;
    background: #e1f6ec;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 43px;
}

.assistant h2 {
    color: #075c40;
    font-size: 21px;
    margin-bottom: 12px;
}

#status {
    background: #eaf8f0;
    color: #08734f;
    padding: 10px;
    border-radius: 10px;
    font-size: 13px;
    margin-bottom: 22px;
}

/* CONTROLS */

.controls {
    display: flex;
    flex-direction: column;
    text-align: left;
}

.controls label {
    font-size: 14px;
    font-weight: bold;
    margin: 12px 0 8px;
    color: #254b3b;
}

.controls select {
    width: 100%;
    padding: 13px;
    border: 1px solid #c9ded2;
    border-radius: 10px;
    background: #f9fffb;
    color: #18352b;
    font-size: 15px;
    outline: none;
}

.controls select:focus {
    border-color: #079b69;
}

/* BUTTONS */

.controls button {
    width: 100%;
    padding: 15px;
    margin-top: 16px;
    border: none;
    border-radius: 12px;
    background: linear-gradient(
        135deg,
        #08734f,
        #00a878
    );
    color: white;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
}

.controls button:active {
    transform: scale(0.98);
}

.controls button:hover {
    opacity: 0.9;
}

/* CONVERSATION */

.conversation {
    background: #f3faf6;
    border: 1px solid #dceee3;
    border-radius: 12px;
    padding: 17px;
    margin-top: 23px;
    text-align: left;
}

.conversation h3 {
    color: #08734f;
    font-size: 16px;
    margin-bottom: 10px;
}

#response {
    color: #52675d;
    font-size: 14px;
    line-height: 1.7;
}

/* FEATURES */

.features {
    margin-top: 30px;
    background: white;
    padding: 22px 16px;
    border-radius: 18px;
    box-shadow: 0 4px 15px rgba(0, 60, 40, 0.06);
}

.features h2 {
    text-align: center;
    color: #075c40;
    font-size: 19px;
    margin-bottom: 20px;
}

.feature-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

.feature {
    background: #edf8f1;
    color: #176344;
    padding: 15px 8px;
    text-align: center;
    border-radius: 10px;
    font-size: 14px;
    font-weight: bold;
}

/* FOOTER */

footer {
    background: #063b2b;
    color: white;
    text-align: center;
    padding: 22px 10px;
    margin-top: 35px;
}

footer p {
    font-size: 12px;
    margin: 5px 0;
    color: #d5ffeb;
}

/* SMALL SCREENS */

@media (max-width: 380px) {
    .header h1 {
        font-size: 21px;
    }

    .welcome h2 {
        font-size: 20px;
    }

    .feature-grid {
        grid-template-columns: 1fr 1fr;
    }
    }
      
