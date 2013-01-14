var form  = require( 'express-form2' );
var field = form.field;
var lang  = require( LANG_DIR + 'zh_tw/validations/songs' );
var r     = require( './regex' );

form.configure({
  autoTrim : true
});

module.exports = {

  validate_index : form(
    field( 'id' ).required( '', lang._404 ).is( r.id, lang._404 )
  ),

  validate_show : form(
    field( 'release_id' ).required( '', lang._404 ).is( r.id, lang._404 ),
    field( 'id'         ).required( '', lang._404 ).is( r.id, lang._404 )
  ),

  validate_create_n_update : form(
    field( 'target_order' ).required(  '', lang.required.target_order ).isInt( lang.invalid.target_order ),
    field( 'name'         ).required(  '', lang.required.name ).maxLength( 50, lang.invalid.name ),
    field( 'duration'     ).maxLength(  7, lang.invalid.duration ),
    field( 'soundcloud'   ).isUrl(         lang.invalid.soundcloud ),
    field( 'itunes'       ).isUrl(         lang.invalid.itunes )
  )
};