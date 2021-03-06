var Application = require( CONTROLLER_DIR + 'application' );
var Video       = Model( 'Video' );

module.exports = Application.extend({

  init : function ( before, after ){
    before( this.namespace );
    before( this.banner_type );
    before( this.current_banner );
    before( this.nav_querystring, { only : [ 'index' ]});
  },

  banner_type : function ( req, res, next ){
    req.banner_type = 'videos';
    next();
  },

  index : function ( req, res, next ){
    var args = {
      artist : req.query.artist,
      limit  : 5,
      page   : req.page
    };

    res.locals({
      title        : '三十而立 sincerely music | 影音',
      nav_selected : 'videos',
      _assets      : [ 'videos-index' ]
    });

    Video.index( args, next,
      // no content
      function (){
        res.render( 'videos/index', {
          videos  : [],
          qs_prev : '',
          qs_next : ''
        });
      },
      // ok
      function ( videos, more ){
        if( !more ) req.qs_next = null;
        res.render( 'videos/index', {
          videos  : videos,
          qs_prev : req.qs_prev,
          qs_next : req.qs_next
        });
      });
  }
});