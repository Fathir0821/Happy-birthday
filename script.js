/* ===================================== */
/* PAGE SWITCH */
/* ===================================== */

function showPage(id){

    document
    .querySelectorAll(".page")
    .forEach(page=>{

        page.classList.remove("active");

    });

    document
    .getElementById(id)
    .classList
    .add("active");

}

/* ===================================== */
/* PAGE 1 */
/* ===================================== */

const envelope =
document.getElementById("envelope");

const tapCounter =
document.getElementById("tapCounter");

let tapCount = 0;

envelope.addEventListener("click",()=>{

    tapCount++;

    tapCounter.textContent =
    `${tapCount} / 15`;

    envelope.classList.remove("shake");

    void envelope.offsetWidth;

    envelope.classList.add("shake");

    if(tapCount >= 15){

        setTimeout(()=>{

            showPage("page2");

            document
            .querySelector(".pw-box")
            .focus();

        },500);

    }

});

/* ===================================== */
/* PASSWORD */
/* ===================================== */

const pwBoxes =
document.querySelectorAll(".pw-box");

pwBoxes.forEach((box,index)=>{

    box.addEventListener("input",()=>{

        box.value =
        box.value.replace(/[^0-9]/g,'');

        if(
            box.value &&
            index < pwBoxes.length-1
        ){

            pwBoxes[index+1].focus();

        }

    });

    box.addEventListener("keydown",(e)=>{

        if(
            e.key === "Backspace" &&
            box.value === "" &&
            index > 0
        ){

            pwBoxes[index-1].focus();

        }

    });

});

/* ===================================== */
/* POPUP */
/* ===================================== */

const popup =
document.getElementById("popupOverlay");

document
.getElementById("closePopup")
.addEventListener("click",()=>{

    popup.style.display = "none";

});

/* ===================================== */
/* CHECK PASSWORD */
/* ===================================== */

document
.getElementById("enterBtn")
.addEventListener("click",()=>{

    let password = "";

    pwBoxes.forEach(box=>{

        password += box.value;

    });

    if(password === "61411"){

        showPage("page3");

        startCountdown();

        createBalloons();

        startFireworks();

    }

    else{

        popup.style.display = "flex";

    }

});

/* ===================================== */
/* COUNTDOWN */
/* ===================================== */

const musicBtn =
document.getElementById("musicBtn");

const countdownText =
document.getElementById("countdownText");

function startCountdown(){

    let seconds = 30;

    countdownText.textContent =
    `Tombol akan aktif dalam ${seconds} detik`;

    const timer =
    setInterval(()=>{

        seconds--;

        countdownText.textContent =
        `Tombol akan aktif dalam ${seconds} detik`;

        if(seconds <= 0){

            clearInterval(timer);

            musicBtn.disabled = false;

            countdownText.textContent =
            "Siap diputar 🎵";

        }

    },1000);

}

/* ===================================== */
/* MUSIC BUTTON */
/* ===================================== */

musicBtn.addEventListener("click",()=>{

    showPage("page4");

    const video =
    document.getElementById(
        "birthdayVideo"
    );

    video.play();

});

/* ===================================== */
/* BALLOON SYSTEM */
/* ===================================== */

function createBalloons(){

    const container =
    document.getElementById(
        "balloonContainer"
    );

    const colors = [

        "#ff006e",
        "#ffbe0b",
        "#3a86ff",
        "#06d6a0",
        "#fb5607",
        "#8338ec"

    ];

    for(let i=0;i<8;i++){

        const balloon =
        document.createElement("div");

        balloon.className =
        "balloon";

        balloon.style.background =
        colors[
            Math.floor(
                Math.random()*
                colors.length
            )
        ];

        balloon.style.left =
        Math.random()*100 + "%";

        balloon.style.bottom =
        (-200 - Math.random()*300)
        + "px";

        balloon.style.animation =
        `balloonFloat ${
            12 + Math.random()*8
        }s linear infinite`;

        balloon.style.animationDelay =
        `${Math.random()*6}s`;

        container.appendChild(balloon);

    }

}

/* ===================================== */
/* BALLOON ANIMATION */
/* ===================================== */

const balloonStyle =
document.createElement("style");

balloonStyle.innerHTML = `

@keyframes balloonFloat{

0%{

transform:
translateY(0);

opacity:0;

}

10%{

opacity:1;

}

100%{

transform:
translateY(-140vh);

opacity:0;

}

}

`;

document.head.appendChild(
    balloonStyle
);

/* ===================================== */
/* FIREWORKS */
/* ===================================== */

function startFireworks(){

    const canvas =
    document.getElementById(
        "fireworksCanvas"
    );

    const ctx =
    canvas.getContext("2d");

    canvas.width =
    window.innerWidth;

    canvas.height =
    window.innerHeight;

    const particles = [];

    class Particle{

        constructor(x,y,color){

            this.x = x;
            this.y = y;

            this.color =
            color;

            this.radius =
            Math.random()*3+1;

            this.speedX =
            (Math.random()-0.5)*8;

            this.speedY =
            (Math.random()-0.5)*8;

            this.life = 100;

        }

        update(){

            this.x +=
            this.speedX;

            this.y +=
            this.speedY;

            this.life--;

        }

        draw(){

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.radius,
                0,
                Math.PI*2
            );

            ctx.fillStyle =
            this.color;

            ctx.fill();

        }

    }

    function createFirework(){

        const x =
        Math.random()*canvas.width;

        const y =
        Math.random()*
        canvas.height*0.5;

        const color =
        `hsl(
        ${Math.random()*360},
        100%,
        60%
        )`;

        for(let i=0;i<80;i++){

            particles.push(

                new Particle(
                    x,
                    y,
                    color
                )

            );

        }

    }

    function animate(){

        requestAnimationFrame(
            animate
        );

        ctx.fillStyle =
        "rgba(0,0,0,0.15)";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        for(
            let i=
            particles.length-1;
            i>=0;
            i--
        ){

            particles[i]
            .update();

            particles[i]
            .draw();

            if(
                particles[i]
                .life <= 0
            ){

                particles.splice(i,1);

            }

        }

    }

    animate();

    setInterval(()=>{

        createFirework();

    },700);

}

/* ===================================== */
/* RESIZE */
/* ===================================== */

window.addEventListener(
    "resize",
    ()=>{

        const canvas =
        document.getElementById(
            "fireworksCanvas"
        );

        canvas.width =
        window.innerWidth;

        canvas.height =
        window.innerHeight;

    }
);