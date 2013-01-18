var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/live' );
var Live        = Model( 'Live' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.is_authenticated );

    before( this.validate_edit,            { only : [ 'edit' ]});
    before( this.validate_create_n_update, { only : [ 'create', 'update' ]});
    before( this.is_validate,              { only : [ 'edit' ]});

    before( this.namespace );
    before( this.current_artist, { only : [ 'index' ]});
  },

  index : function ( req, res, next ){
    var page = req.query.page ? parseInt( req.query.page ) : 0;
    var args = {
      cond  : req.query_cond,
      limit : 10,
      skip  : page
    };

    Live.index( args, next,
      function (){
        res.render( 'live/index', {
          _assets : 'admin/live/assets/_index',
          lives   : []
        });
      },
      function ( lives ){
        res.render( 'live/index', {
          _assets : 'admin/live/assets/_index',
          lives   : lives
        });
      }
    );
  },

  new : function ( req, res, next ){
    res.render( 'admin/live/new' );
  },

  create : function ( req, res, next ){
    if( !req.form.isValid ){
      return res.render( 'admin/live/new' );
    }

    res.redirect( '/admin/live' );
  },

  edit : function ( req, res, next ){
    res.render( 'admin/live/edit' );
  },

  update : function ( req, res, next ){
    if( !req.form.isValid ){
      return res.render( 'admin/live/edit' );
    }

    res.redirect( '/admin/live' );
  },

  destroy : function ( req, res, next ){
    res.render( 'admin/live/destroy' );
  }
});
