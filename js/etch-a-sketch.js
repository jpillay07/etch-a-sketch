var gridSize = 8;//default value for grid size;
const gridWidth = 600;//grid width
const gridHeight = 600;//grid height

const etchContainer = document.querySelector(".etch-container");//reference to grid container
const gridSizeButton = document.querySelector("#grid-size-button");//reference to grid siae button
const clearButton = document.querySelector("#clear-button");//reference to grid clear button

//Event handler for clear button to clear the grid
clearButton.addEventListener("click", () => {
    clearGrid();
});

//Event handler to set the grid size by prompting user. This will also clear the grid if populated
gridSizeButton.addEventListener("click", () => {
    etchContainer.textContent = "";
    gridSize = parseInt(prompt("Enter a grid size up to 100 and greater than 0", "8"));
    if(gridSize > 0 && gridSize < 100) {
        generateGrid(gridSize);
        var allBlocks = document.querySelectorAll(".block");
        allBlocks.forEach(colorChangeOnHover);
    }else{
        alert("Please enter a grid size up to 100 and greater than 0");
    }
    
    
});

//Adds event listener to each generated block to change color on hover
function colorChangeOnHover(individualBlock){
    individualBlock.addEventListener("mouseover", () => {
        individualBlock.style.backgroundColor = giveColor(individualBlock);
    });
}

//Creates a grid without changing the grid area size
function generateGrid(setGridSize){

    for(var i = 0; i < (setGridSize*setGridSize); i++){
        var block = document.createElement("div");
        block.classList.add("block");
    
        var computedWidth = gridWidth/setGridSize;
        var computedHeight = gridHeight/setGridSize;
    
        block.style.width = computedWidth + "px";
        block.style.height = computedHeight + "px";
    
    
        etchContainer.appendChild(block);
    }

}

//Clears the grid
function clearGrid(){
    etchContainer.textContent = "";
}

//This function will color in a block if its white or darken it if it is already coloured
function giveColor(currentBlock){
    if(currentBlock.classList.contains("is-coloured")){
        return makeDarker(currentBlock);
    }
    else{
        return randomColor(currentBlock);
    }

}

//Function to generate a random hsl color
function randomColor(currentBlock){
    var h = Math.floor(Math.random() * 360);
    currentBlock.classList.add("is-coloured");
    return `hsl( ${h} , 100%, 90%)`;
}

//This function takes
function makeDarker(currentBlock){
    var hslColor = currentBlock.style.backgroundColor;
    console.log(hslColor);
    var lightness = hslColor.slice(hslColor.length - 4, hslColor.length - 2);
    var lightnessNumber = parseInt(lightness) - 10;
    console.log(lightnessNumber);
    return hslColor.replace("lightness", `${lightnessNumber}`);

}