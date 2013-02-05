var Url = Model( 'Url' );

var urls = [
  'home',
  'home_soundcloud',
  'home_facebook',
  'news',
  'artists',
  'releases',
  'live',
  'videos',
  'contact'
];

var msg_pf = '[libs][urls] ';

var error = function ( err ){
  LOG.error( 500, msg_pf + 'Fail to create url', err );
};

var success = function ( url ){
  LOG.debug( msg_pf + 'Successfully created or found url', url );
};

module.exports = {
  init : function (){
    urls.forEach( function ( type ){
      Url.insert({
        type : type
      }, error, success );
    });
  }
};