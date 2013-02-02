var Application = require( CONTROLLER_DIR + 'application' );
var validations = require( LIB_DIR + 'validations/artists' );
var Artist      = Model( 'Artist' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.validate_index, { only : [ 'index' ]});
    before( this.validate_show,  { only : [ 'show' ]});
    before( this.is_validate );

    before( this.namespace );
    before( this.current_artist,  { only : [ 'show' ]});
    before( this.recent_news,     { only : [ 'show' ]});
    before( this.recent_videos,   { only : [ 'show' ]});
    before( this.recent_releases, { only : [ 'show' ]});
  },

  index : function ( req, res, next ){
    var page = req.query.page ? parseInt( req.query.page ) : 0;
    var args = {
      artist : req.query.artist,
      limit  : 3,
      skip   : page
    };

    Artist.index( args, next,
      // no content
      function (){
        res.render( 'artists/index', {
          _assets : 'artists/assets/_index',
          artists : []
        });
      },
      // ok
      function ( artists ){
        res.render( 'artists/index', {
          _assets : 'artists/assets/_index',
          artists : artists
        });
      });
  },

  show : function ( req, res, next ){
    res.render( 'artists/show', {
      _assets  : 'artists/assets/_show',
      artists  : req.artist,
      posts    : req.posts,
      videos   : req.videos,
      releases : req.releases
    });
  }
});