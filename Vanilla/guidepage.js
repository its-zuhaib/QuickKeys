async function fetchRandomText() {
  const response = await fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=1&format=text');
  const text = await response.text();
  return text;
}

let targetText="";
let userInput=""
async function writeText(){
   const text=await fetchRandomText();

   const x = text.trim().split(/\s+/); 

  const y = x.slice(0, 50);

  const z = y.join(" ");


   const textBox = document.querySelector('.text-box');
   textBox.innerHTML="";

   targetText = z;  

   for (let char of z) {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.color = "black";  
    textBox.appendChild(span);
  }
  textBox.focus();
}

// reset the text 
function resetText(){
   document.querySelector('.text-box').innerHTML="";

}


//highlight text 
function updateColors(){
   const textBox = document.querySelector('.text-box');
   const spans=textBox.querySelectorAll("span");
   for(let i=0;i<spans.length;i++){

      if(i<userInput.length){
          if (userInput[i] === targetText[i]) {
        spans[i].style.color = "green";  
      } else {
        spans[i].style.color = "red";    
      }
      }
      else
      {
         spans[i].style.color = "black";  
      }
   }

}

//capture user input


document.querySelector('.text-box').addEventListener('keydown', function(event) {
  event.preventDefault(); 

  if (event.key.length === 1) { 

    if (userInput.length < targetText.length) {
      userInput += event.key;
      updateColors();
    }
  } else if (event.key === "Backspace") {
    userInput = userInput.slice(0, -1);
    updateColors();
  }
});