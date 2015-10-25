var _buttonsPath = 'style/graphics/buttons/';

var fishBtn;
var vegBtn;
var meatBtn;
var dairyBtn;

var oneBtn;
var twoBtn;
var threeBtn;
var fourBtn;
var fiveBtn;
var sixBtn;
var sevenBtn;
var eightBtn;

var quantityButtons = [oneBtn, twoBtn, threeBtn, fourBtn, fiveBtn, sixBtn, sevenBtn, eightBtn];

var shuffleBtn;

(function initPopup(){
	setButtons();
})();

function setButtons(){
	setButtonElements();

	setToppingButton(vegBtn, 'veg_active.png', 'veg_inactive.png', true);
	setToppingButton(dairyBtn, 'dairy_active.png', 'dairy_inactive.png', true);
	setToppingButton(fishBtn, 'fish_active.png', 'fish_inactive.png', true);
	setToppingButton(meatBtn, 'meat_active.png', 'meat_inactive.png', true);

	setQunatityButton(oneBtn, '1_active.png', '1_inactive.png');
	setQunatityButton(twoBtn, '2_active.png', '2_inactive.png');
	setQunatityButton(threeBtn, '3_active.png', '3_inactive.png');
	setQunatityButton(fourBtn, '4_active.png', '4_inactive.png', true);
	setQunatityButton(fiveBtn, '5_active.png', '5_inactive.png');
	setQunatityButton(sixBtn, '6_active.png', '6_inactive.png');
	setQunatityButton(sevenBtn, '7_active.png', '7_inactive.png');
	setQunatityButton(eightBtn, '8_active.png', '8_inactive.png');

	setActionButton(shuffleBtn, 'shuffle.png', randomize);
}

function setButtonElements(){
	fishBtn = $('#fish');
	vegBtn = $('#veg');
	meatBtn = $('#meat');
	dairyBtn = $('#dairy');

	oneBtn = $('#one');
	twoBtn = $('#two');
	threeBtn = $('#three');
	fourBtn = $('#four');
	fiveBtn = $('#five');
	sixBtn = $('#six');
	sevenBtn = $('#seven');
	eightBtn = $('#eight');

	shuffleBtn = $('#shuffle');
}

function setToppingButton(button, activeImg, inactiveImg, isActive){
	setToggleButton(button, activeImg, inactiveImg, isActive)

	button.click(function(){
		toggleButton(button, button.hasClass('active'));
	});
}

function setQunatityButton(button, activeImg, inactiveImg, isActive){
	setToggleButton(button, activeImg, inactiveImg, isActive)

	button.click(function(){
		clearQuantityButtons();
		toggleButton(button, button.hasClass('active'))
	});
}

function setToggleButton(button, activeImg, inactiveImg, isActive){
	button.activeImg = activeImg;
	button.inactiveImg = inactiveImg;

	setToggleButtonState(button, isActive);
}

function clearQuantityButtons(){
	for (i = 0; i < quantityButtons.length; i++){
		var button = quantityButtons[i];
		var isActive = button.hasClass('active');

		if(isActive)
			toggleButton(button, isActive);
	}
}

function setToggleButtonState(button, isActive) {
	if (isActive)
		button.attr('src', _buttonsPath + button.activeImg);
	else
		button.attr('src', _buttonsPath + button.inactiveImg);
}

function toggleButton(button, isActive){
	if (isActive) {
		button.attr('src', _buttonsPath + button.inactiveImg);
		button.removeClass('active');
	}
	else
		button.attr('src', _buttonsPath + button.activeImg);
}

function setActionButton(button, img, func){
	button.attr('src', _buttonsPath + img);

	button.click(func)
}

function randomize(){
	var properties = getRandomProperties();
	sendMessage('randomize', properties);
}

function getRandomProperties(){
	var vegtables = document.getElementById("vegetables").checked;
	var meat = document.getElementById("meat").checked;
	var dairy = document.getElementById("dairy").checked;
	var fish = document.getElementById("fish").checked;
	var toppingsQuantity = document.getElementById("toppings-quantity").value;

	return {
		vegtables: vegtables,
		meat: meat,
		dairy: dairy,
		fish: fish,
		toppingsQuantity: toppingsQuantity
	}
}

function sendMessage(action, properties){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {action: action, properties: properties}, function(response) {
			console.log(response.result);
		});
	});
}