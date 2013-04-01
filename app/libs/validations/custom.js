var r = require( './regex' );

module.exports = {

  split_artists_n_trim : function ( value ){
    if( !value.length ) return [];

    var artists = value.split( ',' );

    artists.forEach( function ( artist_name, index ){
      artists[ index ] = artist_name.trim();
    });

    return artists;
  },

  add_http_or_https_if_dont_exist : function ( value ){
    if( !value.length ) return value;

    return r.has_http_or_https.test( value ) ? value : 'http://' + value;
  }
};