var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/videos' );

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
    res.render( 'videos/index', {
      _assets : 'admin/videos/assets/_index'
    });
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

  destory : function ( req, res, next ){
    res.render( 'admin/videos/destory' );
  }
});