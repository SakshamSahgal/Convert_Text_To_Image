var width_slider = document.getElementById("width"); //getting the width slider
var height_slider = document.getElementById("height"); //getting the height slider
var canvas = document.getElementById("Output_Canvas"); //getting the canvas element
var ctx = canvas.getContext('2d'); //getting 2d instance of canvas
var car_lim = document.getElementById("char_count");
redraw_canvas();

width_slider.oninput = function() //function called when slider value changes
{
    //console.log("width changed to " + width_slider.value);
    canvas.width = width_slider.value;
    redraw_canvas();
    update_UI();
};

height_slider.oninput = function() //function called when slider value changes
{
    //console.log("width changed to " + height_slider.value);
    canvas.height = height_slider.value;
    redraw_canvas();
    update_UI();
};

function redraw_canvas()
{
    const scannedImage = ctx.getImageData(0,0,canvas.width,canvas.height); //scanning the canvas from (0,0) to (canvas.width , canvas.height) to get all pixel data
    const scannedData = scannedImage.data; //copying that image data into a 1D array 
    for(var i=0;i<scannedData.length;i+=4)
    {
        scannedData[i] = Math.floor(Math.random() * 256);
        scannedData[i+1] = Math.floor(Math.random() * 256);
        scannedData[i+2] = Math.floor(Math.random() * 256);
        scannedData[i+3] = 255;
    }

    scannedImage.data = scannedData; //overiding the pixel data
    ctx.putImageData(scannedImage,0,0); //redrawing on canvas
}

function update_UI()
{
    car_lim.innerHTML = (canvas.width)*(canvas.height)*3;
}

input_textbox.oninput = function()
{
    console.log("likhakuch"); 
};