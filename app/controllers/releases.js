var Application = require( CONTROLLER_DIR + 'application' );
var validations = require( LIB_DIR + 'validations/releases' );
var Release     = Model( 'Release' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.validate_show_n_edit, { only : [ 'show' ]});
    before( this.is_validate,          { only : [ 'show' ]});

    before( this.namespace );
    before( this.current_artist,         { only : [ 'index' ]});
    before( this.current_songs,          { only : [ 'show' ]});
    before( this.current_song_for_index, { only : [ 'show' ]});
  },

  current_song : function ( req, res, next ){
    if( !req.songs.length ) return next();

    req.current_song = song[ 0 ];

    next();
  },

  index : function ( req, res, next ){
    var page = req.query.page ? parseInt( req.query.page ) : 0;
    var args = {
      query : req.query_cond,
      limit : 6,
      skip  : page
    };

    Release.index( args, next,
      function (){
        res.render( 'releases/index', {
          _assets  : 'releases/assets/_index',
          releases : []
        });
      },
      function ( releases ){
        res.render( 'releases/index', {
          _assets  : 'releases/assets/_index',
          releases : releases
        });
      }
    );
  },

  show : function ( req, res, next ){
    var self = this;
    var args = {
      query : {
        id : req.params.id
      }
    };

    Release.show( args, next,
      function (){
        self.no_content( req, res );
      },
      function ( release ){
        res.render( 'releases/show', {
          _assets      : 'releases/assets/_show',
          release      : release,
          songs        : req.songs,
          current_song : req.current_song
        });
      }
    );
  }
});