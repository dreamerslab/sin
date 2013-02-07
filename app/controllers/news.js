var Application = require( CONTROLLER_DIR + 'application' );
var validations = require( LIB_DIR + 'validations/news' );
var Post        = Model( 'Post' );
var querystring = require( 'querystring' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.validate_show_n_edit, { only : [ 'show' ]});
    before( this.is_validate,          { only : [ 'show' ]});

    before( this.namespace );
    before( this.banner_type );
    before( this.current_banner );
  },

  banner_type : function ( req, res, next ){
    req.banner_type = 'news';
    next();
  },

  index : function ( req, res, next ){
    var page = req.query.page ? parseInt( req.query.page ) : 1;
    var args = {
      artist : req.query.artist,
      limit  : 2,
      page   : page
    };

    var qsPrev;
    if( page > 1 ){
      if( req.query.artist ) qsPrev.artist = req.query.artist;
      qsPrev = { page : page - 1 };
    }

    var qsNext = { page : page + 1 };
    if( req.query.artist ) qsNext.artist = req.query.artist;

    Post.index( args, next,
      // no content
      function (){
        res.render( 'news/index', {
          _assets : 'news/assets/_index',
          posts   : [],
          qsPrev: '',
          qsNext: ''
        });
      },
      // ok
      function ( posts, more ){
        if( !more ) qsNext = null;
        res.render( 'news/index', {
          _assets : 'news/assets/_index',
          posts   : posts,
          qsPrev: querystring.stringify( qsPrev ),
          qsNext: querystring.stringify( qsNext )
        });
      });
  },

  show : function ( req, res, next ){
    var self = this;
    var args = {
      id : req.params.id
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
