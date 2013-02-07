module.exports = {
  statics : {

    insert : function ( args, next, not_found, created ){
      if( !args.is_artists_found ) return not_found();

      new this({
        artists      : args.artists,
        name         : args.name,
        desc         : args.desc,
        release_date : args.release_date,
        cover        : args.cover,
        songs        : []
      }).save( function ( err, release ){
        if( err ) return next( err );

        created( release );
      });
    },

    index : function ( args, next, no_content, ok ){
      var query = args.artist ?
        {
          artists : new RegExp( args.artist, 'i' )
        } : {};

      this.find( query ).
        sort( '-created_at' ).
        skip( args.page * 10 ).
        batchSize( args.limit ).
        limit( args.limit ).
        exec( function ( err, releases ){
          if( err )              return next( err );
          if( !releases.length ) return no_content();

          ok( releases );
      });
    },

    show : function ( args, next, no_content, ok ){
      var self = this;

      this.findById( args.id ).
        populate( 'songs' ).
        exec( function ( err, release ){
          if( err )      return next( err );
          if( !release ) return no_content();

          ok( release );
        }
      );
    },

    update_props : function ( args, next, not_found, no_content, updated ){
      if( !args.is_artists_found ) return not_found();

      var update_obj = {};

      if( args.artists      !== undefined ) update_obj.artists      = args.artists;
      if( args.name         !== undefined ) update_obj.name         = args.name;
      if( args.desc         !== undefined ) update_obj.desc         = args.desc;
      if( args.release_date !== undefined ) update_obj.release_date = args.release_date;
      if( args.cover        !== undefined ) update_obj.cover        = args.cover;

      this.findByIdAndUpdate( args.id, update_obj, function ( err, release ){
        if( err )      return next( err );
        if( !release ) return no_content();

        updated( release );
      });
    },

    destroy : function ( args, next, no_content, deleted ){
      this.findById( args.id ).exec( function ( err, release ){
        if( err )      return next( err );
        if( !release ) return no_content( err );

        release.remove( function ( err ){
          if( err ) return next( err );

          deleted();
        });
      });
    },

    add_song : function ( args, next, no_content, added ){
      this.findById( args.release._id, function ( err, release ){
        if( err )      return next( err );
        if( !release ) return no_content( req, res );

        var page = parseInt( args.target_order, 10 );
        var pos  = page - 1;
        var len  = release.songs.length;

        if( pos < 0 )   pos = 0;
        if( pos > len ) pos = len;

        release.songs.splice( pos, 0, args.song_id );
        release.save( function ( err, release ){
          if( err ) return next( err );

          added();
        });
      });
    },

    move_song : function ( args, next, no_content, moved ){
      this.findById( args.release_id, function ( err, release ){
        if( err )      return next( err );
        if( !release ) return no_content( req, res );

        if( args.target_order !== undefined ){
          var i            = 0;
          var len          = release.songs.length;
          var current_page = release.songs.indexOf( args.song_id );
          var new_index    = parseInt( args.target_order, 10 ) - 1;

          if( new_index < 0 )   new_index = 0;
          if( new_index > len ) new_index = len - 1;

          if( new_index >= len ){
            var k = new_index - len;

            while(( k-- ) + 1 ){
              release.songs.push( UTILS.uid( 24 ));
            }
          }

          release.songs.splice( new_index, 0, release.songs.splice( current_page, 1 )[ 0 ]);
          release.save( function ( err, release ){
            LOG.debug( '[model][Release][move_song] done', release );

            moved();
          });
        }
      });
    },

    remove_song : function ( args, next, no_content, removed ){
      this.findById( args.release._id, function ( err, release ){
        if( err )      return next( err );
        if( !release ) return no_content();

        var pos = 0;
        var len = release.songs.length;

        for( ; len--;){
          if( release.songs[ len ] == args.id ){
            pos = len;
            break;
          }
        }

        release.songs.splice( pos, 1 );
        release.save( function ( err, release ){
          if( err ) return next( err );

          removed();
        });
      });
    }
  }
};