import {UI_ELEMENTS, PRIORITY, STATUS, ERRORS} from './constants.js'
// import {isNameValid} from './utils.js'
let list = [
    { id: Date.now()-2000, name: 'Посмотреть ютубчик', status: STATUS.TODO, priority: PRIORITY.LOW },
    { id: Date.now()-1000, name: 'Вот вам и супер интересная тема. Вы наверняка заметили что ваши файлы с кодом становятся все объемнее, что хочется вынести некоторые вещи куда-то за пределы основной программы.', status: STATUS.TODO, priority: PRIORITY.HIGH },
    { id: Date.now(), name: 'Сверстать этот TODO list', status: STATUS.TODO, priority: PRIORITY.HIGH },
    { id: Date.now()+2000, name: 'Начать делать задачу', status: STATUS.DONE, priority: PRIORITY.HIGH },
]

if (localStorage.getItem('list')) {
	list = JSON.parse(localStorage.getItem('list'));
	list.forEach((task) => renderTask(task));
} else {
    list.forEach((task) => renderTask(task));
}

function saveToLocalStorage() {
    localStorage.setItem('list', JSON.stringify(list));
}

function renderTask(task) {
    let cssClass;
    let checkedStatus;
    if (task.status !== STATUS.DONE) {
        cssClass = 'list-item task';
    } else {
        cssClass = 'list-item task task-title--done';
        checkedStatus = 'checked';
    }
    const taskHTML = `
        <div class="${cssClass}" id="${task.id}">
            <input type="checkbox" class="task-checkbox" id="taskcheckbox2" data-action="done" ${checkedStatus}>
            <label for="taskcheckbox2" class="task-text">${task.name}</label>
            <button class="task-delete__btn" id="delete-btn">+</button>
        </div>
    `;
    // const taskHTML = document.createElement('div');
    // const divElement = document.createElement('div');
    // divElement.className = cssClass
    // divElement.id = task.id
    // ////////create divElemnt////////////////////
    // const taskHTML = document.createElement('div');
    // taskHTML.className = cssClass
    // taskHTML.id = task.id
        // ////////create inputElemnt////////////////////
    // let inputElement = document.createElement('input');
    // inputElement.type = 'checkbox';
    // inputElement.className = 'task-checkbox';
    // inputElement.id = 'taskcheckbox2';
    // inputElement.setAttribute('data-action', 'done');
    // inputElement.checked = task.status === STATUS.DONE;
    // ////////create labelforinputElemnt////////////////////
    // let labelForInputElement = document.createElement('label');
    // labelForInputElement.className = 'task-text';
    // labelForInputElement.htmlFor = 'taskcheckbox2';
    // labelForInputElement.textContent = task.name;
    // ////////create buttonDelete////////////////////
    // let buttonDelete = document.createElement('button');
    // buttonDelete.className = 'task-delete__btn';
    // buttonDelete.id = 'delete-btn';
    // buttonDelete.textContent = '+';
    // console.log(inputElement, labelForInputElement, buttonDelete);
    // taskHTML.append(inputElement);
    // taskHTML.append(labelForInputElement); 
    // taskHTML.append(buttonDelete);
    // taskHTML.appendChild(divElement)

    if (task.id) {
        task.priority === PRIORITY.HIGH? UI_ELEMENTS.HIGH_TASKS_LIST.insertAdjacentHTML('beforeend', taskHTML) : UI_ELEMENTS.LOW_TASKS_LIST.insertAdjacentHTML('beforeend', taskHTML);
    }
}

function createTask(name, priority, status) {
    this.id = Date.now();
    this.name = name;
    this.priority = priority; 
    this.status = status;
}

function addTaskToList(name, priority, status = STATUS.TODO) {
    const newTask = new createTask(name, priority, status);
            // const newTask = {
            //     id: Date.now(), 
            //     name, 
            //     status, 
            //     priority
            // };
    list.push(newTask);
    saveToLocalStorage();
    renderTask(newTask);
}
function deleteTask(event) {
    if (event.target.classList.contains('task-delete__btn')) {
        const parentNode = event.target.closest('.list-item');
        const id = Number(parentNode.id);
        const index = list.findIndex(task => task.id === id);
        parentNode.remove();
        list.splice(index, 1);
        saveToLocalStorage();
    }
}

function doneTask(event) {
    if (event.target.dataset.action === 'done') {
        const parentNode = event.target.closest('.list-item');
		const id = Number(parentNode.id);
		const task = list.find((task) => task.id === id);
        task.status === STATUS.DONE? task.status = STATUS.TODO : task.status = STATUS.DONE;
		const taskTitle = parentNode.querySelector('.task-text');
		taskTitle.classList.toggle('task-title--done');
        parentNode.remove();
        renderTask(task);
        saveToLocalStorage();
    }
}
function isNameValid(name) {
    if (name.length < 3 || name.length > 30) {
        throw new Error(ERRORS.NAME_OF_TASK_UNCORRECT)
    }
}

function addTaskProcess(taskName, priority, taskInputPriorityUI) {
    try {
        isNameValid(taskName);
        addTaskToList(taskName, priority, STATUS.TODO);
        taskInputPriorityUI = '';
        // UI_ELEMENTS.TASK_INPUT_HIGH.focus();
    } catch (error) {
        // UI_ELEMENTS.TASK_INPUT_HIGH.focus();
        alert(error.message);
    }
}

UI_ELEMENTS.HIGH_TASK_FORM.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = UI_ELEMENTS.TASK_INPUT_HIGH.value;
    addTaskProcess(taskName, PRIORITY.HIGH, UI_ELEMENTS.TASK_INPUT_HIGH.value);
    // try {
    //     isNameValid(taskName);
    //     addTaskToList(taskName, PRIORITY.HIGH, STATUS.TODO);
    //     UI_ELEMENTS.TASK_INPUT_HIGH.value = '';
    //     UI_ELEMENTS.TASK_INPUT_HIGH.focus();
    // } catch (error) {
    //     UI_ELEMENTS.TASK_INPUT_HIGH.focus();
    //     alert(error.message);
    // }
});
UI_ELEMENTS.LOW_TASK_FORM.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = UI_ELEMENTS.TASK_INPUT_LOW.value;
    addTaskProcess(taskName, PRIORITY.LOW, UI_ELEMENTS.TASK_INPUT_LOW.value);
    // try {
    //     isNameValid(taskName);
    //     addTaskToList(taskName, PRIORITY.LOW, STATUS.TODO);
    //     UI_ELEMENTS.TASK_INPUT_LOW.value = '';
    //     UI_ELEMENTS.TASK_INPUT_LOW.focus();
    
    // } catch (error) {
    //     UI_ELEMENTS.TASK_INPUT_LOW.focus();
    //     alert(error.message);
    // }
    // addTaskToList(taskName, PRIORITY.LOW, STATUS.TODO);
    // UI_ELEMENTS.TASK_INPUT_LOW.value = '';
    // UI_ELEMENTS.TASK_INPUT_LOW.focus();
})
UI_ELEMENTS.HIGH_TASKS_LIST.addEventListener('click', deleteTask);
UI_ELEMENTS.HIGH_TASKS_LIST.addEventListener('click', doneTask);

UI_ELEMENTS.LOW_TASKS_LIST.addEventListener('click', deleteTask);
UI_ELEMENTS.LOW_TASKS_LIST.addEventListener('click', doneTask);