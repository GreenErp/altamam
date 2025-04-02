const heroBackground = document.querySelector('.hero-background');
const images = [
    'images/image_1.jpg',
    'images/image_2.jpg',
    'images/image_3.jpg',
    'images/image_4.jpg',
    'images/image_5.jpg'
];
let nextImageIndex = 1;
let nextimageelement = 1;
const imageElements = document.querySelectorAll('.hero-background-image');

function changeBackgroundImage() {
    const activeImage = document.querySelector('.hero-background-image.active');
    const nextImage = imageElements[nextimageelement];

    // Set the background image for the next image
    nextImage.style.backgroundImage = `url('${images[nextImageIndex]}')`;

    // Start the dissolve animation
    nextImage.classList.add('active');
    activeImage.classList.remove('active');

    // Update the indexes
    nextImageIndex = (nextImageIndex + 1) % images.length;
    nextimageelement = (nextimageelement==0)?1:0;
    console.log(`${nextimageelement}`);
}

// Set the initial background image
imageElements[0].style.backgroundImage = `url('${images[0]}')`;

setInterval(changeBackgroundImage, 3000); // Change image every 3 seconds (2s visible + 1s transition)
