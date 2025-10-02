let gameseq = [];
let userseq = [];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

let btns = ["yellow","red","purple","green"];

document.addEventListener("keypress", function(){
    if (!started) {
        console.log("game is started");  
        started = true;
        levelup();      
    }
});

function gameFlash(btn){
    btn.classList.add("flash"); 
    setTimeout(function(){
        btn.classList.remove("flash");   
    },250);
}

function Userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelup(){
    userseq = []; 
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);

    gameseq.push(randColor); 
    console.log("Game sequence:", gameseq);
    gameFlash(randbtn);
}

function checkAns() {
    let idx = userseq.length - 1; 

    if (userseq[idx] === gameseq[idx]) {
        console.log("same value");
      
        if (userseq.length == gameseq.length){
            setTimeout(levelup, 1000);
        }
    } else {
        console.log("different value");
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor="red";

        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        }, 150); 

        started = false;
        gameseq = [];
        userseq = [];
        level = 0;
    }
}

function btnPress(){
    let btn = this;
    Userflash(btn);

    let userColor = btn.getAttribute("id"); 
    userseq.push(userColor);
    console.log("User sequence:", userseq);
    checkAns();
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns){
    btn.addEventListener("click", btnPress);
}
