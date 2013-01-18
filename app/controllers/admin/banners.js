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
  },

  edit : function ( req, res, next ){
    res.render( 'admin/banners/edit', {
      header_admin_view : 'edit'
    });
  },

  update : function ( req, res, next ){
    var args = {
      body : req.body
    };

    if( !req.form.isValid ){
      return res.render( 'admin/banners/edit', {
        header_admin_view : 'edit',
        url               : req.form.url
      });
    }

    Url.update( args, next, function (){
      res.redirect( '/admin/' + req.params.type );
    });
  }
});
