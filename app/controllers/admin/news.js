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
  },

  new : function ( req, res, next ){
    res.render( 'admin/news/new' );
  },

  create : function ( req, res, next ){
    if( !req.form.isValid ){
      return res.render( 'admin/news/new', {
        ori_body : req.body
      });
    }

    Post.insert( req.form, next,
      // artist not found
      function (){
        res.render( 'admin/news/new', {
          ori_body        : req.body,
          is_artist_found : false
        });
      },
      // created
      function ( post ){
        res.redirect( '/admin/news/' + post._id );
      }
    );
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
          _assets : 'admin/news/assets/_index',
          posts   : []
        });
      },
      // ok
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
          _assets : 'admin/news/assets/_show',
          post    : post
        });
      }
    );
  },

  edit : function ( req, res, next ){
    Post.show( args, next,
      // no content
      function (){
        self.no_content( req, res );
      },
      // ok
      function ( post ){
        res.render( 'admin/news/edit', {
          ori_post : post
        });
      }
    );
  },

  update : function ( req, res, next ){
    var self = this;

    if( !req.form.isValid ){
      return res.render( 'admin/artists/edit', {
        ori_body : req.body
      });
    }

    Post.update( req.form, next,
      // artist not found
      function (){
        res.render( 'admin/news/edit', {
          ori_body        : req.body,
          is_artist_found : false
        });
      },
      // no content
      function (){
        self.no_content( req, res );
      },
      // updated
      function ( post ){
        res.redirect( '/admin/news/' + post._id );
      }
    );
  },

  destroy : function ( req, res, next ){
    var self = this;

    Post.destroy( req.params.id, next,
      // no content
      function (){
        self.no_content( req, res );
      },
      // deleted
      function (){
        res.redirect( '/admin/news' );
      }
    );
  }
});
