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
};

export default ProjectsController;