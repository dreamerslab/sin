module.exports = {
  statics : {

    insert : function ( args, next, created ){
      new this({
        title    : args.title,
        date     : args.date,
        location : args.location,
        url      : args.url
      }).save( function ( err, live ){
        if( err ) return next( err );

        created( live );
      });
    },

    index : function ( args, next, no_content, ok ){
      this.find().
        sort( '-date' ).
        skip(( args.page - 1 ) * args.limit ).
        batchSize( args.limit + 1 ).
        limit( args.limit + 1 ).
        exec( function ( err, lives ){
          if( err )           return next( err );
          if( !lives.length ) return no_content();

          var more = lives.length > args.limit;

          more && lives.pop();

          ok( lives, more );
        });
    },

    show : function ( args, next, no_content, ok ){
      var self = this;

      this.findById( args.id ).
        exec( function ( err, live ){
          if( err )   return next( err );
          if( !live ) return no_content();

          ok( live );
        });
    },

    update_props : function ( args, next, no_content, updated ){
      var self = this;

      var update_obj = {};

      if( args.title    !== undefined ) update_obj.title    = args.title;
      if( args.date     !== undefined ) update_obj.date     = args.date;
      if( args.location !== undefined ) update_obj.location = args.location;
      if( args.url      !== undefined ) update_obj.url      = args.url;

      self.findByIdAndUpdate( args.id, update_obj, function ( err, live ){
        if( err )   return next( err );
        if( !live ) return no_content();

        updated();
      });
    },

    destroy : function ( args, next, no_content, deleted ){
      this.findById( args.id ).exec( function ( err, live ){
        if( err )   return next( err );
        if( !live ) return no_content( err );

        live.remove( function ( err ){
          if( err ) return next( err );

          deleted();
        });
      });
    }
  }
};
