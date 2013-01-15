var Application = require( CONTROLLER_DIR + 'application' );
var validations = require( LIB_DIR + 'validations/artists' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.validate_show, { only : [ 'show' ]});
    before( this.is_validate,   { only : [ 'show' ]});

    before( this.namespace );

    before( this.current_artist,  { only : [ 'index' ]});
    before( this.recent_news,     { only : [ 'show' ]});
    before( this.recent_videos,   { only : [ 'show' ]});
    before( this.recent_releases, { only : [ 'show' ]});
  },

  index : function ( req, res, next ){
    // model index
    res.render( 'artists/index', {
      _assets : 'artists/assets/_index'
    });
  },

  show : function ( req, res, next ){
    // model show
    res.render( 'artists/show', {
      _assets : 'artists/assets/_show'
    });
  }
});