import React, { useState, useEffect } from 'react';
import { Employee } from '../index';
import { Toolbar } from '../../containers/index';
import { Modal, Menu, Button, Empty } from 'antd';
import './EmployeesBar.scss'


const EmployeesBar = ({ employees, changeData, dispatchData }) => {
  const [modal, setModal]  = useState(false);
  const [keys, setSelectedKeys] = useState([]);

  const onSelect = ({ selectedKeys }) => {
    setSelectedKeys(selectedKeys);
  };
  
  const submitReload = () => {
    dispatchData(); 
    setSelectedKeys([]); 
    setModal(false);
  }

  return (
    <div className='employees'>
      <Toolbar 
      selectedKeys={keys}
      setSelectedKeys={setSelectedKeys}
      setModal={setModal}
      />

      <h1>Список сотрудников</h1>

      <div className="employees-menu">
        {employees.length > 0 ? (
          <div className="employees-menu__bar">
            <Menu 
            className="employees-menu__bar-list" 
            multiple
            selectedKeys={keys}
            onSelect={onSelect}
            onDeselect={onSelect}>
              {employees.map((employee, i) => (
                <Menu.Item key={i}>{employee.name}</Menu.Item>
              ))}
            </Menu>
            { keys[0] && keys.length == 1  ?  (
              <Employee
                changeData={changeData}
                index={keys[0]}
                employees={employees}
                name={employees[keys[0]].name}
                birthDate={employees[keys[0]].birthDate}
                position={employees[keys[0]].position}
                gender={employees[keys[0]].gender}
                colleagues={employees[keys[0]].colleagues}
                isFired={employees[keys[0]].isFired}
              />
            ): (
              <div></div>
            )
            }
          </div>
          
        ) : (
          <Empty  description={"Нет сотрудников"}></Empty>
        )}
      </div>
      
      <div className="employees-modal">
        <Modal
          title="Несохраненные изменения"
          visible={modal}
          footer={[
            <Button key="back" onClick={() => setModal(false)}>
              Отмена
            </Button>,
            <Button key="submit" type="primary" onClick={submitReload}>
              Продолжить
            </Button>,
          ]}
        >
          <p>Все внесенные изменения не сохранятся. Вы действительно хотите продолжить?</p>
        </Modal>  
      </div>
        
    </div>
  )
}
 
export default EmployeesBar;
 