import "./styles.css";
import { loadProjects, loadUrgentTasks, renderSidebarProjects, loadUpcomingTasks, createHeroSection } from "./dom.js";
import init from "./init.js";

const controller = init();
renderSidebarProjects(controller);

const projectsBtn = document.getElementById("projectsBtn");
projectsBtn.addEventListener("click", () => loadProjects(controller));

const urgentBtn = document.getElementById("urgentBtn");
urgentBtn.addEventListener("click", () => loadUrgentTasks(controller));

const dashboardBtn = document.getElementById("dashboardBtn");
dashboardBtn.addEventListener("click", () => loadUpcomingTasks(controller));



loadUpcomingTasks(controller); // Default
createHeroSection(controller);