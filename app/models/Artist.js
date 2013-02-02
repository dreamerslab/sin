var Link  = Model( 'Link' );
var hooks = require( MODEL_DIR + 'hooks/artist' );

module.exports = {
  hooks : {
    pre : {
      remove : [
        hooks.remove_from_posts,
        hooks.remove_from_releases,
        hooks.remove_from_videos,
        hooks.remove_links
      ]
    }
  },

  statics : {

    insert : function ( args, next, exist, created ){
      var args_for_link = {};
      var query         = {
        name : new RegExp( args.name, 'i' )
      };

      this.findOne( query, function ( err, artist ){
        if( err )    return next( err );
        if( artist ) return exist( artist );

        new this({
          name  : args.name,
          desc  : args.desc,
          thumb : args.thumb,
          cover : args.cover,
          links : []
        }).save( function ( err, artist ){
          if( err ) return next( err );

          var i = 1;

          for( ; i < 6; i++ ){
            args_for_link = {
              title : args[ 'link_name' + i ],
              url   : args[ 'link' + i ]
            };

            Link.insert( args_for_link,
              function( err ){
                LOG.error( 500, 'Link insert fail', err );
              },
              function ( link ){
                link.add_to_artists( artist );
              });
          }

          created( artist );
        });
      });
    },

    index : function ( args, next, no_content, ok ){
      this.find().
        sort( '-created_at' ).
        skip( args.page * 3 ).
        batchSize( args.limit ).
        limit( args.limit ).
        exec( function ( err, artists ){
          if( err )             return next( err );
          if( !artists.length ) return no_content();

          ok( artists );
      });
    },

    show : function ( args, next, no_content, ok ){
      var self = this;

      this.findById( args.id ).
        populate( 'links' ).
        exec( function ( err, artist ){
          if( err )     return next( err );
          if( !artist ) return no_content();

          ok( artist );
        });
    },

    update_props : function ( args, next, not_found, no_content, updated ){
      var args_for_link = {};
      var update_obj    = {};

      if( args.name  !== undefined ) update_obj.name  = args.name;
      if( args.desc  !== undefined ) update_obj.desc  = args.desc;
      if( args.thumb !== undefined ) update_obj.thumb = args.thumb;
      if( args.cover !== undefined ) update_obj.cover = args.cover;

      this.findByIdAndUpdate( args.id, update_obj, function ( err, artist ){
        if( err )     return next( err );
        if( !artist ) return no_content();

        artist.links.forEach( function ( link_id, index ){
          index = index + 1;

          args_for_link.id    = link_id;
          args_for_link.title = args[ 'link_name' + index ];
          args_for_link.url   = args[ 'link' + index ];

          Link.update_props( args_for_link, next, function (){});
        });

        updated( artist );
      });
    },

    destroy : function ( args, next, no_content, deleted ){
      this.findById( args.id ).exec( function ( err, artist ){
        if( err )     return next( err );
        if( !artist ) return no_content( err );

        artist.remove( function ( err ){
          if( err ) return next( err );

          deleted();
        });
      });
    }
  }
};