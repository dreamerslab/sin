var Schema = function ( Schema ){

/**
 * Module dependencies.
 * @private
 */
  var ObjectId = Schema.ObjectId;

  var Models = {

    // banner, home_soundcloud & home_facebook... etc.
    Url : new Schema({
      type       : { type : String, required : true },
      url        : { type : String, default : '/img/common/default-banner.jpg' },
      created_at : { type : Number, default : Date.now },
      updated_at : { type : Number }
    }),

    // artist links, blog, fb, twitter ...
    Link : new Schema({
      title      : { type : String, default : '' },
      url        : { type : String, default : '' },
      created_at : { type : Number, default : Date.now },
      updated_at : { type : Number }
    }),

    Post : new Schema({
      artists    : [{ type : String, index : true }],
      title      : { type : String, required : true },
      content    : { type : String, required : true },
      cover      : { type : String, default : '' }, // url
      created_at : { type : Number, default : Date.now },
      updated_at : { type : Number }
    }),

    Release : new Schema({
      artists      : [{ type : String, index : true }],
      name         : { type : String, required : true },
      desc         : { type : String, default : '' },
      release_date : { type : String, default : '' },
      cover        : { type : String, default : '/img/common/default-banner.jpg' }, // url
      songs        : [{ type : ObjectId, ref : 'Song' }],
      created_at   : { type : Number, default : Date.now },
      updated_at   : { type : Number }
    }),

    Song : new Schema({
      title      : { type : String, required : true },
      duration   : { type : String, default : '' }, // music length
      soundcloud : { type : String, default : '' },
      itunes     : { type : String, default : '' },
      created_at : { type : Number, default : Date.now },
      updated_at : { type : Number }
    }),

    Video : new Schema({
      artists    : [{ type : String, index : true }],
      title      : { type : String, required : true },
      thumb      : { type : String, required : true },
      date       : { type : String, required : true },
      url        : { type : String, required : true }, // youtube link
      youtube_id : { type : String, required : true },
      created_at : { type : Number, default : Date.now },
      updated_at : { type : Number }
    }),

    Live : new Schema({
      title      : { type : String, required : true },
      date       : { type : String, required : true },
      location   : { type : String, required : true },
      url        : { type : String, default : '' },
      created_at : { type : Number, default : Date.now },
      updated_at : { type : Number }
    }),

    Artist : new Schema({
      name       : { type : String, required : true, index : true },
      desc       : { type : String, default  : '' },
      thumb      : { type : String, default  : '' }, // url ( bg )
      cover      : { type : String, default  : '/img/common/default-banner.jpg' }, // url ( bg )
      links      : [{ type : ObjectId, ref : 'Link' }],
      created_at : { type : Number, default : Date.now },
      updated_at : { type : Number }
    })

  };

  // auto update `updated_at` on save
  Object.keys( Models ).forEach( function ( model ){
    if( Models[ model ].tree.updated_at !== undefined ){
      Models[ model ].pre( 'save', function ( next ){
        this.updated_at = this.isNew ?
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
