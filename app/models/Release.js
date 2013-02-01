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
          artists : { $in : [ new RegExp( args.artist, 'i' )]}
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

      this.findById( args.release_id ).
        populate( 'songs' ).
        exec( function ( err, release ){
          if( err )      return next( err );
          if( !release ) return no_content();

          release.artists_str = release.artists.join( ', ' );

          ok( release );
        }
      );
    },

    update : function ( args, next, not_found, no_content, updated ){
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
    }
  },

  methods : {

    insert_song : function ( song_id, target_page ){
      var page = parseInt( target_page, 10 );
      var pos  = page - 1;
      var len  = this.songs.length;

      if( pos < 0 )   pos = 0;
      if( pos > len ) pos = len;

      this.songs.splice( pos, 0, song_id );
    },

    move_song : function ( current_page, target_page ){
      var len       = this.songs.length;
      var new_index = parseInt( target_page, 10 ) - 1;
      var old_index = parseInt( current_page, 10 ) - 1;

      if( new_index < 0 )   new_index = 0;
      if( new_index > len ) new_index = len - 1;

      if( new_index >= len ){
        var k = new_index - len;

        while(( k-- ) + 1 ){
          this.songs.push( UTILS.uid( 24 ));
        }
      }

      this.songs.splice( new_index, 0, this.songs.splice( old_index, 1 )[ 0 ]);
    },

    remove_song : function ( song_id ){
      var pos = 0;
      var len = this.songs.length;

      for( ; len--;){
        if( this.songs[ len ]._id == song_id ){
          pos = len;
          break;
        }
      }

      this.songs.splice( pos, 1 );
    }
  }
};