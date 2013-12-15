// create a new task
function createNewTask(){
	var taskDictionary = {};
	
	var newTask = prompt("New Task", "");
	
	if(newTask != null){
		if(newTask == ""){
			alert("New Task cannot be empty!");
		}else{
			taskDictionary = {check:0, text:newTask};
			addNewRow(taskDictionary);
		}
	}
}

// add a row to the display table
var rowID = 0;
function addNewRow(taskDictionary){
	rowID += 1;
	
	var table = document.getElementById("dataTable");
	var newList = document.createElement("ul");
	var itemArray = new Array;
	
	// create the checkbox
	var element1 = document.createElement("input");
    element1.type = "checkbox";
    element1.name = "chkbox[]";
	element1.className = "completeCheckbox";
    element1.checked = taskDictionary["check"];
    element1.setAttribute("onclick", "checkboxClicked()");
	itemArray[0] = element1;
	
	// create the textbox
	var element2 = document.createElement("input");
    element2.type = "text";
    element2.name = "txtbox[]";
	element2.className = "taskTextbox";
    element2.size = 16;
    element2.id = "text" + rowID;
    element2.value = taskDictionary["text"];
    //element2.setAttribute("onchange", "saveTaskList()");
	itemArray[1] = element2;
	
	// create view button
	var element3 = document.createElement("input");
    element3.type = "button";
	element3.className = "smlBtn";
    element3.id = rowID;
    element3.value = "View";
    element3.setAttribute("onclick", "viewSelectedRow(document.getElementById('text' + this.id))");
	
	/*if(element2.value.length < 21){
		element3.className = "fadeOut";
		element3.removeAttribute("onclick");
	}*/
	itemArray[2] = element3;
	
	// create delete button
	var element4 = document.createElement("input");
    element4.type = "button";
	element4.className = "smlBtn";
    element4.value = "Delete";
    element4.setAttribute("onclick", "deleteSelectedRow(this)");
	itemArray[3] = element4;
	
	// place all 4 elements in sparate 'li's
	for(var i=0; i<itemArray.length; i++){
		var newItem = document.createElement("li");
		newItem.appendChild(itemArray[i]);
		newList.appendChild(newItem);
	}
	
	// add the new row to the 'dataTable' div
	table.appendChild(newList);
	
	checkboxClicked();
	//saveTaskList();
}

// add the faded effect to checked items
function checkboxClicked(){
	var table = document.getElementById("dataTable");
	var rows = table.getElementsByTagName("ul");
	var rowCount = rows.length;
	
	// loop through all rows of the table
    for(var i=0; i<rowCount; i++){
		// assign each 'li' to a variable
        var chkbox = rows[i].childNodes[0].childNodes[0];
		var txtbox = rows[i].childNodes[1].childNodes[0];
		var viewBtn = rows[i].childNodes[2].childNodes[0];
		var deleteBtn = rows[i].childNodes[3].childNodes[0];

		// if the checkbox is checked, add the strike-through styling
		if(null != chkbox && true == chkbox.checked){
			if(null != txtbox){
				txtbox.style.setProperty("opacity", 0.25);
				}
			}else{ // if the checkbox isn't checked, remove the strike-through styling
				txtbox.style.setProperty("opacity", 1);
			}
		}
	
	//saveTaskList();
}

// view the content of the selected row
function viewSelectedRow(taskTextField){
    alert(taskTextField.value);
}

// delete the selected row
function deleteSelectedRow(deleteButton){
    var toDelete = deleteButton.parentNode.parentNode;
    toDelete.parentNode.removeChild(toDelete);
    //SsaveTaskList();
}

// save the task list
function saveTaskList()
{
    var taskArray = {};
    var checkBoxState = 0;
    var textValue = "";
 
    var table = document.getElementById("dataTable");
	var rows = table.getElementsByTagName("ul");
    var rowCount = rows.length;
 
    if(rowCount != 0){
        // loop through all rows of the table
        for(var i=0; i<rowCount; i++){
            var row = rows[i];
 
            // determine the state of the checkbox
            var chkbox = row.childNodes[0].childNodes[0];
            if(null != chkbox && true == chkbox.checked){
                checkBoxState = 1;
            }else{
                checkBoxState= 0;
            }
 
            // retrieve the content of the task
            var textbox = row.childNodes[1].childNodes[0];
            textValue = textbox.value;
 
            // populate the array
            taskArray["row" + i] = {check:checkBoxState, text:textValue};
        }
    }else{
        taskArray = null;
    }
 
    // use the local storage API to save the data as JSON
    window.localStorage.setItem("taskList13u782343990FUe", JSON.stringify(taskArray));
	
	var notification = document.getElementById("notification");
	notification.className = "";
	notification.className = "fadeUp";
	//setInterval(function () {
	//	notification.className = "fadeDown";
	//}, 3000);
	notification.innerHTML = "Task List saved to Local Storage!";
}

// load the task list
function loadTaskList(){
    // use the local storage API to load the JSON formatted task list, and decode it
    var theList = JSON.parse(window.localStorage.getItem("taskList13u782343990FUe"));
 
    if(null == theList || theList == "null"){
        deleteAllRows();
    }else{
        var count = 0;
        for (var obj in theList){
            count++;
        }
 
        // remove any existing rows from the table
        deleteAllRows();
 
        // loop through the tasks
        for(var i=0; i<count; i++){
            // add a row to the table for each one
            addNewRow(theList["row" + i], true);
        }
    }
	
	var notification = document.getElementById("notification");
	notification.className = "";
	notification.className = "fadeUp";
	setInterval(function () {
		notification.className = "fadeDown";
	}, 3000);
	notification.innerHTML = "Task List loaded from Local Storage!";
	
	var height = window.innerHeight;
	var container = document.getElementById("container");
	container.style.minHeight = height + "px";
}

// remove all the rows from the DOM
function deleteAllRows(){
	var table = document.getElementById("dataTable");
	table.innerHTML = "";
 
 	var notification = document.getElementById("notification");
	notification.innerHTML = "";
	notification.className = "";
	
    // save the to-do list
    //SsaveTaskList();
}

