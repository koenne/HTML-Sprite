//Any questions about this script? Contact me on Discord: koenne#2625

//Add all variables
var imageheight = null;
var imagewidth = null;
var random = Math.floor(Math.random() * characters.length);
var tID;
var elementExists = document.getElementById("sprite-information");
var checkingsss = 0;
var height = null;
var frames = 32;
//Checks if the div exists where the image will be
if(document.getElementById("image") == null)
{
    //If it doesn't exist, it'll create one.
    var creatediv = document.createElement("DIV");
    creatediv.setAttribute("id", "image");
    document.body.appendChild(creatediv);
}

//Here it loads the image info
const imageinfo = (url) =>{   
    var img = new Image();
    img.src = url + '.png';
    img.onload = function(){
        //The height and width gets saved
        //The height gets used to set the sprite animation right
        imageheight = this.height;
        imagewidth = this.width;
        height = imageheight / 4 * 2;
        frames = imagewidth / 3;
    };

}

//Get a random image from the array "characters"
//This array was inserted through 'dir.php' because php can easily read files in a folder
const getRandomImage = (imgAr, path) =>
{
    imgAr = imgAr || characters;
    path = path || 'sprites/';
    var img = imgAr[random] + '.png';
//Set the random image as the image in the <img> tag
    if(elementExists != null){
        document.getElementById("imageChar").src = path + img;
    }
    document.getElementById("image").style.background = `url(${path + img})`;
    imageinfo(`sprites/${characters[random]}`);
    document.getElementById("image").style.backgroundPosition = 
    `32px ${height}px`; 
}

//Animates the script
const animateScript = () =>
{
    imageinfo(`sprites/${characters[random]}`);
    var    position = 0; //With how much pixels the pictures moves
    const  interval = 550; //In how many ms the image moves
    const  diff = frames; //The difference in pixels each frame
    tID = setInterval ( () => { //This activates everytime the interval amount reaches (aka 250ms)
        document.getElementById("image").style.backgroundPosition = 
        `-${position}px ${height}px`; 
        if (position < 160) //If the end of the image is not reached it adds 90px further
            { position = position + diff;}
            else //If the end of the image is reached, it resets the image position
            { position = 32; }
        }
    , interval );
    
}

const start = () =>{
    let start = Date.now(); //Sets the startime

    let timer = setInterval(function() 
    {
        let timePassed = Date.now() - start; //Checks how much time has been passed in total
        var amount = timePassed / 550 + -10;
        if (amount >= 100) // When the timer reaches 100 it resets
        {
          start = Date.now();

          random = Math.floor(Math.random() * characters.length); //Get a new random image
          getRandomImage()
        }
        draw(timePassed); 
    }, 20);
}  

//Animates the script over the screen
const draw = (timePassed) => {
    //A formula that slides the image across the screen. If you want to make it slower, increase the '550' and if faster decrease the '550'
    var amount = timePassed / 550 + -10 + '%';
    image.style.left = amount;
    if(elementExists != null){
        document.getElementById("time").innerHTML="Time: " + timePassed;
        document.getElementById("amount").innerHTML="Amount: " + parseInt(amount).toFixed(0);
        document.getElementById("height").innerHTML="Height: " + imageheight;
        document.getElementById("width").innerHTML="Width: " + imagewidth;
        document.getElementById("character").innerHTML="Character: " + characters[random].split(".")[0];
        document.getElementById("number").innerHTML="Random number: " + random;
    }
        
}

const stopAnimate = () => {
clearInterval(tID);
}

const show = () =>{
    if(checkingsss == 0)
    {
        document.getElementById('sprite-information').style.display = 'none';
        checkingsss++;
    }
    else{
        document.getElementById('sprite-information').style.display = 'block';
        checkingsss = 0;
    }

}
if(elementExists != null){
    show();
}

//Start time
imageinfo(`sprites/${characters[random]}`);
animateScript();
start();
getRandomImage(characters, 'sprites/');