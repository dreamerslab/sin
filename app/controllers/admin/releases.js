var Application = require( CONTROLLER_DIR + 'application' );

module.exports = Application.extend({

  new : function ( req, res, next ){
    res.render( 'admin/release/new' );
  },

  create : function ( req, res, next ){
    res.render( 'admin/release/create' );
  },

  index : function ( req, res, next ){
    res.render( 'admin/release/index' );
  },

  show : function ( req, res, next ){
    res.render( 'admin/release/show' );
  },

  edit : function ( req, res, next ){
    res.render( 'admin/release/edit' );
  },

  update : function ( req, res, next ){
    res.render( 'admin/release/update' );
  },

  destory : function ( req, res, next ){
    res.render( 'admin/release/destory' );
  }
});
