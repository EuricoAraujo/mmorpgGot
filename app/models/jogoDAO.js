function jogoDAO(connection){
	this._connection = connection();
	
	}

jogoDAO.prototype.gerarParametros = function(usuario){
	this._connection.open(function(err, mongoclient){
		mongoclient.collection('jogo',function(err, collection){
			collection.insert({
				usuario : usuario,
				moeda :15,
				suditos : 10,
				temor : Math.floor(Math.random()  * 1000),
				sabedoria : Math.floor(Math.random()  * 1000),
				comercio : Math.floor(Math.random()  * 1000),
				magia : Math.floor(Math.random()  * 1000)
				});
			mongoclient.close();
			
			});
		
		});
	
	}
	
jogoDAO.prototype.iniciaJogo = function(usuario, res, casa){
	this._connection.open(function(err, mongoclient){
		mongoclient.collection('jogo',function(err, collection){
			collection.find({usuario : usuario}).toArray(function(err, result){
				//console.log(result);
				res.render('jogo', {img_casa : casa, jogo: result[0]});
				mongoclient.close();
				});						
			});		
		});		
	}
	
jogoDAO.prototype.acao = function(acao){
	
	this._connection.open(function(err, mongoclient){
		mongoclient.collection('acao', function(err, collection){
			
			var date = new Date();
			var tempo = null;
			
			switch(parseInt(acao.acao)){
				case 1: tempo = 1 * 60 * 60000;break;
				case 2: tempo = 2 * 60 * 60000;break;
				case 3: tempo = 3 * 60 * 60000;break;
				case 4: tempo = 4 * 60 * 60000;break;
				}
			
			
			acao.acao_termina_em = date.getTime() + tempo;
			
			collection.insert(acao);
			
			
			});
		
			mongoclient.collection('jogo',function(err, collection){
				var moeda = null;
			switch(parseInt(acao.acao)){
				case 1: moeda = -2 * acao.quantidade;break;
				case 2: moeda = -3 * acao.quantidade;break;
				case 3: moeda = -1 * acao.quantidade;break;
				case 4: moeda = -1 * acao.quantidade;break;
				}				
				
				collection.update({usuario : acao.usuario},
				{$inc : {moeda : moeda}}
				);
				
				});
		
		mongoclient.close();
		
		});
	
	
	}

jogoDAO.prototype.getAcoes = function(acao, res){
	this._connection.open(function(err, mongoclient){
		mongoclient.collection('acao',function(err, collection){
			var date = new Date();
			var momento_atual = date.getTime();
			collection.find({usuario : acao, acao_termina_em :{$gt : momento_atual}}).toArray(function(err, result){
				res.render('pergaminhos', {acoes : result});
				
				});						
			});		
		});	
	
	}


module.exports = function(){
	
	return jogoDAO;
	
	}
