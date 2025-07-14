import Project from "./modules/project";
import ProjectsController from "./modules/projectsController";
import Task from "./modules/task";

const init = () => {
    const controller = new ProjectsController();

    // controller.loadFromLocal();
    // if (controller.projectsList.length > 0) return controller;

    // Initializing Tasks & Projects
    const task1 = new Task(
    "Build Authentication Flow",
    "Implement login/signup pages and token handling",
    "2025-07-20",
    "Regular"
    );

    const task2 = new Task(
    "Set Up CI/CD Pipeline",
    "Configure GitHub Actions for automated testing and deployment",
    "2025-07-16",
    "Urgent"
    );
    task2.toggleComplete();

    const task3 = new Task(
    "Design Dashboard UI",
    "Create layout and component structure for user dashboard",
    "2025-07-18",
    "Regular"
    );
    task3.toggleComplete();

    const task4 = new Task(
    "Fix Footer Responsiveness",
    "Ensure footer behaves properly on all screen sizes",
    "2025-07-22",
    "Urgent"
    );

    const task5 = new Task(
    "Create Shopping List Component",
    "Develop reusable UI for managing grocery items",
    "2025-07-25",
    "Regular"
    );

    const task6 = new Task(
    "Clean Kitchen Area",
    "Sanitize stove, counters, and sink with appropriate cleaners",
    "2025-07-27",
    "Regular"
    );

    const project1 = new Project("Web Applications");
    const project2 = new Project("UI Fix");          
    const project3 = new Project("Make Pasta");     
        
    project1.addTask(task1);
    project1.addTask(task2);
    project1.addTask(task3);

    project2.addTask(task4);

    project3.addTask(task5);
    project3.addTask(task6);

    controller.addProject(project1);
    controller.addProject(project2);
    controller.addProject(project3);

    return controller;
}

export default init;