import React, { useState } from 'react';
import Employee from './containers/Employee';
import Form from './containers/Form';

const App = () => {
  const [employee, setEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState(null);
  const [updated, setUpdated] = useState(null);

  const getEmployee = (data) => {
    setEmployee(data);
  };
  const createEmployee = (data) => {
    setNewEmployee(data);
  };
  const updateEmployee = (data) => {
    setUpdated(data);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <Form
            employee={employee}
            createEmployee={createEmployee}
            updateEmployee={updateEmployee}
          />
        </div>
        <div className="col">
          <Employee
            updated={updated}
            newEmployee={newEmployee}
            getEmployee={getEmployee}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
