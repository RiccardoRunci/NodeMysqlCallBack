CREATE DATABASE IF NOT EXISTS dbprova;
SHOW DATABASES;
USE dbprova;

drop table tab_utenti;
CREATE TABLE tab_utenti (
IdUtente INT NOT NULL AUTO_INCREMENT,
NomeUtente VARCHAR(70) NOT NULL UNIQUE,
EmailUtente VARCHAR(70) NOT NULL,
PRIMARY KEY (IdUtente)
);
Describe  tab_utenti;

/*creo l'utente utenterootdbprova che vede solo il db dbprova con password:password*/
create user 'utenterootdbprova'@'localhost' identified by 'password';
/*dò tutti i privilegi all'utente utenterootdbprova sul db dbprova*/
grant all on dbprova.* to 'utenterootdbprova'@'localhost';

/*dò questo comando qui perchè viene fuori l'errore ER_NOT_SUPPORTED_AUTH_MODE*/
ALTER USER 'utenterootdbprova'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

drop table tab_credenziali;
CREATE TABLE tab_credenziali (
IdUtente INT NOT NULL AUTO_INCREMENT,
NomeUtente VARCHAR(40) NOT NULL UNIQUE,
PasswordUtente VARCHAR(120) NOT NULL,
PRIMARY KEY (IdUtente)
);
describe tab_credenziali;

insert into tab_credenziali (NomeUtente,PasswordUtente) values("MARCELLO","MARCELLO");
UPDATE tab_credenziali SET NomeUtente = 'Marco' WHERE IdUtente = 1;
UPDATE tab_credenziali SET PasswordUtente = 'Marco' WHERE IdUtente = 1;
select count(NomeUtente) as NumUtentiConQuelUserName from tab_credenziali where NomeUtente="Marco";
/*Altri esempi di query*/
ALTER TABLE tab_credenziali CHANGE COLUMN PasswordUtente PasswordUtente varchar(250) NOT NULL;
delete from tab_credenziali where IdUtente>3;