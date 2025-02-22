var map = L.map('map', {
	'center': [41.602, -93.655],
	'minZoom': 17,
	'zoom': 17,
	'maxBounds': [[41.6, -93.66], [41.605, -93.65]],
	'maxBoundsViscosity': 1,
});

const BUILDING_COORDS = {
	'Collier-Scripps': [41.603024, -93.653882],
	'Medbury': [41.602872, -93.654516],
	'Olin': [41.603626, -93.653926],
	'Science Connector Building': [41.603678, -93.654371],
	'Fitch': [41.60349, -93.654639],
}

let building_markers = [];

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

for (let [name, coords] of Object.entries(BUILDING_COORDS)) {
	console.log(`making marker for ${name} at ${coords}`);

	let marker = L.marker(coords).addTo(map);
	marker.bindPopup(`<b>Hello world!</b><br>I am ${name}.`);

	marker.on('mouseover', (e) => {
		e.target.openPopup();
	});

	marker.on('mouseout', (e) => {
		e.target.closePopup();
	});

	marker.on('click', () => {
		window.open(`buildings/${name}/index.html`);
	});

	marker.drake_name = name;
	building_markers.push(marker);
}

map.on('click', (e) => {
	alert("you clicked the map at" + e.latlng);
});

let data = JSON.parse(document.getElementById('db').textContent);
console.log(data.filter(e => e.Type === "Printer"));
