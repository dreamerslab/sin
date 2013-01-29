var common     = require( MODEL_DIR + 'hooks/common' );
var Flow       = require( 'node.flow' );
var lib_common = require( LIB_DIR + 'plan' );
var Release    = Model( 'Release' );

module.exports = {
  hooks : {
    post : {
      remove : [
        common.remove_from_artists( 'posts' )
      ]
    }
  },

  statics : {

    insert : function ( args, next, artist_not_found, created ){
      var self            = this;
      var flow            = new Flow();
      var body            = args.body;
      var artists         = body.artists.split( ',' );
      var is_artist_found = true;

      artists.forEach( function ( artist_name, index ){
        flow.series( function (){
          artists[ index ] = artist_name.trim();
        });
      });

      artists.forEach( function ( artist_name, index ){
        flow.series( function (){
          Artist.findOne({ name : artist_name }, function ( err, artist ){
            if( err ) return next( err );
            if( !artist ){
              is_artist_found = false;
            }

            artists[ index ] = artist._id;
          });
        });
      });

      flow.end( function (){
        if( !is_artist_found ) return artist_not_found();

        new self({
          artists      : artists,
          name         : body.name,
          desc         : body.desc,
          release_date : body.release_date,
          cover        : body.cover,
          songs        : []
        }).save( function ( err, release ){
          if( err ) return next( err );

          common.insert_to_artists( 'releases', release );

          created( release );
        });
      });
    },

    index : function ( args, next, no_content, ok ){
      this.count( function ( err, count ){
        if( err )        return next( err );
        if( count == 0 ) return no_content();

        this.find( args.cond ).
          sort({ created_at : - 1 }).
          skip( args.page * 10 ).
          limit( args.limit ).
          exec( function ( err, releases ){
            if( err ) return next( err );

            ok( releases );
        });
      });
    },

    show : function ( args, next, no_content, ok ){
      var self = this;

      this.findById( args.cond.id ).
        populate( 'artists' ).
        exec( function ( err, release ){
          if( err )      return next( err );
          if( !release ) return no_content();

          var o_release = lib_common.artists_to_string( release );

          ok( o_release );
        }
      );
    },

    update : function ( args, next, artist_not_found, no_content, updated ){
      var self            = this;
      var flow            = new Flow();
      var body            = args.body;
      var artists         = body.artists.split( ',' );
      var is_artist_found = true;

      artists.forEach( function ( artist_name, index ){
        flow.series( function (){
          artists[ index ] = artist_name.trim();
        });
      });

      artists.forEach( function ( artist_name, index ){
        flow.series( function (){
          Artist.findOne({ name : artist_name }, function ( err, artist ){
            if( err ) return next( err );
            if( !artist ){
              is_artist_found = false;
            }

            artists[ index ] = artist._id;
          });
        });
      });

      flow.end( function (){
        if( !is_artist_found ) return artist_not_found();

        self.findById( args.id ).exec( function ( err, release ){
          if( err )   return next( err );
          if( !release ) return no_content();

          var artists_to_insert = lib_common.artists_diff( artists, release.artists );
          var artists_to_remove = lib_common.artists_diff( release.artists, artists );

          release.artists      = artists;
          release.name         = body.name;
          release.desc         = body.desc;
          release.release_date = body.release_date;
          release.cover        = body.cover;

          release.save( function ( err, release ){
            if( err ) return next( err );

            common.update_artists( artists_to_insert, artists_to_remove, 'releases', release );

            updated( release );
          });
        });
      });
    },

    destroy : function ( id, next, no_content, deleted ){
      this.findById( id ).exec( function ( err, release ){
        if( err )   return next( err );
        if( !release ) return no_content( err );

        release.remove( function ( err ){
          if( err ) return next( err );

          deleted();
        });
      });
    }
  }
};