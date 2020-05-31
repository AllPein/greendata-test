let actions = {
    changeEmployee: (data) => ({
        type: 'EMPLOYEES:CHANGE_EMPLOYEE',
        payload: data
    }),
    addEmployee: (data) => ({
        type: 'EMPLOYEES:ADD_EMPLOYEE',
        payload: data
    }),
    setEmployees: (data) => ({
        type: "EMPLOYEES:SET_EMPLOYEES",
        payload: data
    }),
    getEmployees: () => dispatch => {
        let employees = localStorage.getItem("employees");
        dispatch(actions.setEmployees(JSON.parse(employees)));
    },
    removeEmployees: (keys) => ({
        type: 'EMPLOYEES:REMOVE_EMPLOYEE',
        payload: keys
    })
}

export default actions;