var Application              = require( '../application' );
var Live                     = Model( 'Live' );
var regex_for_get_youtube_id = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;

module.exports = Application.extend({

  namespace : function ( req, res, next ){
    res.local( 'namespace', '/admin' );

    next();
  },

  is_authenticated : function ( req, res, next ){
    if( !req.session.is_authenticated ){
      return res.redirect( '/admin/login' );
    };

    res.local( 'is_authenticated', true );

    next();
  },

  get_info_from_youtube : function ( req, res, next ){
    req.youtube_info = req.form;

    var cond = [
      'https://gdata.youtube.com/feeds/api/videos/',
      req.form.link.match( regex_for_get_youtube_id )[ 7 ],
      '?v=',   '2',
      '&alt=', 'json'
    ].join( '' );

    request( cond,
      function ( err, response, body ){
        if( err ) return next( err );
        if( response.statusCode == 200 ){
          var entry = JSON.parse( body ).entry;

          req.youtube_info.title = entry.title.$t;
          req.youtube_info.url   = entry.link[ 0 ].href;
          req.youtube_info.thumb = entry.media$group.media$thumbnail[ 3 ].url;
          req.youtube_info.date  = entry.published.$t.substring( 0, 10 );

          next();
        }
      }
    );
  }
});