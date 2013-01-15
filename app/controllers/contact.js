var Application = require( CONTROLLER_DIR + 'application' );
var validations = require( LIB_DIR + 'validations/contact' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.validate_create, { only : [ 'create' ]});
    before( this.is_validate,     { only : [ 'create' ]});

    before( this.namespace );
  },

  index : function ( req, res, next ){
    res.render( 'contact/index' );
  },

  create : function ( req, res, next ){
    // send email, render contact index view with success msg
    res.render( 'contact/index' );
  }
});