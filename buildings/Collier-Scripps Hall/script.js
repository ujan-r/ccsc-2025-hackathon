const BUILDING_NAME = "Collier-Scripps Hall";

let canvas = document.getElementById("canvas");
let dropdown = document.getElementById("dropdown");

let response = await fetch("../../db/objects.json");
let data = await response.json();
data = data.filter((e) => (e.Building === BUILDING_NAME));

console.log(data);

let floors = [...new Set(data.map((e => e.Floor)))].sort();
console.log(floors);

let gIcons = {
    "printer"   : { "path": "/icons/Printer.png",           "img": null, "load": false },
    "fridge"    : { "path": "/icons/Fridge.png",            "img": null, "load": false },
    "microwave" : { "path": "/icons/Microwave.png",         "img": null, "load": false },
    "sink"      : { "path": "/icons/Sink.png",              "img": null, "load": false },
    "fountain"  : { "path": "/icons/WaterBottleFiller.png", "img": null, "load": false }
};

for (let floor of floors) {
    const option = document.createElement("option");
    option.value = floor;
    option.innerText = floor;
    dropdown.appendChild(option);
}

for (let iconName in gIcons) {
    let icon = gIcons[iconName];
    let iconImage = new Image();
    iconImage.src = icon.path;
    
    icon.img = iconImage;
    
    iconImage.onload = function(e) {
        icon.load = true;
    };
}

function loadFloor() {
    const FLOOR_NAME = dropdown.value;
    console.log("Selected Floor:", FLOOR_NAME);

    const ctx = canvas.getContext("2d");

    const floorImage = new Image();
    let encodedFloorName = FLOOR_NAME.replace(/\s+/g, '%20');

    floorImage.src = `floorplans/${encodedFloorName}.png`;
    console.log(floorImage.src)

    canvas.width = 1200;
    canvas.height = 700;
    floorImage.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(floorImage, 0, 0, canvas.width, canvas.height); 
    };

    let floor_data = data.filter((e) => e.Floor === FLOOR_NAME);

    canvas.onclick = null;
    
    console.log("POIs on this floor:", floor_data);
    
}

dropdown.onchange = loadFloor;
loadFloor();