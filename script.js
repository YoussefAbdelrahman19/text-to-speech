const textarea = document.querySelector ('textarea'),
  speechBtn = document.querySelector ('button'),
  voiceList = document.querySelector ('select');
let synth = speechSynthesis;
var isSpeaking = true;
function voices () {
  for (const voice of synth.getVoices ()) {
    let selected = voice.name === 'Google US English' ? 'selected' : '';
    let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
    voiceList.insertAdjacentHTML ('beforeend', option);
  }
}
synth.addEventListener ('voiceschanged', voices);
function textToSpeech (text) {
  let utternance = new SpeechSynthesisUtterance (text);
  for (const voice of synth.getVoices ()) {
    if (voice.name === voiceList.value) {
      utternance.voice = voice;
    }
  }

  synth.speak (utternance);
}
speechBtn.addEventListener ('click', e => {
  e.preventDefault ();
  if (textarea.value !== '') {
    if (!synth.speaking) {
      textToSpeech (textarea.value);
    }
    if (textarea.value.length > 80) {
      if (isSpeaking) {
        synth.resume ();
        isSpeaking = false;
        speechBtn.innerText = 'Pause Speech';
      } else {
        synth.pause ();
        isSpeaking = true;
        speechBtn.innerText = 'Resume Speech';
      }
      setInterval (() => {
        if (!synth.speaking && !isSpeaking) {
          isSpeaking = true;
          speechBtn.innerText = 'Convert To Speech';
        }
      }, 10000);
    } else {
      speechBtn.innerText = 'Convert To Speech';
    }
  }
});
