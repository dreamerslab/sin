var Application = require( CONTROLLER_DIR + 'application' );
var Video       = Model( 'Video' );

module.exports = Application.extend({

  init : function ( before, after ){
    before( this.namespace );
    before( this.current_artist );
  },

  index : function ( req, res, next ){
    var page = req.query.page ? parseInt( req.query.page ) : 0;
    var args = {
      query : req.query_cond,
      limit : 5,
      skip  : page
    };

    Video.index( args, next,
      function (){
        res.render( 'videos/index', {
          _assets : 'videos/assets/_index',
          videos  : []
        });
      },
      function ( videos ){
        res.render( 'videos/index', {
          _assets : 'videos/assets/_index',
          videos  : videos
        });
      }
    );
  }
});