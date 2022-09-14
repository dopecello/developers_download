const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");
const exhbs = require("express-handlebars")

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server active on Port ${PORT}`));
});
