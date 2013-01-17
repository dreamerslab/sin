var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/releases' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.is_authenticated );

    before( this.validate_show_n_edit,     { only : [ 'show', 'edit' ]});
    before( this.validate_create_n_update, { only : [ 'create', 'update' ]});
    before( this.is_validate,              { only : [ 'show', 'edit' ]});

    before( this.namespace );
    before( this.current_artist, { only : [ 'index' ]});
    before( this.current_songs,  { only : [ 'show' ]});
    before( this.current_song,   { only : [ 'show' ]});
  },

  current_song : function ( req, res, next ){
    if( !req.songs.length ) return next();

    req.current_song = song[ 0 ];

    next();
  },

  new : function ( req, res, next ){
    res.render( 'admin/releases/new' );
  },

  create : function ( req, res, next ){
    if( !req.form.isValid ){
      return res.render( 'admin/releases/new' );
    }

    res.render( 'admin/releases/create' );
  },

  index : function ( req, res, next ){
    res.render( 'releases/index', {
      _assets : 'admin/releases/assets/_index'
    });
  },

  show : function ( req, res, next ){
    res.render( 'releases/show', {
      _assets : 'admin/releases/assets/_show'
    });
  },

  edit : function ( req, res, next ){
    res.render( 'admin/releases/edit' );
  },

  update : function ( req, res, next ){
    if( !req.form.isValid ){
      return res.render( 'admin/releases/edit' );
    }

    res.render( 'admin/releases/update' );
  },

  destory : function ( req, res, next ){
    res.render( 'admin/releases/destory' );
  }
});
