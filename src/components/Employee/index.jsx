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

  const options = [ { name: 'Frontend разработчик', value: 'frontend' }, { name: 'Backend разработчик', value: 'backend' }, { name: 'Тестировщик', value: 'tester' },
                    { name: 'Дизайнер ', value: 'design' }, { name: 'Product manager', value: 'product-manager' }, { name: 'Program manager', value: 'program-manager' } ];
  
  const radioOptions = [ { name: 'M', value: 'Male' }, { name: 'Ж', value: 'Female' } ];

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
            { options.map((option, i) => (
              <Option key={i} value={option.value}>{ option.name }</Option>
            )) }
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
                <Option key={i} value={employee}>{employee.name}</Option>
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
            {radioOptions.map((option) => (
              <Radio value={option.value}>{ option.name }</Radio>
            ))}
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
 