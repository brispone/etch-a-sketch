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
            newGrid.style.transition = "0s";
        });

        newGrid.addEventListener("mouseleave", () => {
            newGrid.style.backgroundColor = "white";
            newGrid.style.transition = "1.3s";
        });
        canvas.appendChild(newGrid);
    }
    
}

drawGrid(16);

function changeDimensions() {
    const newDimensions = prompt("Enter new dimensions for the grid (e.g., 16 for 16x16, 32 for 32x32, etc. Max 100)");
    
     // Validate that the input is a positive integer
     if (!/^[1-9]\d*$/.test(newDimensions)) {
        alert("Invalid input. Please enter a positive integer.");
        return changeDimensions();
    }
    
    // Validate that the input is within the allowed range (<= 100)
    if (parseInt(newDimensions) > 100) {
        alert("Maximum dimensions exceeded. Please enter a number between 1 and 100.");
        return changeDimensions()
    }

    drawGrid(newDimensions);

}

document.querySelector("#change-dimensions-btn").addEventListener("click", () => changeDimensions());