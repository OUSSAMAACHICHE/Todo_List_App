// setting up Variables
let theInput = document.querySelector('.add-task input'),
	theAddButton = document.querySelector('.add-task .fa-plus'),
	tasksContainer = document.querySelector('.tasks-content'),
	tasksCount = document.querySelector('.tasks-count span'),
	tasksCopmleted = document.querySelector('.tasks-completed span'),
	deleteAll = document.querySelector('.delete-all'),
	finishAll = document.getElementsByClassName('finished-all')[0];

// focus on the input field
window.onload = function () {
	theInput.focus();

	// Retrieve tasks from localStorage
	let storedTasks = localStorage.getItem('tasks');

	// Parse the stored tasks
	let tasks = JSON.parse(storedTasks);

	if(tasks.length > 0) {

	let noTasksMsg = document.querySelector('.no-tasks-message');

		// remove noTask message
		noTasksMsg.remove();

		// add tasks to container
		tasks.forEach(taskText => {
			// create taskBox
			let taskBox = document.createElement('span');

			// add class to taskBox
			taskBox.className = 'task-box';
			// add the stored text to taskBox
			taskBox.innerHTML = taskText;

			// // add delete button to taskBox
			// let deleteBtn = document.createElement('span');
			// // add class to deleteBtn span
			// deleteBtn.className = 'delete';
			// // add text to deleteBtn span
			// deleteBtn.innerHTML = 'Delete';
			// // append deleteBtn on taskBox
			// taskBox.appendChild(deleteBtn);

			// add taskBox to main container
			tasksContainer.appendChild(taskBox);
		});

	}
}


// adding tasks
theAddButton.onclick = function () {

	// if input is Empty
	if (theInput.value === '') {
		Swal.fire({
			title: 'Hello',
			text: 'You must enter a text',
			icon: 'warning',
		});

	} else {

		let noTasksMsg = document.querySelector('.no-tasks-message')

		if (document.body.contains(document.querySelector('.no-tasks-message'))) {

			// remove no tasks message
			noTasksMsg.remove();

		}

		// create the span of the task 
		let taskBox = document.createElement('span');

		// add class to taskBox
		taskBox.className = 'task-box';

		// add text to task box
		taskBox.innerHTML = theInput.value;
		// add delete btn
		let deleteBtn = document.createElement('span');

		// add class to delete btn
		deleteBtn.className = 'delete';

		// create text to delete btn
		let deleteText = document.createTextNode('Delete');

		// add the text to delete btn
		deleteBtn.appendChild(deleteText);

		// add deleteBtn to the taskBox 
		taskBox.appendChild(deleteBtn);

		// check if the entered text is already exist in the task
		const existingTask = document.querySelectorAll('.task-box');
		let frequent = false;

		existingTask.forEach(task => {
			console.log(task.textContent)
			if (task.textContent === theInput.value + 'Delete') {

				frequent = true;

			} else {
				frequent = false;
			}
		});

		// if the entered task not frequent
		if (frequent === false) {

			// add taskBox to the main tasks content 
			tasksContainer.appendChild(taskBox);

			calculateTasks();
			// empty the input field
			theInput.value = '';

		} else {

			swal.fire({
				title: 'Wrong',
				text: 'The Task You Entered Is frequent',
				icon: 'question',
			})
		}

	}

	// refocus on the field
	theInput.focus();
}

// delete tasks 
document.addEventListener('click', function (e) {
	// if has class delete
	if (e.target.className === 'delete') {
		// remove his parent
		e.target.parentElement.remove();

		calculateTasks();

		if (tasksContainer.childElementCount == 0) {
			createNoTaskMsg();
		}

	}
	// if contains task-box class
	if (e.target.classList.contains('task-box')) {
		// add and remove finished class when click
		e.target.classList.toggle('finished');

		calculateTasks();

	}

});

// delete all 
deleteAll.onclick = function () {
	// loop through tasks
	document.querySelectorAll(".task-box").forEach(function (task) {
		// delete tasks
		task.remove();

		calculateTasks();

	});
	// check if the container has no children
	if (tasksContainer.childElementCount == 0) {
		// add no tasks message
		createNoTaskMsg();

	}

}
// finish all
finishAll.onclick = function () {
	// loop through tasks
	document.querySelectorAll('.task-box').forEach(task => {

		// add and delete finished class 
		task.classList.add('finished');

		calculateTasks();

	});
}

// create no task message
function createNoTaskMsg() {

	// create span
	let noTask = document.createElement('span');

	// create text of noTAsk
	let noTaskMsg = document.createTextNode('No Tasks To show');

	// add class to noTask
	noTask.className = 'no-tasks-message';

	// add the text to span
	noTask.appendChild(noTaskMsg);

	// add noTask to the main container
	tasksContainer.appendChild(noTask);

}

// function to calculate tasks & finished tasks cout
function calculateTasks() {

	// calculate tasks
	tasksCount.innerHTML = document.querySelectorAll('.tasks-content .task-box').length;

	// calculate finished tasks 
	tasksCopmleted.innerHTML = document.querySelectorAll('.tasks-content .finished').length;

	// get all the tasks text
	let tasks = [];

	document.querySelectorAll('.task-box').forEach(function(task) {

		tasks.push(task.innerHTML);

	});

	// Store tasks in localStorage 
	window.localStorage.setItem('tasks',JSON.stringify(tasks));

}
