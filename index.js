const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
let MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
let uri = process.env.DB_PATH;


const app = express();
app.use(cors())
app.use(bodyParser.json())

let client = new MongoClient(uri, { useNewUrlParser: true });
const users = ['akhyar', 'ronjon', 'Amrita', 'Kata', 'Laga', 'Hailagas']
const dbOnline = 'dbOnline'
const pass = 'rejaul4518'

//Database Connection


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://dbOnline:rejaul4518@cluster0-f1g9k.mongodb.net/test?retryWrites=true&w=majority";
// const instance = new MongoClient(uri, { useNewUrlParser: true });
// const connection = instance.connect();
// connection.then((err, client) => {
//     if(err) console.log('failed to connect')
//     else{
//         console.log('connected')
//         const collection = client.db("test").collection("devices");
//         connection.close();
//     }
    
//     // perform actions on the collection object
    
// });




app.get("/products", (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineP").collection("products");
        collection.find({ name: "Laptop" }).limit(5).toArray((err, documents) => {
            if (err) {
                console.log(err);
                res.status(500).send({ message: err });
            }
            else {
                res.send(documents);
            }
        })
        client.close();
    });
});

// app.get("/fruits/banana", (req, res) => {
//     const fruit2 = {
//         fruit: "pineapple",
//         price: 22,
//         fruit2: "malta",
//         price: 33
//     }
//     res.send(fruit2)
// });

app.get("/users/:id", (req, res) => {
    const Id = req.params.id;
    const name = users[Id];
    res.send({ Id, name })
})

//Post
app.post('/addProducts', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    const product = req.body;
    
    client.connect(err => {
        let collection = client.db("onlineP").collection("products");
        collection.insertOne(product, (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send({message:err});
            }
            else{
                console.log('data inserted successfully', result);
                res.send(result.ops[0]);
            }
        })
        client.close();
    });
 });

const port = process.env.PORT || 4200
app.listen(port, () => console.log('Listening to port 4200'))
