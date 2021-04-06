const connection = require('../DBMS/ConnessioneDB');
const express = require('express');
const router = express.Router()
router.use(express.json());
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//seleziona tutte le persone
router.get('/utenti',(req,res)=>{ //req e res sono i due oggetti request e response del protocollo http.
  let sql ='select * from tab_credenziali';
  let query = connection.query(sql,(err,result)=>
  {
    res.setHeader('Content-Type', 'application/json');//setto l'header del json? ma quelle sono parole chiavi!
      if(err) {res.status(500).send(JSON.stringify({"Errore": err }));} 
      else
      {
       res.json(result); //così res mi serializza l'oggetto automaticamente in json.
      }
  });
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//seleziona una persona per id:
router.get('/utenti/:NomeUtente',(req,res)=>
{
  NomeUtente=[req.params.NomeUtente];

  trovato=(CercaUtente(NomeUtente,function(RisultatoFunzione) //uso questa funzione callback!
   {
     if(RisultatoFunzione)
     {
        try
        {
          connection.query('SELECT IdUtente,NomeUtente,PasswordUtente FROM tab_credenziali where NomeUtente = ?',NomeUtente,(err,row,result)=>
          {
            if(!err)
            {
              res.json("Trovato\nId:"+row[0].IdUtente+"\nNomeUtente: "+row[0].NomeUtente+"\nPasswordUtente: "+row[0].PasswordUtente); 
            }
            else 
            { //Errore in generale:
              res.json("Errore nella ricerca:"+err );
            }
          });
        }
        catch(err)
        {
          console.log("Errore"+err);
          res.status(500).send(JSON.stringify({"Errore": err }));
        }
     }
     else
     {
      res.json("Utente NON TROVATO!"); 
     }
  }));

});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
router.post('/inserisciutente',(req, res)=> 
{
   let Nome=req.body.nomeUt;
   let Password=req.body.passwordUt;
  
   trovato=(CercaUtente(Nome,function(RisultatoFunzione) //uso questa funzione callback!
   {
     if(RisultatoFunzione)
     {
      res.json("Utente già presente!!!");
     }
     else
     {
      let sql = `INSERT INTO tab_credenziali (NomeUtente, PasswordUtente) VALUES(?, ?)`;
      connection.query(sql, [Nome , Password], (err, result,response) =>
      { //con stringify trasformo il json in stringa ma è sempre un json (però dentro è formato da stringhe)!!
        if (err) {res.status(500).send(JSON.stringify({"Errore":err }));} 
        else {res.json("Utente inserito!");}
      });
     }
   }));

});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//route for delete data
router.delete('/eliminautente', function (req, res)  
{
  var url = require('url');
  var parts = url.parse(req.url, true);
  Nome=parts.query.NomeUtente;
  //console.log(parts);
  //console.log(parts.query.NomeUtente); //stampa il nome utente passato nella richiesta

  trovato=(CercaUtente(Nome,function(RisultatoFunzione) //uso questa funzione callback!
  {
    if(RisultatoFunzione)
    {
      connection.query(`DELETE FROM tab_credenziali WHERE NomeUtente=?`, [Nome],
      function (error) 
      {
        if (error) {throw error}
        else {res.json('Utente: '+Nome+" è stato eliminato!");}
      });
    }
    else //NomeUtente non trovato!
    {
      res.json('Utente: '+Nome+" NON TROVATO!!");
    }
  }));
  
 });
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function CercaUtente(Nome,callback)
 {//tutte le funzioni che lavorano con mysql sono delle callback.
  try //quindi aposto dei return ci vanno le "callback".
  {
    connection.query('SELECT COUNT(NomeUtente)as Contatore FROM tab_credenziali where NomeUtente = ?',Nome,(err,row,result)=>
    {
      //console.log("row "+row[0].Contatore);
      if(row[0].Contatore>0)
      {
        console.log("TROVATO!!!!")
        callback(true);
      }
      else
      {
        console.log("NON TROVATO!!!");
        callback(false);
      }
    });
  }
  catch(err)
  {
    console.log("Errore ricerca"+err);
    callback(false);
  }
  return false;
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports=router;