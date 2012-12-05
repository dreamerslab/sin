var Application = require( CONTROLLER_DIR + 'application' );

module.exports = Application.extend({

  new : function ( req, res, next ){
    res.render( 'admin/artists/new' );
  },

  create : function ( req, res, next ){
    res.render( 'admin/artists/create' );
  },

  index : function ( req, res, next ){
    res.render( 'admin/artists/index' );
  },

  show : function ( req, res, next ){
    res.render( 'admin/artists/show' );
  },

  edit : function ( req, res, next ){
    res.render( 'admin/artists/edit' );
  },

  update : function ( req, res, next ){
    res.render( 'admin/artists/update' );
  },

  destory : function ( req, res, next ){
    res.render( 'admin/artists/destory' );
  }
});
