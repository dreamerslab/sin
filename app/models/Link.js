module.exports = {
  statics : {

    insert : function ( args, error, created ){
      new this({
        title : args.title,
        url   : args.url
      }).save( function ( err, link ){
        if( err ) return error( err );

        created( link );
      });
    },

    update_props : function ( args, next, updated ){
      var update_obj = {};

      if( args.title !== undefined ) update_obj.title = args.title;
      if( args.url   !== undefined ) update_obj.url   = args.url;

      this.findByIdAndUpdate( args.id, update_obj, function ( err, link ){
        if( err ) return next( err );

        updated();
      });
    }
  },

  methods : {
    add_to_artists : function ( artist ){
      var self   = this;
      var Artist = Model( 'Artist' );
      var query  =  { _id : artist._id };
      var update = { $push : { links : this._id }};

      Artist.update( query, update, function ( err, artist ){
        if( err )     return LOG.error( 500, '[methods][link][add_to_artists] fail', err );
        if( !artist ) return LOG.error( 404, '[methods][link][add_to_artists] fail artist not found' );

        LOG.debug( '[methods][link][add_to_artists] done', self );
      });
    }
  }
};