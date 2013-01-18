var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/home' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.is_authenticated );

    before( this.validate_update, { only : [ 'soundcloud_udpate', 'facebook_udpate' ]});

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
      _assets    : 'admin/home/assets/_index',
      soundcloud : req.soundcloud,
      facebook   : req.facebook,
      posts      : req.posts,
      releases   : req.releases,
      videos     : req.videos,
      lives      : req.lives
    });
  },

  soundcloud_edit : function ( req, res, next ){
    res.render( 'admin/home/edit', {
      type : 'home_soundcloud'
    });
  },

  soundcloud_udpate : function ( req, res, next ){
    if( !req.form.isValid ){
      return res.render( 'admin/home/edit', {
        type : 'home_soundcloud'
      });
    }

    res.redirect( '/admin' );
  },

  facebook_edit : function ( req, res, next ){
    res.render( 'admin/home/edit', {
      type : 'home_facebook'
    });
  },

  facebook_udpate : function ( req, res, next ){
    if( !req.form.isValid ){
      return res.render( 'admin/home/edit', {
        type : 'home_facebook'
      });
    }

    res.redirect( '/admin' );
  }
});
