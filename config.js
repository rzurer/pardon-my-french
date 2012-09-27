function configure(webServer, express, baseDir) {
  webServer.configure(function() {
    var pub = baseDir + '/public';
    webServer.set('views', baseDir + '/views');
    webServer.set('view engine', 'jade');
    webServer.use(express.bodyParser());
    webServer.use(express.logger());
    webServer.use(express.methodOverride());
    webServer.use(webServer.router);
    webServer.use(express.compiler({
      src: baseDir + '/public',
      enable: ['sass']
    }));
    webServer.use(express.static(pub));
  });

  webServer.configure('development', function() {
    webServer.use(express.errorHandler({
      dumpExceptions: true
    }));
  });
}
exports.configure = configure;