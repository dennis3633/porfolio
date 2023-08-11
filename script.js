let words = document.querySelectorAll(".word");
words.forEach((word)=>{
    let letters = word.textContent.split("");
    word.textContent="";
    letters.forEach((letter)=>{
        let span=document.createElement("span");
        span.textContent=letter;
        span.className="letter";
        word.append(span);
    });

});
let currentWordIndex=0;
let maxWordIndex=words.length -1;
words[currentWordIndex].style.opacity="1";

let changeText=()=>{
    let currentWord=words[currentWordIndex];
    let nextWord=currentWordIndex===maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter,i)=>{
        setTimeout(()=>{
            letter.className = "letter out";
        },i*80);
        })
        nextWord.style.opacity="1";
        Array.from(nextWord.children).forEach((letter,i)=>{
            letter.className="letter behind";
            setTimeout(()=>{
                letter.className= "letter in";
            },340+i*80);
        });
        currentWordIndex=currentWordIndex === maxWordIndex ? 0 :currentWordIndex + 1;
};

changeText();
setInterval(changeText,3000)


const circles = document.querySelectorAll('.circle');
circles.forEach(elem=>{
    var dots = elem.getAttribute("data-dots");
    var marked = elem.getAttribute("data-percent");
    var percent = Math.floor(dots*marked/100);
    var points = "";
    var rotate = 360/dots;

    for(let i = 0;i < dots;i++){
        points +=`<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
    }
    elem.innerHTML = points;

    const pointsMarked=elem.querySelectorAll('.points');
    for(let i = 0; i<percent ; i++){
        pointsMarked[i].classList.add('marked')
    }
})




// mix it up portfolio section


var mixer = mixitup('.portfolio-gallery');


//active menu------------------
let menuLi=document.querySelectorAll('header ul li a');
let section=document.querySelectorAll('section');


function activeMenu(){
    let len=section.length;
    while (--len && window.scrollY + 97 < section[len].offsetTop) {}
    menuLi.forEach(sec=>sec.classList.remove("active"));
    menuLi[len].classList.add("active");

}
activeMenu();
window.addEventListener('scroll', activeMenu);



//sticky navbar/////////////////////////////////////
const header=document.querySelector("header");
window.addEventListener("scroll",function(){
    header.classList.toggle("sticky",window.scrollY > 50)
})


//toggle icon/////////////////////////////////////
let menuIcon=document.querySelector("#menu-icon");
let navlist=document.querySelector(".navlist");

menuIcon.onclick=()=>{
    menuIcon.classList.toggle("bx-x")
    navlist.classList.toggle("open");

}

window.onscroll=()=>{
    menuIcon.classList.remove("bx-x")
    navlist.classList.remove("open");
    
}


//parralax/////////////////////////////////////
const observer=new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show-items");
        }
        else{
            entry.target.classList.remove("show-items");
        }
    });
});

const scrollScale=document.querySelectorAll(".scroll-scale");
scrollScale.forEach((el)=>observer.observe(el));

const scrollBottom=document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((el)=>observer.observe(el));

const scrollTop=document.querySelectorAll(".scroll-top");
scrollTop.forEach((el)=>observer.observe(el));


const typedMessage = document.getElementById('typed-phrase');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

document.body.appendChild(canvas);

canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-1';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particleContainer = document.createElement('div');
particleContainer.style.position = 'fixed';
particleContainer.style.top = '0';
particleContainer.style.left = '0';
particleContainer.style.width = '100%';
particleContainer.style.height = '100%';
particleContainer.style.zIndex = '-2';
document.body.appendChild(particleContainer);

const phrases = [
  "innovative designs",
  "agile development",
  "creative thinking",
  "user-centric experiences",
  "cutting-edge technology",
  "problem-solving",
  "a collaborative approach"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function getRandomColor() {
  const colors = [
    "#C68642", // Tanjiro's hair color (Warm brown)
    "#2A2A2A", // Charcoal gray (Representing his charcoal seller background)
    "#EFEFEF", // Light Gray (Subtle, neutral color)
    "#5A3921"  // Dark Brown (Complementary to Tanjiro's hair color)
  ];

  return colors[Math.floor(Math.random() * colors.length)];
}

function typeMessage() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    const typedText = currentPhrase
      .substring(0, charIndex)
      .split('')
      .map(char => `<span class="bubble-letter" style="color:${getRandomColor()}">${char}</span>`)
      .join('');
    typedMessage.innerHTML = typedText;
    typedMessage.style.transform = `scale(${1 + charIndex * 0.05})`; // Scale effect on typing

    charIndex++;
  } else {
    const typedText = currentPhrase
      .substring(0, charIndex)
      .split('')
      .map(char => `<span class="bubble-letter" style="color:${getRandomColor()}">${char}</span>`)
      .join('');
    typedMessage.innerHTML = typedText;
    typedMessage.style.transform = `scale(${1 + charIndex * 0.05})`; // Scale effect on typing

    charIndex--;
  }

  if (charIndex === currentPhrase.length + 1) {
    isDeleting = true;
  }

  if (charIndex === -1 && isDeleting) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;

    // Splash animation
    const splashWords = currentPhrase.split(' ');
    const splashContainer = document.createElement('div');
    splashContainer.classList.add('splash-container');
    particleContainer.appendChild(splashContainer);

    splashWords.forEach((word, i) => {
      const splashWord = document.createElement('span');
      splashWord.textContent = word;
      splashWord.classList.add('splash-word');
      splashWord.style.animationDelay = `${i * 100}ms`;
      splashContainer.appendChild(splashWord);
    });

    setTimeout(() => {
      splashContainer.remove();
    }, 2000); // Remove splash container after 2 seconds
  }

  const typingDelay = isDeleting ? 50 : 150; // Adjust typing and deleting speed here (in milliseconds)
  const pauseTime = 1000; // Time to pause before deleting (in milliseconds)

  // Add random variation to typing and deleting speed for a more natural feel
  const randomSpeed = Math.random() * 50;
  setTimeout(typeMessage, isDeleting ? typingDelay + randomSpeed : charIndex === currentPhrase.length ? pauseTime : typingDelay + randomSpeed);
}

function animate() {
  requestAnimationFrame(animate);

  // Dynamic background color based on mouse position
  const hue = mouseX / window.innerWidth * 360;
  const backgroundColor = `hsla(${hue}, 50%, 5%, 0.7)`; // Use hsla for opacity
  document.body.style.backgroundColor = backgroundColor;
}

typeMessage();
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Fluid mouse cursor
window.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// Additional parallax effect for the particle background
window.addEventListener('mousemove', () => {
  particles.forEach((particle) => {
    const particleX = particle.x;
    const particleY = particle.y;
    const distanceX = (mouseX - particleX) * 0.05;
    const distanceY = (mouseY - particleY) * 0.05;

    particle.x += distanceX;
    particle.y += distanceY;
  });
});
