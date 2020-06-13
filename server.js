// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
let customers = [
  {
    routeName: " ",
    name: " ",
    role: " ",
    age: "",
     
  },
  
];

let waitingList =  [
  {
    routeName: "",
    name: "",
    PhoneNumber: "",
    Email: "",
   
  },
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get("/add", (req, res) => res.sendFile(path.join(__dirname, "add.html")));


// Displays all characters
app.get("/api/characters", (req, res) => res.json(customers));


// Displays a single character, or returns false
app.get("/api/characters/:character", (req, res) => {
  const chosen = req.params.customer;

  console.log(chosen);

  for (var i = 0; i < customers.length; i++) {
    if (chosen === customers[i].routeName) {
      return res.json(customers[i]);
    }
    
  }
  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/characters", (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newCustomer = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newCustomer.routeName = newCustomer.name.replace(/\s+/g, "").toLowerCase();

  console.log(newCustomer);

  if (newCustomer.length() < 4) {
    customers.push(newCustomer);
  }
   else {
    customers.push(waitingList);
  }
   

  res.json(newCustomer);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => console.log("App listening on PORT " + PORT));

