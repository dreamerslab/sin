var Application = require( CONTROLLER_DIR + 'application' );

module.exports = Application.extend({

  new : function ( req, res, next ){
    res.render( 'admin/releases/new' );
  },

  create : function ( req, res, next ){
    res.render( 'admin/releases/create' );
  },

  index : function ( req, res, next ){
    res.render( 'releases/index', {
      _assets          : 'admin/releases/assets/_index',
      is_authenticated : req.session.is_authenticated
    });
  },

  show : function ( req, res, next ){
    res.render( 'admin/releases/show' );
  },

  edit : function ( req, res, next ){
    res.render( 'admin/releases/edit' );
  },

  update : function ( req, res, next ){
    res.render( 'admin/releases/update' );
  },

  destory : function ( req, res, next ){
    res.render( 'admin/releases/destory' );
  }
});
