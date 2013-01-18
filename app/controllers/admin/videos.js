var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/videos' );
var Video       = Model( 'Video' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.is_authenticated );

    before( this.validate_edit,            { only : [ 'edit' ]});
    before( this.validate_create_n_update, { only : [ 'create', 'update' ]});
    before( this.is_validate,              { only : [ 'edit' ]});

    before( this.namespace );
    before( this.current_artist, { only : [ 'index' ]});
  },

  new : function ( req, res, next ){
    res.render( 'admin/videos/new' );
  },

  create : function ( req, res, next ){
    if( !req.form.isValid ){
      return res.render( 'admin/videos/new' );
    }

    res.redirect( 'admin/videos' );
  },

  index : function ( req, res, next ){
    var page = req.query.page ? parseInt( req.query.page ) : 0;
    var args = {
      cond  : req.query_cond,
      limit : 5,
      skip  : page
    };

    Video.index( args, next,
      function (){
        res.render( 'videos/index', {
          _assets : 'admin/videos/assets/_index',
          videos  : []
        });
      },
      function ( videos ){
        res.render( 'videos/index', {
          _assets : 'admin/videos/assets/_index',
          videos  : videos
        });
      }
    );
  },

  edit : function ( req, res, next ){
    res.render( 'admin/videos/edit' );
  },

  update : function ( req, res, next ){
    if( !req.form.isValid ){
      return res.render( 'admin/videos/edit' );
    }

    res.redirect( 'admin/videos' );
  },

  destroy : function ( req, res, next ){
    res.render( 'admin/videos/destroy' );
  }
});