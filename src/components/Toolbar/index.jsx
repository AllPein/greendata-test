import React from 'react';
import { Button } from 'antd'; 

const Toolbar = ({ saveChanges, addEmployee, removeEmployee, reloadData, selectedKeys }) => {
  return (
    <div  className='employees-toolbar'>
        <Button onClick={saveChanges}>Сохранить</Button>
        <Button onClick={reloadData}>Обновить</Button>
        <Button danger disabled={selectedKeys.length == 0} onClick={removeEmployee}>Удалить</Button>
        <Button onClick={addEmployee}>Добавить</Button><br/>
        <hr/>
    </div>
    
  )
}
 
export default Toolbar;
 