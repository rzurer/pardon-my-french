function initialize(webServer, model) {

  webServer.get('/', function(req, res) {
    res.render('index');
  });

  webServer.get('/sayings', function(req, res) {
      var newSaying;
      newSaying = new model.Saying();
      renderSayings(res, newSaying);
  });

  function renderSayings(res, newSaying) {
      model.getAllSayings(function (sayings) {      
      res.render('sayings', {newSaying: newSaying, sayings : sayings});
    });
  }

  webServer.post('/saveSaying', function(req, res) {
    	var text, id, newSaying, saying;
      text = req.param('text');
      id  = req.param('id');
      saying = new model.Saying({_id:id, text: text})
      newSaying = new model.Saying();
      model.upsertSaying( id, saying, function(){
        renderSayings(res, newSaying);    
      });
  });
}
exports.initialize = initialize;