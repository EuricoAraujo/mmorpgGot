module.exports.jogo = function(application, req, res){
	
	if(req.session.autorizado !== true){
		
		res.send('usuario precisa fazer login');
		return;
	}
	var usuario = req.session.usuario;
	var casa    = req.session.casa;
	
	var connection = application.config.dbConnection;
	var jogoDAO = new application.app.models.jogoDAO(connection);
	
	jogoDAO.iniciaJogo(usuario, res, casa);

	}

module.exports.sair = function(application, req, res){
	
	req.session.destroy(function(err){
		
	res.render('index');	
		
		});
	
	}

module.exports.suditos = function(application, req, res){
	
	if(req.session.autorizado !== true){
		
		res.send('usuario precisa fazer login');
		return;
	}
	
	res.render('aldeoes', {validacao : {}});
	
	}
	
module.exports.pergaminhos = function(application, req, res){
	if(req.session.autorizado !== true){
		
		res.send('usuario precisa fazer login');
		return;
	}
	
	
	var connection = application.config.dbConnection;
	var jogoDAO    = new application.app.models.jogoDAO(connection);
	var usuario = req.session.usuario;
	
	
	jogoDAO.getAcoes(usuario, res);
	
	//res.render('pergaminhos', {validacao : {}});
	
	}
module.exports.ordenar_acao_sudito = function(application, req, res){
	
	var dadosForm = req.body;
	
	//validação....
	
	var connection = application.config.dbConnection;
	var jogoDAO = new application.app.models.jogoDAO(connection);
	dadosForm.usuario = req.session.usuario;

	jogoDAO.acao(dadosForm);
	res.redirect('jogo');
	
	}
