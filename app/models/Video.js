module.exports = {
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