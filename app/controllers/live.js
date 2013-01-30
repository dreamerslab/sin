var Application = require( CONTROLLER_DIR + 'application' );
var Live        = Model( 'Live' );

module.exports = Application.extend({

  init : function ( before, after ){
    before( this.namespace );
    before( this.current_artist );
  },

  index : function ( req, res, next ){
    var page = req.query.page ? parseInt( req.query.page ) : 0;
    var args = {
      query : req.query_cond,
      limit : 10,
      skip  : page
    };

    Live.index( args, next,
      function (){
        res.render( 'live/index', {
          _assets : 'live/assets/_index',
          lives   : []
        });
      },
      function ( lives ){
        res.render( 'live/index', {
          _assets : 'live/assets/_index',
          lives   : lives
        });
      }
    );
  }
});
