module.exports = {
  statics : {

    insert : function ( args, next, created ){
      var self  = this;
      var props = {
        type : args.type
      };

      this.findOne( props ).
        exec( function ( err, url ){
          if( err ) return next( err );
          if( url ) return created( url );

          new self( props ).
            save( function ( err, url ){
              if( err ) return next( err );

              created( url );
            });
        });
    },

    show : function ( args, next, no_content, ok ){
      var query = {
        type : args.type
      };

      this.findOne( query, function ( err, url ){
        if( err )  return next( err );
        if( !url ) return no_content();

        ok( url );
      });
    },

    update_props : function ( args, next, updated ){
      var query = {
        type : args.type
      };

      var update_obj = {
        url : args.url
      };

      this.findOneAndUpdate( query, update_obj, function ( err, url ){
        if( err ) return next( err );

        updated();
      });
    }
  }
};