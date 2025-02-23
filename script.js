function loadJSON(path) {
	let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", path, /* async = */ false);
    xobj.send(null);
	return JSON.parse(xobj.responseText);
}

const data = loadJSON("https://ujan-r.github.io/ccsc-2025-hackathon/db/objects.json");

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

for (let [name, coords] of Object.entries(BUILDING_COORDS)) {
	console.log(`making marker for ${name} at ${coords}`);

	let marker = L.marker(coords).addTo(map);
	marker.bindPopup(`<b>${name}</b>`);

	marker.on('mouseover', (e) => {
		e.target.openPopup();
	});

	marker.on('mouseout', (e) => {
		e.target.closePopup();
	});

	marker.on('click', () => {
		window.open(`buildings/${name}/index.html`, '_self');
	});

	marker.drake_name = name;
	building_markers.push(marker);
}

map.on('click', (e) => {
	alert("you clicked the map at" + e.latlng);
});

console.log(data.filter(e => e.Type === "Printer"));
