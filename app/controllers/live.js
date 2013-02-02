var Application = require( CONTROLLER_DIR + 'application' );
var Live        = Model( 'Live' );

module.exports = Application.extend({

  init : function ( before, after ){
    before( this.namespace );
  },

  index : function ( req, res, next ){
    var page = req.query.page ? parseInt( req.query.page ) : 0;
    var args = {
      artist : req.query.artist,
      limit  : 10,
      skip   : page
    };

    Live.index( args, next,
      // no content
      function (){
        res.render( 'live/index', {
          _assets : 'live/assets/_index',
          lives   : []
        });
      },
      // ok
      function ( lives ){
        res.render( 'live/index', {
          _assets : 'live/assets/_index',
          lives   : lives
        });
      });
  }
});
