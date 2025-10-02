module.exports = {
  getTestUser() {
    const timestamp = Date.now();
    return {
      email: `testuser${timestamp}@test.com`,
      password: 'Test123!',
      firstName: 'Test',
      lastName: 'User'
    };
  }
};
