'use strict';
function initialize(app, model) {
    function renderSayings(res) {
        model.sayingmodel.getAllSayings(function (sayings) {
            var newSaying = model.sayingmodel.createSaying();
            res.render('sayings', {newSaying: newSaying, sayings : sayings});
        });
    }
    app.get('/', function (req, res) {
        res.render('index');
    });
    app.get('/sayings', function (req, res) {
        renderSayings(res);
    });
    app.post('/saveSaying', function (req, res) {
        var text, id, saying;
        text = req.param('text');
        id  = req.param('id');
        saying = model.sayingmodel.createSaying({_id : id, text : text});
        model.sayingmodel.upsertSaying(id, saying, function () {
            renderSayings(res);
        });
    });
}
exports.initialize = initialize;