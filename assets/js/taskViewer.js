/**
 * Task viewer manager
 * 
 * @author Pierre HUBERT
 */

var TaskViewer = {
    /**
     * Angular material element
     */
    angularMaterialElem: {},

    /**
     * Show a confirm dialog (Angular Material design dialog)
     * 
     * @param {String} dialogTitle The title of the dialog
     * @param {String} dialogText The text in the dialog
     * @param {String} confirmButtonText The text of the confirm button
     * @param {String} cancelButtonText The text of the cancel button
     * @param {function} nextAction What to do once confirmed
     * @param {function} cancelAction What to do if canceled
     */
    confirmDialog: function(dialogTitle, dialogText, confirmButtonText, cancelButtonText, nextAction, cancelAction){
        //Create confirm dialog
        var confirm = TaskViewer.angularMaterialElem.confirm()
            .title(dialogTitle)
            .textContent(dialogText)
            .ok(confirmButtonText)
            .cancel(cancelButtonText);

        //Show confirm dialog
        TaskViewer.angularMaterialElem.show(confirm).then(nextAction, cancelAction);
    },


    /**
     * Show the list of existings tasks
     */
    refreshTasksList: function(){
        //Get task list
        var taskList = Task.retrieveExistingTasks();

        //Get task container and empty it
        var taskContainer = document.getElementById("taskList");
        taskContainer.innerHTML = "";

        //Process each task
        for(i in taskList){
            //Create a row
            var elemRow =  document.createElement("tr");

                //Name cell
                var nameCell = document.createElement("td");
                nameCell.innerHTML = taskList[i].name;
                nameCell.className="nameCell";
                elemRow.appendChild(nameCell);

                //Delete task cell
                var deleteCell = document.createElement("td");
                deleteCell.className = "deleteCell";

                    //Delete button
                    var deleteButton = document.createElement("span");
                    deleteButton.innerHTML = "DELETE";

                        //Change button behavior
                        deleteButton.setAttribute("data-taskID", i);
                        deleteButton.onclick = (function(){
                            //Retrieve task ID
                            var taskID = this.getAttribute("data-taskID");

                            //Show confirm dialog
                            TaskViewer.confirmDialog(
                                "Do you want to delete this task ?",
                                "This operation can't be reverted !",
                                "YES", "NO",
                                
                                //Confirm action
                                (function(){
                                    TaskViewer.handleTaskDeletion(taskID);
                                }),

                                //Cancel action (nothing)
                                (function(){})
                            );
                        });

                    //Apply button
                    deleteCell.appendChild(deleteButton);

            elemRow.appendChild(deleteCell);

            //Apply new row
            taskContainer.appendChild(elemRow);
        }
    },


    /**
     * Handle task addition
     * 
     * @param {String} taskName The name of the new task
     */
    handleTaskAddition: function(taskName){
        //Add task to the list
        Task.createTask(taskName);

        //Refresh taskList
        this.refreshTasksList();
    },


    /**
     * Confirm before task deletion
     * 
     * @param {String} taskID The ID of the task to delete
     */
    confirmDeleteTask: function(taskID){
        alert("Delete " + taskID);
    },


    /**
     * Handle task deletion
     * 
     * @param {String} taskID The ID of the task to delete
     */
    handleTaskDeletion: function(taskID){
        //Delete task
        Task.deleteTask(taskID);

        //Refresh task list
        this.refreshTasksList();
    },
};