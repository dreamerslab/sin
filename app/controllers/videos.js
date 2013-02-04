var Application = require( CONTROLLER_DIR + 'application' );
var Video       = Model( 'Video' );

module.exports = Application.extend({

  init : function ( before, after ){
    before( this.namespace );
    before( this.banner_type );
    before( this.current_banner );
  },

  banner_type : function ( req, res, next ){
    req.banner_type = 'videos';
    next();
  },

  index : function ( req, res, next ){
    var page = req.query.page ? parseInt( req.query.page ) : 0;
    var args = {
      artist : req.query.artist,
      limit  : 5,
      skip   : page
    };

    Video.index( args, next,
      // no content
      function (){
        res.render( 'videos/index', {
          _assets : 'videos/assets/_index',
          videos  : []
        });
      },
      // ok
      function ( videos ){
        res.render( 'videos/index', {
          _assets : 'videos/assets/_index',
          videos  : videos
        });
      });
  }
});