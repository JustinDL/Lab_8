// store url value 
let requestURL = 'https://justindl.github.io/Lab_8/lab-8-files/products.json';

//xhr object
let request = new XMLHttpRequest();

// open new request using open method of xhr object
request.open('GET', requestURL);

// setup response type
request.responseType= 'json';

// send request 
request.send();

//!!!!!!!!!!! For creating and populating the crazy deals list
// grab elements for display purposes
let section = document.querySelector('section');
let header = document.querySelector('header');
// grabs divs for iframe players to be used to insert each entry above the correct div
let playerDiv = document.querySelectorAll('div');

// onload use json object
request.onload = function(){

    // set response into a variable
    let productInfo = request.response;

    // double check response is working
    console.log(productInfo);

    // send json object to function to create header
    fillHeader(productInfo);
    // send json object to function to display product info
    displayProducts(productInfo);

}// end onload function

// takes in json data and outputs it into the header
function fillHeader(jsonObj){

    let header1 = document.createElement('h1');

    header1.textContent = jsonObj['companyName'];

    header.appendChild(header1);

    let para = document.createElement('p');
    para.textContent = jsonObj['headOffice'] + ' ' + jsonObj['established'];
    header.appendChild(para);



}// end fillHeader function

// takes in json datga and creates a product display on the page
function displayProducts(jsonObj){

    let products = jsonObj['topDeals'];

    // loop through topdeals items
    for(let i = 0; i < products.length; i++){
        let article = document.createElement('article');
        let productName = document.createElement('h2');
        let img = document.createElement('img');
        let description = document.createElement('p');
        let price = document.createElement('p');
        let features = document.createElement('li');

        img.setAttribute('src', 'images/' + products[i].image);
        productName.textContent = products[i].name;
        description.textContent = products[i].description;
        price.textContent = products[i].price;

        let featureList = products[i].features;

        for (let j = 0; j < featureList.length; j++){

            let feature = document.createElement('li');
            feature.textContent = featureList[j];
            features.appendChild(feature);

        }// end of features for loop


        // append items to section
        
        article.appendChild(img);
        article.appendChild(productName);
        article.appendChild(price);
        article.appendChild(description);
        article.appendChild(features);

        // inserts the article created for each deal above each div in order
        // only works this way because players are hard coded in order, wish I could make it more dynamic
        section.insertBefore(article, playerDiv[i]);

        /* old append
        section.appendChild(article);
        */
        

    }// end of products for loop
    

}// end displayProducts function


// !!!!!!!!!!!!!!!!! Youtube Player API code
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";

// loads iframe player API javascript code
// documentation says most of this is for forcing async loading of API since async isn't supported everywhere? might not be needed but I guess technically this would be best in a real life scenario
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// creates the youtube player iframe, function executes as soon as aPI code downloads
// creates global variable player referring to video player
// function constructs video player object
var player;
function onYouTubeIframeAPIReady(){
    // wanted to use a varibale for videoId but couldnt figure it out
    // divs don't really need to be named 0,1,2. Old idea was to use div ID to tell the above loop where to append the articles
    //still need to figure out playerstatechange, don't fully understand it
    player = new YT.Player('0', {
        height: '390',
        width:'640',
        videoId: "QaFOp_pOyIQ",
        events: {
            'onReady' :onPlayerReady,
            'onStateChange' : onPlayerStateChange
        }// close event object
    }); // close player object
    player2 = new YT.Player('1', {
        height: '390',
        width:'640',
        videoId: "e34WAz5Yil8",
        events: {
            'onReady' :onPlayerReady,
            'onStateChange' : onPlayerStateChange
        }// close event object
    }); // close player object
    player3 = new YT.Player('2', {
        height: '390',
        width:'640',
        videoId: "P5ueJjMmBmU",
        events: {
            'onReady' :onPlayerReady,
            'onStateChange' : onPlayerStateChange
        }// close event object
    }); // close player object

} // close youtubeiframeraedy function

// API calls this function when player is ready
function onPlayerReady(e) {
    /* don't play the video for now, autoplay is cancerous.
    e.target.playVideo();
    */
}// close onplayerready function

//API calls function when players state changes
// video playing means state=1
var done = false;
function onPlayerStateChange(e) {
    if (e.data == TypeError.PlayerState.PLAYING && !done){
        setTimeout(stopVideo, 6000);
        done = true;
    }// end if statement
}// end state change function

// function to stop video player
function stopVideo(){
    player.stopVideo();
}// close stopvideo function


