var email  = require( 'emailjs' );
var server = email.server.connect( CONF.mail );

module.exports = function ( args, callback ){
  server.send({
    from    :  args.email,
    to      :  'fred <fred@dreamerslab.com>', // for test
    subject : '[Sincerely Music][Comments]' + args.subject,
    text    :  args.msg
  }, callback );
};