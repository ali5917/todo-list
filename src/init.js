import Project from "./modules/project";
import ProjectsController from "./modules/projectsController";
import Task from "./modules/task";

const init = () => {
    const controller = new ProjectsController();

    const task1 = new Task ("Build", "Portfolio", "Apr 12", "Regular");
    const task2 = new Task ("Run", "Sideways", "May 9", "Urgent");
    task2.toggleComplete();
    const task3 = new Task ("Design", "Complete Homepage", "Feb 12", "Regular");
    task3.toggleComplete();
    const task4 = new Task ("Deploy", "Complete Footer", "Jan 9", "Urgent");
    const task5 = new Task ("Buy Indgredients", "Cinnamon", "March 9", "Regular");
    const task6 = new Task ("Clean Stove", "Dettol", "Oct 24", "Regular");

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