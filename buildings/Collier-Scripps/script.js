const BUILDING_NAME = "Collier-Scripps Hall";

let canvas = document.getElementById("canvas");
let dropdown = document.getElementById("dropdown");

let response = await fetch("../../db/objects.json");
let data = await response.json();
data = data.filter((e) => (e.Building === BUILDING_NAME));

console.log(data);

let floors = [...new Set(data.map((e => e.Floor)))].sort();
console.log(floors);

for (let floor of floors) {
    const option = document.createElement("option");
    option.value = floor;
    option.innerText = floor;
    dropdown.appendChild(option);
}

function loadFloor() {
    const FLOOR_NAME = dropdown.value;
    console.log(FLOOR_NAME);

    // https://www.w3schools.com/html/html5_canvas.asp

    // draw image of the floor (floor plan, from Urness)

    // filter data for only POI on this floor
    let floor_data = data.filter((e) => (e.Floor === FLOOR_NAME));

    // for each object in floor_data, draw icon (find location on floor plan, draw it)

    
}

dropdown.onchange = loadFloor;
loadFloor();