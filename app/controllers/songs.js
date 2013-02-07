var Application = require( CONTROLLER_DIR + 'application' );
var validations = require( LIB_DIR + 'validations/songs' );
var Release     = Model( 'Release' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.validate_index_n_new, { only : [ 'index' ]});
    before( this.validate_show_n_edit, { only : [ 'show' ]});
    before( this.is_validate );

    before( this.namespace );
    before( this.banner_type );
    before( this.current_banner );
    before( this.current_release );
    before( this.current_song_for_index, { only : [ 'index' ]});
    before( this.current_song_for_show,  { only : [ 'show' ]});
  },

  banner_type : function ( req, res, next ){
    req.banner_type = 'home';
    next();
  },

  index : function ( req, res, next ){
    var self = this;
    var args = {
      id : req.params.release_id
    };


    Release.show( args, next,
      // no content
      function (){
        self.no_content( req, res );
      },
      // ok
      function ( release ){
        res.render( 'releases/show', {
          _assets      : 'releases/assets/_show',
          release      : release,
          songs        : req.release.songs,
          current_song : req.current_song
        });
      });
  },

  show : function ( req, res, next ){
    this.index( req, res, next );
  }
});