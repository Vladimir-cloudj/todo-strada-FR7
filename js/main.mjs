import data from './tasks.json' assert {type: "json"}

const UI_ELEMENTS = {
    HIGH_TASK_FORM: document.querySelector('#high-tasks__form'),
    LOW_TASK_FORM: document.querySelector('#low-tasks__form'),
    TASK_INPUT_HIGH: document.querySelector('#form-tasks__add--high'),
    TASK_INPUT_LOW: document.querySelector('#form-tasks__add--low'),
    HIGH_TASKS_LIST: document.querySelector('#high-tasks__list'),
    LOW_TASKS_LIST: document.querySelector('#low-tasks__list'),
} 

const PRIORITY = {
    LOW: "Low",
    HIGH: "High",
};
const STATUS = {
    DONE: "Done",
    TODO: "To Do",
}
let list = [
    { id: Date.now()-2000, name: 'Посмотреть ютубчик', status: STATUS.TODO, priority: PRIORITY.LOW },
    { id: Date.now()-1000, name: 'Вот вам и супер интересная тема. Вы наверняка заметили что ваши файлы с кодом становятся все объемнее, что хочется вынести некоторые вещи куда-то за пределы основной программы.', status: STATUS.TODO, priority: PRIORITY.HIGH },
    { id: Date.now(), name: 'Сверстать этот TODO list', status: STATUS.TODO, priority: PRIORITY.HIGH },
    { id: Date.now()+2000, name: 'Начать делать задачу', status: STATUS.DONE, priority: PRIORITY.HIGH },
]

const ERRORS = {
    NAME_OF_TASK_UNCORRECT: 'Имя задачи меньше 3 символов или больше 30 символов',
    NAME_OF_TASK_NOT_EXIST: "name of task not exist",
	NAME_OF_TASK_EMPTY: "name is task is empty",
	NAME_OF_PRIORITY_WRONG: 'name of priority task is wrong',
	// NAME_OF_STATUS: `status must be ${STATUS.TO_DO}, ${STATUS.IN_PROGRESS}, ${STATUS.DONE}`,
}

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
    let cssClass, checkedStatus;
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
    if (task.id) {
        task.priority === PRIORITY.HIGH? UI_ELEMENTS.HIGH_TASKS_LIST.insertAdjacentHTML('beforeend', taskHTML) : UI_ELEMENTS.LOW_TASKS_LIST.insertAdjacentHTML('beforeend', taskHTML);
    }
}

function addTaskToList(name, priority, status = STATUS.TODO) {
            const newTask = {
                id: Date.now(), 
                name, 
                status, 
                priority
            };
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
        console.log(task);
        task.status === STATUS.DONE? task.status = STATUS.TODO : task.status = STATUS.DONE;
		const taskTitle = parentNode.querySelector('.task-text');
		taskTitle.classList.toggle('task-title--done');
        parentNode.remove();
        renderTask(task);
        saveToLocalStorage();
    }
}
const isNameValid = (name)=> {
        if (name.length < 3 || name.length > 30) {
        throw new Error(ERRORS.NAME_OF_TASK_UNCORRECT)
    }
}

UI_ELEMENTS.HIGH_TASK_FORM.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = UI_ELEMENTS.TASK_INPUT_HIGH.value;
    try {
        isNameValid(taskName);
        addTaskToList(taskName, PRIORITY.HIGH, STATUS.TODO);
        UI_ELEMENTS.TASK_INPUT_HIGH.value = '';
        UI_ELEMENTS.TASK_INPUT_HIGH.focus();
    } catch (error) {
        UI_ELEMENTS.TASK_INPUT_HIGH.focus();
        alert(error.message);
    }
});
UI_ELEMENTS.LOW_TASK_FORM.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = UI_ELEMENTS.TASK_INPUT_LOW.value;
    addTaskToList(taskName, PRIORITY.LOW, STATUS.TODO);
    UI_ELEMENTS.TASK_INPUT_LOW.value = '';
    UI_ELEMENTS.TASK_INPUT_LOW.focus();
})
UI_ELEMENTS.HIGH_TASKS_LIST.addEventListener('click', deleteTask);
UI_ELEMENTS.HIGH_TASKS_LIST.addEventListener('click', doneTask);

UI_ELEMENTS.LOW_TASKS_LIST.addEventListener('click', deleteTask);
UI_ELEMENTS.LOW_TASKS_LIST.addEventListener('click', doneTask);