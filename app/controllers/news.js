var Application = require( CONTROLLER_DIR + 'application' );

module.exports = Application.extend({

  index : function ( req, res, next ){
    res.render( 'news/index' );
  },

  show : function ( req, res, next ){
    res.render( 'news/show' );
  }
});
