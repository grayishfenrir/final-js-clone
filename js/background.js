const images = [
    "rn3sptbj86n1zk3nl757vtd1b.jpg",
    "lhrjeipeo658k4bgs5ahycj70.jpg",
]

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.querySelector(".bgImg");
bgImage.style.backgroundImage = `url(img/${chosenImage})`

