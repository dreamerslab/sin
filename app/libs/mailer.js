var email  = require( 'emailjs' );
var server = email.server.connect( CONF.mail );

module.exports = function ( args, callback ){
  server.send({
    from    :  args.email,
    to      :  'Sincerely Music <musicsincerely777@gmail.com >',
    subject : '[Sincerely Music][Comments]' + args.subject,
    text    :  args.msg
  }, callback );
};