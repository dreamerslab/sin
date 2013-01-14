var form  = require( 'express-form2' );
var field = form.field;
var lang  = require( LANG_DIR + 'zh_tw/validations/videos' );
var r     = require( './regex' );

form.configure({
  autoTrim : true
});

module.exports = {

  validate_create_n_update : form(
    field( 'url' ).required( '', lang.required.url ).is( r.youtube, lang.invalid.url )
  )
};