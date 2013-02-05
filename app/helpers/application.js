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

    artists_to_str : function ( artists ){
      return artists.join( ', ' );
    },

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
      return moment( date ).format( format || 'YYYY/MM/DD' );
    },

    show_ori_body_field : function ( ori_body, field ){
      return ori_body ? ori_body[ field ] : '';
    },

    show_ori_body_artists_str : function ( ori_body ){
      return ori_body ? this.artists_to_str( ori_body.artists ) : '';
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
          '<p class="error">' + msg + '</p>' :
          ( tip || '' );
      }

      return this.get_form_err()[ field ] ?
        '<p class="error">' + this.get_form_err()[ field ][ 0 ] + '</p>' :
        ( tip || '' );
    },

    show_form_err_banner : function ( field ){
      return this.get_form_err()[ field ] ?
        '<p class="error-msg">' + this.get_form_err()[ field ][ 0 ] + '</p>' :
        '';
    },

    show_no_content_err : function ( data_arr ){
      return data_arr.length ? '' : '<p>沒有內容</p>';
    }
  });

  app.dynamicHelpers({

    get_form_err : function ( req, res ){
      return function (){
        return req.form ?
          req.form.getErrors() : {};
      }
    },

    show_req_params : function ( req, res ){
      return function (){
        return req.params;
      };
    },

    messages : require( 'express-messages' )
  });
};
