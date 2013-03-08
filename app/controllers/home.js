var Application = require( CONTROLLER_DIR + 'application' );
var request     = require( 'request' );

module.exports = Application.extend({

  init : function ( before, after ){
    before( this.namespace );
    before( this.banner_type );
    before( this.current_banner );
    before( this.soundcloud );
    before( this.facebook );

    before( this.recent_news );
    before( this.recent_releases );
    before( this.recent_videos );
    before( this.recent_lives );
  },

  banner_type : function ( req, res, next ){
    req.banner_type = 'home';
    next();
  },

  index : function ( req, res, next ){
    res.render( 'home/index', {
      title      : '三十而立 sincerely music',
      _assets    : [ 'home' ],
      soundcloud : req.soundcloud,
      facebook   : req.facebook,
      posts      : req.posts,
      releases   : req.releases,
      videos     : req.videos,
      lives      : req.lives
    });
  }
});
