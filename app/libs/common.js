module.exports = {
  artists_to_string : function ( ori ){
    var o_ori = ori.toObject();

    o_ori.artists_str = '';

    o_ori.artists.forEach( function ( artist ){
      o_ori.artists_str += artist.name + ', ';
    });

    o_ori.artists_str = o_ori.artists_str.substr( 0, o_ori.artists_str - 2 );

    return o_ori;
  },

  artists_diff : function ( a, b ) {
    var seen = [];
    var diff = [];

    for ( var i = 0; i < b.length; i++ ){
      seen[ b[ i ]] = true;
    }
    for ( var i = 0; i < a.length; i++ ){
      if ( !seen[ a[ i ]]) diff.push( a[ i ]);
    }

    return diff;
  }
};