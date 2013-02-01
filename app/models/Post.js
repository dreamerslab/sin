// var common     = require( MODEL_DIR + 'hooks/common' );
var Flow       = require( 'node.flow' );
var lib_common = require( LIB_DIR + 'common' );
var Artist     = Model( 'Artist' );

module.exports = {
  // hooks : {
  //   pre : {
  //     remove : [
  //       common.remove_from_artists( 'posts' )
  //     ]
  //   },
  //   post : {
  //     save   : [
  //       common.add_to_artists( 'posts' )
  //     ]
  //   }
  // },

  statics : {

    insert : function ( args, next, not_found, created ){
      if( !args.is_artists_found ) return not_found();

      new this({
        artists : args.artists,
        title   : args.title,
        content : args.content,
        cover   : args.cover
      }).save( function ( err, post ){
        if( err ) return next( err );

        created( post );
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
        exec( function ( err, posts ){
          if( err )           return next( err );
          if( !posts.length ) return no_content();

          ok( posts );
      });
    },

    show : function ( args, next, no_content, ok ){
      var self = this;

      this.findById( args.query.id ).
        exec( function ( err, post ){
          if( err )   return next( err );
          if( !post ) return no_content();

          post.artists_str = post.artists.join( ', ' );

          ok( post );
        }
      );
    },

    update : function ( args, next, not_found, no_content, updated ){
      if( !args.is_artists_found ) return not_found();

      var update_obj = {};

      if( args.artists !== undefined ) update_obj.artists = args.artists;
      if( args.title   !== undefined ) update_obj.title   = args.title;
      if( args.content !== undefined ) update_obj.content = args.content;
      if( args.cover   !== undefined ) update_obj.cover   = args.cover;

      this.findByIdAndUpdate( args.id , update_obj, function ( err, post ){
        if( err )   return next( err );
        if( !post ) return no_content();

        // var artists_to_insert = lib_common.artists_diff( args.artists, post.artists );
        // var artists_to_remove = lib_common.artists_diff( post.artists, args.artists );

        // common.update_artists( artists_to_insert, artists_to_remove, 'posts', post );

        updated( post );
      });
    },

    destroy : function ( args, next, no_content, deleted ){
      this.findById( args.id ).exec( function ( err, post ){
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