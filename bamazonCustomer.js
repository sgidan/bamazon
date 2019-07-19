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

        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is the ID of the product you would like to buy?",
                    name: "request_id"
                },
                {
                    type: "input",
                    message: "How many units of the product would you like to buy?",
                    name: "request_units"
                }
            ])

            .then(function (inquirerResponse) {
                console.log(inquirerResponse)
                var custReqUnit = inquirerResponse.request_units;
                var custReqId = inquirerResponse.request_id;

                connection.query("SELECT * FROM products WHERE item_id=?", [custReqId], function (err, res) {
                    if (err) throw err;
                    var currentSQ = res[0].stock_quantity;
                    var price = res[0].price;
                    console.log(custReqUnit)
                    console.log(currentSQ)
                    if (custReqUnit > currentSQ) {
                        console.log("Insufficient Quantity!")
                        //if there IS enough
                    }
                    else {
                        var stockLeft = parseInt(currentSQ) - parseInt(custReqUnit)
                        updateProduct(stockLeft, custReqId);
                        // console.log(price, custReqUnit)
                        total(price, custReqUnit);
                        connection.end();
                    };
                });
            });
    });
}

function updateProduct(stockLeft, custReqId) {
    console.log("Filling your order!\n Updating stock quantity...\n");

    console.log("---------------------------")
    console.log(stockLeft)
    var query = connection.query("UPDATE products SET ? WHERE ?",
        [{ stock_quantity: stockLeft },
        { item_id: custReqId }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated!\n");
        });

    console.log(query.sql);

}
function total(price, custReqUnit) {
    totalCost = parseFloat(price) * parseFloat(custReqUnit);
    console.log(totalCost)
    console.log(price)
    console.log("Your total: $" + totalCost)

}