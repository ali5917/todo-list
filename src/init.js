import Project from "./modules/project";
import ProjectsController from "./modules/projectsController";
import Task from "./modules/task";

const init = () => {
    const controller = new ProjectsController();

    const task1 = new Task("Build", "Portfolio", "2025-04-12", "Regular");
    const task2 = new Task("Run", "Sideways", "2025-05-09", "Urgent");
    task2.toggleComplete();
    const task3 = new Task("Design", "Complete Homepage", "2025-02-12", "Regular");
    task3.toggleComplete();
    const task4 = new Task("Deploy", "Complete Footer", "2025-01-09", "Urgent");
    const task5 = new Task("Buy Ingredients", "Cinnamon", "2025-03-09", "Regular");
    const task6 = new Task("Clean Stove", "Dettol", "2025-10-24", "Regular");


    const project1 = new Project ("Web Applications");
    const project2 = new Project ("UI Fix");
    const project3 = new Project ("Make Pasta");

    project1.addTask(task1);
    project1.addTask(task2);
    project2.addTask(task3);
    project2.addTask(task4);
    project3.addTask(task5);
    project3.addTask(task6);

    controller.addProject(project1);
    controller.addProject(project2);
    controller.addProject(project3);

    return controller;
}

export default init;