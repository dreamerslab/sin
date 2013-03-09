var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/news' );
var Post        = Model( 'Post' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.is_authenticated );

    before( this.validate_show_n_edit,     { only : [ 'show', 'edit' ]});
    before( this.validate_create_n_update, { only : [ 'create', 'update' ]});
    before( this.is_validate,              { only : [ 'show', 'edit' ]});

    before( this.namespace );
    before( this.banner_type );
    before( this.current_banner );
    before( this.nav_querystring,  { only : [ 'index' ]});
    before( this.is_artists_found, { only : [ 'create', 'update' ]});
  },

  banner_type : function ( req, res, next ){
    req.banner_type = 'news';
    next();
  },

  new : function ( req, res, next ){
    res.render( 'admin/news/new' );
  },

  create : function ( req, res, next ){
    var args = req.form;

    args.cover            = req.body.cover;
    args.is_artists_found = req.is_artists_found;

    if( !req.form.isValid ){
      return res.render( 'admin/news/new', {
        ori_body : req.body
      });
    }

    Post.insert( args, next,
      // not found
      function (){
        res.render( 'admin/news/new', {
          ori_body         : req.body,
          is_artists_found : false
        });
      },
      // created
      function ( post ){
        res.redirect( '/admin/news/' + post._id );
      });
  },

  index : function ( req, res, next ){
    var args = {
      artist : req.query.artist,
      limit  : 3,
      page   : req.page
    };

    res.locals({
      title        : '三十而立 sincerely music | 新聞',
      nav_selected : 'news',
      _assets      : [ 'admin-news-index' ]
    });

    Post.index( args, next,
      // no content
      function (){
        res.render( 'news/index', {
          posts   : [],
          qs_prev : '',
          qs_next : ''
        });
      },
      // ok
      function ( posts, more ){
        if( !more ) req.qs_next = null;
        res.render( 'news/index', {
          posts   : posts,
          qs_prev : req.qs_prev,
          qs_next : req.qs_next
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
          title        : '三十而立 sincerely music | ' + post.title,
          nav_selected : 'news',
          _assets      : [ 'admin-news-show' ],
          post         : post
        });
      });
  },

  edit : function ( req, res, next ){
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
        var ori_body = UTILS.merge( post, {
          artist : post.artists.join( ', ' )
        });

        res.render( 'admin/news/edit', {
          ori_body : ori_body
        });
      });
  },

  update : function ( req, res, next ){
    var self = this;
    var args = req.form;

    args.cover            = req.body.cover;
    args.is_artists_found = req.is_artists_found;

    if( !req.form.isValid ){
      return res.render( 'admin/artists/edit', {
        ori_body : req.body
      });
    }

    Post.update_props( args, next,
      // not found
      function (){
        res.render( 'admin/news/edit', {
          ori_body         : req.body,
          is_artists_found : false
        });
      },
      // no content
      function (){
        self.no_content( req, res );
      },
      // updated
      function ( post ){
        res.redirect( '/admin/news/' + post._id );
      });
  },

  destroy : function ( req, res, next ){
    var self = this;
    var args = {
      id : req.params.id
    };

    Post.destroy( args, next,
      // no content
      function (){
        self.no_content( req, res );
      },
      // deleted
      function (){
        res.redirect( '/admin/news' );
      });
  }
});
