import image1 from './assets/img-1.png';
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
        }
    })

    return btn;
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
    closeBtn.addEventListener("click", () => addTaskCont.style.display= "none");
    
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
    // descInput.required = true;
    descInput.placeholder = "Description*";
    
    const insideForm = document.createElement("div");
    insideForm.className = "inside-form";
    
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.name = "duedate";
    // dateInput.required = true;
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
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        
        const date = parseISO(dateInput.value);
        const formattedDate = format(date, "EEEE, MMMM d")

        const task = new Task(titleInput.value, descInput.value, formattedDate, hiddenInput.value);

        controller.activeProject.addTask(task);
        loadTasks(controller.activeProject, controller);

        form.reset();
        addTaskCont.remove();
    })
    
    
    priorityForm.appendChild(regBtn);
    priorityForm.appendChild(urgBtn);
    
    insideForm.appendChild(dateInput);
    insideForm.appendChild(priorityForm);
    
    form.appendChild(titleInput);
    form.appendChild(descInput);
    form.appendChild(insideForm);
    form.appendChild(hiddenInput);
    form.appendChild(submitBtn);

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


// Handling Task Form


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


export {loadProjects, loadTasks};