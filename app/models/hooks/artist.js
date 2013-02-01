var Flow    = require( 'node.flow' );
var Post    = Model( 'Post' );
var Release = Model( 'Release' );
var Video   = Model( 'Video' );
var Link    = Model( 'Link' );

module.exports = {
  remove_links : function ( next ){
    var self = this;
    var flow = new Flow();

    this.links.forEach( function ( link_id, index ){
      flow.parallel( function ( ready ){
        Link.findByIdAndRemove( link_id, function ( err, link ){
          if( err ) return ready( err );

          ready();
        });
      });
    });

    flow.join().error( function ( err ){
        if( err ){
          LOG.error( 500, '[hooks][artist][remove_links] fail', err );
          next( err );
        }
      }).
      end( function (){
        LOG.debug( '[hooks][artist][remove_links] done', self.links );
        next();
      });
  },

  remove_from_posts : function ( next ){
    var query =  { artists : { $in : [ new RegExp( this.name, 'i' )]}};
    var update = { $pull : { posts : new RegExp( this.name, 'i' )}};

    Post.update( query, update, function ( err, posts ){
      if( err ) return next( err );

      LOG.debug( '[hooks][artist][remove_from_posts] done', posts );
      next();
    });
  },

  remove_from_releases : function ( next ){
    var query =  { artists : { $in : [ new RegExp( this.name, 'i' )]}};
    var update = { $pull : { posts : new RegExp( this.name, 'i' )}};

    Release.update( query, update, function ( err, releases ){
      if( err ) return next( err );

      LOG.debug( '[hooks][artist][remove_from_releases] done', releases );
      next();
    });
  },

  remove_from_videos : function ( next ){
    var query =  { artists : { $in : [ new RegExp( this.name, 'i' )]}};
    var update = { $pull : { posts : new RegExp( this.name, 'i' )}};

    Video.update( query, update, function ( err, videos ){
      if( err ) return next( err );

      LOG.debug( '[hooks][artist][remove_from_videos] done', videos );
      next();
    });
  }
};