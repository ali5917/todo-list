// Render Projects
function loadProjects (projects) { 
    const projectsDiv = document.createElement("div");
    projectsDiv.classList.add("projects-cont");
    projectsDiv.innerHTML = "";
    projects.forEach(project => {
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
    
    document.querySelector(".content-section").appendChild(projectsDiv);
}


export {loadProjects};