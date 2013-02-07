var Class       = require( 'node.class' );
var Flow        = require( 'node.flow' );
var querystring = require( 'querystring' );
var Post        = Model( 'Post' );
var Artist      = Model( 'Artist' );
var Video       = Model( 'Video' );
var Release     = Model( 'Release' );
var Live        = Model( 'Live' );
var Song        = Model( 'Song' );
var Url         = Model( 'Url' );

module.exports = Class.extend({

  current_banner : function ( req, res, next ){
    var self = this;
    var args = {
      type : req.banner_type
    };

    Url.show( args, next,
      // no content
      function (){
        req.banner = {
          type : '',
          url  : '/img/common/default-banner.jpg'
        };

        next();
      },
      // ok
      function ( banner ){
        res.local( 'banner', banner );
        next();
      });
  },

  no_content : function ( req, res ){
    res.render( 'error/404', {
      layout : false
    });
  },

  nav_querystring : function ( req, res, next ){
    var page = req.query.page ? parseInt( req.query.page ) : 1;

    var qs_prev = {};
    if( page > 1 ){
      if( req.query.artist ) qs_prev.artist = req.query.artist;
      qs_prev.page = page - 1 ;
    }

    var qs_next = { page : page + 1 };
    if( req.query.artist ) qs_next.artist = req.query.artist;

    req.page    = page;
    req.qs_prev = querystring.stringify( qs_prev );
    req.qs_next = querystring.stringify( qs_next );

    next();
  },

  namespace : function ( req, res, next ){
    res.local( 'namespace', '' );

    next();
  },

  is_validate : function ( req, res, next ){
    if( req.form.isValid ) return next();

    this.no_content( req, res );
  },

  current_artist : function ( req, res, next ){
    var self = this;
    var args = {
      id : req.params.id
    };

    Artist.show( args, next,
      // no content
      function (){
        self.no_content( req, res );
      },
      // ok
      function ( artist ){
        req.artist       = artist;
        req.query.artist = artist.name;

        next();
      });
  },

  current_release : function ( req, res, next ){
    var self = this;
    var args = {
      id : req.params.release_id || req.params.id
    };

    Release.show( args, next,
      // no content
      function (){
        self.no_content( req, res );
      },
      // ok
      function ( release ){
        req.release = release;
        next();
      });
  },

  // must go after current_release
  current_song_for_index : function ( req, res, next ){
    if( !req.release.songs.length ) return next();

    req.current_song = req.release.songs[ 0 ];
    next();
  },

  // must go after current_release
  current_song_for_show : function ( req, res, next ){
    if( !req.release.songs.length ) return next();

    var current_song_id = req.params.id;

    req.release.songs.forEach( function ( song ){
      if( song._id == current_song_id ){
        req.current_song = song;
      }
    });

    next();
  },

  recent_news : function ( req, res, next ){
    var args = {
      limit  : 3,
      artist : req.query.artist
    };

    Post.index( args, next,
      // no content
      function (){
        req.posts = [];
        next();
      },
      // ok
      function ( posts ){
        req.posts = posts;
        next();
      });
  },

  recent_releases : function ( req, res, next ){
    var args = {
      limit  : 3,
      artist : req.query.artist
    };

    Release.index( args, next,
      // no content
      function (){
        req.releases = [];
        next();
      },
      // ok
      function ( releases ){
        req.releases = releases;
        next();
      });
  },

  recent_videos : function ( req, res, next ){
    var args = {
      limit  : 2,
      artist : req.query.artist
    };

    Video.index( args, next,
      // no content
      function (){
        req.videos = [];
        next();
      },
      // ok
      function ( videos ){
        req.videos = videos;
        next();
      });
  },

  recent_lives : function ( req, res, next ){
    var args = {
      limit  : 4,
      artist : req.query.artist
    };

    Live.index( args, next,
      // no content
      function (){
        req.lives = [];
        next();
      },
      // ok
      function ( lives ){
        req.lives = lives;
        next();
      });
  },

  soundcloud : function ( req, res, next ){
    var self = this;
    var args = {
      type : 'home_soundcloud'
    };

    Url.show( args, next,
      // no content
      function (){
        req.soundcloud = {
          type : 'home_soundcloud',
          url  : ''
        };

        next();
      },
      // ok
      function ( soundcloud ){
        req.soundcloud = soundcloud;
        next();
      });
  },

  facebook : function ( req, res, next ){
    var self = this;
    var args = {
      type : 'home_facebook'
    };

    Url.show( args, next,
      // no content
      function (){
        req.facebook = {
          type : 'home_facebook',
          url  : ''
        };

        next();
      },
      // ok
      function ( facebook ){
        req.facebook = facebook;
        next();
      });
  }
});