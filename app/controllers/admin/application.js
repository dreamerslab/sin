var Application = require( '../application' );
var Live        = Model( 'Live' );

module.exports = Application.extend({

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