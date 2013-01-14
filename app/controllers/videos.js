var Application = require( CONTROLLER_DIR + 'application' );

module.exports = Application.extend({

  init : function ( before, after ){
    before( this.namespace );
    before( this.current_artist );
  },

  index : function ( req, res, next ){
    res.render( 'videos/index', {
      _assets : 'videos/assets/_index'
    });
  }
});