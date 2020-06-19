module.exports.index = function(application, req, res){
	
		res.render('index');
	
	}

module.exports.autenticar = function(application, req, res){
	
	var dadosForm = req.body;
	
	//validação dos dados....
	
	
	var connection = application.config.dbConnection;
	var usuariosDao = new application.app.models.UsuariosDAO(connection);
	
	usuariosDao.autenticar(dadosForm, req, res);
	
	
	}
