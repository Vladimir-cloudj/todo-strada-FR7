export const UI_ELEMENTS = {
    HIGH_TASK_FORM: document.querySelector('#high-tasks__form'),
    LOW_TASK_FORM: document.querySelector('#low-tasks__form'),
    TASK_INPUT_HIGH: document.querySelector('#form-tasks__add--high'),
    TASK_INPUT_LOW: document.querySelector('#form-tasks__add--low'),
    HIGH_TASKS_LIST: document.querySelector('#high-tasks__list'),
    LOW_TASKS_LIST: document.querySelector('#low-tasks__list'),
} 

export const PRIORITY = {
    LOW: "Low",
    HIGH: "High",
};
export const STATUS = {
    DONE: "Done",
    TODO: "To Do",
}

export const ERRORS = {
    NAME_OF_TASK_UNCORRECT: 'Имя задачи меньше 3 символов или больше 30 символов',
    NAME_OF_TASK_NOT_EXIST: "name of task not exist",
	NAME_OF_TASK_EMPTY: "name is task is empty",
	NAME_OF_PRIORITY_WRONG: 'name of priority task is wrong',
	// NAME_OF_STATUS: `status must be ${STATUS.TO_DO}, ${STATUS.IN_PROGRESS}, ${STATUS.DONE}`,
}