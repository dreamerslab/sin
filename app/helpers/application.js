String.prototype.bytes = function (){
  var arr = this.match( /[^\x00-\xff]/ig );
  return arr === null ? this.length : this.length + arr.length;
};

String.prototype.capitalize = function (){
  return this.replace( /(^|\s)([a-z])/g, function( m, p1, p2 ){ return p1 + p2.toUpperCase(); } );
};

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

    is_btn_disable : function ( qs ){
      return qs ? '' : 'btn-disable';
    },

    show_nav_qs : function ( qs ){
      return qs ? '?' + qs : '';
    },

    show_live_link : function ( live ){
      return live.url ? 'href="' + live.url + '"' : '';
    },

    show_ori_body_field : function ( ori_body, field ){
      var value = ori_body ? ori_body[ field ] : '';

      return value || '';
    },

    show_ori_link_title : function ( ori, index ){
      if( !ori )       return '';
      if( !ori.links ) return ori[ 'link_name' + ( index + 1 )];

      return ori.links[ index ].title;
    },

    show_ori_link_url : function ( ori, index ){
      if( !ori )       return '';
      if( !ori.links ) return ori[ 'link' + ( index + 1 )];

      return ori.links[ index ].url;
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
    },

    truncate : function ( str, length ){
      var _length = length === undefined ? 170 : length;

      var tmp = str.length > _length ?
        str.substr( 0, _length ) + '...' :
        str;

      return ( tmp.bytes() - 3 ) > _length ?
        tmp.substr( 0, _length / ( tmp.bytes() / _length )) + '...' :
        tmp;
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
