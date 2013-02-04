var Application = require( CONTROLLER_DIR + 'application' );
var validations = require( LIB_DIR + 'validations/contact' );
var mailer      = require( LIB_DIR + 'mailer' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.validate_create, { only : [ 'create' ]});
    before( this.is_validate,     { only : [ 'create' ]});

    before( this.namespace );
  },

  index : function ( req, res, next ){
    res.render( 'contact/index' );
  },

  create : function ( req, res, next ){
    var args = req.form;

    if( !req.form.isValid ){
      return res.render( 'contact/index', {
        ori_body : req.body
      });
    }

    mailer( args, function ( err, msg ){
      if( err ) return next( err );

      res.render( 'contact/index', {
        is_sent : true
      });
    });
  }
});
