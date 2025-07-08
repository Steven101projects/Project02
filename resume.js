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

class Project {
    constructor(name, language, desc) {
      this.name = name;
      this.language = language;
      this.desc = desc;
    }
};

class Portfolio {
  constructor(title, projects = []) {
    this.title = title;
    this.projects = projects; // array of Project
  }

  addProject(p) {
    if (!(p instanceof Project)) {
      throw new Error("Only Project instances can be added");
    }
    this.projects.push(p);
  }
}
var ports = [];

var port1 = new Portfolio('COLLEGE ODYSSEY: ');
port1.addProject(new Project('Pokedex API',"HTML/CSS/JavaScript", "quip duis aliquip ipsum ad proident nisi do culpa eiusmod irure cillum officia quis et dolor aliquip enim officia sunt ad Lo"))

var port2 = new Portfolio('BASEMENT PROJECTS: ');
port2.addProject(new Project('Pokedex API',"HTML/CSS/JavaScript", "quip duis aliquip ipsum ad proident nisi do culpa eiusmod irure cillum officia quis et dolor aliquip enim officia sunt ad Lo"))

var port3 = new Portfolio('BUSINESS QUESTS: ');
port3.addProject(new Project('Pokedex API',"HTML/CSS/JavaScript", "quip duis aliquip ipsum ad proident nisi do culpa eiusmod irure cillum officia quis et dolor aliquip enim officia sunt ad Lo"))

ports.push(port1);
ports.push(port2);
ports.push(port3);

const portfolios = document.querySelectorAll('.projectName');
const projPanel = document.getElementById('projPreview');

for (let i = 0; i < portfolios.length; i++) {
  portfolios[i].addEventListener('click', function () {
    projPanel.textContent = '';
    createProjectCard(ports[i]);
  });
}


function createProjectCard(port) {
  const container = document.getElementById("projPreview");
  container.style.display = "inline-block";

  const projfile = document.createElement("div");
  projfile.id = "projfile";

  // Header
  const header = document.createElement("p");
  header.id = "jfheader";
  header.textContent = `${port.title}`;
  projfile.appendChild(header);

  // Line
  const line1 = document.createElement("hr");
  line1.id = "jfline";
  projfile.appendChild(line1);

  // Content wrapper
  const jfcontent = document.createElement("div");
  jfcontent.id = "jfcontent";

  const jfvisual = document.createElement("div");
  jfvisual.id = "jfvisual";

  const jfdesc = document.createElement("div");
  jfdesc.id = "jfdesc";

  const jftitle = document.createElement("div");
  jftitle.id = "jftitle";

  const titleText = document.createElement("p");
  titleText.textContent = "1. " + `${port.projects[0].name}`;

  const langText = document.createElement("p");
  langText.id = "jflang";
  langText.textContent = `${port.projects[0].language}`;

  jftitle.appendChild(titleText);
  jftitle.appendChild(langText);

  const jftext = document.createElement("p");
  jftext.id = "jftext";
  jftext.textContent = `${port.projects[0].desc}`;
  jfdesc.appendChild(jftitle);
  jfdesc.appendChild(jftext);

  jfcontent.appendChild(jfvisual);
  jfcontent.appendChild(jfdesc);

  projfile.appendChild(jfcontent);

  // Append projfile to container
  container.appendChild(projfile);

  // Line before slider
  const line2 = document.createElement("hr");
  line2.id = "jfline";
  container.appendChild(line2);

  // Slider (jfslider)
  const jfslider = document.createElement("div");
  jfslider.id = "jfslider";

  // Project container inside slider
  const projectContainer = document.createElement("div");
  projectContainer.className = "jfproject-container";

  // Create 7 project items
  for (let i = 0; i < port.projects.length; i++) {
    const item = document.createElement("div");
    item.className = "jfproject-item";
    projectContainer.appendChild(item);
  }

  // Nest container in slider, then append to container
  jfslider.appendChild(projectContainer);
  container.appendChild(jfslider);
}
