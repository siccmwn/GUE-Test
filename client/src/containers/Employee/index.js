import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API, AUTH } from '../../setup';

class Employee extends Component {
  state = {
    employees: null,
    currentPage: null,
    perPage: null,
    total: null,
    employee: null,
    isVisible: false,
  };

  componentDidMount() {
    this.fetchEmployee(1);
  }

  componentDidUpdate(prevProps, _) {
    if (prevProps.newEmployee !== this.props.newEmployee) {
      this.setState({
        employees: [...this.state.employees, this.props.newEmployee],
      });
    }
    if (prevProps.updated !== this.props.updated) {
      const emps = JSON.parse(JSON.stringify(this.state.employees));
      const employees = emps.map((emp) => {
        if (emp.id === this.props.updated.id) {
          emp = this.props.updated;
        }
        return emp;
      });
      this.setState({ employees });
    }
  }

  fetchEmployee = async (pageNumber) => {
    const response = await fetch(`${API}/employees?page=${pageNumber}`, {
      method: 'GET',
    });
    const json = await response.json();

    this.setState({
      employees: json.data,
      total: +json.total,
      currentPage: json.page,
      perPage: json.perPage,
    });
  };

  handleEdit = async (idx) => {
    const employee = this.state.employees[idx];
    this.props.getEmployee(employee);
  };

  handleDelete = async (id) => {
    const employees = this.state.employees;
    const response = await fetch(`${API}/employee/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + AUTH,
      },
    });
    if (response.status === 200) {
      const data = employees.filter((employee) => {
        if (employee.id !== id) return employee;
      });
      toast('Successfully delete.');
      this.setState({ employees: data });
    } else {
      toast.error(response.statusText);
    }
  };

  handleDetails = async (idx) => {
    const employee = this.state.employees[idx];
    this.setState({ employee, isVisible: true });
  };

  render() {
    let employee, employees, renderPageNumbers;
    if (this.state.employees !== null) {
      employees = this.state.employees.map((employee, idx) => (
        <tr key={employee.id}>
          <td>{employee.firstName}</td>
          <td>{employee.lastName}</td>
          <td>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary btn-sm mr-4"
                onClick={() => this.handleDetails(idx)}
              >
                Details
              </button>
              <button
                type="button"
                className="btn btn-success btn-sm mr-4"
                onClick={() => this.handleEdit(idx)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => this.handleDelete(employee.id)}
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ));
    }

    const pageNumbers = [];
    if (this.state.total !== null) {
      const number = Math.ceil(this.state.total / this.state.perPage);
      for (let i = 1; i <= number; i++) {
        pageNumbers.push(i);
      }

      renderPageNumbers = pageNumbers.map((number) => {
        const classes = ['page-item'];
        if (this.state.currentPage === number) {
          classes.push('active');
        }

        return (
          <li className={classes.join(' ')} key={number}>
            <span
              className="page-link"
              onClick={() => this.fetchEmployee(number)}
            >
              {number}
            </span>
          </li>
        );
      });
    }

    if (this.state.employee !== null) {
      employee = (
        <div className="card my-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <img
                src="https://image.shutterstock.com/image-vector/vector-design-avatar-dummy-sign-600w-1290556063.jpg"
                class="card-img-top"
                alt="..."
              />
            </div>
            <div className="col-md-9">
              <div className="card-body">
                <span>
                  <b>First Name</b>: {this.state.employee.firstName}
                  <br></br>
                </span>
                <span>
                  <b>Last Name</b>: {this.state.employee.lastName}
                  <br></br>
                </span>
                <span>
                  <b>Age</b>: {this.state.employee.age}
                  <br></br>
                </span>
                <span>
                  <b>Address</b>: {this.state.employee.address}
                  <br></br>
                </span>
              </div>
            </div>
          </div>
          <span
            className="ml-auto text-primary"
            onClick={() => this.setState({ isVisible: false })}
          >
            <i>Hide</i>
          </span>
        </div>
      );
    }

    return (
      <div>
        <h3 className="mb-3">List Employees</h3>
        <table className="table table-striped table-responsive-md">
          <thead>
            <tr>
              <th className="text-center">First Name</th>

              <th className="text-center">Last Name</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>{employees}</tbody>
        </table>

        <div className="pagination">{renderPageNumbers}</div>
        <ToastContainer />
        <div className={this.state.isVisible ? 'visible' : 'invisible'}>
          {employee}
        </div>
      </div>
    );
  }
}

export default Employee;
