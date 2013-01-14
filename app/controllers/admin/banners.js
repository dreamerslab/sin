var Application = require( '../application' );

module.exports = Application.extend({

  edit : function ( req, res, next ){
    res.render( 'admin/artists/edit' );
  },

  update : function ( req, res, next ){
    res.render( 'admin/artists/update' );
  }
});
