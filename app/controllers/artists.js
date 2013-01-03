var Application = require( CONTROLLER_DIR + 'application' );

module.exports = Application.extend({

  index : function ( req, res, next ){
    res.render( 'artists/index', {
      _assets : 'artists/assets/_index'
    });
  },

  show : function ( req, res, next ){
    res.render( 'artists/show', {
      _assets : 'artists/assets/_show'
    });
  }
});