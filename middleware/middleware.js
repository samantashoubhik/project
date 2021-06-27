const express = require("express");

const middlewares = [express.json({ extendend: false })];

module.exports = (app) => {
  middlewares.forEach((middleware) => {
    app.use(middleware);
  });
};
