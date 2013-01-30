var Application = require( CONTROLLER_DIR + 'application' );
var validations = require( LIB_DIR + 'validations/songs' );
var Release     = Model( 'Release' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.validate_index, { only : [ 'index' ]});
    before( this.validate_show,  { only : [ 'show' ]});
    before( this.is_validate );

    before( this.namespace );
    before( this.current_songs );
    before( this.current_song_for_index, { only : [ 'index' ]});
    before( this.current_song_for_show,  { only : [ 'show' ]});
  },

  index : function ( req, res, next ){
    var self = this;
    var args = {
      cond : {
        id : req.params.release_id
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
  },

  show : function ( req, res, next ){
    this.index( req, res, next );
  }
});