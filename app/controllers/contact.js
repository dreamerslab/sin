var Application = require( CONTROLLER_DIR + 'application' );

module.exports = Application.extend({

  index : function ( req, res, next ){
    res.render( 'contact/index' );
  }
});