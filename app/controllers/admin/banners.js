var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/banners' );
var Url         = Model( 'Url' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.is_authenticated );

    before( this.validate_edit,   { only : [ 'edit' ]});
    before( this.validate_update, { only : [ 'update' ]});
    before( this.is_validate,     { only : [ 'edit' ]});

    before( this.namespace );
    before( this.banner_type );
    before( this.current_banner );
  },

  banner_type : function ( req, res, next ){
    req.banner_type = req.params.type;
    next();
  },

  edit : function ( req, res, next ){


    res.render( 'admin/banners/edit', {
      header_admin_view : 'edit',
      nav_selected      : req.params.type
    });
  },

  update : function ( req, res, next ){
    var args = req.form;

    if( !req.form.isValid ){
      return res.render( 'admin/banners/edit', {
        header_admin_view : 'edit',
        url               : req.form.url
      });
    }

    Url.update_props( args, next, function (){
      res.redirect( '/admin/' + req.params.type );
    });
  }
});
