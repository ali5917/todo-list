import "./styles.css";
import { loadProjects, loadTasks, loadUrgentTasks } from "./dom.js";
import init from "./init.js";

const controller = init();

const projectsBtn = document.getElementById("projectsBtn");
projectsBtn.addEventListener("click", () => loadProjects(controller));

const urgentBtn = document.getElementById("urgentBtn");
urgentBtn.addEventListener("click", () => loadUrgentTasks(controller));


// loadProjects(controller.projectsList); // Temp