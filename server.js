const express = require("express");

const mysql = require("mysql");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
var bodyParser = require("body-parser");
const app = express();
const router = express.Router();
app.use(cors());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "GethHired"
});

connection.connect(function(err) {
  err ? console.log(err) : console.log(connection);
});


app.get("/jobs", function(req, res) {
    connection.query(
      "select vr_id,swarm_id from Validation_Requests where company_id IS NULL or company_id=''",
      function(err, results) {
        err ? res.send(err) : res.json({ data: results });
      }
    );
  });

app.put('/CompanyEntry/', function (req, res) {
  console.log(req.body.company_id);
      connection.query ('UPDATE Validation_Requests SET company_id= ? WHERE vr_id = ?',[req.body.company_id,req.query.id],function(error,results,fields) {
     if (error) throw error;
     res.end(JSON.stringify(results));
   });
  });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
