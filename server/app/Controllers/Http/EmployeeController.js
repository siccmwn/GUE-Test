'use strict';
const Employee = use('App/Models/Employee');

/**
 * Resourceful controller for interacting with employees
 */
class EmployeeController {
  /**
   * Show a list of all employees.
   * GET employees
   */
  async index({ request, response, view }) {
    const pagination = request.only(['page', 'limit']);
    const page = pagination.page ? pagination.page : 1;
    const limit = pagination.limit ? pagination.limit : 5;
    const employees = await Employee.query()
      .orderBy('id', 'asc')
      .paginate(page, limit);

    return response.json(employees.toJSON());
  }

  /**
   * Create/save a new employee.
   * POST employees
   */
  async store({ request, response }) {
    const { firstName, lastName, age, address } = request.post();
    const employee = await Employee.create({
      firstName,
      lastName,
      age,
      address,
    });
    response.status(201).json({
      message: 'Successfully create.',
      data: employee.toJSON(),
    });
  }

  /**
   * Display a single employee.
   * GET employees/:id
   */
  async show({ params, request, response, view }) {
    const employee = await Employee.find(params.id);
    if (employee) {
      response.json(employee.toJSON());
    } else {
      response.status(404).json({
        message: 'Not found.',
        id: +params.id,
      });
    }
  }

  /**
   * Update employee details.
   * PUT or PATCH employees/:id
   */
  async update({ params, request, response }) {
    const data = request.only(['firstName', 'lastName', 'age', 'address']);
    const employee = await Employee.find(params.id);

    if (employee) {
      employee.merge(data);
      await employee.save();
      response.json({ message: 'Successfully update.', data: employee });
    } else {
      response.status(404).json({
        message: 'Not found.',
        id: +params.id,
      });
    }
  }

  /**
   * Delete a employee with id.
   * DELETE employees/:id
   */
  async destroy({ params, request, response }) {
    const employee = await Employee.find(params.id);

    if (employee) {
      await employee.delete();
      response.json({
        message: 'Successfully delete.',
        id: +params.id,
      });
    } else {
      response.status(404).json({
        message: 'Not found.',
        id: +params.id,
      });
    }
  }
}

module.exports = EmployeeController;
