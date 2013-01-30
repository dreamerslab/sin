module.exports = {

  split_artists_n_trim : function ( value ){
    if( !value.length ) return [];

    var artists = value.split( ',' );

    artists.forEach( function ( artist_name, index ){
      artists[ index ] = artist_name.trim();
    });

    return artists;
  }
};