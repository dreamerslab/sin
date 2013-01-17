var form  = require( 'express-form2' );
var field = form.field;
var lang  = require( LANG_DIR + 'zh_tw/validations/banners' );

form.configure({
  autoTrim : true
});

module.exports = {

  validate_edit : form(
    field( 'type' ).required().isIn([ 'home', 'news', 'artists', 'releases', 'live', 'videos', 'contact' ])
  ),

  validate_update : form(
    field( 'url' ).required( '', lang.required.url )
  )
};