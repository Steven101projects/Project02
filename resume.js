const pane   = document.getElementById('projectsSection');
const slider = document.getElementById('scroll');

// set slider’s max = scrollable pixels
function setSliderRange(){
  const max = pane.scrollHeight - pane.clientHeight;
  slider.max = max;               // pixel-for-pixel mapping
  slider.value = max - 10;
}

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
  