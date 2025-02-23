const BUILDING_NAME = "Collier-Scripps Hall";

// ----- icon render parameters
const ICON_WIDTH  = 16;
const ICON_HEIGHT = 16;

let canvas = document.getElementById("canvas");
let dropdown = document.getElementById("dropdown");

let response = await fetch("../../db/objects.json");
let data = await response.json();
data = data.filter((e) => (e.Building === BUILDING_NAME));

console.log(data);

let floors = [...new Set(data.map((e => e.Floor)))].sort();
console.log(floors);

let gIcons = {
    "Printer"            : { "type" : "Printer",            "path": "/icons/Printer.png",           "img": null, "load": false },
    "Fridge"             : { "type" : "Fridge",             "path": "/icons/Fridge.png",            "img": null, "load": false },
    "Microwave"          : { "type" : "Microwave",          "path": "/icons/Microwave.png",         "img": null, "load": false },
    "Sink"               : { "type" : "Sink",               "path": "/icons/Sink.png",              "img": null, "load": false },
    "Drinking Fountain"  : { "type" : "Drinking Fountain",  "path": "/icons/WaterBottleFiller.png", "img": null, "load": false }
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

    let floor_data = data.filter((e) => e.Floor === FLOOR_NAME);
    
    canvas.width = 1200;
    canvas.height = 700;
    floorImage.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(floorImage, 0, 0, canvas.width, canvas.height); 
        
        for (let obj of floor_data) {
            if (obj.MapPos.length >= 2) {
                let posX = Math.round(obj.MapPos[0] * canvas.width);
                let posY = Math.round(obj.MapPos[1] * canvas.height);
                
                let icon = gIcons[obj.Type];
                if (icon && icon.img && icon.load) {
                    ctx.fillStyle = "#000000";
                    ctx.fillRect(posX - ICON_WIDTH/2 - 1, posY - ICON_HEIGHT/2 - 1, ICON_WIDTH+2, ICON_HEIGHT+2);
                    ctx.drawImage(icon.img, posX - ICON_WIDTH/2, posY - ICON_HEIGHT/2, ICON_WIDTH, ICON_HEIGHT);
                }
            }
        }
    };

    

    canvas.onclick = null;
    
    console.log("POIs on this floor:", floor_data);
    
}

dropdown.onchange = loadFloor;
loadFloor();
