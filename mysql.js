const express = require('express');
const mysql = require('mysql2');


const app = express();
app.use(express.json());

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "db_food",
    port: 3306
})

app.listen(8080);


app.get("/test", async (req, res) => {

    // conn.query("SELECT * FROM food", (err, result) => {
    //     res.send(result);
    // });

    const data = await conn.promise().query("SELECT * FROM user WHERE full_name = 'Tony'");

    res.status(200).send(data[0]);

})
//lấy user theo tên
app.get("/getUserByName/:name", async (req, res) => {
    try {
        let { name } = req.params;

        let query = `SELECT * FROM user WHERE full_name LIKE '%${name}%'`;

        const data = await conn.promise().query(query);

        if (data[0])
            res.status(200).send(data[0]);
        else
            res.status(400).send("Không tìm thấy");

    } catch {
        res.status(500).send("Err");
    }

})

//POST: Thêm user
app.post("/createUser", async (req, res) => {
    let { full_name, email, pass_word } = req.body;

    const query = `INSERT INTO user VALUES (0,'${full_name}','${email}','${pass_word}')`;

    const data = await conn.promise().query(query);

    res.status(200).send(data);
})

//PUT: update user

app.put("/updateUser/:id", async (req, res) => {
    let { id } = req.params;
    let { full_name, email, pass_word } = req.body;

    const query = `UPDATE user SET full_name = '${full_name}' , email = '${email}' , pass_word = '${pass_word}' WHERE user_id = ${id} `;

    const data = await conn.promise().query(query);

    res.status(200).send(data);
})