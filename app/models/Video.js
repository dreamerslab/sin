// var common     = require( MODEL_DIR + 'hooks/common' );
var Flow       = require( 'node.flow' );
var lib_common = require( LIB_DIR + 'common' );
var Artist     = Model( 'Artist' );

module.exports = {
  // hooks : {
  //   pre : {
  //     remove : [
  //       common.remove_from_artists( 'videos' )
  //     ]
  //   },
  //   post : {
  //     save   : [
  //       common.add_to_artists( 'videos' )
  //     ]
  //   }
  // },

  statics : {

    insert : function ( args, next, not_found, created ){
      if( !args.is_artists_found ) return not_found();

      new this({
        artists : args.artists,
        title   : args.title,
        thumb   : args.thumb,
        date    : args.date,
        url     : args.url
      }).save( function ( err, video ){
        if( err ) return next( err );

        created();
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
        batchSize( args.limit ).
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

          video.artists_str = video.artists.join( ', ' );

          ok( video );
        }
      );
    },

    update : function ( args, next, not_found, no_content, updated ){
      if( !args.is_artists_found ) return not_found();

      var update_obj = {};

      if( args.artists !== undefined ) update_obj.artists = args.artists;
      if( args.title   !== undefined ) update_obj.title   = args.title;
      if( args.thumb   !== undefined ) update_obj.thumb   = args.thumb;
      if( args.date    !== undefined ) update_obj.date    = args.date;
      if( args.url     !== undefined ) update_obj.url     = args.url;

      this.findByIdAndUpdate( args.id , update_obj, function ( err, video ){
        if( err )    return next( err );
        if( !video ) return no_content();

        // var artists_to_insert = lib_common.artists_diff( args.artists, video.artists );
        // var artists_to_remove = lib_common.artists_diff( video.artists, args.artists );

        // common.update_artists( artists_to_insert, artists_to_remove, 'videos', video );

        updated( video );
      });
    },

    destroy : function ( args, next, no_content, deleted ){
      this.findById( args.id ).exec( function ( err, video ){
        if( err )    return next( err );
        if( !video ) return no_content( err );

        video.remove( function ( err ){
          if( err ) return next( err );

          deleted();
        });
      });
    }
  }
};