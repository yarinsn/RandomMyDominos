document.getElementsByClassName("randomize")[0].addEventListener("click", randomize);

function randomize(){
	var properties = getRandomProperties();
	sendMessage('randomize', properties);
}

function getRandomProperties(){
	var vegtables = document.getElementById("vegtables").checked;
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