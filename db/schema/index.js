var Schema = function ( Schema ){

/**
 * Module dependencies.
 * @private
 */
  var ObjectId = Schema.ObjectId;

  var Models = {

    Home : new Schema({
      soundcloud : { type : String },
      facebook   : { type : String },
      created_at : { type : Number, default : Date.now },
      updated_at : { type : Number }
    }),

    Banner : new Schema({
      home       : { type : String },
      news       : { type : String },
      artists    : { type : String },
      releases   : { type : String },
      live       : { type : String },
      videos     : { type : String },
      contact    : { type : String },
      created_at : { type : Number, default : Date.now },
      updated_at : { type : Number }
    }),

    Artist : new Schema({
      name       : { type : String, required : true },
      brief      : { type : String },
      desc       : { type : String },
      cover      : { type : String }, // url ( bg )
      links      : [{ type : ObjectId, ref : 'Link' }],
      posts      : [{ type : ObjectId, ref : 'Post' }],
      releases   : [{ type : ObjectId, ref : 'Release' }],
      songs      : [{ type : ObjectId, ref : 'Song' }],
      videos     : [{ type : ObjectId, ref : 'Video' }],
      created_at : { type : Number, default : Date.now },
      updated_at : { type : Number }
    }),

    Link : new Schema({
      artists    : { type : ObjectId, ref : 'Artist', required : true, index : true },
      title      : { type : String, required : true },
      url        : { type : String, required : true },
      created_at : { type : Number, default : Date.now },
      updated_at : { type : Number }
    }),

    Post : new Schema({
      artists    : [{ type : ObjectId, ref : 'Artist', index : true }],
      title      : { type : String, required : true },
      content    : { type : String, required : true },
      cover      : { type : String }, // url
      created_at : { type : Number, default : Date.now },
      updated_at : { type : Number }
    }),

    Release : new Schema({
      artists    : [{ type : ObjectId, ref : 'Artist', index : true }],
      title      : { type : String, required : true },
      desc       : { type : String },
      cover      : { type : String }, // url
      songs      : [{ type : ObjectId, ref : 'Song' }],
      created_at : { type : Number, default : Date.now },
      updated_at : { type : Number }
    }),

    Song : new Schema({
      artists    : [{ type : ObjectId, ref : 'Artist', index : true }],
      release    : { type : ObjectId, ref : 'Release', required : true, index : true },
      number     : { type : String },
      title      : { type : String, required : true },
      len        : { type : String }, // music length
      url        : { type : String, required : true },
      itunes_url : { type : String },
      created_at : { type : Number, default : Date.now },
      updated_at : { type : Number }
    }),

    Video : new Schema({
      artists    : [{ type : ObjectId, ref : 'Artist', index : true }],
      title      : { type : String, required : true },
      url        : { type : String, required : true },
      created_at : { type : Number, default : Date.now },
      updated_at : { type : Number }
    }),

    Live : new Schema({
      artists    : [{ type : ObjectId, ref : 'Artist', index : true }],
      date       : { type : String, required : true },
      place      : { type : String, required : true },
      created_at : { type : Number, default : Date.now },
      updated_at : { type : Number }
    })
  };

  // auto update `updated_at` on save
  Object.keys( Models ).forEach( function ( model ){
    if( Models[ model ].tree.updated_at !== undefined ){
      Models[ model ].pre( 'save', function ( next ){
        this.updated_at = this.isNew?
          this.created_at :
          Date.now();

        next();
      });
    }
  });

  return Models;
};

/**
 * Exports module.
 */
module.exports = Schema;
