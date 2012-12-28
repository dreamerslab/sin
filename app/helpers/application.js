var moment = require( 'moment' );

module.exports = function ( app ){
  app.helpers({

    exist : function ( obj, exist, not_exist ){
      if( obj ) return exist();

      return not_exist && not_exist();
    },

    selected : function ( target, current ){
      return target === current ? 'selected' : '';
    },

    val : function ( obj, prop ){
      return obj === undefined ? '' : obj[ prop ];
    },

    date : function ( date, format ){
      return moment( date ).format( format || 'MMM Do YYYY, h:m:s' );
    }
  });

  app.dynamicHelpers({
    messages : require( 'express-messages' )
  });
};
