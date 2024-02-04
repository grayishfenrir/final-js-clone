const images = [
    "rn3sptbj86n1zk3nl757vtd1b.jpg",
    "lhrjeipeo658k4bgs5ahycj70.jpg",
    "m2noos3oot7qo3u9r6907p0kb.jpg",
    "lesbc6pcb18m7h7si9a9q2kj7.jpg",
]

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.querySelector(".bgImg");
bgImage.style.backgroundImage = `url(img/${chosenImage})`

