const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",                   // Acessar arquivo de configuração do MySQL (my.ini) e deixar a senha vazia! ("password	=") 
  database: "SudoSuCRUD",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// REGISTERS SESSION
app.get("/mock_data", (req, res) => {
  const sqlSelect = "SELECT * FROM mock_data";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
})

app.post("/api/insert", (req, res) => {
  const email = req.body.email;
  const first_name = req.body.first_name;

  const sqlInsert = "INSERT INTO mock_data (email, first_name) VALUES (?,?)";
  db.query(sqlInsert, [email, first_name], (err, result) => {
    console.log(result);
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM mock_data WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/api/update", (req, res) => {
  const first_name =  req.body.first_name;
  const last_name = req.body.last_name;
  const email =  req.body.email;
  const id = req.body.id;

  db.query(
    "UPDATE mock_data SET first_name = ?, last_name = ?, email = ? WHERE id = ?",
    [first_name, last_name, email, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );

});

app.listen(3001, () => {
  // Showing on terminal
  console.log("Wow! The server started! Running on port 3001")
});
///////////////////////



// LOGIN SYSTEM SESSION

///////////////////////



/* DataBase Structure:

  Database name: SudoSuCRUD
  Table 1: mock_data
    Column 1: id
    Column 2: first_name
    Column 3: email

  Table 2: users
    Column 1: id
    Column 2: username
    Column 3: password

  We used XAMPP 

*/