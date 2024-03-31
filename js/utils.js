export function isNameValid(name) {
    if (name.length < 3 || name.length > 30) {
        throw new Error(ERRORS.NAME_OF_TASK_UNCORRECT)
    }
}