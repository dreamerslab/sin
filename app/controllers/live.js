var Application = require( CONTROLLER_DIR + 'application' );

module.exports = Application.extend({

  init : function ( before, after ){
    before( this.namespace );
    before( this.current_artist );
  },

  index : function ( req, res, next ){
    res.render( 'live/index', {
      _assets : 'admin/live/assets/_index'
    });
  }
});
