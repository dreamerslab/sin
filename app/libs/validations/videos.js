var form  = require( 'express-form2' );
var field = form.field;
var lang  = require( LANG_DIR + 'zh_tw/validations/videos' );
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
    field( 'id'      ).is( r.id, lang._404 ),
    field( 'url'     ).required( '', lang.required.url ).is( r.youtube, lang.invalid.url ),
    field( 'artists' ).custom( c.split_artists_n_trim )
  )
};