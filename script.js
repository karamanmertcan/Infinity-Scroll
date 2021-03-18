const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []

// Unsplash api
const count = 10
const apiKey = 'xUHDLvtFkl8HKn_qUPausdqxDnmUNHzQys8JLu8UeG0'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Check load

const imageLoaded = () => {
  imagesLoaded++
  if (imagesLoaded === totalImages) {
    ready = true
    loader.hidden = true
  }
}

// Helper function to set attributes

const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// Create elements for links photos add to dom

const displayPhotos = () => {
  imagesLoaded = 0
  totalImages = photosArray.length
  photosArray.forEach((photo) => {
    const item = document.createElement('a')

    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    })

    const img = document.createElement('img')

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })

    // Event listener check finished loading
    img.addEventListener('load', imageLoaded)

    //Append Elements
    item.appendChild(img)
    imageContainer.appendChild(item)
  })
}

//GET PHOTOS FROM Unsplash
const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl)
    photosArray = await response.json()
    displayPhotos()
  } catch (error) {
    console.log(error)
  }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false
    getPhotos()
    // console.log('scroll')
  }
})

getPhotos()
