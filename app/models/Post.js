var Flow   = require( 'node.flow' );
var Artist = Model( 'Artist' );

module.exports = {
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
          artists    : artists,
          title      : body.title,
          content    : body.content,
          cover      : body.cover
        }).save( function ( err, post ){
          if( err ) return next( err );

          created( post );
        });
      });
    },

    index : function ( args, next, no_content, ok ){
      // 記得 sort by created_at，由新到舊

      this.count( function ( err, count ){
        if( err )        return next( err );
        if( count == 0 ) return no_content();

        this.find( args.cond ).
          sort({ created_at : - 1 }).
          skip( args.page * 10 ).
          limit( args.limit ).
          exec( function ( err, posts ){
            if( err ) return next( err );

            ok( posts );
        });
      });
    },

    show : function ( args, next, no_content, ok ){
      var self = this;

      this.findById( args.cond.id ).
        populate( 'artists' ).
        exec( function ( err, post ){
          if( err )   return next( err );
          if( !post ) return no_content();

          var o_post = self.artists_to_string( post );

          ok( o_post );
        }
      );
    },

    artists_to_string : function ( post ){
      var o_post = post.toObject();

      o_post.artists_str = '';

      o_post.artists.forEach( function ( artist ){
        o_post.artists_str += artist.name + ', ';
      });

      o_post.artists_str = o_post.artists_str.substr( 0, o_post.artists_str - 2 );

      return o_post;
    },

    update : function ( args, next, artist_not_found, updated ){
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

        self.findByIdAndUpdate(
          args.id,
          {
            artists    : artists,
            title      : body.title,
            content    : body.content,
            cover      : body.cover
          },
          function ( err, post ){
            if( err ) return next( err );

            updated( post );
        });
      });
    },

    destroy : function ( id, next, deleted ){
      this.findByIdAndRemove( id, function ( err, post ){
        if( err ) return next( err );

        deleted();
      });
    }
  }
};