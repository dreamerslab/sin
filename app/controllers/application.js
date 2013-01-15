var Class = require( 'node.class' );

module.exports = Class.extend({

  no_content : function ( req, res, next ){
    res.render( 'error/404', {
      layout : false
    });
  },

  namespace : function ( req, res, next ){
    res.local( 'namespace', '' );

    next();
  },

  is_validate : function ( req, res, next ){
    next();
  },

  current_artist : function ( req, res, next ){
    // assign query cond about artist to req.cond
    next();
  },

  current_songs : function ( req, res, next ){
    next();
  },

  recent_news : function ( req, res, next ){
    next();
  },

  recent_releases : function ( req, res, next ){
    next();
  },

  recent_videos : function ( req, res, next ){
    next();
  },

  recent_live : function ( req, res, next ){
    next();
  }

  // validation : function ( err, req, res, next ){
  //   if( err.name && err.name == 'ValidationError' ){
  //     var error;
  //     for( error in err.errors ){
  //       req.flash( 'flash-error', err.errors[ error ].message );
  //     }

  //     res.redirect( 'back' );
  //     LOG.error( 500, res, err );

  //     return;
  //   }

  //   next( err );
  // }
});