var Class   = require( 'node.class' );
var request = require( 'request' );

module.exports = Class.extend({

  index : function ( req, res, next ){
    var _regex    = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var video_url = 'http://www.youtube.com/watch?v=D1GmL_mvmwY&feature=g-high-u';

    var cond = [
      'https://gdata.youtube.com/feeds/api/videos/',
      video_url.match( _regex )[ 7 ],
      '?v=',   '2',
      '&alt=', 'json'
    ].join( '' );

    // get related video
    // var cond = [
    //   'http://gdata.youtube.com/feeds/api/videos/',
    //   video_url.match( _regex )[ 7 ],
    //   '/related?v=2',
      // '&alt=', 'json'
    // ].join( '' );

    request( cond,
      function ( err, response, body ){
        if( err ) return next( err );
        if( !err && response.statusCode == 200 ){
          body = JSON.parse( body );

          // console.log( body.entry.link[ 0 ].href );
          // console.log( body.entry.media$group.media$thumbnail );

          res.render( 'home/index', {
            title   : '三十而立 sincerely music',
            _assets : 'home/assets/_index'
          });
        }
      });
  }
});
