var Application = require( CONTROLLER_DIR + 'application' );

module.exports = Application.extend({

  index : function ( req, res, next ){
    res.render( 'admin/home/index' );
  },

  edit : function ( req, res, next ){
    res.render( 'admin/home/edit' );
  },

  update : function ( req, res, next ){
    res.render( 'admin/home/update' );
  }
});
