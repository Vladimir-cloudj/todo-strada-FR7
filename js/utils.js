export function isNameValid(name) {
    if (name.length < 3 || name.length > 30) {
        return Error(ERRORS.NAME_OF_TASK_UNCORRECT)
    }
}