var Application = require( CONTROLLER_DIR + 'application' );
var validations = require( LIB_DIR + 'validations/releases' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.validate_show_n_edit, { only : [ 'show' ]});
    before( this.is_validate,          { only : [ 'show' ]});

    before( this.namespace );
    before( this.current_artist, { only : [ 'index' ]});
    before( this.current_songs,  { only : [ 'show' ]});
    before( this.current_song,   { only : [ 'show' ]});

  },

  current_song : function ( req, res, next ){
    if( !req.songs.length ) return next();

    req.current_song = song[ 0 ];

    next();
  },

  index : function ( req, res, next ){
    res.render( 'releases/index', {
      _assets : 'releases/assets/_index'
    });
  },

  show : function ( req, res, next ){
    res.render( 'releases/show', {
      _assets : 'releases/assets/_show'
    });
  }
});