var mysql = require('mysql');
var inquirer = require('inquirer');

// connection to sql database created 
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'chad444',
    database: 'Bamazon'
});

//connection to database successful 
connection.connect(function(err) {
    console.log('first');
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    choose(); // call this function inside the callback so that you connect to the database before getting any answers to any questions 
});

//variable that holds the two question that are prompted to the user; user enters answers 
const questions = [{
    type: 'input',
    name: 'question',
    message: 'What item would you like to buy?'
}, {
    type: 'input',
    name: 'question2',
    message: 'How many units would you like to buy?'
}];

// function allows user to choose products and quantities. 
function choose() {
    inquirer.prompt(questions).then(function(answer) {
        // answers.push(answer);
        checkProductQuantity(answer.question, answer.question2);
    });
}

// compares quantity requested with stock quantity in the sql database 
function checkProductQuantity(product_name, quantity) {
    console.log(product_name, quantity);
    connection.query("SELECT stock_quantity, price FROM products WHERE product_name = ?", [product_name], function(err, res) {
        if (err) throw err;
        var stock = res[0].stock_quantity;
        console.log(stock);
        if (stock >= quantity) {
            updateStock(product_name,(stock - quantity),res[0].price * quantity);
        } else {
            console.log("Insufficient quantity!!!");
        }
    });
}

//updates the database with new quantity is order is placed and gives user the total owed.
function updateStock(product_name, new_quantity, total) {
    console.log(product_name, new_quantity, total); 
    connection.query("UPDATE products SET stock_quantity = ? WHERE product_name = ?", [new_quantity, product_name], function(err, res) {
        if (err) {
            throw err;
        } else {
            console.log('your total is '+ total);
        }
    });

   connection.end();
}


