// Initalize an object to store all of the global variables needed for current settings
const gridCanvas = {
    currentDimensions: 16,
    gridlines: true,
    rainbowMode: false,
    eraserMode: false,
    cursorPosition: 1
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
            } else newGrid.style.backgroundColor = "black";
        });

        canvas.appendChild(newGrid);
    }
    
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

    gridCanvas.currentDimensions = newDimensions;
    gridCanvas.cursorPosition = 1;
    drawGrid(newDimensions);

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
        document.querySelector("#rainbow-btn").classList.remove("btn-activated");
    } else {
        gridCanvas.rainbowMode = true;
        document.querySelector("#rainbow-btn").classList.add("btn-activated");
    }
}

function toggleEraserMode() {
    if(gridCanvas.eraserMode) {
        gridCanvas.eraserMode = false;
        document.querySelector("#eraser-btn").classList.remove("btn-activated");
    } else {
        gridCanvas.eraserMode = true;
        document.querySelector("#eraser-btn").classList.add("btn-activated");
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

/*

let animationID;
let isRightKeyPressed = false;
let isDownKeyPressed = false;
let isLeftKeyPressed = false;
let lastUpdateTime = 0;

function moveCursorRight() {
    const currentTime = Date.now();
    if (isRightKeyPressed && (currentTime - lastUpdateTime > 25 && (gridCanvas.cursorPosition === 0 || gridCanvas.cursorPosition % gridCanvas.currentDimensions != 0))) {
    animationID = requestAnimationFrame(moveCursorRight);
    const grids = document.querySelector("#grid-container").childNodes;
      gridCanvas.cursorPosition++;
      grids[gridCanvas.cursorPosition-1].style.backgroundColor = "black";
      lastUpdateTime = currentTime;
    }
}

function moveCursorLeft() {
    const currentTime = Date.now();
    if (isLeftKeyPressed && (currentTime - lastUpdateTime > 25 && (gridCanvas.cursorPosition-1) % gridCanvas.currentDimensions != 0)) {
    animationID = requestAnimationFrame(moveCursorLeft);
    const grids = document.querySelector("#grid-container").childNodes;
      gridCanvas.cursorPosition--;
      grids[gridCanvas.cursorPosition-1].style.backgroundColor = "black";
      lastUpdateTime = currentTime;
    }
}

function moveCursorDown() {
    const currentTime = Date.now();
    if (isDownKeyPressed && (currentTime - lastUpdateTime > 25 && (gridCanvas.cursorPosition <= (gridCanvas.currentDimensions * gridCanvas.currentDimensions)- gridCanvas.currentDimensions))) {
    animationID = requestAnimationFrame(moveCursorDown);
    const grids = document.querySelector("#grid-container").childNodes;
      gridCanvas.cursorPosition += gridCanvas.currentDimensions;
      grids[gridCanvas.cursorPosition-1].style.backgroundColor = "black";
      lastUpdateTime = currentTime;
    }
}

function moveCursorUp() {
    const currentTime = Date.now();
    if (isUpKeyPressed && (currentTime - lastUpdateTime > 25 && (gridCanvas.cursorPosition > gridCanvas.currentDimensions))) {
    animationID = requestAnimationFrame(moveCursorUp);
    const grids = document.querySelector("#grid-container").childNodes;
      gridCanvas.cursorPosition -= gridCanvas.currentDimensions;
      grids[gridCanvas.cursorPosition-1].style.backgroundColor = "black";
      lastUpdateTime = currentTime;
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        isLeftKeyPressed = true;
      moveCursorLeft();
    } else if (event.key === 'ArrowRight') {
        isRightKeyPressed = true;
      moveCursorRight();
    } else if (event.key === 'ArrowDown') {
        isDownKeyPressed = true;
      moveCursorDown();
    }else if (event.key === 'ArrowUp') {
        isUpKeyPressed = true;
      moveCursorUp();
    }
  });
  
  document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowRight') {
      isRightKeyPressed = false;
      cancelAnimationFrame(animationID);
    }
    if (event.key === 'ArrowDown') {
        isDownKeyPressed = false;
        cancelAnimationFrame(animationID);
      }
      if (event.key === 'ArrowLeft') {
        isLeftKeyPressed = false;
        cancelAnimationFrame(animationID);
      }
      if (event.key === 'ArrowUp') {
        isUpKeyPressed = false;
        cancelAnimationFrame(animationID);
      }
  });

  */