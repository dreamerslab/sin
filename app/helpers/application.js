var moment = require( 'moment' );
var marked = require( 'marked' );
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

    markdown : marked,

    val : function ( obj, prop ){
      return obj === undefined ? '' : obj[ prop ];
    },

    date : function ( date, format ){
      return moment( date ).format( format || 'MMM Do YYYY, h:m:s' );
    },

    show_err : function ( err ){
      return err ?
        '<label class="error">' + err + '</label>' : '';
    },

    show_form_err : function ( field, tip ){
      if( UTILS.is( field ) === 'array' ){
        var i = 0;
        var j = field.length;
        var msg;

        for(; i < j; i++ ){
          if( this.get_form_err()[ field[ i ]]){
            msg = this.get_form_err()[ field[ i ]][ 0 ];

            break;
          }
        }

        return msg ?
          '<p class="error-msg">' + msg + '</p>' :
          ( tip || '' );
      }

      return this.get_form_err()[ field ] ?
        '<p class="error-msg">' + this.get_form_err()[ field ][ 0 ] + '</p>' :
        ( tip || '' );
    }

    // show_form_err : function ( type ){
    //   return this.get_form_err()[ type ] ?
    //     '<p class="error">' + this.get_form_err()[ type ][ 0 ] + '</p>' :
    //     '';
    // }
  });

  app.dynamicHelpers({

    get_form_err : function ( req, res ){
      return function (){
        return req.form ?
          req.form.getErrors() : {};
      }
    },

    messages : require( 'express-messages' )
  });
};
