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


// scroll pane when user drags the slider
slider.addEventListener('input', () => {
  pane.scrollTop = slider.max - slider.value;
});

// move slider when user scrolls the wheel / touchpad
pane.addEventListener('scroll', () => {
    slider.value = slider.max - pane.scrollTop;
});

// keep things in sync on load & when window resizes
setSliderRange();
window.addEventListener('resize', setSliderRange);

document.getElementById('goBack').addEventListener('click', () => {
    window.location.href = '#home';          // or '/index.html' if you prefer
  });
  