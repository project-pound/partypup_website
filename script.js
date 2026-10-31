const toggle=document.querySelector('.menu');
const navigation=document.querySelector('.nav nav');
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));toggle.setAttribute('aria-label',open?'Open navigation':'Close navigation');navigation.classList.toggle('open',!open)});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');navigation.classList.remove('open')}));
document.querySelector('#year').textContent=new Date().getFullYear();
const voiceButton=document.querySelector('#voice-input'),promptField=document.querySelector('#prompt'),speechStatus=document.querySelector('#speech-status');
const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
if(voiceButton&&promptField&&speechStatus){
 if(!SpeechRecognition){voiceButton.disabled=true;voiceButton.setAttribute('aria-disabled','true');speechStatus.textContent='Voice entry is not supported in this browser. You can still type your party brief.';}
 else{
  const recognition=new SpeechRecognition();let listening=false,startingText='';
  recognition.lang='en-IN';recognition.continuous=false;recognition.interimResults=true;
  recognition.onstart=()=>{listening=true;startingText=promptField.value.trim();voiceButton.classList.add('listening');voiceButton.querySelector('span:last-child').textContent='Listening… tap to stop';speechStatus.textContent='Listening for your party details…';};
  recognition.onresult=event=>{const heard=Array.from(event.results).map(result=>result[0].transcript).join(' ').trim();promptField.value=[startingText,heard].filter(Boolean).join(startingText?' ':'');speechStatus.textContent='Voice entry added. You can edit the text before sending.';};
  recognition.onerror=event=>{speechStatus.textContent=event.error==='not-allowed'?'Microphone access was blocked. You can type your party brief instead.':'Voice entry stopped. You can continue by typing or try again.';};
  recognition.onend=()=>{listening=false;voiceButton.classList.remove('listening');voiceButton.querySelector('span:last-child').textContent='Speak your brief';if(speechStatus.textContent.includes('Listening'))speechStatus.textContent='Voice entry finished. You can edit the text before sending.';};
  voiceButton.addEventListener('click',()=>{if(listening)recognition.stop();else{try{recognition.start();}catch{speechStatus.textContent='Voice entry could not start. Please try again or type your brief.';}}});
 }
}
const revealItems=document.querySelectorAll('.fade');
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});revealItems.forEach(item=>observer.observe(item));}
else revealItems.forEach(item=>item.classList.add('visible'));
