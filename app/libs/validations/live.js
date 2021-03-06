var form  = require( 'express-form2' );
var field = form.field;
var lang  = require( LANG_DIR + 'zh_tw/validations/live' );
var r     = require( './regex' );
var c     = require( LIB_DIR + 'validations/custom' );

form.configure({
  autoTrim : true
});

module.exports = {

  validate_edit : form(
    field( 'id' ).required( '', lang._404 ).is( r.id, lang._404 )
  ),

  validate_create_n_update : form(
    field( 'id'       ).is( r.id, lang._404 ),
    field( 'title'    ).required( '', lang.required.title    ).maxLength( 50, lang.invalid.title ),
    field( 'date'     ).required( '', lang.required.date     ).maxLength( 10, lang.invalid.date ).custom( c.date ),
    field( 'location' ).required( '', lang.required.location ).maxLength( 50, lang.invalid.location ),
    field( 'url'      ).isUrl(        lang.invalid.url ).custom( c.add_http_or_https_if_dont_exist )
  )
};