const api =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:8080/Project1'
    : `http://${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/Project1`;

console.log('apiiii', api);

console.log('NODE_ENV', process.env.NODE_ENV);
module.exports = {
  api,
};
