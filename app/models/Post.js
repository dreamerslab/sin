var common     = require( MODEL_DIR + 'hooks/common' );
var Flow       = require( 'node.flow' );
var lib_common = require( LIB_DIR + 'common' );
var Artist     = Model( 'Artist' );

module.exports = {
  hooks : {
    post : {
      save   : [
        common.push_to_artists( 'posts' )
      ],

      remove : [
        common.pull_from_artists( 'posts' )
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
          content : form.content,
          cover   : form.cover
        }).save( function ( err, post ){
          if( err ) return next( err );

          created( post );
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

          var o_post = lib_common.artists_to_string( post );

          ok( o_post );
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

        if( artists      !== undefined ) update_obj.artists = artists;
        if( form.title   !== undefined ) update_obj.title   = form.title;
        if( form.content !== undefined ) update_obj.content = form.content;
        if( form.cover   !== undefined ) update_obj.cover   = form.cover;

        self.findByIdAndUpdate( form.id , update_obj, function ( err, post ){
          if( err )   return next( err );
          if( !post ) return no_content();

          var artists_to_insert = lib_common.artists_diff( artists, post.artists );
          var artists_to_remove = lib_common.artists_diff( post.artists, artists );

          common.update_artists( artists_to_insert, artists_to_remove, 'posts', post );

          updated( post );
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