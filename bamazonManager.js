var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'chad444',
    database: 'Bamazon'
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

});

 function run() { inquirer.prompt ({ 
           type: "list",
           name: "method",
           message: "Would you like to view products, view low inventory, add inventory or add a new product?",
           choices: ['View Products', 'View Low Inventory', 'Add to Inventory','Add New Product']
       }).then function(answer){

 if (answer.method) === 'View Products'

} 