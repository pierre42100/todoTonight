/**
 * App initialization
 * 
 * @author Pierre HUBERT
 */

/**
 * Angular material initialization
 */
angular.module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
.controller('AppCtrl', function($scope, $mdDialog) {
    
    $scope.createTask = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .title('What\'s the name of the new task ?')
      .textContent('Try to be precise.')
      .placeholder('Task name')
      .ariaLabel('Task name')
      .initialValue('Review french course')
      .targetEvent(ev)
      .ok('Create task')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function(result) {
      //Handle task addition
	  TaskViewer.handleTaskAddition(result);
    }, function() {
      //Nothing, we just ignore what happened
    });
  };

  	//Save angular material element
  	TaskViewer.angularMaterialElem = $mdDialog;
});


/**
 * Tasks initialization
 */
(function(){
	//Refresh task list
	TaskViewer.refreshTasksList();
})();