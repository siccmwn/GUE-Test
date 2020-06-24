'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => {
  return { message: 'It Works!' };
});

Route.group(() => {
  Route.post('login', 'UserController.login');
}).prefix('api/auth');

Route.group('/', () => {
  Route.get('employees', 'EmployeeController.index').middleware('guest');
  Route.get('employee/:id', 'EmployeeController.show').middleware('guest');
  Route.post('employee', 'EmployeeController.store').middleware('auth');
  Route.put('employee/:id', 'EmployeeController.update').middleware('auth');
  Route.delete('employee/:id', 'EmployeeController.destroy').middleware('auth');
}).prefix('api/v1');
