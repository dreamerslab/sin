var Class   = require( 'node.class' );
var Post    = Model( 'Post' );
var Video   = Model( 'Video' );
var Release = Model( 'Release' );
var Live    = Model( 'Live' );
var Song    = Model( 'Song' );

module.exports = Class.extend({

  no_content : function ( req, res, next ){
    res.render( 'error/404', {
      layout : false
    });
  },

  namespace : function ( req, res, next ){
    res.local( 'namespace', '' );

    next();
  },

  is_validate : function ( req, res, next ){
    if( req.form.isValid ) return next();

    this.no_content( req, res, next );
  },

  current_artist : function ( req, res, next ){
    req.query_cond = req.query.artist ? { artist : req.query.artist } : {};

    next();
  },

  current_songs : function ( req, res, next ){
    var args = {
      cond : { release : req.params.release_id }
    };

    Song.index( args, next,
      function (){
        req.songs = [];

        next();
      },
      function ( songs ){
        req.songs = songs;

        songs.forEach( function ( song ){
          if( song._id == req.params.id ){
            req.current_song_id = song._id;
          }
        });

        next();
      }
    );

    next(); // for temp
  },

  recent_news : function ( req, res, next ){
    var args = {
      limit : 3,
      cond  : req.query_cond
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

    next(); // for temp
  },

  recent_releases : function ( req, res, next ){
    var args = {
      limit : 3,
      cond  : req.query_cond
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

    next(); // for temp
  },

  recent_videos : function ( req, res, next ){
    var args = {
      limit : 2,
      cond  : req.query_cond
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

    next(); // for temp
  },

  recent_lives : function ( req, res, next ){
    var args = {
      limit : 4,
      cond  : req.query_cond
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

    next(); // for temp
  }

  // validation : function ( err, req, res, next ){
  //   if( err.name && err.name == 'ValidationError' ){
  //     var error;
  //     for( error in err.errors ){
  //       req.flash( 'flash-error', err.errors[ error ].message );
  //     }

  //     res.redirect( 'back' );
  //     LOG.error( 500, res, err );

  //     return;
  //   }

  //   next( err );
  // }
});