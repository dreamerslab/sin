var Application = require( CONTROLLER_DIR + 'application' );

module.exports = Application.extend({

  new : function ( req, res, next ){
    res.render( 'admin/videos/new' );
  },

  create : function ( req, res, next ){
    res.render( 'admin/videos/create' );
  },

  index : function ( req, res, next ){
    res.render( 'videos/index', {
      _assets          : 'admin/videos/assets/_index',
      is_authenticated : req.session.is_authenticated
    });
  },

  edit : function ( req, res, next ){
    res.render( 'admin/videos/edit' );
  },

  update : function ( req, res, next ){
    res.render( 'admin/videos/update' );
  },

  destory : function ( req, res, next ){
    res.render( 'admin/videos/destory' );
  }
});