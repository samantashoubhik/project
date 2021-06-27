const auth = require("./auth");

const routers = [
  {
    path: "/auth",
    hedelar: auth,
  },
];

module.exports = (app) => {
  routers.forEach((router) => {
    app.use(router.path, router.hedelar);
  });
};
