// Initalize an object to store all of the global variables needed for current settings
const gridCanvas = {
    currentDimensions: 16,
    gridlines: true,
    rainbowMode: false,
    eraserMode: false,
    grids: [],
    shades: [
                "#484848",
                "#404040", 
                "#383838",
                "#303030",
                "#282828",
                "#202020",
                "#181818",
                "#101010",
                "#080808",
                "black"
            ]
};


// Function to generate a random color of the rainbow for rainbow mode
function generateRainbowColor() {
    const randomColorNum = Math.floor(Math.random() * 7);
    let randomColor = "";
    switch(randomColorNum) {
        case 0:
            randomColor = "red";
            break;
        case 1:
            randomColor = "orange";
            break;
        case 2:
            randomColor = "yellow";
            break;
        case 3:
            randomColor = "green";
            break;
        case 4:
            randomColor = "blue";
            break;
        case 5:
            randomColor = "indigo";
            break;
        case 6:
            randomColor = "violet";
            break;
    }
    return randomColor;
}

function drawGrid(numOfGrids) {
    const canvas = document.querySelector("#grid-container");
    canvas.replaceChildren(); //erases current grid

    // Canvas size should remain 480x480 pixels no matter how many grids are chosen

    const gridSize = 480 / numOfGrids; // the size each grid will need to be to fit into the 480x480 pixel area
    const totalGrids = numOfGrids * numOfGrids; //  total number of grids needed

    canvas.style["grid-template-columns"] = `repeat(${numOfGrids}, ${gridSize}px)`;

    for(let i = 0; i < totalGrids; i++) {
        const newGrid = document.createElement("div");
        newGrid.setAttribute("data-shade", "0");
        newGrid.style.cssText = `height: ${gridSize}px; width: ${gridSize}px`;
        if(gridCanvas.gridlines) { // if gridlines are turned on, add css styling w/ border, else add one without
            newGrid.classList.add("grid-unit");
        } else {
            newGrid.classList.add("grid-unit-borderless");
        }

        // draw to the canvas - if rainbow mode is on, draws random color, if erase mode is on, will reset to background color, otherwise will draw black
        newGrid.addEventListener("mouseover", () => {
            if(gridCanvas.eraserMode) {
                newGrid.style.backgroundColor = "#F0F0F0";
            } else if(gridCanvas.rainbowMode) {
                newGrid.style.backgroundColor = generateRainbowColor();
            } else if(parseInt(newGrid.getAttribute("data-shade")) < 10) {
                newGrid.setAttribute("data-shade", parseInt(newGrid.getAttribute("data-shade")) + 1);
                newGrid.style.backgroundColor = gridCanvas.shades[parseInt(newGrid.getAttribute("data-shade"))];
            }
        });
        canvas.appendChild(newGrid);
    }

    gridCanvas.grids = canvas.childNodes;
    
}

// Initialize canvas at 16x16
drawGrid(16);


function changeDimensions() {
    const newDimensions = prompt("Enter new dimensions for the grid (e.g., 16 for 16x16, 32 for 32x32, etc. Max 80)");

    // Allow the user to cancel out of prompt and continue drawing
    if (newDimensions === null) {
        return;
    }
    
     // Validate that the input is a positive integer
     if (!/^[1-9]\d*$/.test(newDimensions)) {
        alert("Invalid input. Please enter a positive integer.");
        return changeDimensions();
    }
    
    // Validate that the input is within the allowed range (<= 80)
    if (parseInt(newDimensions) > 80) {
        alert("Maximum dimensions exceeded. Please enter a number between 1 and 80.");
        return changeDimensions()
    }

    gridCanvas.currentDimensions = parseInt(newDimensions);
    gridCanvas.cursorPosition = 1;
    drawGrid(parseInt(newDimensions));

}

// Function to toggle gridlines on and off
function toggleGridlines() {
    const grids = document.querySelector("#grid-container").childNodes;

    if(gridCanvas.gridlines) {
        grids.forEach(grid => {
            grid.classList.remove("grid-unit");
            grid.classList.add("grid-unit-borderless");
        });
        gridCanvas.gridlines = false;
    } else {
        grids.forEach(grid => {
            grid.classList.remove("grid-unit-borderless");
            grid.classList.add("grid-unit");
        });
        gridCanvas.gridlines = true;
    }
}

function toggleRainbowMode() {
    if(gridCanvas.rainbowMode) {
        gridCanvas.rainbowMode = false;
        document.querySelector("#rainbow-btn").classList.remove("activated");
    } else {
        gridCanvas.rainbowMode = true;
        document.querySelector("#rainbow-btn").classList.add("activated");
    }
}

function toggleEraserMode() {
    if(gridCanvas.eraserMode) {
        gridCanvas.eraserMode = false;
        document.querySelector("#eraser-btn").classList.remove("activated");
    } else {
        gridCanvas.eraserMode = true;
        document.querySelector("#eraser-btn").classList.add("activated");
    }
}

// All button event listeners go here 

document.querySelector("#change-dimensions-btn").addEventListener("click", () => changeDimensions());

document.querySelector("#clear-btn").addEventListener("click", () => {
    drawGrid(gridCanvas.currentDimensions);
});

document.querySelector("#gridlines-btn").addEventListener("click", () => toggleGridlines());

document.querySelector("#rainbow-btn").addEventListener("click", () => toggleRainbowMode());

document.querySelector("#eraser-btn").addEventListener("click", () => toggleEraserMode());


// Key Press event listeners
document.addEventListener("keydown", function(event) {
    if(event.code === "KeyG") {
        toggleGridlines();
        return;
    }

    if(event.code === "KeyC") {
        drawGrid(gridCanvas.currentDimensions);
        return;
    }

    if(event.code === "KeyD") {
        changeDimensions();
        return;
    }

    if(event.code === "KeyR") {
        toggleRainbowMode();
        return;
    }

    if(event.code === "KeyE") {
        toggleEraserMode();
        return;
    }
});