var Application = require( CONTROLLER_DIR + 'application' );

module.exports = Application.extend({

  new : function ( req, res, next ){
    res.render( 'admin/live/new' );
  },

  create : function ( req, res, next ){
    res.render( 'admin/live/create' );
  },

  index : function ( req, res, next ){
    res.render( 'admin/live/index' );
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
