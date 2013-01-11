var Application = require( CONTROLLER_DIR + 'application' );

module.exports = Application.extend({

  new : function ( req, res, next ){
    res.render( 'admin/news/new' );
  },

  create : function ( req, res, next ){
    res.render( 'admin/news/create' );
  },

  index : function ( req, res, next ){
    res.render( 'news/index', {
      _assets          : 'admin/news/assets/_index',
      is_authenticated : req.session.is_authenticated
    });
  },

  show : function ( req, res, next ){
    res.render( 'news/show', {
      _assets          : 'admin/news/assets/_show',
      is_authenticated : req.session.is_authenticated
    });
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
