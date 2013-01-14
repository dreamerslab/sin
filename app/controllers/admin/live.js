var Application = require( '../application' );

module.exports = Application.extend({

  new : function ( req, res, next ){
    res.render( 'admin/live/new' );
  },

  create : function ( req, res, next ){
    res.render( 'admin/live/create' );
  },

  index : function ( req, res, next ){
    res.render( 'live/index', {
      _assets          : 'admin/live/assets/_index',
      is_authenticated : req.session.is_authenticated
    });
  },

  edit : function ( req, res, next ){
    res.render( 'admin/live/edit' );
  },

  update : function ( req, res, next ){
    res.render( 'admin/live/update' );
  },

  destory : function ( req, res, next ){
    res.render( 'admin/live/destory' );
  }
});
