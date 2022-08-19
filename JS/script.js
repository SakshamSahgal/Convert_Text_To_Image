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
    car_lim.innerHTML = (canvas.width)*(canvas.height)*4;
}

function encode_on_canvas(code_array) //function that encodes the image with the ascii data that is passed to it
{
    
    const scannedImage = ctx.getImageData(0,0,canvas.width,canvas.height); //scanning the canvas from (0,0) to (canvas.width , canvas.height) to get all pixel data
    const canvas_pixel_array = scannedImage.data; //copying that image data into a 1D array 
    var len = Math.min(canvas_pixel_array.length,code_array.length); //setting the max len of array to cut the message if it exceeds the char limit
    for(var i=0;i<len;i++)
        canvas_pixel_array[i] = code_array[i]; //copying the text Ascii codes to pixel data

    if(code_array.length < canvas_pixel_array.length)
        canvas_pixel_array[code_array.length] = 0; //setting a deliminator to end the message
        
    scannedImage.data = canvas_pixel_array; //overiding the pixel data
    ctx.putImageData(scannedImage,0,0); //redrawing on canvas
}


input_textbox.oninput = function() //function called when data in textbox changes
{
    var text = document.getElementById("input_textbox").value; //extracting the value of text
    console.log(text); 
    var code_array = new Array(); // Array that stores all the ASCII values of the text inputed
    for(var i=0;i<text.length;i++)
    {
        var ascii = text.charCodeAt(i);
        console.log(ascii);
        code_array.push(ascii); //pushing the ascii codes of each character into a code_array
    }
    encode_on_canvas(code_array);
};