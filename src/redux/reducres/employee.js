const initialState = {
    employees: []
}

export default (state = initialState, { type, payload }) => {
    switch (type){
        case 'EMPLOYEES:CHANGE_EMPLOYEE':
            return {
                ...state,
                employees: state.employees.map((employee, i) =>  i == payload.index ? payload.employee : employee)
            }
        case 'EMPLOYEES:SET_EMPLOYEES':
            return {
                ...state,
                employees: payload
            }
        case 'EMPLOYEES:ADD_EMPLOYEE':
            return {
                ...state,
                employees: [...state.employees, payload]
            }
        case 'EMPLOYEES:REMOVE_EMPLOYEE':
            return {
                ...state,
                employees: state.employees.filter((employee, i) =>  payload.indexOf(i.toString()) == -1 )
            }             
        default:
            return state;
    }
}