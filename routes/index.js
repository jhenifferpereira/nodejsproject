var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res){
  global.db.findAll((err, docs) => {
    if (err) {return console.log(err);}
    res.render('index', { docs });
  });
});

module.exports = router;

router.get('/novo', function(req, res, next){
  res.render('novo', {title: 'Novo Cadastro de Cliente', doc:{"nome":"", "idade": "", "uf":""}, action: '/novo'});
});

router.post('/novo', function (req, res, next){
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf;
  global.db.insert({nome, idade, uf}, (err, result) => {
    if (err) {return console.log(err);}
    res.redirect('/');
  });
});

router.get('/delete/:id', function (req, res){
  var id = req.params.id;
  global.db.deleteOne(id, (err, r) => {
    if (err) {return console.log(err); }
    res.redirect('/');
  });
});

router.get('/edit/:id', function(req, res, next){
  var id = req.params.id;
  global.db.findOne(id, (err, docs) => {
    if(err) {return console.log(err);}
    res.render('novo', {title: 'Alterar Cliente', doc: docs[0], action: '/edit/' + docs[0]._id});
  });
});

router.post('/edit/:id', function(req, res, next){
  var id = req.params.id;
  var nome = req.body.nome;
  var idade = parseInt(req.body.idade);
  var uf = req.body.uf;
  global.db.update(id, {nome, idade, uf}, (err, result) => {
    if(err) {return console.log(err);}
    res.redirect('/');
  });
});




