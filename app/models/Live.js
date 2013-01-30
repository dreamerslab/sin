var common     = require( MODEL_DIR + 'hooks/common' );
var Flow       = require( 'node.flow' );
var lib_common = require( LIB_DIR + 'common' );

module.exports = {
  hooks : {
    post : {
      save   : [
        common.insert_to_artists( 'lives' )
      ],

      remove : [
        common.remove_from_artists( 'lives' )
      ]
    }
  },

  statics : {

    insert : function ( form, next, created ){
      new this({
        title    : form.title,
        date     : form.date,
        location : form.location,
        url      : form.url
      }).save( function ( err, live ){
        if( err ) return next( err );

        created( live );
      });
    },

    index : function ( args, next, no_content, ok ){
      this.find().
        sort( '-created_at' ).
        skip( args.page * 10 ).
        limit( args.limit ).
        exec( function ( err, lives ){
          if( err )           return next( err );
          if( !lives.length ) return no_content();

          ok( lives );
      });
    },

    show : function ( id, next, no_content, ok ){
      var self = this;

      this.findById( id ).
        exec( function ( err, live ){
          if( err )   return next( err );
          if( !live ) return no_content();

          ok( live );
        }
      );
    },

    update : function ( form, next, no_content, updated ){
      var self = this;

      var update_obj = {};

      if( form.title    !== undefined ) update_obj.title    = form.title;
      if( form.date     !== undefined ) update_obj.date     = form.date;
      if( form.location !== undefined ) update_obj.location = form.location;
      if( form.url      !== undefined ) update_obj.url      = form.url;

      self.findByIdAndUpdate( form.id , update_obj, function ( err, live ){
        if( err )   return next( err );
        if( !live ) return no_content();

        updated();
      });
    },

    destroy : function ( id, next, no_content, deleted ){
      this.findById( id ).exec( function ( err, live ){
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