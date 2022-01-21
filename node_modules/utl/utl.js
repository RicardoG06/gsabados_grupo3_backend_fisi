var _ = require('underscore')
var utl;
module.exports = utl = {}

//ls: List directories and files from paths asynchronously
//  options.fileFilter: accept those files that return true
//  options.dirFilter: accept those directories that return true
//  options.recurse: boolean to indicate recursion is desired
utl.ls = function(paths, options, cb){
  var breakIfDone, p, pending, _fn, _j, _len1, _ref1, _ref2, _ref3, _ref4;

  if (!_.isArray(paths))
    paths = [paths];

  if (_.isFunction(options)){
    cb = options;
    options = {};
  }
  if (options == null){
    options = {};
  }
  if ((_ref1 = options.results) == null){
    options.results = {
      files: [],
      directories: []
    };
  }
  if ((_ref2 = options.recurse) == null){
    options.recurse = false;
  }
  if ((_ref3 = options.fileFilter) == null){
    options.fileFilter = function(){
      return true;
    };
  }
  if ((_ref4 = options.dirFilter) == null){
    options.dirFilter = function(){
      return true;
    };
  }
  pending = paths.length;
  breakIfDone = function(){
    if (pending === 0){
      options.results.files = _.uniq(_.filter(options.results.files, options.fileFilter));
      options.results.directories = _.uniq(options.results.directories);
      cb(null, options.results);
    }
  };
  _fn = function(p){
    return fs.stat(p, function(err, stat){
      if (!(stat != null ? stat.isDirectory() : void 0)){
        options.results.files.push(p);
        return breakIfDone(--pending);
      } else {
        if (options.dirFilter(path.basename(p))){
          options.results.directories.push(p);
          fs.readdir(p, function(errReadDir, paths_){
            var p_, _k, _len2, _results;

            if (errReadDir){
              return cb(errReadDir);
            }
            paths_ = fullPaths(paths_, p);
            pending += paths_.length;
            _results = [];
            for (_k = 0, _len2 = paths_.length; _k < _len2; _k++){
              p_ = paths_[_k];
              _results.push((function(p_){
                return fs.stat(p_, function(errStat, stat_){
                  if (errStat){
                    return cb(errStat);
                  }
                  if (!(stat_ != null ? stat_.isDirectory() : void 0)){
                    options.results.files.push(p_);
                    breakIfDone(--pending);
                    return;
                  }
                  if (options.recurse){
                    ls(p_, options, function(){
                      return breakIfDone(--pending);
                    });
                  } else {
                    breakIfDone(--pending);
                  }
                });
              })(p_));
            }
            return _results;
          });
          return breakIfDone(--pending);
        }
      }
    });
  };
  for (_j = 0, _len1 = paths.length; _j < _len1; _j++){
    p = paths[_j];
    _fn(p);
  }
  breakIfDone();
};

// utl.lsWatch = function(paths, options, cb){
//   options = _.extend({}, {
//     recurse: options.recurse,
//     fileFilter: function(f){
//       return function(){return true;}
//     }
//   });
//   ls(paths, options, function(err, results){
//     return cb(err, results.files, results.directories);
//   });
// };

// download: download the url to string
utl.download = function(url, cb){
  var options = require('url').parse(url),
  httpx = url.startsWith(url, 'https:') ? https : http,
  data = "",
  req = httpx.request(options, function(res){
    res.setEncoding("utf8")
    res.on("data", function(chunk){
      return data += chunk;
    })
    return res.on("end", function(){
      return cb(null, data, url);
    })
  })
  return req.end()
};

// load: load a file into a string
utl.load = function(filepath, cb){
  return fs.readFile(filepath, "utf8", cb)
};

utl.loadSync = function(filePath){
  return fs.readFileSync(filePath, 'utf8')
};


var code = {
  reset: '\u001b[0m',
  black: '\u001b[30m',
  red: '\u001b[31m',
  green: '\u001b[32m',
  yellow: '\u001b[33m',
  blue: '\u001b[34m',
  magenta: '\u001b[35m',
  cyan: '\u001b[36m',
  gray: '\u001b[37m'
};

utl.fail = function(message, fn){throw new Error(message)}

utl.assert = function(condition, message, fn){if(!condition){utl.fail(message, fn);}}

utl.log = function(message, color, explanation){
  return console.log(code[color] + message + code.reset + ' ' + (explanation || ''))
};

utl.error = function(message, explanation){
  return utl.log(message, 'red', explanation)
};

utl.info = function(message, explanation){
  return utl.log(message, 'cyan', explanation)
};

utl.warn = function(message, explanation){
  return utl.log(message, 'yellow', explanation)
};

utl.run = function(cmd, args, options, callback){
  var app;
  if (args == null)
    args = [];

  if (callback == null)
    callback = function(){}

  if (_.isFunction(options)){
    callback = options;
    options = {};
  }
  utl.info("[" + (envFromObject(options != null ? options.env : void 0)) + cmd + " " + (args.join(' ')) + "]");
  app = spawn(cmd, args, options);
  app.stdout.pipe(process.stdout);
  app.stderr.pipe(process.stderr);
  return app.on('exit', function(status){
    if (status === 0){
      return callback();
    }
  });
};
