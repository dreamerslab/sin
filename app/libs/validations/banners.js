var form  = require( 'express-form2' );
var field = form.field;
var lang  = require( LANG_DIR + 'zh_tw/validations/banners' );

form.configure({
  autoTrim : true
});

module.exports = {

  validate_edit : form(
    field( 'id' ).required()
  ),

  validate_update : form(
    field( 'url' ).required( '', lang.required.url )
  )
};