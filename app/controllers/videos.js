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

    Video.index( args, next,
      // no content
      function (){
        res.render( 'videos/index', {
          _assets : 'videos/assets/_index',
          videos  : [],
          qs_prev : '',
          qs_next : ''
        });
      },
      // ok
      function ( videos, more ){
        if( !more ) req.qs_next = null;
        res.render( 'videos/index', {
          _assets : 'videos/assets/_index',
          videos  : videos,
          qs_prev : req.qs_prev,
          qs_next : req.qs_next
        });
      });
  }
});