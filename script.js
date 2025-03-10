function loadJSON(path) {
	let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", path, /* async = */ false);
    xobj.send(null);
	return JSON.parse(xobj.responseText);
}

const data = loadJSON("db/objects.json");

var map = L.map('map', {
	'center': [41.602, -93.655],
	'minZoom': 17,
	'zoom': 17,
	'maxBounds': [[41.6, -93.66], [41.605, -93.65]],
	'maxBoundsViscosity': 1,
});

const BUILDING_COORDS = {
	'Carpenter Residence Hall'    : [41.603650, -93.657053],
	'Crawford Residence Hall'     : [41.603402, -93.657793],
	'Goodwin-Kirk Residence Hall' : [41.601436, -93.658104],
	'Herriott Residence Hall'     : [41.603361, -93.656656],
	'Jewett Residence Hall'       : [41.602006, -93.654199],
	'Morehouse Residence Hall'    : [41.601043, -93.655218],
	'Stalnaker Residence Hall'    : [41.602816, -93.658007],

	'Aliber Hall'                 : [41.600979, -93.656859],
	'Carnegie Hall'               : [41.601396, -93.653083],
	'Cartwright Hall'             : [41.602070, -93.653104],
	'Cline Hall'                  : [41.603233, -93.655218],
	'Cole Hall'                   : [41.600890, -93.653083],
	'Collier-Scripps Hall'        : [41.603024, -93.653882],
	'Cowles Library'              : [41.601043, -93.654284],
	'Fitch Hall'                  : [41.603490, -93.654639],
	'Harmon Fine Arts Center'     : [41.602439, -93.651752],
	'Harvey Ingham Hall'          : [41.603594, -93.655819],
	'Howard Hall'                 : [41.601436, -93.651463],
	'Hubbell Dining Hall'         : [41.602647, -93.657289],
	'Medbury Hall'                : [41.602872, -93.654516],
	'Meredith Hall'               : [41.602262, -93.655314],
	'Old Main'                    : [41.601147, -93.652149],
	'Olin Hall'                   : [41.603626, -93.653926],
	'Olmsted Center'              : [41.601933, -93.656902],
	'Opperman Hall'               : [41.602383, -93.652654],
	'Science Connector Building'  : [41.603678, -93.654371],
}

let building_markers = [];

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function addMarker(building) {
	const coords = BUILDING_COORDS[building];
	return L.marker(coords)
		.bindPopup(`<b>${building}</b>`) // TODO: HTML-encode name.
		.on('mouseover', e => e.target.openPopup())
		.on('mouseout', e => e.target.closePopup())
		.on('click', () => window.open(`buildings/${building}/index.html`, '_self'));
}

function showMarker(building) {
	markers[building].addTo(map);
}

function hideMarker(building) {
	markers[building].remove();
}

const buildings = Object.keys(BUILDING_COORDS);
const markers = {}
buildings.forEach(b => markers[b] = addMarker(b));
buildings.forEach(b => showMarker(b));

const items = data;
let results = items;

const resultList = document.getElementById("search-results");

function addResult(item) {
	let li = document.createElement("li");
	li.className = "result";
	li.innerHTML = `
		<h2>${item.Type}</h2>
		<p>${item.Building}</p>
		<p>${item.Floor}</p>
		<p>${item.Room}</p>
	`;
	resultList.appendChild(li);
}

items.forEach(item => addResult(item));
const searchBar = document.getElementById("search-bar");
searchBar.oninput = () => {filterBuildings(); filterResults()};

function filterBuildings() {
	const text = searchBar.value.toLowerCase();
	if (text === "") {
		buildings.forEach(b => showMarker(b));
	} else {
		buildings.forEach(b => {
			const objects = data.filter(obj => obj.Building === b);
			const matches = objects.filter(o => o.Type.toLowerCase().includes(text));
			matches.length !== 0 ? showMarker(b) : hideMarker(b);
		});
	}
}

function filterResults() {
	const text = searchBar.value.toLowerCase();
	if (text === "") {
		results = items;
	} else {
		results = items.filter(obj => obj.Type.toLowerCase().includes(text));
	}
	updateResults();
}

function updateResults() {
	resultList.innerHTML = "";
	results.forEach(r => addResult(r));
}	
