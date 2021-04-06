/*PARTE DEL BACKEND!!!*/
const connection =require('./DBMS/ConnessioneDB');
const RouteTab_Utenti = require('./Route/Route-Tab_Utenti.js');
const RouteTab_credenziali= require ('./Route/Route-Tab_Credenziali.js');
const express = require('express'); 
const app = express();
const BodyParser =require('body-parser');
app.use(BodyParser.urlencoded({extended:true}));
const RoutePrimoC=express.Router();


const port = 8080;

app.listen(port, (req,res) => {
  console.log(`Express server listening on port ${port}`);
});
 
app.get("/", (req,res) => {
    console.log(`Route principale / `);
  });

//app.use prende tutte le richieste (get,post,delete,ecc..)
//app è l'istanza della classe express
app.use('/TabUtenti',RouteTab_Utenti);
app.use('/TabCredenziali',RouteTab_credenziali);