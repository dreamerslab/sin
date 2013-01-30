var common     = require( MODEL_DIR + 'hooks/common' );
var Flow       = require( 'node.flow' );
var lib_common = require( LIB_DIR + 'plan' );
var Release    = Model( 'Release' );

module.exports = {
  hooks : {
    post : {
      save   : [
        common.insert_to_artists( 'releases' )
      ],

      remove : [
        common.remove_from_artists( 'releases' )
      ]
    }
  },

  statics : {

    insert : function ( form, next, artist_not_found, created ){
      var self            = this;
      var flow            = new Flow();
      var artists         = form.artists;
      var is_artist_found = true;

      artists.forEach( function ( artist_name, index ){
        flow.series( function (){
          Artist.findOne({ name : artist_name }, function ( err, artist ){
            if( err ) return next( err );
            if( !artist ){
              is_artist_found = false;
            }
          });
        });
      });

      flow.end( function (){
        if( !is_artist_found ) return artist_not_found();

        new self({
          artists      : artists,
          name         : form.name,
          desc         : form.desc,
          release_date : form.release_date,
          cover        : form.cover,
          songs        : []
        }).save( function ( err, release ){
          if( err ) return next( err );

          common.insert_to_artists( 'releases', release );

          created( release );
        });
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
        limit( args.limit ).
        exec( function ( err, releases ){
          if( err )              return next( err );
          if( !releases.length ) return no_content();

          ok( releases );
      });
    },

    show : function ( args, next, no_content, ok ){
      var self = this;

      this.findById( args.query.id ).
        exec( function ( err, release ){
          if( err )      return next( err );
          if( !release ) return no_content();

          var o_release = lib_common.artists_to_string( release );

          ok( o_release );
        }
      );
    },

    update : function ( form, next, artist_not_found, no_content, updated ){
      var self            = this;
      var flow            = new Flow();
      var artists         = form.artists;
      var is_artist_found = true;

      artists.forEach( function ( artist_name, index ){
        flow.series( function (){
          Artist.findOne({ name : artist_name }, function ( err, artist ){
            if( err ) return next( err );
            if( !artist ){
              is_artist_found = false;
            }
          });
        });
      });

      flow.end( function (){
        if( !is_artist_found ) return artist_not_found();

        var update_obj = {};

        if( artists           !== undefined ) update_obj.artists      = artists;
        if( form.name         !== undefined ) update_obj.name         = form.name;
        if( form.desc         !== undefined ) update_obj.desc         = form.desc;
        if( form.release_date !== undefined ) update_obj.release_date = form.release_date;
        if( form.cover        !== undefined ) update_obj.cover        = form.cover;

        self.findByIdAndUpdate( form.id , update_obj, function ( err, release ){
          if( err )      return next( err );
          if( !release ) return no_content();

          var artists_to_insert = lib_common.artists_diff( artists, release.artists );
          var artists_to_remove = lib_common.artists_diff( release.artists, artists );

          common.update_artists( artists_to_insert, artists_to_remove, 'releases', release );

          updated( release );
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