var form  = require( 'express-form2' );
var field = form.field;
var lang  = require( LANG_DIR + 'zh_tw/validations/artists' );
var r     = require( './regex' );
var c     = require( LIB_DIR + 'validations/custom' );

form.configure({
  autoTrim : true
});

module.exports = {

  validate_index : form(
    field( 'page' ).isInt()
  ),

  validate_show_n_edit : form(
    field( 'id' ).required( '', lang._404 ).is( r.id, lang._404 )
  ),

  validate_create_n_update : form(
    field( 'id'    ).is( r.id, lang._404 ),
    field( 'link1' ).isUrl( lang.invalid.link1_not_url ).custom( c.add_http_or_https_if_dont_exist ),
    field( 'link2' ).isUrl( lang.invalid.link2_not_url ).custom( c.add_http_or_https_if_dont_exist ),
    field( 'link3' ).isUrl( lang.invalid.link3_not_url ).custom( c.add_http_or_https_if_dont_exist ),
    field( 'link4' ).isUrl( lang.invalid.link4_not_url ).custom( c.add_http_or_https_if_dont_exist ),
    field( 'link5' ).isUrl( lang.invalid.link5_not_url ).custom( c.add_http_or_https_if_dont_exist ),
    field( 'name' ).required( '', lang.required.name ).maxLength( 50, lang.invalid.name ),
    field( 'desc' ).maxLength( 1000, lang.invalid.desc )
  )
};