import Project from "./project";
import Task from "./task";

class ProjectsController {
    constructor () {
        this.projectsList = [];
        this.activeProject = null;
    }

    addProject (project) {
        this.projectsList.push(project);
    }

    removeProject (title) {
        const index = this.projectsList.findIndex(project => title === project.title)

        if (index !== -1) {
            this.projectsList.splice(index, 1);
        }
    }

    setActiveProject (project) {
        this.activeProject = project;
    }

    saveToLocal () {
        localStorage.removeItem("projects");
        const data = JSON.stringify(this.projectsList);
        localStorage.setItem("projects", data);
    }

    loadFromLocal () {
        const data = localStorage.getItem("projects");
        if (!data) return;
        const parsedObjects = JSON.parse(data);
        this.projectsList = parsedObjects.map(thisProject => {
            const project = new Project (thisProject.title);
            thisProject.tasksList.forEach(thisTask => {
                const task = new Task(
                    thisTask.title,
                    thisTask.description,
                    thisTask.dueDate,
                    thisTask.priority
                );
                if (thisTask.completed) task.toggleComplete();
                project.addTask(task);
            });
            return project;
        });
    }

};

export default ProjectsController;