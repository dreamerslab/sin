var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/home' );
var Url         = Model( 'Url' );

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
    res.render( 'admin/home/index', {
      title      : '三十而立 sincerely music',
      _assets    : [ 'home', 'admin-home' ],
      soundcloud : req.soundcloud,
      facebook   : req.facebook,
      posts      : req.posts,
      releases   : req.releases,
      videos     : req.videos,
      lives      : req.lives
    });
  },

  soundcloud_edit : function ( req, res, next ){
    var self = this;
    var args = {
      type : 'home_soundcloud'
    };

    Url.show( args, next,
      // no content
      function (){
        self.no_content( req, res );
      },
      // ok
      function ( url ){
        res.render( 'admin/home/edit', {
          action_type : 'soundcloud',
          subtitle    : 'Soundcloud 播放器',
          type        : 'home_soundcloud',
          ori_body    : url
        });
      });
  },

  soundcloud_udpate : function ( req, res, next ){
    var args = req.form;

    args.url = req.body.url;

    if( !req.form.isValid ){
      return res.render( 'admin/home/edit', {
        action_type : 'soundcloud',
        subtitle    : 'Soundcloud 播放器',
        type        : 'home_soundcloud',
        ori_body    : req.body
      });
    }

    Url.update_props( args, next, function (){
      res.redirect( '/admin' );
    });
  },

  facebook_edit : function ( req, res, next ){
    var self = this;
    var args = {
      type : 'home_soundcloud'
    };

    Url.show( args, next,
      // no content
      function (){
        self.no_content( req, res );
      },
      // ok
      function ( url ){
        res.render( 'admin/home/edit', {
          action_type : 'facebook',
          subtitle    : '臉書粉絲頁',
          type        : 'home_facebook',
          ori_body    : url
        });
      });
  },

  facebook_udpate : function ( req, res, next ){
    var args = req.form;

    args.url = req.body.url;

    if( !req.form.isValid ){
      return res.render( 'admin/home/edit', {
        action_type : 'facebook',
        subtitle    : '臉書粉絲頁',
        type        : 'home_facebook',
        ori_body    : req.body
      });
    }

    Url.update_props( args, next, function (){
      res.redirect( '/admin' );
    });
  }
});
