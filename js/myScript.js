// BackEnd URL
const BASE_URL = "http://localhost:8080/api/location/";

//  UI URL
const UI_URL = "http://127.0.0.1:5500";

/************************** ADD Location************************************* */


function addLocation() {
	const name = document.getElementById('name').value;
	const status = document.getElementById('status').value;
	const capacity = document.getElementById('capacity').value;

	const loationObj = {};

	loationObj.name = name;
	loationObj.status = status;
	loationObj.capacity = capacity;

	callAddLocationAPI(loationObj);

}
async function callAddLocationAPI(loationObj) {
	const url = BASE_URL;

	const data = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(loationObj)
	};
	const rawResponse = await fetch(url, data);
	const loc = await rawResponse.json();

	if (loc) {
		alert('Location added Successfully');

		window.location.href = UI_URL + '/index.html';
	}
	else { alert('operation failed'); }

	console.log(loc);
}

/************************** EDIT Location************************************* */


function fetchAndFillLocationData() {
	const params = new URLSearchParams(window.location.search);
	const id = params.get('id');
	callGetOneLocationDataAPI(id);
}
async function callGetOneLocationDataAPI(id) {

	const url = BASE_URL + id;

	const data = {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	};
	const rawResponse = await fetch(url, data);
	const loc = await rawResponse.json();

	console.log(loc);

	fillEditLocationPage(loc);

}
function fillEditLocationPage(loc) {
	document.getElementById('id').value = loc.id;
	document.getElementById('name').value = loc.name;
	document.getElementById('status').value = loc.status;
	document.getElementById('capacity').value = loc.capacity;
}

function editLocation() {
	const id = document.getElementById('id').value;
	const name = document.getElementById('name').value;
	const status = document.getElementById('status').value;
	const capacity = document.getElementById('capacity').value;

	const loationObj = {};

	loationObj.id = id;
	loationObj.name = name;
	loationObj.status = status;
	loationObj.capacity = capacity;

	callEditLocationAPI(loationObj);

}
async function callEditLocationAPI(loationObj) {
	const url = BASE_URL;

	const data = {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(loationObj)
	};
	const rawResponse = await fetch(url, data);
	const loc = await rawResponse.json();

	if (loc) {
		alert('Location edited Successfully');

		window.location.href = UI_URL + '/index.html';
	}
	else { alert('operation failed'); }

	console.log(loc);
}


/************************** Fetch All Locations************************************* */

function fetchLocationData() {

	callLocationDataAPI();

}

async function callLocationDataAPI() {

	const url = BASE_URL;

	const data = {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	};
	const rawResponse = await fetch(url, data);
	const allLocations = await rawResponse.json();

	console.log(rawResponse);

	fillLocationTable(allLocations)

	console.log(allLocations);
}

function fillLocationTable(allLocations) {

	const tbody = document.getElementById('locations');
	for (loc of allLocations) {

		let row = document.createElement('tr');

		let idCol = document.createElement('td');
		idCol.innerHTML = loc.id;

		let nameCol = document.createElement('td');
		nameCol.innerHTML = loc.name;

		let statusCol = document.createElement('td');
		statusCol.innerHTML = loc.status;

		let capacityCol = document.createElement('td');
		capacityCol.innerHTML = loc.capacity;

		let editBtnCol = document.createElement('td');

		var a = document.createElement('a');
		var link = document.createTextNode("Edit");
		a.appendChild(link);
		a.classList.add('btn');
		a.classList.add('btn-primary');

		a.title = "Click here to edit location";
		a.href = UI_URL + "/editLocation.html?id=" + loc.id;

		editBtnCol.appendChild(a);


		let deleteBtnCol = document.createElement('td');
		var element = document.createElement("input");
		//Assign different attributes to the element. 
		element.type = 'button';
		element.value = 'Delete';

		const id = loc.id;

		element.onclick = function () { // Note this is a function
			deleteLocation(id);
		};
		element.classList.add('btn');
		element.classList.add('btn-danger');


		deleteBtnCol.appendChild(element);


		row.append(idCol);
		row.append(nameCol);
		row.append(statusCol);
		row.append(capacityCol);
		row.append(editBtnCol);
		row.append(deleteBtnCol);

		tbody.append(row);
	}

	console.log("fillLocationTable over");
}

function deleteLocation(id) {
	callDeleteLocationAPI(id);
}
async function callDeleteLocationAPI(id) {

	const url = BASE_URL + id;

	const data = {
		method: 'DELETE',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	};
	const rawResponse = await fetch(url, data);
	alert('Location deleted Successfully');

	window.location.href = UI_URL + '/index.html';


}

