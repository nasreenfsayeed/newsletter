const express = require("express");
const app = express();
const https = require("https");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const request = require("request");

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req, res) {
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const eMail = req.body.email;
    console.log(firstName, lastName, eMail);
    const data = {
        members: [
            {
                email_address: eMail,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/a3bbf999f5";
    const options = {
        method: "POST",
        auth: "Nasreen:eb16f8108f3df5370d2df162ebf0f4b4-us21"

    }

    const request = https.request(url, options, function(response) {

        if (response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }
        else 
        {
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});

app.post ("/failure", function(req, res) {
    res.redirect("/");
})

 app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running in port 3000.");

});

// eb16f8108f3df5370d2df162ebf0f4b4-us21
// Audience ID: a3bbf999f5