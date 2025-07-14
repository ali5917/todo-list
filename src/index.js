import "./styles.css";
import { loadProjects, loadUrgentTasks, renderSidebarProjects, loadUpcomingTasks, createHeroSection } from "./dom.js";
import init from "./init.js";

const controller = init();
renderSidebarProjects(controller);

const projectsBtn = document.getElementById("projectsBtn");
projectsBtn.addEventListener("click", () => {
    controller.activeProject = null;
    renderSidebarProjects(controller);
    loadProjects(controller);
});

const urgentBtn = document.getElementById("urgentBtn");
urgentBtn.addEventListener("click", () => {
    controller.activeProject = null;
    renderSidebarProjects(controller);
    loadUrgentTasks(controller);
});

const dashboardBtn = document.getElementById("dashboardBtn");
dashboardBtn.addEventListener("click", () => {
    controller.activeProject = null;
    renderSidebarProjects(controller);
    loadUpcomingTasks(controller);
});

createHeroSection(controller);
loadUpcomingTasks(controller); // Default