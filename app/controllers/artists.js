var Application = require( CONTROLLER_DIR + 'application' );
var validations = require( LIB_DIR + 'validations/artists' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.validate_show, { only : [ 'show' ]});
    before( this.is_validate,   { only : [ 'show' ]});

    before( this.namespace );
  },

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