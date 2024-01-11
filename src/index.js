// Core Deliverables
// initial fetch to GET ramen restaurants' information, and most importantly to display the images across the top and then therefore add an eventListener to each image.  When an image is clicked on, to load the image, rating and comments in their respective fields
// create a new ramen after submitting and add the photograph to #ramen-menu.  It doesn't need to persist, and can be removed on page refresh, so the db.json doesn't have to be updated
// Advanced Deliverables
// Extra Advanced Deliverables


const baseUrl = "http://localhost:3000/";
let ramenId = "ramens";
// Initial Fetch
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
            results.forEach((result)=>{
                renderRamenMenu(result);
            })
            
        })
}

initialFetch(baseUrl, ramenId);

// Ramen Menu render

function renderRamenMenu(result) {
// iterate through the menu to pull image out and display it on DOM
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

function renderRestDets(result) {
    const ramenDetail = document.getElementById("ramen-detail");
    let detailImg = ramenDetail.querySelector(".detail-image");
    let prodName = ramenDetail.querySelector(".name");
    let restName = ramenDetail.querySelector(".restaurant");
    detailImg.remove();
    detailImg = document.createElement("img");
    detailImg.className = "detail-image";
    detailImg.alt = result.name;
    console.log(result.id);
    console.log(result.image);
    detailImg.src = result.image;
    detailImg.id = result.id;
    ramenDetail.appendChild(detailImg);
    console.log(detailImg.id);
}