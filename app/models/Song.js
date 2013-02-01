module.exports = {
  statics : {

    insert : function ( args, next, created ){
      var self            = this;
      var current_release = args.release;

      new self({
        title      : args.title,
        duration   : args.duration,
        soundcloud : args.soundcloud,
        itunes     : args.itunes
      }).save( function ( err, song ){
        if( err ) return next( err );

        current_release.insert_song( song._id, args.target_order );
        current_release.save( function ( err, release ){
          if( err ) return next( err );

          created( song );
        });
      });
    },

    update : function ( args, next, no_content, updated ){
      var update_obj      = {};
      var current_release = args.release;

      if( args.title      !== undefined ) update_obj.title      = args.title;
      if( args.duration   !== undefined ) update_obj.duration   = args.duration;
      if( args.soundcloud !== undefined ) update_obj.soundcloud = args.soundcloud;
      if( args.itunes     !== undefined ) update_obj.itunes     = args.itunes;

      this.findByIdAndUpdate( args.id, update_obj, function ( err, song ){
        if( err )   return next( err );
        if( !song ) return no_content();

        if( args.target_order !== undefined ){
          current_release.move_song( song._id, args.target_order );
          current_release.save( function ( err, release ){
            if( err ) return next( err );
          });
        }

        updated( song );
      });
    },

    destroy : function ( args, next, no_content, deleted ){
      var current_release = args.release;

      this.findByIdAndRemove( args.id, function ( err, song ){
        if( err )   return next( err );
        if( !song ) return no_content( err );

        current_release.remove_song( song._id, args.target_order );
        current_release.save( function ( err, release ){
          if( err ) return next( err );

          deleted();
        });
      });
    }
  }
};