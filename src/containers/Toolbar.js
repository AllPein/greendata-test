import React from 'react'
import { connect } from 'react-redux';
import { Toolbar as ToolbarBase } from '../components/index';
import store from '../redux/store';
import { employeeActions } from '../redux/actions/index';
import { showNotification } from '../utils/index';

const Toolbar = ({ employees, selectedKeys, setSelectedKeys, setModal }) => {

  const compare = (arr1, arr2) => {
    return arr1.length == arr2.length && arr1.every((elem, i) => JSON.stringify(elem) === JSON.stringify(arr2[i]));
  }

  const reloadData = () => {
    let serverData = JSON.parse(localStorage.getItem("employees"));

    if (compare(serverData, employees)) {
      store.dispatch(employeeActions.getEmployees());
      showNotification({
        title: "Данные обновлены",
        type: "success"
      })
    }
    else {
      setModal(true);
    }
  }


  const saveChanges = () => {
      localStorage.setItem("employees", JSON.stringify(employees));
      showNotification({
        title: "Успешно сохранено",
        type: "success"
      });
  }
  const addEmployee = () => {
    store.dispatch(employeeActions.addEmployee({ name: "Новый сотрудник", birthDate: new Date(), position: "", gender: "Male", isFired: false }))
    setTimeout(() => { setSelectedKeys([employees.length.toString()]) }, 0);

  }
  const removeEmployee = () => {
     setSelectedKeys([]);
    store.dispatch(employeeActions.removeEmployees(selectedKeys));
  }
  return (
    <ToolbarBase 
    reloadData={reloadData}
    saveChanges={saveChanges}
    addEmployee={addEmployee}
    selectedKeys={selectedKeys}
    removeEmployee={removeEmployee}
    />
  )
}
 
export default connect( ({employee}) => ( { employees: employee.employees } ))(Toolbar);
 