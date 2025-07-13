import "./styles.css";
import ProjectsController from './modules/projectsController.js';
import Project from './modules/project.js';
import Task from './modules/task.js';
    
const controller = new ProjectsController();
const project1 = new Project ("Web Applications");
const task1 = new Task ("Design", "Complete Homepage", "April 12", "Medium");
project1.addTask(task1);
controller.addProject(project1);

document.getElementById("projectsBtn").addEventListener("click", () => {
    const projectsDiv = document.querySelector(".projects-cont");
    projectsDiv.innerHTML = "";
    controller.projectsList.forEach(project => {
        const card = document.createElement("div");
        card.classList.add("card");
        const title = document.createElement("p");
        title.classList.add("title");
        title.textContent = project.title;
        const count = document.createElement("p");
        count.textContent = `Tasks added: ${project.tasksList.length}`;
        card.appendChild(title);
        card.appendChild(count);
        projectsDiv.appendChild(card);
    })
});