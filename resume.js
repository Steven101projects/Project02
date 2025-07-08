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
