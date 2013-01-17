var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/artists' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.is_authenticated );

    before( this.validate_show_n_edit,     { only : [ 'show', 'edit' ]});
    before( this.validate_create_n_update, { only : [ 'create', 'update' ]});
    before( this.is_validate,              { only : [ 'show', 'edit' ]});

    before( this.namespace );
    before( this.current_artist,  { only : [ 'index' ]});
    before( this.recent_news,     { only : [ 'show' ]});
    before( this.recent_videos,   { only : [ 'show' ]});
    before( this.recent_releases, { only : [ 'show' ]});
  },

  new : function ( req, res, next ){
    res.render( 'admin/artists/new' );
  },

  create : function ( req, res, next ){
    if( !req.form.isValid ){
      return res.render( 'admin/artists/new' );
    }

    res.redirect( '/admin/artists' );
  },

  index : function ( req, res, next ){
    res.render( 'artists/index', {
      _assets : 'admin/artists/assets/_index'
    });
  },

  show : function ( req, res, next ){
    res.render( 'artists/show', {
      _assets : 'admin/artists/assets/_show'
    });
  },

  edit : function ( req, res, next ){
    res.render( 'admin/artists/edit' );
  },

  update : function ( req, res, next ){
    if( !req.form.isValid ){
      return res.render( 'admin/artists/edit' );
    }

    res.render( 'admin/artists/update' );
  },

  destory : function ( req, res, next ){
    res.render( 'admin/artists/destory' );
  }
});
