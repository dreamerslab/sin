var moment = require( 'moment' );
var covers = {
  news     : '/img/common/cover-news.png',
  artists  : '/img/common/cover-artists.png',
  releases : '/img/common/cover-releases.png',
  live     : '/img/common/cover-live.png',
  videos   : '/img/common/cover-videos.png',
  contact  : '/img/common/cover-contact.png'
};

module.exports = function ( app ){
  app.helpers({

    exist : function ( obj, exist, not_exist ){
      if( obj ) return exist();

      return not_exist && not_exist();
    },

    selected : function ( target, current ){
      return target === current ? 'selected' : '';
    },

    header_overlay : function ( name ){
      return covers[ name ] ?
        '<img id="header-overlay" src="' + covers[ name ] + '" alt="Header Overlay">' :
        '';
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
