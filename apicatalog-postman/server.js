
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var request = require('request-promise').defaults({
    proxy: 'http://one.proxy.att.com:8080',
    strictSSL: false
});


require("dotenv").config();
app.use(bodyParser());

const port = process.env.PORT || 8080;




// CRUD Operation
// Create
// Read
// Update
// Delete

// Get data form another endpoint
// Proxy issue
const findAll = (data, res) => {
    try {
        const {
            url,

        } = data;

        console.log("URL: ", url);

        request({
            uri: url,
            method: "GET"
        })
            .then((response) => {
                const data = JSON.parse(response);
                res.json(data)
            })
            .catch((err) => {
                console.log("Error: ", err);
                const error = JSON.parse(err.response.body || err);
                res.status(409).json(error);
            });
    } catch (error) {
        console.log("Error: ", error);
    }
};




app.post("/apicatalog", (req, res) => {
    console.log("Body: ", req.body);

    switch (req.body.operation) {
        case "GET":
            findAll(req.body, res);

        case "POST":
        // TODO

        case "PUT":
        // TODO


        case "DELETE":
        // TODO

        default:
        // TODO

    }

});

// const dummy_data = {
//     url: 'ffafaffaaf',
//     context: 'faffaffa',
//     operation: 'fafaffaffa',
//     waittime: 'fafafaf',
//     authorization: 'fafafffa',
//     payload: 'fafaf',
//     header: 'afafaf'
// };



app.listen(port, () => {
    console.log("Server is starting at port ", port);
});


