class Project {
    constructor (title) {
        this.title = title;
        this.tasksList = [];
    }

    addTask (task) {
        this.tasksList.push(task);
        
    }

    removeTask (title) {
        const index = this.tasksList.findIndex(task => task.title === title);

        if (index !== -1) {
            this.tasksList.splice(index, 1);
        }
    }

    clearTasks () {
        this.tasksList = [];      
        this.tasksCount = 0;  
    }
}

export default Project;