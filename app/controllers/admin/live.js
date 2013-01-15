var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/live' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.is_authenticated );

    before( this.validate_edit,            { only : [ 'edit' ]});
    before( this.validate_create_n_update, { only : [ 'create', 'update' ]});
    before( this.is_validate,              { only : [ 'create', 'edit', 'update' ]});

    before( this.namespace );
    before( this.current_artist { only : [ 'index' ]});
    before( this.current_live,  { only : [ 'index' ]});
  },

  new : function ( req, res, next ){
    res.render( 'admin/live/new' );
  },

  create : function ( req, res, next ){
    res.render( 'admin/live/create' );
  },

  index : function ( req, res, next ){
    res.render( 'live/index', {
      _assets : 'admin/live/assets/_index'
    });
  },

  edit : function ( req, res, next ){
    res.render( 'admin/live/edit' );
  },

  update : function ( req, res, next ){
    res.render( 'admin/live/update' );
  },

  destory : function ( req, res, next ){
    res.render( 'admin/live/destory' );
  }
});
