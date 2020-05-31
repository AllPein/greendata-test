import React from 'react'
import { connect } from 'react-redux';
import { EmployeesBar } from '../components/index';
import store from '../redux/store';
import { employeeActions } from '../redux/actions/index';
const Employees = ({ employees }) => {
  
  const changeData = (data) => {
    store.dispatch(employeeActions.changeEmployee(data));
  }

  const dispatchData = () => {
    store.dispatch(employeeActions.getEmployees());
  }

  return (
    <EmployeesBar
    dispatchData={dispatchData} 
    employees={employees}
    changeData={changeData}
    />
  )
}
 
export default connect( ({employee}) => ( { employees: employee.employees } ))(Employees);
 