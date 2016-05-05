$(document).ready( function() {
	var userCash = "100";

	var apple = new Fruit ("apple", 2, 0, 0);
	var banana = new Fruit ("banana", 2, 0, 0);
	//var grape = new Fruit ("grape", 2, 0, 0);
	var orange = new Fruit ("orange", 2, 0, 0);
	var pear = new Fruit ("pear", 2, 0, 0);

	var fruitBasket = [apple, banana, orange, pear];

	$('.cash-avail').text(userCash);

	$('.apple').data('fruit', 0);
	$('.banana').data('fruit', 1);
	$('.orange').data('fruit', 2);
	$('.pear').data('fruit', 3);


var intervalID = window.setInterval(returnRandom, 1500);


$('.container').on('click', 'button', function (){

var $fl = fruitBasket[$(this).parent().data('fruit')];
//increments inventory in object
$fl.inv += 1;
console.log($fl);
//finds inventory, increments on DOM
$(this).parent().find('.inventory').text($fl.inv);
//depletes userCash
userCash -= $fl.price;
$('header').find('.cash-avail').text(userCash);
if (userCash == 0) {
  alert("You're out of money!");
}

});

//testing windowTimers
function returnRandom () {
  var random = randomNumber(-50, 50);
  console.log(random);
}
//useful functions
function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}
function Fruit (name, price, avgPrice, inv) {
	this.name = name,
	this.price = price,
	this.avgPrice = avgPrice,
	this.inv = inv
}

/*function changePrice(){
  set variable to randomNumber (1, 50);
  randomly assign price + or - the variable;*/


});
