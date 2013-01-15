var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/songs' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.is_authenticated );

    before( this.validate_index,           { only : [ 'index' ]});
    before( this.validate_show_n_edit,     { only : [ 'show', 'edit' ]});
    before( this.validate_create_n_update, { only : [ 'create', 'update' ]});
    before( this.is_validate,              { only : [ 'index', 'show', 'edit', 'create', 'update' ]});

    before( this.namespace );
    before( this.current_songs,  { only : [ 'index', 'show', 'new', 'edit' ]});
  },

  new : function ( req, res, next ){
    res.render( 'releases/show', {
      _assets          : 'admin/releases/assets/_show',
      admin_view       : 'new'
    });
  },

  create : function ( req, res, next ){
    res.render( 'releases/show', {
      _assets : 'admin/releases/assets/_show'
    });
  },

  index : function ( req, res, next ){
    res.render( 'releases/show', {
      _assets : 'admin/releases/assets/_show'
    });
  },

  show : function ( req, res, next ){
    res.render( 'releases/show', {
      _assets : 'admin/releases/assets/_show'
    });
  },

  edit : function ( req, res, next ){
    res.render( 'releases/show', {
      _assets    : 'admin/releases/assets/_show',
      admin_view : 'edit'
    });
  },

  update : function ( req, res, next ){
    res.render( 'releases/show', {
      _assets : 'admin/releases/assets/_show'
    });
  },

  destory : function ( req, res, next ){
    res.render( 'releases/show', {
      _assets : 'admin/releases/assets/_show'
    });
  }
});
