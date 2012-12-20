var Application = require( CONTROLLER_DIR + 'application' );

module.exports = Application.extend({

  new : function ( req, res, next ){
    res.render( 'admin/news/new' );
  },

  create : function ( req, res, next ){
    res.render( 'admin/news/create' );
  },

  index : function ( req, res, next ){
    res.render( 'admin/news/index' );
  },

  show : function ( req, res, next ){
    res.render( 'admin/news/show' );
  },

  edit : function ( req, res, next ){
    res.render( 'admin/news/edit' );
  },

  update : function ( req, res, next ){
    res.render( 'admin/news/update' );
  },

  destory : function ( req, res, next ){
    res.render( 'admin/news/destory' );
  }
});