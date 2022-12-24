

//https://api.waifu.im/

let btn = document.getElementById("next");
let div_images = document.getElementById("img")

const startButton = document.getElementById('start_btn');
startButton.addEventListener('click', startGame);

const nextButton = document.getElementById('next_btn');
nextButton.addEventListener('click', () => {
    currentImageIndex++;
    setNextImage;
})
const imageContainer = document.getElementById('image_container');
const imageElement = document.getElementById('image');
const asnwerButtonElement = document.getElementById('answers_btns');


let shuffledImages, currentImageIndex; 

function startGame() {
    console.log('Started');
    startButton.classList.add('hide');
    imageContainer.classList.remove('hide');
    shuffledImages = waifus.sort(() => Math.random() -.5);
    currentImageIndex = 0;
    setNextImage();
}

function setNextImage() {
    resetState();
    showImage(shuffledImages[currentImageIndex]);
}

function showImage(image){
 new_img = new Image;
 new_img.src = image.imageUrl;
 image.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');    
    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    asnwerButtonElement.appendChild(button);
 })
 imageElement.appendChild(new_img);

}

function resetState(){
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while(asnwerButtonElement.firstChild){
        asnwerButtonElement.removeChild(asnwerButtonElement.firstChild)
    }

}

function selectAnswer(e) {
const selectedButton   = e.target;
const correct = selectedButton.dataset.correct;
setStatusClass(document.body, correct);
Array.from(asnwerButtonElement.children).forEach(button=>{
    setStatusClass(button, button.dataset.correct);
})
if(shuffledImages.length >= currentImageIndex){
    nextButton.classList.remove('hide');
}
else{
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');   
}

}

function setStatusClass(element, correct){
    clearStatusClass(element);
    if(correct){
        element.classList.add('correct');
    }
    else{
        element.classList.add('wrong');
    }

}

function clearStatusClass(element){
    element.classList.remove('correct');
    element.classList.remove('wrong'); 
}

const waifus = [
    {
        imageUrl: 'https://i.waifu.pics/rUfJc7w.jpg',
        answers: [
            {text: 'Chika', correct: true},
            {text: 'Rem', correct: false}

        ]
        ,
        
    },
    
    {
        imageUrl: 'https://cdn.waifu.im/4715.jpeg',
        answers: [
            {text: 'Oooga', correct: true},
            {text: 'Booga', correct: false}

        ] 
    }

]