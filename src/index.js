// Core Deliverables
// initial fetch to GET ramen restaurants' information, and most importantly to display the images across the top and then therefore add an eventListener to each image.  When an image is clicked on, to load the image, rating and comments in their respective fields
// create a new ramen after submitting and add the photograph to #ramen-menu.  It doesn't need to persist, and can be removed on page refresh, so the db.json doesn't have to be updated
// Advanced Deliverables
// Extra Advanced Deliverables

// Global Variables for fetch and Event Listener to create new Ramen
const baseUrl = "http://localhost:3000/";
let ramenId = "ramens";
const addNewRamen = document.getElementById("new-ramen");
addNewRamen.addEventListener("submit", (event)=>{
    event.preventDefault();
    createNewRamen();
})

// Initial Fetch function and invocation
// ////////////////////////////////////////////////////////////////////////////

function initialFetch(baseUrl, ramenId) {
    fetch(`${baseUrl}${ramenId}`)
        .then(response => {
            if (response.ok) {
                return results = response.json();    
            } else {
                throw error(response.statusText);
            }
        }).then (results => {
console.log(results);
            // iterate through the menu to pull each object out and pass it to the render function
            results.forEach((result)=>{
                renderRamenMenu(result);
            })
            
        })
}
// initialFetch invocation
initialFetch(baseUrl, ramenId);

// Ramen Menu render
// ////////////////////////////////////////////////////////////////////////////

function renderRamenMenu(result) {
// receive each indvidual object to pull image out and display it on DOM, and then be able to extract each key value pair when needed as well. Iteration is done to the promised db.json object so this function can be reused when adding a new ramen
    let ramenMenuDiv = document.getElementById("ramen-menu");
    let ramenImg = document.createElement("img");
    ramenImg.id = result.id;
    ramenImg.src = result.image;
    ramenImg.addEventListener("click", ()=>{
        console.log(result.id);
        renderRestDets(result);
    })
    ramenMenuDiv.appendChild(ramenImg);
}

// renderRestDets(details) function that is also used by createNewRamen function
function renderRestDets(result) {
    const ramenDetail = document.getElementById("ramen-detail");
    let detailImg = ramenDetail.querySelector(".detail-image");
    let prodName = ramenDetail.querySelector(".name");
    let restName = ramenDetail.querySelector(".restaurant");
    let rateDisplay = document.getElementById("rating-display");
    let commDisplay = document.getElementById("comment-display");

    detailImg.remove();
    detailImg = document.createElement("img");
    detailImg.className = "detail-image";
    detailImg.alt = result.name;
    detailImg.src = result.image;
    detailImg.id = result.id;
    ramenDetail.appendChild(detailImg);
    prodName.innerText = result.name;
    restName.innerText = result.restaurant;
    rateDisplay.innerText = result.rating;
    commDisplay.innerText = result.comment;

}
// invoked by eventListener on line 13 to add new Ramen object, and invokes renderRamenMenu and renderRestDets functions to display new Ramen, but does not add to the db.json yet.
function createNewRamen() {
    let newRamenName = document.getElementById("new-name").value;
    let newRestaurant = document.getElementById("new-restaurant").value;
    let newRamenImg = document.getElementById("new-image").value;
    let newRamenRate = document.getElementById("new-rating").value;
    let newRamenComm = document.getElementById("new-comment").value;
    let newRamenObj = {};

    newRamenObj.name = newRamenName;
    newRamenObj.restaurant = newRestaurant;
    newRamenObj.image = newRamenImg;
    newRamenObj.rating = newRamenRate;
    newRamenObj.comment = newRamenComm;

    renderRamenMenu(newRamenObj);
    renderRestDets(newRamenObj);
}