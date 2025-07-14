import "./styles.css";
import { loadProjects, loadTasks, loadUrgentTasks, renderSidebarProjects, loadUpcomingTasks } from "./dom.js";
import init from "./init.js";

const controller = init();
renderSidebarProjects(controller);

const projectsBtn = document.getElementById("projectsBtn");
projectsBtn.addEventListener("click", () => loadProjects(controller));

const urgentBtn = document.getElementById("urgentBtn");
urgentBtn.addEventListener("click", () => loadUrgentTasks(controller));

const dashboardBtn = document.getElementById("dashboardBtn");
dashboardBtn.addEventListener("click", () => loadUpcomingTasks(controller));

// loadProjects(controller.projectsList); // Temp