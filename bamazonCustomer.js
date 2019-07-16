var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "haters82",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
}

inquirer
  .prompt([
    {
        type: "input",
        message: "What is the ID of the product you would like to buy?",
        name: "item_id"
      },
      {
        type: "input",
        message: "How many units of the product would you like to buy?",
        name: "item_units"
      }
  ])