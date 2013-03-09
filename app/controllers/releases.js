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
    before( this.nav_querystring,        { only : [ 'index' ]});
    before( this.current_release,        { only : [ 'show' ]});
    before( this.current_song_for_index, { only : [ 'show' ]});
  },

  banner_type : function ( req, res, next ){
    req.banner_type = 'releases';
    next();
  },

  index : function ( req, res, next ){
    var args = {
      artist : req.query.artist,
      limit  : 6,
      page   : req.page
    };

    res.locals({
      title        : '三十而立 sincerely music | 作品',
      nav_selected : 'releases',
      _assets      : [ 'releases-index' ]
    });

    Release.index( args, next,
      // no content
      function (){
        res.render( 'releases/index', {
          releases : [],
          qs_prev  : '',
          qs_next  : ''
        });
      },
      // ok
      function ( releases, more ){
        if( !more ) req.qs_next = null;
        res.render( 'releases/index', {
          releases : releases,
          qs_prev  : req.qs_prev,
          qs_next  : req.qs_next
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
          title        : '三十而立 sincerely music | ' + release.name,
          nav_selected : 'releases',
          _assets      : [ 'releases-show' ],
          release      : release,
          songs        : release.songs,
          current_song : req.current_song
        });
      });
  }
});