var card = document.getElementById('card');

var func = function() {
	card.classList.toggle('is-flipped');
}

card.addEventListener('click', func );