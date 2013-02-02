var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/artists' );
var Artist      = Model( 'Artist' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.is_authenticated );

    before( this.validate_show_n_edit,     { only : [ 'show', 'edit' ]});
    before( this.validate_create_n_update, { only : [ 'create', 'update' ]});
    before( this.is_validate,              { only : [ 'show', 'edit' ]});

    before( this.namespace );
    before( this.current_artist,  { only : [ 'show', 'edit' ]});
    before( this.recent_news,     { only : [ 'show' ]});
    before( this.recent_videos,   { only : [ 'show' ]});
    before( this.recent_releases, { only : [ 'show' ]});
  },

  new : function ( req, res, next ){
    res.render( 'admin/artists/new' );
  },

  create : function ( req, res, next ){
    var args = req.form;

    if( !req.form.isValid ){
      return res.render( 'admin/artists/new', {
        ori_body : req.body
      });
    }

    Artist.insert( args, next,
      // exist
      function (){
        res.render( 'admin/artists/new', {
          ori_body      : req.body,
          exist_err_msg : '此名字已被使用'
        });
      },
      // created
      function ( artist ){
        res.redirect( '/admin/artists/' + artist._id );
      });
  },

  index : function ( req, res, next ){
    var page = req.query.page ? parseInt( req.query.page ) : 0;
    var args = {
      artist : req.query.artist,
      limit  : 3,
      skip   : page
    };

    Artist.index( args, next,
      // no content
      function (){
        res.render( 'artists/index', {
          _assets : 'admin/artists/assets/_index',
          artists : []
        });
      },
      // ok
      function ( artists ){
        res.render( 'artists/index', {
          _assets : 'admin/artists/assets/_index',
          artists : artists
        });
      });
  },

  show : function ( req, res, next ){
    res.render( 'artists/show', {
      _assets  : 'admin/artists/assets/_show',
      artists  : req.artist,
      posts    : req.posts,
      videos   : req.videos,
      releases : req.releases
    });
  },

  edit : function ( req, res, next ){
    res.render( 'admin/artists/edit', {
      ori_body : req.artist
    });
  },

  update : function ( req, res, next ){
    var args = req.form;

    if( !req.form.isValid ){
      return res.render( 'admin/artists/edit', {
        ori_body : req.body
      });
    }

    Artist.update_props( args, next,
      function ( artist ){
        res.redirect( '/admin/artists/' + artist._id );
      });
  },

  destroy : function ( req, res, next ){
    var args = {
      id : req.params.id
    };

    Artist.destroy( args, next, function (){
      res.redirect( '/admin/artists' );
    });
  }
});
