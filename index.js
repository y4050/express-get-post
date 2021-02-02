const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const fs = require("fs");

// MiddleWare
// this will help us use our layout file
app.use(expressLayouts);
app.use(express.urlencoded({extended: false}));

// for views use .ejs files
app.set("view engine", "ejs");

// ROUTE
app.get("/", (req, res) => {
    res.send("Hi there");
});

// Index View
// this url: localhost:8000/dionsaurs
app.get("/dinosaurs", (req, res) => {
    // in our views folder render this page
    let dinos = fs.readFileSync("./dinosaurs.json");
    // take out data and put it in a more readable format
    dinos = JSON.parse(dinos);
    console.log(dinos);
    // in our views folder render this page
    res.render("dinosaurs/index", { dinos: dinos });
});

// New View
// Most specific url
app.get("/dinosaurs/new", (req, res) => {
    res.render("dinosaurs/new")
})

// SHOW View
app.get("/dinosaurs/:index", (req, res) => {
    let dinos = fs.readFileSync("./dinosaurs.json");
    // take out data and put it in a more readable format
    dinos = JSON.parse(dinos);
    // get the dino that's asked for
    const dino = dinos[req.params.index];
    res.render("dinosaurs/show", { dino });
});


// POST route, doesn't have a view
app.post("/dinosaurs", (req, res) => {
    let dinos = fs.readFileSync("./dinosaurs.json");
    // take our data and put in a more readable format
    dinos = JSON.parse(dinos);
    // construct a new dino with our req.body values
    const newDino = {
        name: req.body.name,
        type: req.body.type
    };
    // updates dinos with new dino
    dinos.push(newDino);
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinos));

    // get a request to /dinosaurs
    res.redirect("/dinosaur");
    // this is coming from our form submit
    // we are going to look at the req.body
    // console.log(req.body);

})



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on ${{PORT}}`);
});