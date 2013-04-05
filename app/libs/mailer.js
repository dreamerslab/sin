var email  = require( 'emailjs' );
var server = email.server.connect( CONF.mail );

module.exports = function ( args, callback ){
  server.send({
    from    : args.email,
    to      : 'Sincerely Music <info@sincerely30.com>',
    subject : '[Sincerely Music][Comments]' + args.subject,
    text    : args.msg
  }, callback );
};
