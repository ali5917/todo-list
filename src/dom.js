import image1 from './assets/img-1.png';
import Project from './modules/project';
import Task from './modules/task';
import { format, parseISO, isToday, isPast } from 'date-fns';

const contentDiv = document.querySelector(".content-section");

function createAddBtn (module, controller) {
    const btn = document.createElement("button");
    btn.classList.add("addBtn");
    btn.innerHTML = `<span class="material-symbols-outlined">add</span></button>`;
    btn.addEventListener("click", () => {
        if (module === "task") {
            loadTaskForm(controller);
        } else {
            loadProjectForm(controller);
        }
    })

    return btn;
}

// Rendering Project Form 
function loadProjectForm(controller) {
    const addProjectCont = document.createElement("div");
    addProjectCont.className = "add-proj-cont";

    const closeBtn = document.createElement("button");
    closeBtn.className = "close-btn";
    closeBtn.innerHTML = `<span class="material-symbols-outlined">collapse_content</span>`;
    closeBtn.addEventListener("click", () => addProjectCont.remove());

    const heading = document.createElement("h1");
    heading.textContent = "Add Project";

    const form = document.createElement("form");

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "projectTitle";
    titleInput.required = true;
    titleInput.placeholder = "Project Title*";

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.className = "submitBtn";
    submitBtn.textContent = "Add Project";

    form.appendChild(titleInput);
    form.appendChild(submitBtn);

    addProjectCont.appendChild(closeBtn);
    addProjectCont.appendChild(heading);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const project = new Project(titleInput.value.trim());
        controller.addProject(project);
        loadProjects(controller);

        form.reset();
        addProjectCont.remove();
    });

    addProjectCont.appendChild(form);
    document.body.appendChild(addProjectCont);
}

// Render Projects
function loadProjects (controller) { 
    contentDiv.innerHTML = "";
    
    const projectsDiv = document.createElement("div");
    projectsDiv.classList.add("projects-cont");
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

        card.addEventListener("click", () => {
            controller.activeProject = project; 
            loadTasks(project, controller);
        });

        projectsDiv.appendChild(card);
    })
    
    contentDiv.appendChild(projectsDiv);
    contentDiv.appendChild(createAddBtn("project", controller));
}

// Rendering Task Form
function loadTaskForm (controller) {
    // Create container
    const addTaskCont = document.createElement("div");
    addTaskCont.className = "add-task-cont";

    const closeBtn = document.createElement("button");
    closeBtn.className = "close-btn";
    closeBtn.innerHTML = `<span class="material-symbols-outlined">collapse_content</span>`;
    closeBtn.addEventListener("click", () => addTaskCont.remove());
    
    const heading = document.createElement("h1");
    heading.textContent = "Add Task";

    addTaskCont.appendChild(heading);
    addTaskCont.appendChild(closeBtn);

    const form = document.createElement("form");

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "title";
    titleInput.required = true;
    titleInput.placeholder = "Title*";
    
    const descInput = document.createElement("input");
    descInput.type = "text";
    descInput.name = "description";
    descInput.required = true;
    descInput.placeholder = "Description*";
    
    const insideForm = document.createElement("div");
    insideForm.className = "inside-form";
    
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.name = "duedate";
    dateInput.required = true;
    dateInput.placeholder = "Due Date*";
    
    const priorityForm = document.createElement("div");
    priorityForm.className = "priority-form";
    
    const regBtn = document.createElement("button");
    regBtn.className = "reg";
    regBtn.type = "button";
    regBtn.setAttribute("data-priority", "Regular");
    regBtn.textContent = "Regular";
    regBtn.addEventListener("click", handlePriorityBtn);
    
    const urgBtn = document.createElement("button");
    urgBtn.className = "urg";
    urgBtn.type = "button";
    urgBtn.setAttribute("data-priority", "Urgent");
    urgBtn.textContent = "Urgent";
    urgBtn.addEventListener("click", handlePriorityBtn);

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.id = "taskpriority";
    hiddenInput.name = "taskpriority";
    hiddenInput.value = "Regular";
    
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.className = "submitBtn";
    submitBtn.textContent = "Add Task";    
    
    priorityForm.appendChild(regBtn);
    priorityForm.appendChild(urgBtn);
    
    insideForm.appendChild(dateInput);
    insideForm.appendChild(priorityForm);
    
    form.appendChild(titleInput);
    form.appendChild(descInput);
    form.appendChild(insideForm);
    form.appendChild(hiddenInput);
    form.appendChild(submitBtn);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const task = new Task(titleInput.value, descInput.value, dateInput.value, hiddenInput.value);

        controller.activeProject.addTask(task);
        loadTasks(controller.activeProject, controller);

        form.reset();
        addTaskCont.remove();
    })

    addTaskCont.appendChild(form);
    document.body.appendChild(addTaskCont);
}

// Handling Task Priority Buttons
function handlePriorityBtn (e) {
    e.preventDefault();
    document.getElementById("taskpriority").value = e.target.dataset.priority;

    document.querySelectorAll(".priority-form button").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
}


// Handling Task Edit
function loadEditTaskForm(task, project, controller) {
    const editTaskCont = document.createElement("div");
    editTaskCont.className = "add-task-cont";

    const closeBtn = document.createElement("button");
    closeBtn.className = "close-btn";
    closeBtn.innerHTML = `<span class="material-symbols-outlined">collapse_content</span>`;
    closeBtn.addEventListener("click", () => editTaskCont.remove());

    const heading = document.createElement("h1");
    heading.textContent = "Edit Task";

    const form = document.createElement("form");

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "title";
    titleInput.required = true;
    titleInput.placeholder = "Title*";
    titleInput.value = task.title;

    const descInput = document.createElement("input");
    descInput.type = "text";
    descInput.name = "description";
    descInput.required = true;
    descInput.placeholder = "Description*";
    descInput.value = task.description;

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.name = "duedate";
    dateInput.required = true;
    dateInput.value = task.dueDate; 

    const priorityForm = document.createElement("div");
    priorityForm.className = "priority-form";

    const regBtn = document.createElement("button");
    regBtn.className = "reg";
    regBtn.type = "button";
    regBtn.setAttribute("data-priority", "Regular");
    regBtn.textContent = "Regular";
    regBtn.addEventListener("click", handlePriorityBtn);

    const urgBtn = document.createElement("button");
    urgBtn.className = "urg";
    urgBtn.type = "button";
    urgBtn.setAttribute("data-priority", "Urgent");
    urgBtn.textContent = "Urgent";
    urgBtn.addEventListener("click", handlePriorityBtn);

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.id = "taskpriority";
    hiddenInput.name = "taskpriority";
    hiddenInput.value = task.priority;

    if (task.priority === "Urgent") {
        urgBtn.classList.add("active");
    } else {
        regBtn.classList.add("active");
    }

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.className = "submitBtn";
    submitBtn.textContent = "Save Changes";

    form.appendChild(titleInput);
    form.appendChild(descInput);
    form.appendChild(dateInput);
    priorityForm.appendChild(regBtn);
    priorityForm.appendChild(urgBtn);
    form.appendChild(priorityForm);
    form.appendChild(hiddenInput);
    form.appendChild(submitBtn);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        task.title = titleInput.value.trim();
        task.description = descInput.value.trim();
        task.dueDate = dueDate.value;
        task.priority = hiddenInput.value;

        loadTasks(project, controller);
        editTaskCont.remove();
    });

    editTaskCont.appendChild(closeBtn);
    editTaskCont.appendChild(heading);
    editTaskCont.appendChild(form);

    document.body.appendChild(editTaskCont);
}

// Render Tasks
function createTaskCard (task, project, controller) {
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
        loadTasks(project, controller);
    });

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit");
    editBtn.innerHTML = `<span class="material-symbols-outlined">edit</span>`;
    editBtn.addEventListener("click", () => loadEditTaskForm(task, project, controller));
        
    const delBtn = document.createElement("button");
    delBtn.classList.add("del");
    delBtn.innerHTML = `<span class="material-symbols-outlined">delete</span>`;

    delBtn.addEventListener("click", () => {
        project.removeTask(task.title);
        loadTasks(project, controller);
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
    date.textContent = format(parseISO(task.dueDate), "EEEE, MMMM d");
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

function loadTasks (project, controller) {
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
            comptasksDiv.appendChild(createTaskCard(task, project, controller));
        } else {
            duetasksDiv.appendChild(createTaskCard(task, project, controller));
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
    contentDiv.appendChild(createAddBtn("task", controller));
}

function loadUrgentTasks (controller) {
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

    controller.projectsList.forEach(project => {
        project.tasksList.forEach(task => {
            if (task.priority === "Urgent") {
                if (task.completed) {
                    comptasksDiv.appendChild(createUrgentTaskCard(task, project, controller));
                } else {
                    duetasksDiv.appendChild(createUrgentTaskCard(task, project, controller));
                }
            }
        });
    });

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
}

function createUrgentTaskCard (task, project, controller) {
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
        loadUrgentTasks(controller);
    });

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit");
    editBtn.innerHTML = `<span class="material-symbols-outlined">edit</span>`;
        
    const delBtn = document.createElement("button");
    delBtn.classList.add("del");
    delBtn.innerHTML = `<span class="material-symbols-outlined">delete</span>`;

    delBtn.addEventListener("click", () => {
        project.removeTask(task.title);
        loadUrgentTasks(controller);
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
    date.textContent = format(parseISO(task.dueDate), "EEEE, MMMM d");
    const projectName = document.createElement("p");
    projectName.classList.add("proj-name");
    projectName.textContent = project.title;
    projectName.addEventListener("click", () => loadTasks(project, controller));

    insideOne.appendChild(date);
    insideOne.appendChild(projectName);
    
    cardContent.appendChild(details);
    cardContent.appendChild(insideOne);
    
    card.appendChild(icons);
    card.appendChild(cardContent);
    
    return card;
}

export {loadProjects, loadUrgentTasks};