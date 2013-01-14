var Application = require( '../application' );

module.exports = Application.extend({

  new : function ( req, res, next ){
    res.render( 'admin/artists/new' );
  },

  create : function ( req, res, next ){
    res.render( 'admin/artists/create' );
  },

  index : function ( req, res, next ){
    res.render( 'artists/index', {
      _assets          : 'admin/artists/assets/_index',
      is_authenticated : req.session.is_authenticated
    });
  },

  show : function ( req, res, next ){
    res.render( 'artists/show', {
      _assets          : 'admin/artists/assets/_show',
      is_authenticated : req.session.is_authenticated
    });
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
