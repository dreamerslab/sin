var Application = require( CONTROLLER_DIR + 'application' );
var validations = require( LIB_DIR + 'validations/releases' );
var Release     = Model( 'Release' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.validate_show_n_edit, { only : [ 'show' ]});
    before( this.is_validate,          { only : [ 'show' ]});

    before( this.namespace );
    before( this.banner_type );
    before( this.current_banner );
    before( this.current_release,        { only : [ 'show' ]});
    before( this.current_song_for_index, { only : [ 'show' ]});
  },

  banner_type : function ( req, res, next ){
    req.banner_type = 'releases';
    next();
  },

  index : function ( req, res, next ){
    var page = req.query.page ? parseInt( req.query.page ) : 0;
    var args = {
      artist : req.query.artist,
      limit  : 6,
      skip   : page
    };

    Release.index( args, next,
      // no content
      function (){
        res.render( 'releases/index', {
          _assets  : 'releases/assets/_index',
          releases : []
        });
      },
      // ok
      function ( releases ){
        res.render( 'releases/index', {
          _assets  : 'releases/assets/_index',
          releases : releases
        });
      });
  },

  show : function ( req, res, next ){
    var self = this;
    var args = {
      id : req.params.id
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
          songs        : req.songs,
          current_song : req.current_song
        });
      });
  }
});