'use strict';

class UserController {
  async login({ request, auth }) {
    const { email, password } = request.all();
    return auth.authenticator('jwt').attempt(email, password);
  }
}

module.exports = UserController;
