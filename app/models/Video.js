var common     = require( MODEL_DIR + 'hooks/common' );
var Flow       = require( 'node.flow' );
var lib_common = require( LIB_DIR + 'common' );
var Artist     = Model( 'Artist' );

module.exports = {
  hooks : {
    post : {
      save   : [
        common.insert_to_artists( 'videos' )
      ],

      remove : [
        common.remove_from_artists( 'videos' )
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
          artists : artists,
          title   : form.title,
          thumb   : form.thumb,
          date    : form.date,
          url     : form.url
        }).save( function ( err, video ){
          if( err ) return next( err );

          created();
        });
      });
    },

    index : function ( args, next, no_content, ok ){
      var query = args.artist ?
        {
          artists : { $in : [ new RegExp( args.artist, 'i' )]}
        } : {};

      this.find( args.query ).
        sort( '-created_at' ).
        skip( args.page * 10 ).
        limit( args.limit ).
        exec( function ( err, videos ){
          if( err )            return next( err );
          if( !videos.length ) return no_content();

          ok( videos );
      });
    },

    show : function ( args, next, no_content, ok ){
      var self = this;

      this.findById( args.query.id ).
        exec( function ( err, video ){
          if( err )    return next( err );
          if( !video ) return no_content();

          var o_video = lib_common.artists_to_string( video );

          ok( o_video );
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

        if( artists    !== undefined ) update_obj.artists = artists;
        if( form.title !== undefined ) update_obj.title   = form.title;
        if( form.thumb !== undefined ) update_obj.thumb   = form.thumb;
        if( form.date  !== undefined ) update_obj.date    = form.date;
        if( form.url   !== undefined ) update_obj.url     = form.url;

        self.findByIdAndUpdate( form.id , update_obj, function ( err, video ){
          if( err )    return next( err );
          if( !video ) return no_content();

          var artists_to_insert = lib_common.artists_diff( artists, video.artists );
          var artists_to_remove = lib_common.artists_diff( video.artists, artists );

          common.update_artists( artists_to_insert, artists_to_remove, 'videos', video );

          updated( video );
        });
      });
    },

    destroy : function ( id, next, no_content, deleted ){
      this.findById( id ).exec( function ( err, post ){
        if( err )   return next( err );
        if( !post ) return no_content( err );

        post.remove( function ( err ){
          if( err ) return next( err );

          deleted();
        });
      });
    }
  }
};