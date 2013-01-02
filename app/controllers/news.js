var Application = require( CONTROLLER_DIR + 'application' );

module.exports = Application.extend({

  index : function ( req, res, next ){
    res.render( 'news/index', {
      _assets : 'news/assets/_index'
    });
  },

  show : function ( req, res, next ){
    res.render( 'news/show', {
      _assets : 'news/assets/_show'
    });
  }
});
