/**
 * Task main object file
 * 
 * @author Pierre HUBERT
 */

//Create object task
var Task = {

    /**
     * Object storage name
     */
    storageObjectName: "todoTonight",

    /**
     * JSON encoder
     * 
     * @param {Object} Object to encode
     * @return {String} Encoded JSON
     */
    encodeJSON: function(obj){
        return JSON.stringify(obj);
    },

    /**
     * JSON decoder
     * 
     * @param {String} Object encoded in JSON
     * @return {Object} The decoded object
     */
    decodeJSON: function(source){
        return JSON.parse(source);
    },

    /**
     * Retrieve existing tasks
     * 
     * @return {object} The tasklist object
     */
    retrieveExistingTasks: function(){
        if(localStorage.getItem(this.storageObjectName)){
            //Return object
            var source = localStorage.getItem(this.storageObjectName);
            return this.decodeJSON(source);
        }
        else {
            //Return an empty object
            return {};
        }
    },

    /**
     * Save new object version
     * 
     * @param {Object} object The new object to save
     */
    saveNewObject: function(object){

        //Convert object to JSON code
        var JSONcode = this.encodeJSON(object);

        //Save result in localStorage
        localStorage.setItem(this.storageObjectName, JSONcode);
    },


    /**
     * Create a new task
     * 
     * @param {String} taskName The name of the task to create
     */
    createTask: function(taskName){
        //First, get existing tasks
        var taskObject = this.retrieveExistingTasks();

        //Generate task ID
        var taskID = Math.random();
        while(taskObject[taskID]){
            //Try a new name
            taskID = Math.random();
        }

        //Add the new task
        taskObject[taskID] = {
            name: taskName,
        };

        //Save result
        this.saveNewObject(taskObject);
    },


    /**
     * Delete a task
     * 
     * @param {String} taskID The ID of the task to delete
     * @return {Boolean} False if it fails
     */
    deleteTask: function(taskID){
        //First, get existing tasks
        var taskObject = this.retrieveExistingTasks();

        //Recreate object without the ID to delete
        var newTaskObject = {};
        for(i in taskObject){
            if(i !== taskID){
                //Transfer value
                newTaskObject[i] = taskObject[i];
            }
        }

        //Save result
        this.saveNewObject(newTaskObject);        
    },
};