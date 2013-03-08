var Application = require( CONTROLLER_DIR + 'application' );
var Live        = Model( 'Live' );

module.exports = Application.extend({

  init : function ( before, after ){
    before( this.namespace );
    before( this.banner_type );
    before( this.current_banner );
    before( this.nav_querystring );
  },

  banner_type : function ( req, res, next ){
    req.banner_type = 'live';
    next();
  },

  index : function ( req, res, next ){
    var args = {
      artist : req.query.artist,
      limit  : 10,
      page   : req.page
    };

    res.locals({
      title        : '三十而立 sincerely music | 現場',
      nav_selected : 'live'
    });

    Live.index( args, next,
      // no content
      function (){
        res.render( 'live/index', {
          _assets : [ 'live-index' ],
          lives   : [],
          qs_prev : '',
          qs_next : ''
        });
      },
      // ok
      function ( lives, more ){
        if( !more ) req.qs_next = null;
        res.render( 'live/index', {
          _assets : [ 'live-index' ],
          lives   : lives,
          qs_prev : req.qs_prev,
          qs_next : req.qs_next
        });
      });
  }
});
