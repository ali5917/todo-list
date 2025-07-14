import image1 from './assets/img-1.png';

const contentDiv = document.querySelector(".content-section");

function createAddBtn () {
    const btn = document.createElement("button");
    btn.classList.add("addBtn");
    btn.innerHTML = `<span class="material-symbols-outlined">add</span></button>`;
    return btn;
}

// Render Projects
function loadProjects (projects) { 
    contentDiv.innerHTML = "";
    
    const projectsDiv = document.createElement("div");
    projectsDiv.classList.add("projects-cont");
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

        card.addEventListener("click", () => loadTasks(project));

        projectsDiv.appendChild(card);
    })
    
    contentDiv.appendChild(projectsDiv);
    contentDiv.appendChild(createAddBtn());
}

// Render Tasks

function createTaskCard (task, project) {
    const card = document.createElement("div");
    card.classList.add("card");
        
    const icons = document.createElement("div");
    icons.classList.add("icons");

        
    const setBtn = document.createElement("button");
    setBtn.classList.add("set");
    if (task.completed) {
        setBtn.innerHTML = `<span class="material-symbols-outlined">select_check_box</span>`;
    } else {
        setBtn.innerHTML = `<span class="material-symbols-outlined">check_box_outline_blank</span>`;
    }

    setBtn.addEventListener("click", () => {
        task.toggleComplete();
        loadTasks(project);
    });

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit");
    editBtn.innerHTML = `<span class="material-symbols-outlined">edit</span>`;
        
    const delBtn = document.createElement("button");
    delBtn.classList.add("del");
    delBtn.innerHTML = `<span class="material-symbols-outlined">delete</span>`;

    delBtn.addEventListener("click", () => {
        project.removeTask(task.title);
        loadTasks(project);
    })

    icons.appendChild(setBtn);
    icons.appendChild(editBtn);
    icons.appendChild(delBtn);

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");
        
    const details = document.createElement("div");
    details.classList.add("details");
    const title = document.createElement("p");
    title.classList.add("title");
    title.textContent = task.title;
    const description = document.createElement("p");
    description.classList.add("description");
    description.textContent = task.description;

    details.appendChild(title);
    details.appendChild(description);
    
    const insideOne = document.createElement("div");
    insideOne.classList.add("inside-one");
    const date = document.createElement("p");
    date.classList.add("date");
    date.textContent = task.dueDate;
    const priority = document.createElement("p");
    priority.classList.add("priority");
    priority.textContent = task.priority;

    task.priority === "Urgent" ? priority.classList.add("urgent") :priority.classList.add("regular");   

    insideOne.appendChild(date);
    insideOne.appendChild(priority);
    
    cardContent.appendChild(details);
    cardContent.appendChild(insideOne);
    
    card.appendChild(icons);
    card.appendChild(cardContent);
    
    return card;
}

function loadTasks (project) {
    contentDiv.innerHTML = "";

    const tasksSection = document.createElement("div");
    tasksSection.classList.add("tasks-section");
    
    const duetasksDiv = document.createElement("div");
    duetasksDiv.classList.add("tasks-cont");
    const head1 = document.createElement("h1");
    head1.classList.add("head");
    head1.textContent = "Due Tasks";
    
    const comptasksDiv = document.createElement("div");
    comptasksDiv.classList.add("tasks-cont");
    const head2 = document.createElement("h1");
    head2.classList.add("head");
    head2.textContent = "Completed Tasks";
    
    
    tasksSection.appendChild(head1);
    tasksSection.appendChild(duetasksDiv);
    tasksSection.appendChild(head2);
    tasksSection.appendChild(comptasksDiv);

    project.tasksList.forEach(task => {
        if (task.completed) {
            comptasksDiv.appendChild(createTaskCard(task, project));
        } else {
            duetasksDiv.appendChild(createTaskCard(task, project));
        }
    })

    const emptyImg = document.createElement("img");
    emptyImg.classList.add("empty");
    emptyImg.src = image1;
    
    if (duetasksDiv.innerHTML == "") {
        duetasksDiv.appendChild(emptyImg);
    } 
    if (comptasksDiv.innerHTML == "") {
        comptasksDiv.appendChild(emptyImg);
    }

    contentDiv.appendChild(tasksSection);   
    contentDiv.appendChild(createAddBtn());
}


export {loadProjects};