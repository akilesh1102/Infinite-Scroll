const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = [];
let ready = false
let imagesLoaded = 0
let totalImages = 0



// unsplash api
const count = 30
const apikey = "lxmRuUuuHvrom-1rKBMEU5QlHLAN9DD1oujJez12IKQ"
const apiurl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`

function imageLoaded() {
    imagesLoaded++
    if (imagesLoaded === totalImages) {
        
        ready = true

    }
}
// helper fucntion to achieve dry

// function setAttributes(element, attributes) {
//     for (const key in attributes) {
//         element.setAttribute(key, attributes[key])
//     }
// }

// create ele for links and pics and add to DOM

function displaypics() {
    imagesLoaded = 0
    totalImages = photosArray.length
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a')
        item.setAttribute('href', photo.links.html)
        item.setAttribute('target', '_blank')
        // setAttributes(item, {
        //     href: photo.links.html,
        //     target: '_blank'
        // })
        // create <img> for pic
        const img = document.createElement('img')
        img.setAttribute('src', photo.urls.regular)
        img.setAttribute('alt', photo.alt_description)
        img.setAttribute('title', photo.alt_description)

        img.addEventListener('load', imageLoaded);
        item.appendChild(img)
        imageContainer.appendChild(item)
    });
}



// get pics from api

async function getPhotos() {
    try {
        const response = await fetch(apiurl)
        photosArray = await response.json()
        displaypics()

    } catch (error) {
        console.log("OOPS error occured")
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos()

    }
})

getPhotos()