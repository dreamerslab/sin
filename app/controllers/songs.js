var Application = require( CONTROLLER_DIR + 'application' );
var validations = require( LIB_DIR + 'validations/songs' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.validate_index, { only : [ 'index' ]});
    before( this.validate_show,  { only : [ 'show' ]});
    before( this.is_validate );

    before( this.namespace );
    before( this.current_songs );
    before( this.current_song );
  },

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