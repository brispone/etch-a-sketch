//let currentDimensions = 16; // global variable to keep track of current dimensions in case canvas needs to be redrawn

const gridCanvas = {
    currentDimensions: 16,
    gridlines: true
};

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
        newGrid.addEventListener("mouseover", () => {
            newGrid.style.backgroundColor = "black";
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
    drawGrid(newDimensions);

}

document.querySelector("#change-dimensions-btn").addEventListener("click", () => changeDimensions());

document.querySelector("#clear-btn").addEventListener("click", () => {
    drawGrid(gridCanvas.currentDimensions);
});