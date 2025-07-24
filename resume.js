const pane   = document.getElementById('projectsSection');
const slider = document.getElementById('scroll');

// set slider’s max = scrollable pixels
function setSliderRange(){
  const max = pane.scrollHeight - pane.clientHeight;
  slider.max = max;               // pixel-for-pixel mapping
  slider.value = max - 10;
}


const btn       = document.getElementById('goBack');
let   threshold = window.innerHeight;     // = 100 vh right now

function toggleButton(){
  btn.classList.toggle('is-visible', window.scrollY > threshold);
}

// run on scroll …
window.addEventListener('scroll', toggleButton);
// … and also when the viewport height changes (rotate / resize)
window.addEventListener('resize', () => {
  threshold = window.innerHeight;
  toggleButton();
});

toggleButton();


//HOVERING ABT-INFO
  const card = document.getElementById('aboutCard');
  const info = document.getElementById('abt-info');

  /* keyboard + touch support */
  card.addEventListener('mouseenter', () => info.classList.add('show'));
  card.addEventListener('mouseleave', () => info.classList.remove('show'));

  /* optional: allow keyboard focus */
  card.addEventListener('focus',   () => info.classList.add('show'));
  card.addEventListener('blur',    () => info.classList.remove('show'));


document.getElementById('goBack').addEventListener('click', () => {
    window.location.href = '#home';          // or '/index.html' if you prefer
  });


  document.getElementById("menuButton").addEventListener("click", () => {
    /* toggle the effect on and off */
    document.getElementById("menuButton").style.transform = document.getElementById("menuButton").style.transform === "rotate(90deg)" ? "" : "rotate(90deg)";
    document.getElementById('navMenu').classList.toggle('show');
  });

  const quotes = [
  "Code is like poetry, it needs rhythm.",
  "Every brushstroke is a step toward mastery.",
  "Great software begins with a curious question.",
  "Fail fast, learn faster.",
  "Vision is the engine, practice is the fuel.",
  "Small commits build massive creations.",
  "Art blooms when courage meets patience.",
  "Debugging is the art of seeing the unseen.",
  "Creativity lives where logic and wonder shake hands.",
  "Refactor not to perfect code but to perfect understanding.",
  "Color outside the lines then write the tool that draws new lines.",
  "A single line of code can spark a universe of ideas.",
  "Practice is the architect of inspiration.",
  "Design with purpose test with curiosity.",
  "Keep shipping learn and refine."
];
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
document.getElementById("quoteBox").textContent = `"` + randomQuote + `"`; 
