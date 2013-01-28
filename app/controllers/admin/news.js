var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/news' );
var Post        = Model( 'Post' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.is_authenticated );

    before( this.validate_show_n_edit,     { only : [ 'show', 'edit' ]});
    before( this.validate_create_n_update, { only : [ 'create', 'update' ]});
    before( this.is_validate,              { only : [ 'show', 'edit', 'create', 'update' ]});

    before( this.namespace );
    before( this.current_artist, { only : [ 'index' ]});
  },

  new : function ( req, res, next ){
    res.render( 'admin/news/new' );
  },

  create : function ( req, res, next ){
    var args = {
      body : req.body
    };

    if( !req.form.isValid ){
      return res.render( 'admin/news/new', {
        body : args.body
      });
    }

    Post.insert( args, next,
      function (){
        res.render( 'admin/news/new', {
          body            : args.body,
          is_artist_found : false
        });
      },
      function ( post ){
        res.redirect( '/admin/news/' + post._id );
      }
    );
  },

  index : function ( req, res, next ){
    var page = req.query.page ? parseInt( req.query.page ) : 0;
    var args = {
      cond  : req.query_cond,
      limit : 3,
      skip  : page
    };

    Post.index( args, next,
      function (){
        res.render( 'news/index', {
          _assets : 'admin/news/assets/_index',
          posts   : []
        });
      },
      function ( posts ){
        res.render( 'news/index', {
          _assets : 'admin/news/assets/_index',
          posts   : posts
        });
      }
    );
  },

  show : function ( req, res, next ){
    var self = this;
    var args = {
      cond : {
        id : req.params.id
      }
    };

    Post.show( args, next,
      function (){
        self.no_content( req, res );
      },
      function ( post ){
        res.render( 'news/show', {
          _assets : 'admin/news/assets/_show',
          post    : post
        });
      }
    );
  },

  edit : function ( req, res, next ){
    Post.show( args, next,
      function (){
        self.no_content( req, res );
      },
      function ( post ){
        res.render( 'admin/news/edit', {
          ori_post : post
        });
      }
    );
  },

  update : function ( req, res, next ){
    var args = {
      id   : req.params.id,
      body : req.body
    };

    if( !req.form.isValid ){
      return res.render( 'admin/artists/edit', {
        body : args.body
      });
    }

    Post.update( args, next,
      function (){
        res.render( 'admin/news/edit', {
          body            : args.body,
          is_artist_found : false
        });
      },
      function ( post ){
        res.redirect( '/admin/news/' + post._id );
      }
    );
  },

  destroy : function ( req, res, next ){
    Post.destroy( req.params.id, next, function (){
      res.redirect( '/admin/news' );
    });
  }
});
