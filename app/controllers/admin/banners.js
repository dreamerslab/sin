var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/banners' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.is_authenticated );

    before( this.validate_edit,   { only : [ 'edit' ]});
    before( this.validate_update, { only : [ 'update' ]});
    before( this.is_validate,     { only : [ 'edit', 'update' ]});

    // use indexOf, after checking resources, put currnet resoucre into req.resource
    // if resouces == home, assign req.resource to '', see update action
    before( this.check_resources );

    before( this.namespace );
  },

  edit : function ( req, res, next ){
    res.render( 'admin/banners/edit' );
  },

  update : function ( req, res, next ){
    res.redirect( '/admin/' + req.resource );
  }
});
