'use strict';

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */

const User = use('App/Models/User');

class UserSeeder {
  async run() {
    const dummy = new User();
    dummy.username = 'user1';
    dummy.email = 'user1@mail.com';
    dummy.password = 'u12345';

    dummy.save();
  }
}

module.exports = UserSeeder;
