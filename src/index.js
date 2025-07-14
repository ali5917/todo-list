import "./styles.css";
import { loadProjects, loadTasks } from "./dom.js";

import Task from "./modules/task.js";
import init from "./init.js";

const controller = init();

const projectsBtn = document.getElementById("projectsBtn");
projectsBtn.addEventListener("click", () => loadProjects(controller));


// loadProjects(controller.projectsList); // Temp