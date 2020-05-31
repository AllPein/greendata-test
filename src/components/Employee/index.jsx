import React, { useState, useEffect } from 'react';
import { Input, DatePicker, Select, Radio, Checkbox } from 'antd';
import moment from 'moment';

const dateFormat = 'DD.MM.YYYY';

const { Option } = Select;

const Employee = ({ name, birthDate, position, gender, isFired, changeData, index, colleagues, employees }) => {
  const [gend, setGend] = useState(null);   
  const [newName, setNewName] = useState(null);
  const [pos, setPos] = useState(null);
  const [fired, setFired] = useState(null);
  const [date, setDate] = useState(null);
  const [_colleagues, setColleagues] = useState([]);

  const changeInput = e => {
    changeData({ index, employee: { name: e.target.value, birthDate, position, gender, isFired, colleagues } });
  }
  const changeSelect = value => {
    changeData({ index, employee: { name, birthDate, position: value, gender, isFired, colleagues } });
  }
  const changeRadio = e => {
    changeData({ index, employee: { name, birthDate, position, gender: e.target.value, isFired, colleagues } });
  }
  const changeCheckbox = e => {
    changeData({ index, employee: { name, birthDate, position, gender, isFired: e.target.checked, colleagues } });
  }

  const changeDate = (date) => {
    changeData({ index, employee: { name, birthDate: date._d, position, gender, isFired, colleagues } });
  }
  const changeColleagues = (a, option) => {
    changeData({ index, employee: { name, birthDate, position, gender, isFired, colleagues: [..._colleagues, option.value] } });
  }

  const removeColleague = (value) => {
    let newColleagues = _colleagues.filter((colleague) => colleague != value);
    changeData({ index, employee: { name, birthDate, position, gender, isFired, colleagues: newColleagues} });
  } 

  useEffect(() => {
    setNewName(name);
    setFired(isFired);
    setGend(gender);
    setPos(position);
    setDate(birthDate);
    if (colleagues)
      setColleagues(colleagues);
    
  }, [name, birthDate, position, isFired, gender, colleagues]);
  
  return (
    <div className='employees-menu__bar-edit'>
      <div>
        <h4>ФИО</h4>
        <Input 
        value={newName} 
        onChange={e => setNewName(e.target.value)} 
        onBlur={changeInput}
        onPressEnter={changeInput}
        >
        </Input>
      </div>
      <div>
        <h4>Дата рождения</h4>
        <DatePicker onChange={changeDate} defaultValue={moment(new Date(birthDate), dateFormat)} format={dateFormat} />
      </div>
        <div>
          <h4>Должность</h4>
          <Select 
          value={pos} 
          onChange={changeSelect}
          >
            <Option value='frontend'>Frontend разработчик</Option>
            <Option value='backend'>Backend разработчик</Option>
            <Option value='design'>Дизайнер</Option>
            <Option value='tester'>Тестировщик</Option>
            <Option value='product-manager'>Product manager</Option>
            <Option value='program-manager'>Program manager</Option>
          </Select>
        </div>
        
        <div>
          <h4>Коллеги</h4>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            value={_colleagues}
            onSelect={changeColleagues}
            onDeselect={removeColleague}
            optionLabelProp="label"
          >
            { employees && employees.map((employee, i) => (
                <Option key={i} value={employee.name}>{employee.name}</Option>
              ))
            }
          </Select>
        </div>

        <div>
          <h4>Пол</h4>
          <Radio.Group 
          value={gend} 
          onChange={changeRadio}
          >
            <Radio value={"Male"}>М</Radio>
            <Radio value={"Female"}>Ж</Radio>
          </Radio.Group>
        </div>
        
        <Checkbox 
        checked={fired}
        onChange={changeCheckbox}
        >Уволен</Checkbox>
    </div>
  )
}
 
export default Employee;
 