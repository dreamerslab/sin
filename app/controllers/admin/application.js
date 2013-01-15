var Application = require( '../application' );

module.exports = Application.extend({

  check_resources : function ( req, res, next ){
    res.local( 'header_admin_view', 'edit' );

    next();
  },

  current_live : function ( req, res, next ){
    next();
  },

  namespace : function ( req, res, next ){
    res.local( 'namespace', '/admin' );

    next();
  },

  is_authenticated : function ( req, res, next ){
    if( !req.session.is_authenticated ){
      return res.redirect( 'admin/login' );
    };

    res.local( 'is_authenticated', true );

    next();
  }
});