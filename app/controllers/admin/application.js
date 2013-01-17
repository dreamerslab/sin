var Application = require( '../application' );
var Live        = Model( 'Live' );

module.exports = Application.extend({

  current_lives : function ( req, res, next ){
    var args = {
      limit : 10,
      skip  : req.query.page || 0,
      cond  : req.query_cond
    };

    Live.index( args, next,
      function (){
        req.lives = [];
        next();
      },
      function ( lives ){
        req.lives = lives;
        next();
      }
    );

    next();
  },

  namespace : function ( req, res, next ){
    res.local( 'namespace', '/admin' );

    next();
  },

  is_authenticated : function ( req, res, next ){
    if( !req.session.is_authenticated ){
      return res.redirect( '/admin/login' );
    };

    res.local( 'is_authenticated', true );

    next();
  }
});