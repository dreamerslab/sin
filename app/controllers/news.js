var Application = require( CONTROLLER_DIR + 'application' );
var validations = require( LIB_DIR + 'validations/news' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.validate_show, { only : [ 'show' ]});
    before( this.is_validate,   { only : [ 'show' ]});

    before( this.namespace );
    before( this.current_artist, { only : [ 'index' ]});
  },

  index : function ( req, res, next ){
    res.render( 'news/index', {
      _assets : 'news/assets/_index'
    });
  },

  show : function ( req, res, next ){
    res.render( 'news/show', {
      _assets : 'news/assets/_show'
    });
  }
});
