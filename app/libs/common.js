module.exports = {
  artists_diff : function ( a, b ){
    var seen = [];
    var diff = [];
    var i    = 0;

    for( i = 0; i < b.length; i++ ){
      seen[ b[ i ]] = true;
    }

    for( i = 0; i < a.length; i++ ){
      if( !seen[ a[ i ]]) diff.push( a[ i ]);
    }

    return diff;
  }
};