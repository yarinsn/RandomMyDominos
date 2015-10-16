chrome.runtime.onMessage.addListener(
	function(request, sender) {
		if (request.action != 'randomize')
			sendResponse({result: 'unknown action.'});

		chooseRandomToppings(4)
  });

function chooseRandomToppings(amount){
	var toppings = getToppings();

	clearActiveToppingAreas(toppings).done(function(){
		var randomToppings = getRandomToppings(toppings, amount);

		randomToppings.forEach(function(topping){
			var toppingAreas = $(topping).find('.pizza-item');
			clickRandomToppingAreas(toppingAreas);
		});
	});
}

function clearActiveToppingAreas(toppings){
	var deferred = $.Deferred();

	toppings.each(function(index, topping){
		var activeToppingArea = $(topping).find('.active');

		if (activeToppingArea.length) {
			clickTopping(activeToppingArea);
		}
	});

	deferred.resolve();
	return deferred.promise();
}

function clearActiveToppingArea(activeToppingArea){
	setTimer(function(){
		activeToppingArea.removeClass('active');
	}, 200);
}

function getRandomToppings(toppings, amount){
	var randomToppings = [];

	for (i = 0; i < amount; i++){
		var randomToppingIndex = getRandomInt(0, toppings.length);

		randomToppings.push(toppings[randomToppingIndex]);
	}

	return randomToppings;
}

function getToppings(){
	return $(document).find('.segmentations');
}

function clickRandomToppingAreas(toppingAreas){
	var randomToppingArea = getRandomInt(0, toppingAreas.length);

	toppingAreas[randomToppingArea].click();
}

function clickTopping(topping){
	topping.click();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}