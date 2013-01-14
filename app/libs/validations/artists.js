var form  = require( 'express-form2' );
var field = form.field;
var lang  = require( LANG_DIR + 'zh_tw/validations/artists' );
var r     = require( './regex' );

form.configure({
  autoTrim : true
});

module.exports = {

  validate_show : form(
    field( 'id' ).is( r.id, lang._404 )
  ),

  validate_create_n_update : form(
    field( 'name' ).required( '', lang.required.name ).maxLength( 50,   lang.invalid.name ),
    field( 'desc' ).required( '', lang.required.desc ).maxLength( 1000, lang.invalid.desc )
  )
};