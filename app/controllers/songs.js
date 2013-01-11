var Application = require( CONTROLLER_DIR + 'application' );

module.exports = Application.extend({

  index : function ( req, res, next ){
    res.render( 'releases/show', {
      _assets : 'releases/assets/_show'
    });
  },

  show : function ( req, res, next ){
    res.render( 'releases/show', {
      _assets : 'releases/assets/_show'
    });
  }
});