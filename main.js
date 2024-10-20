Array.prototype.getRandomArray = function (length) {
	const arrayCopy = this.clone();
	if (length > arrayCopy.length)
		length = arrayCopy.length;
	let array = [];
	for (let i = 0; i < length - 1; i++) {
		const index = Math.floor(Math.random() * arrayCopy.length);
		array.push(arrayCopy[index]);
		arrayCopy.splice(index, 1);
	}
	return array;
}
Array.prototype.shuffle = function () {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]]; // Меняем элементы местами
    }
    return this;
};
Array.prototype.clone = function () {
	return this.slice(0);
};

const list = [
	{ question: "q_0", answer: "a_0" },
	{ question: "q_1", answer: "a_1" },
	{ question: "q_2", answer: "a_2" },
	{ question: "q_3", answer: "a_3" },
	{ question: "q_4", answer: "a_4" },
	{ question: "q_5", answer: "a_5" },
];
let currentQuestionIndex = 0;

var card = document.getElementById('card');
var cardBack = document.getElementById('card_back');
var cardBackHeading = document.getElementById('card_back_h');
var cardBackParagraph = document.getElementById('card_back_p');

var nextButton = document.getElementById('next_button');

var question = document.getElementById('question');
var optionList = document.getElementById('options_list');
var allOptions = document.querySelectorAll('#options_list li');

setQuestion(currentQuestionIndex);

nextButton.onclick = nextButtonClick;

function chooseOption(e) {
	if (e.target.textContent == list[currentQuestionIndex].answer){
		cardBackHeading.innerHTML = 'Correct';
		
		cardBack.classList.remove('card-incorrect');
		cardBack.classList.add('card-correct');
	}
	else{
		cardBackHeading.innerHTML = 'Incorrect';
		
		cardBack.classList.remove('card-correct');
		cardBack.classList.add('card-incorrect');
	}
	cardBackParagraph.innerHTML = list[currentQuestionIndex].answer;
	
	card.classList.add('is-flipped');
};

function setQuestion(index){
	
	question.textContent = list[currentQuestionIndex].question;
	
	optionList.innerHTML = '';
	
	const falseOptions = list.clone();
	falseOptions.splice(currentQuestionIndex, 1);
	let options = falseOptions.getRandomArray(4);
	
	options.push(list[currentQuestionIndex])

	options.shuffle();
	
	options.forEach((item) => {		
		let li = document.createElement('li');
		li.classList.add('option');
		li.textContent = item.answer;
		
		li.addEventListener('click', chooseOption);
		optionList.appendChild(li);
	});
}

function nextButtonClick(){
	if (currentQuestionIndex >= list.length - 1){
		question.textContent = 'End';
		
		optionList.innerHTML = '';
	}
	else{
		currentQuestionIndex++;
		
		setQuestion(currentQuestionIndex);
	}
	
	card.classList.remove('is-flipped');
}