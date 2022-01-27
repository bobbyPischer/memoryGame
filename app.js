//grab a couple of things

const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span')
let playerLives = 6;


// link text

playerLivesCount.textContent = playerLives;

// Generate data
const getData = () => [
    {imgSrc: "./images/Bowden.jpg", name: "Bowden"},
    {imgSrc: "./images/Evola.jpg", name: "Evola"},
    {imgSrc: "./images/hoppe.jpg", name: "Hoppe"},
    {imgSrc: "./images/keith.jpg", name: "Keith"},
    {imgSrc: "./images/mises.jpg", name: "Mises"},
    {imgSrc: "./images/Moldbug.jpg", name: "Moldbug",},
    {imgSrc: "./images/nietzsche.jpg", name: "Nietzsche,"},
    {imgSrc: "./images/Schmitt.jpg", name: "Schmitt"},
    {imgSrc: "./images/Bowden.jpg", name: "Bowden"},
    {imgSrc: "./images/Evola.jpg", name: "Evola"},
    {imgSrc: "./images/hoppe.jpg", name: "Hoppe"},
    {imgSrc: "./images/keith.jpg", name: "Keith"},
    {imgSrc: "./images/mises.jpg", name: "Mises"},
    {imgSrc: "./images/Moldbug.jpg", name: "Moldbug",},
    {imgSrc: "./images/nietzsche.jpg", name: "Nietzsche,"},
    {imgSrc: "./images/Schmitt.jpg", name: "Schmitt"},

];

// Randmoize

const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5)
    return cardData;
}

// Card generator function
const cardGenerator = () => {
    const cardData = randomize();
    //Generate HTML

    cardData.forEach(item => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";
        //Attach info to cards
        face.src = item.imgSrc;
        card.setAttribute('name', item.name)
        
        
        //Attach cards to section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);
        
        card.addEventListener("click", (e) => {
            card.classList.toggle("toggleCard");
            checkCards(e);
        });

    });

};
//Check cards
const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll(".toggleCard");
    console.log(flippedCards)
    //Logic
    if(flippedCards.length === 2) {
        if ( 
            flippedCards[0].getAttribute('name') === 
            flippedCards[1].getAttribute('name')
        ) {
            console.log("match")
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            })
        } else {
            console.log("wrong");
            flippedCards.forEach(card => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggleCard"), 1000);

            });

            playerLives--;
            playerLivesCount.textContent = playerLives;
            if(playerLives === 0) {
                restart("Not based enough. Drag queen story hour awaits you and your children");
            }
        }
    }
    //Check if game is won
    if(toggleCard.length === 16) {
        restart("Welcome Brother");
    }
};

//Restart
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none";
    cardData.forEach((item, index) => {
        cards[index].classList.remove("toggleCard");
        //randomize
        setTimeout(() => {
        cards[index].style.pointerEvents = "all";
        faces[index].src = item.imgSrc;
        cards[index].setAttribute("name", item.name);
        section.style.pointerEvents = "all";
        }, 1000);

    });

    playerLives = 6;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100)
}

cardGenerator(); 