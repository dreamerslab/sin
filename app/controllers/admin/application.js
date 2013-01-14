var Class = require( 'node.class' );

module.exports = Class.extend({

  namespace : function ( req, res, next ){
    res.local( 'namespace', '/admin' );

    next();
  }
});