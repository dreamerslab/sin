var Class   = require( 'node.class' );
var Post    = Model( 'Post' );
var Video   = Model( 'Video' );
var Release = Model( 'Release' );
var Live    = Model( 'Live' );
var Song    = Model( 'Song' );
var Url     = Model( 'Url' );

module.exports = Class.extend({

  current_banner : function ( req, res, next ){
    var self = this;
    var args = {
      query : {
        type : req.banner_type
      }
    };

    Url.show( args, next,
      function (){
        self.no_content( req, res );
      },
      function ( banner ){
        req.banner = banner;
        next();
      }
    );
  },

  no_content : function ( req, res ){
    res.render( 'error/404', {
      layout : false
    });
  },

  namespace : function ( req, res, next ){
    res.local( 'namespace', '' );

    next();
  },

  is_validate : function ( req, res, next ){
    return next(); // for temp, removed after have data

    if( req.form.isValid ) return next();

    this.no_content( req, res );
  },

  current_songs : function ( req, res, next ){
    var args = {
      query : {
        release : req.params.release_id || req.params.id
      }
    };

    Song.index( args, next,
      function (){
        req.songs = [];
        next();
      },
      function ( songs ){
        req.songs = songs;
        next();
      }
    );
  },

  // must go after current_songs
  current_song_for_index : function ( req, res, next ){
    if( !req.songs.length ) return next();

    req.current_song = req.songs[ 0 ];
    next();
  },

  // must go after current_songs
  current_song_for_show : function ( req, res, next ){
    if( !req.songs.length ) return next();

    var current_song_id = req.params.id;

    req.songs.forEach( function ( song ){
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
      function (){
        req.posts = [];
        next();
      },
      function ( posts ){
        req.posts = posts;
        next();
      }
    );
  },

  recent_releases : function ( req, res, next ){
    var args = {
      limit  : 3,
      artist : req.query.artist
    };

    Release.index( args, next,
      function (){
        req.releases = [];
        next();
      },
      function ( releases ){
        req.releases = releases;
        next();
      }
    );
  },

  recent_videos : function ( req, res, next ){
    var args = {
      limit  : 2,
      artist : req.query.artist
    };

    Video.index( args, next,
      function (){
        req.videos = [];
        next();
      },
      function ( videos ){
        req.videos = videos;
        next();
      }
    );
  },

  recent_lives : function ( req, res, next ){
    var args = {
      limit  : 4,
      artist : req.query.artist
    };

    Live.index( args, next,
      function (){
        req.lives = [];
        next();
      },
      function ( lives ){
        req.lives = lives;
        next();
      }
    );
  },

  soundcloud : function ( req, res, next ){
    var self = this;
    var args = {
      query : {
        type : 'home_soundcloud'
      }
    };

    Url.show( args, next,
      function (){
        req.soundcloud = '';
        next();
      },
      function ( soundcloud ){
        req.soundcloud = soundcloud;
        next();
      }
    );
  },

  facebook : function ( req, res, next ){
    var self = this;
    var args = {
      query : {
        type : 'home_facebook'
      }
    };

    Url.show( args, next,
      function (){
        req.soundcloud = '';
        next();
      },
      function ( facebook ){
        req.facebook = facebook;
        next();
      }
    );
  }
});