var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/news' );

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
    res.render( 'admin/news/create' );
  },

  index : function ( req, res, next ){
    res.render( 'news/index', {
      _assets : 'admin/news/assets/_index'
    });
  },

  show : function ( req, res, next ){
    res.render( 'news/show', {
      _assets : 'admin/news/assets/_show'
    });
  },

  edit : function ( req, res, next ){
    res.render( 'admin/news/edit' );
  },

  update : function ( req, res, next ){
    res.render( 'admin/news/update' );
  },

  destory : function ( req, res, next ){
    res.render( 'admin/news/destory' );
  }
});
