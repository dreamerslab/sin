var form  = require( 'express-form2' );
var field = form.field;
var lang  = require( LANG_DIR + 'zh_tw/validations/contact' );
var r     = require( './regex' );

form.configure({
  autoTrim : true
});

module.exports = {

  validate_create : form(
    field( 'email'   ).required( '', lang.required.email   ).isEmail(         lang.invalid.email ),
    field( 'subject' ).required( '', lang.required.subject ).maxLength( 50,   lang.invalid.subject ),
    field( 'msg'     ).required( '', lang.required.msg     ).maxLength( 1000, lang.invalid.msg )
  )
};