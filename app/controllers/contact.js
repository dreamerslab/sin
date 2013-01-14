var Application = require( CONTROLLER_DIR + 'application' );

module.exports = Application.extend({

  init : function ( before, after ){
    before( this.namespace );
  },

  index : function ( req, res, next ){
    res.render( 'contact/index' );
  }
});