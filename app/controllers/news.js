var Application = require( CONTROLLER_DIR + 'application' );
var validations = require( LIB_DIR + 'validations/news' );
var Post        = Model( 'Post' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.validate_show, { only : [ 'show' ]});
    before( this.is_validate,   { only : [ 'show' ]});

    before( this.namespace );
    before( this.banner_type );
    before( this.current_banner );
  },

  banner_type : function ( req, res, next ){
    req.banner_type = 'news';
    next();
  },

  index : function ( req, res, next ){
    var page = req.query.page ? parseInt( req.query.page ) : 0;
    var args = {
      artist : req.query.artist,
      limit  : 3,
      skip   : page
    };

    Post.index( args, next,
      // no content
      function (){
        res.render( 'news/index', {
          _assets : 'news/assets/_index',
          posts   : []
        });
      },
      // ok
      function ( posts ){
        res.render( 'news/index', {
          _assets : 'news/assets/_index',
          posts   : posts
        });
      });
  },

  show : function ( req, res, next ){
    var self = this;
    var args = {
      query : {
        id : req.params.id
      }
    };

    Post.show( args, next,
      // no content
      function (){
        self.no_content( req, res );
      },
      // ok
      function ( post ){
        res.render( 'news/show', {
          _assets : 'news/assets/_show',
          post    : post
        });
      });
  }
});
