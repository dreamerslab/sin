var form  = require( 'express-form2' );
var field = form.field;
var lang  = require( LANG_DIR + 'zh_tw/validations/home' );

form.configure({
  autoTrim : true
});

module.exports = {

  validate_update : form(
    field( 'type' ).required()
  )
};