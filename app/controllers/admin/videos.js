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
  },

  new : function ( req, res, next ){
    res.render( 'admin/videos/new' );
  },

  create : function ( req, res, next ){
    if( !req.form.isValid ){
      return res.render( 'admin/videos/new', {
        ori_body : req.body
      });
    }

    Video.insert( req.form, next, function (){
      res.redirect( 'admin/videos' );
    });
  },

  index : function ( req, res, next ){
    var page = req.query.page ? parseInt( req.query.page ) : 0;
    var args = {
      artist : req.query.artist,
      limit  : 5,
      skip   : page
    };

    Video.index( args, next,
      // no content
      function (){
        res.render( 'videos/index', {
          _assets : 'admin/videos/assets/_index',
          videos  : []
        });
      },
      // ok
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
      return res.render( 'admin/videos/edit', {
        ori_body : req.body
      });
    }

    Video.update( req.form, next,
      function (){
        res.redirect( '/admin/videos' );
      }
    );
  },

  destroy : function ( req, res, next ){
    Release.destroy( req.params.id, next, function (){
      res.redirect( '/admin/videos' );
    });
  }
});