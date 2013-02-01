// var Artist = Model( 'Artist' );
// var Flow   = require( 'node.flow' );

// module.exports = {
//   // post insert
//   add_to_artists : function ( child ){
//     var flow = new Flow();

//     return function ( next ){
//       var self = this;

//       this.artists.forEach( function ( artist_id ){
//         flow.parallel( function ( ready ){
//           Artist.findById( artist_id, function ( err, artist ){
//             // child could be posts, releases, lives, videos, check details in schema of Artist
//             artist[ child ].addToSet( self._id ).
//               save( function ( err, artist ){
//                 if( err ) return LOG.error( 500, '[hooks][common][insert_to_artists( ' + artist.name + ' )] fail', err );

//                 LOG.debug( '[hooks][common][update_artists( ' + artist.name + ' )][remove ' + child + ' from ' + artist.name + '] done', artist );
//                 ready();
//               });
//           });
//         });
//       });

//       flow.join().end( function (){
//         next();
//       });
//     };
//   },

//   update_artists : function ( artists_to_insert, artists_to_remove, children, child, next ){
//     // remove child from artists
//     artists_to_insert.forEach( function ( artist_id ){
//       Artist.findById( artist_id, function ( err, artist ){
//         artist[ children ].addToSet( child._id ).
//           save( function ( err, artist ){
//             if( err ) LOG.error( 500, '[hooks][common][insert_to_artists( ' + artist.name + ' )] fail', err );

//             LOG.debug( '[hooks][common][update_artists( ' + artist.name + ' )][remove ' + children + ' from '  + artist.name + '] done', artist );
//           });
//       });
//     });

//     // push child to artists
//     artists_to_remove.forEach( function ( artist_id ){
//       Artist.findById( artist_id, function ( err, artist ){
//         var position = artist[ children ].indexOf( child._id );

//         if( position ) artist[ children ].splice( position, 1 );

//         artist.save( function ( err, artist ){
//           if( err ) return LOG.error( 500, '[hooks][common][insert_to_artists( ' + artist.name + ' )] fail', err );

//           LOG.debug( '[hooks][common][update_artists( ' + artist.name + ' )][push ' + children + ' to '  + artist.name + '] done', artist );
//         });
//       });
//     });
//   },

//   // pre remove
//   remove_from_artists : function ( field_name ){
//     var flow = new Flow();
//     var self = this;

//     return function ( next ){

//       var update = { $pull : {}};

//       update[ '$pull' ][ field_name ] = this._id;

//       // Artist.update({ name : artist_name }, update, { multi : true });

//       this.artists.forEach( function ( artist_name ){
//         flow.parallel( function ( ready ){
//           Artist.update({ name : artist_name }, update, function ( err, artist ){
//             if( err ) return ready( err );

//             LOG.debug( '[hooks][common][remove_from_artists( ' + artist.name + ' )] done', artist );
//             ready();
//           });
//         });
//       });


//       // this.artists.forEach( function ( artist_name ){
//       //   flow.parallel( function ( ready ){
//       //     Artist.findOne({ name : artist_name }, function ( err, artist ){
//       //       // field_name could be posts, releases, lives, videos, check details in schema of Artist
//       //       var position = artist[ field_name ].indexOf( self._id );

//       //       if( position ) artist[ field_name ].splice( position, 1 );

//       //       artist.save( function ( err, artist ){
//       //         if( err ){
//       //           LOG.error( 500, '[hooks][common][remove_from_artists( ' + artist.name + ' )] fail', err );
//       //           return ready( err );
//       //         }

//       //         LOG.debug( '[hooks][common][remove_from_artists( ' + artist.name + ' )] done', artist );
//       //         ready();
//       //       });
//       //     });
//       //   });
//       // });

//       flow.join().error( function ( err ){
//         next( err )
//       }).end( function (){
//         next();
//       });
//     };
//   }
// };
