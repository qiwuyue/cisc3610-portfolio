function display(){
    const menu = document.getElementById("wordSelect");
    const display = document.getElementById("text");

    if(menu.selectedIndex > 0){
        const selectedOption = menu.options[menu.selectedIndex];
        display.value = selectedOption.dataset.sentence;}else{
            display.value = "";
        }
        return display.value;
}

function speak(textToSay){
    const message = new SpeechSynthesisUtterance(textToSay);
    message.pitch = 1.2;
    message.rate = 1.0;
    window.speechSynthesis.speak(message);
}
function speakSentence(){
    const textToSay = display();
    speak(textToSay);
}
function speakWord(){
    const menu = document.getElementById("wordSelect");
    const word= menu.options[menu.selectedIndex].value;
    speak(word);
}
