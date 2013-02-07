var form  = require( 'express-form2' );
var field = form.field;
var lang  = require( LANG_DIR + 'zh_tw/validations/songs' );
var r     = require( './regex' );

form.configure({
  autoTrim : true
});

module.exports = {

  validate_index_n_new : form(
    field( 'release_id' ).required( '', lang._404 ).is( r.id, lang._404 )
  ),

  validate_show_n_edit : form(
    field( 'release_id' ).required( '', lang._404 ).is( r.id, lang._404 ),
    field( 'id'         ).required( '', lang._404 ).is( r.id, lang._404 )
  ),

  validate_create_n_update : form(
    field( 'release_id'   ).required( '', lang._404 ).is( r.id, lang._404 ),
    field( 'id'           ).is( r.id, lang._404 ),
    field( 'target_order' ).required(  '', lang.required.target_order ).isInt( lang.invalid.target_order ),
    field( 'title'        ).required(  '', lang.required.name ).maxLength( 50, lang.invalid.name ),
    field( 'duration'     ).maxLength(  7, lang.invalid.duration ),
    field( 'itunes'       ).isUrl(         lang.invalid.itunes ).is( r.has_http_or_https, lang.invalid.no_http_or_https )
  )
};