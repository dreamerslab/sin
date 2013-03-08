var Application = require( CONTROLLER_DIR + 'application' );
var validations = require( LIB_DIR + 'validations/artists' );
var Artist      = Model( 'Artist' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.validate_index,       { only : [ 'index' ]});
    before( this.validate_show_n_edit, { only : [ 'show' ]});
    before( this.is_validate );

    before( this.namespace );
    before( this.banner_type );
    before( this.current_banner );
    before( this.nav_querystring, { only : [ 'index' ]});
    before( this.current_artist,  { only : [ 'show' ]});
    before( this.recent_news,     { only : [ 'show' ]});
    before( this.recent_videos,   { only : [ 'show' ]});
    before( this.recent_releases, { only : [ 'show' ]});
  },

  banner_type : function ( req, res, next ){
    req.banner_type = 'artists';
    next();
  },

  index : function ( req, res, next ){
    var args = {
      artist : req.query.artist,
      limit  : 3,
      page   : req.page
    };

    res.locals({
      title        : '三十而立 sincerely music | 藝人',
      nav_selected : 'artists',
      _assets      : [ 'artists-index' ]
    });

    Artist.index( args, next,
      // no content
      function (){
        res.render( 'artists/index', {
          artists : [],
          qs_prev : '',
          qs_next : ''
        });
      },
      // ok
      function ( artists, more ){
        if( !more ) req.qs_next = null;
        res.render( 'artists/index', {
          artists : artists,
          qs_prev : req.qs_prev,
          qs_next : req.qs_next
        });
      });
  },

  show : function ( req, res, next ){
    res.locals({
      title        : '三十而立 sincerely music | ' + req.artist.name,
      nav_selected : 'artists',
      _assets      : [ 'artists-show' ]
    });

    res.render( 'artists/show', {
      artist   : req.artist,
      posts    : req.posts,
      videos   : req.videos,
      releases : req.releases
    });
  }
});