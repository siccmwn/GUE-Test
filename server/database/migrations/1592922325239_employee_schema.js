'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class EmployeeSchema extends Schema {
  up() {
    this.create('employees', (table) => {
      table.increments();
      table.string('firstName', 60).notNullable();
      table.string('lastName', 60).notNullable();
      table.integer('age').notNullable();
      table.string('address', 60).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('employees');
  }
}

module.exports = EmployeeSchema;
