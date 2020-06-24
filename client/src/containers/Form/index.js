import React, { Component } from 'react';
import { API, AUTH } from '../../setup';
import axios from 'axios';
import { toast } from 'react-toastify';

export class Form extends Component {
  state = {
    id: '',
    firstName: '',
    lastName: '',
    address: '',
    age: '',
    isEdit: false,
  };

  handleChangeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { id, firstName, lastName, address, age, isEdit } = this.state;
    const data = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      age: +age,
    };

    if (!isEdit) {
      const response = await axios({
        method: 'POST',
        url: `${API}/employee`,
        headers: {
          Authorization: `Bearer ${AUTH}`,
        },
        data,
      });
      if (response.status === 201) {
        toast(response.data.message);
        this.setState({
          id: '',
          firstName: '',
          lastName: '',
          address: '',
          age: '',
        });
        this.props.createEmployee(response.data.data);
      }
    } else {
      const response = await axios({
        method: 'PUT',
        url: `${API}/employee/${id}`,
        headers: {
          Authorization: `Bearer ${AUTH}`,
        },
        data,
      });
      if (response.status === 200) {
        this.setState({
          id: '',
          firstName: '',
          lastName: '',
          address: '',
          age: '',
          isEdit: false,
        });
        this.props.updateEmployee(response.data.data);
        toast(response.data.message);
      }
    }
  };

  componentDidUpdate(prevProps, _) {
    const { employee } = this.props;
    if (prevProps.employee !== employee) {
      this.setState({
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        address: employee.address,
        age: employee.age,
        isEdit: true,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <h3>Add a new employee</h3>
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={this.handleChangeInput}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.handleChangeInput}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                className="form-control"
                name="age"
                placeholder="Age"
                value={this.state.age}
                onChange={this.handleChangeInput}
              />
            </div>
            <div className="form-group col-md-8">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                placeholder="Address"
                value={this.state.address}
                onChange={this.handleChangeInput}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              {!this.state.isEdit ? 'ADD' : 'UPDATE'}
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Form;
