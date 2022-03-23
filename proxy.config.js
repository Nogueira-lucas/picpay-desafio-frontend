const proxy = [
    {
      context: '/tasks',
      target: 'http://localhost:3000',
      pathRewrite: {'^/tasks' : ''}
    }
  ];
module.exports = proxy;
