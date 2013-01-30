var form  = require( 'express-form2' );
var field = form.field;
var lang  = require( LANG_DIR + 'zh_tw/validations/releases' );
var r     = require( './regex' );
var c     = require( LIB_DIR + 'validations/custom' );

form.configure({
  autoTrim : true
});

module.exports = {

  validate_show_n_edit : form(
    field( 'id' ).required( '', lang._404 ).is( r.id, lang._404 )
  ),

  validate_create_n_update : form(
    field( 'id'           ).is( r.id, lang._404 ),
    field( 'name'         ).required(  '', lang.required.name ).maxLength( 50,   lang.invalid.name ),
    field( 'desc'         ).required(  '', lang.required.desc ).maxLength( 1000, lang.invalid.desc ),
    field( 'release_date' ).maxLength( 10, lang.invalid.release_date ),
    field( 'artists'      ).custom( c.split_artists_n_trim )
  )
};