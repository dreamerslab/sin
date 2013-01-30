var Artist = Model( 'Artist' );
var Flow   = require( 'node.flow' );

module.exports = {
  insert_to_artists : function ( child ){
    var flow = new Flow();

    return function ( next ){
      var self = this;

      this.artists.forEach( function ( artist_id ){
        flow.parallel( function ( ready ){
          Artist.findById( artist_id, function ( err, artist ){
            artist[ child ].push( self._id ).
              save( function ( err, artist ){
                if( err ) return LOG.error( 500, '[hooks][common][insert_to_artists( ' + artist.name + ' )] ' + 'fail', err );

                LOG.debug( '[hooks][common][update_artists( ' + artist.name + ' )][remove ' + child + ' from '  + artist.name + '] done', artist );
                ready();
              });
          });
        });
      });

      flow.join().end( function (){
        next();
      });
    };
  },

  update_artists : function ( artists_to_insert, artists_to_remove, children, child, next ){
    // remove child from artists
    artists_to_insert.forEach( function ( artist_id ){
      Artist.findById( artist_id, function ( err, artist ){
        artist[ children ].push( child._id ).
          save( function ( err, artist ){
            if( err ) LOG.error( 500, '[hooks][common][insert_to_artists( ' + artist.name + ' )] ' + 'fail', err );

            LOG.debug( '[hooks][common][update_artists( ' + artist.name + ' )][remove ' + children + ' from '  + artist.name + '] done', artist );
          });
      });
    });

    // push child to artists
    artists_to_remove.forEach( function ( artist_id ){
      Artist.findById( artist_id, function ( err, artist ){
        var position = artist[ children ].indexOf( child._id );

        if( position ) artist[ children ].splice( position, 1 );

        artist.save( function ( err, artist ){
          if( err ) return LOG.error( 500, '[hooks][common][insert_to_artists( ' + artist.name + ' )] ' + 'fail', err );

          LOG.debug( '[hooks][common][update_artists( ' + artist.name + ' )][push ' + children + ' to '  + artist.name + '] done', artist );
        });
      });
    });
  },

  remove_from_artists : function ( child ){
    var flow = new Flow();

    return function ( next ){
      var self = this;

      this.artists.forEach( function ( artist_id ){
        flow.parallel( function ( ready ){
          Artist.findById( artist_id, function ( err, artist ){
            var position = artist[ child ].indexOf( self._id );

            if( position ) artist[ child ].splice( position, 1 );

            artist.save( function ( err, artist ){
              if( err ){
                LOG.error( 500, '[hooks][common][remove_from_artists( ' + artist.name + ' )] ' + 'fail', err );
                return ready( err );
              }

              LOG.debug( '[hooks][common][remove_from_artists( ' + artist.name + ' )] done', artist );
              ready();
            });
          });
        });
      });

      flow.join().end( function (){
        next();
      });
    };
  }
};
