import "./styles.css";
import { loadProjects, loadUrgentTasks, renderSidebarProjects, loadUpcomingTasks, createHeroSection, switchTab } from "./dom.js";
import init from "./init.js";

const controller = init();
renderSidebarProjects(controller);

const projectsBtn = document.getElementById("projectsBtn");
projectsBtn.addEventListener("click", () => {
    switchTab("projectsBtn");
    controller.activeProject = null;
    renderSidebarProjects(controller);
    loadProjects(controller);
});

const urgentBtn = document.getElementById("urgentBtn");
urgentBtn.addEventListener("click", () => {
    switchTab("urgentBtn");
    controller.activeProject = null;
    renderSidebarProjects(controller);
    loadUrgentTasks(controller);
});

const dashboardBtn = document.getElementById("dashboardBtn");
dashboardBtn.addEventListener("click", () => {
    switchTab("dashboardBtn");
    controller.activeProject = null;
    renderSidebarProjects(controller);
    loadUpcomingTasks(controller);
});

document.querySelector(".logo").addEventListener("click", () => {
    switchTab("dashboardBtn");
    controller.activeProject = null;
    renderSidebarProjects(controller);
    loadUpcomingTasks(controller);
})

projectsBtn.addEventListener("click", () => {
    switchTab("projectsBtn");
    controller.activeProject = null;
    renderSidebarProjects(controller);
    loadProjects(controller);
});

// Default
document.addEventListener("DOMContentLoaded", () => {
    switchTab("dashboardBtn");
    createHeroSection(controller);
    loadUpcomingTasks(controller); 
});