import "./styles.css";
import { loadProjects } from "./dom.js";
import init from "./init.js";

const controller = init();

const projectsBtn = document.getElementById("projectsBtn");
projectsBtn.addEventListener("click", () => loadProjects(controller.projectsList));

