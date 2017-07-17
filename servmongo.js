var mongoose = require('mongoose');
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/maDB17');
var persoSchema=mongoose.Schema({
	nom : String,
	prenom : String,
	age : String,
	poids : String
});
var Perso=mongoose.model('Perso',persoSchema);

//gestion du serveur HTTP
var express = require('express');
var app = express();
app.use('/javascript', express.static(__dirname + '/javascript'));
app.use('/lib', express.static(__dirname + '/lib'));
app.use(bodyParser());
app.get('/', function (req, res) {
res.sendfile(__dirname + '/app/exmongo.html');
});
app.post('/api/chercher/:nom',function(req, res){
		Perso.find({nom:req.params.nom}).exec(function(err,resultat){
			if (err==true){
				res.send('err');
			}
			else{
				res.json(resultat);
			}
	})
});
app.get('/api/affiche', function(req, res) {
	Perso.find(null).exec(function(err,fiches){
			if (err==true){
				res.send('err');
			}
			else{
				res.json(fiches);
			}
	})
});
app.post('/api/formulaire', function(req,res) {
//création d'un nouveau document destiné à la DB
var nouveauPerso=new Perso({
	nom:req.body.nom,
	prenom:req.body.prenom,
	age:req.body.age,
	poids:req.body.poids
});
//enregistrement dans la DB
nouveauPerso.save(function(err){
if (err){
	res.send('err');
}
else{
	res.send();
}
})
});

app.put('/api/edit/:id', function(req, res){
	Perso.update({_id:req.params.id},{nom:req.body.nom, prenom:req.body.prenom, age:req.body.age, poids:req.body.poids}).exec(function(err){
		if(err==true){
					res.send('err');
					}
		else{
					res.send();
					}
		});
});

app.delete('/api/suppr/:id', function(req, res) {
	Perso.remove({_id:req.params.id}).exec(function(err){
	if (err==true){
		res.send('err');
	}
	else{
		res.send('');
	}
	})
});
app.listen(8080);

console.log("Serveur démaré au port 8080");
