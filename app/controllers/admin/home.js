var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/home' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.is_authenticated );

    before( this.validate_update, { only : [ 'soundcloud_udpate', 'facebook_udpate' ]});

    before( this.namespace );
  },

  index : function ( req, res, next ){
    res.render( 'home/index', {
      title   : '三十而立 sincerely music',
      _assets : 'admin/home/assets/_index'
    });
  },

  soundcloud_edit : function ( req, res, next ){
    res.render( 'admin/home/edit', {
      type : 'home_soundcloud'
    });
  },

  soundcloud_udpate : function ( req, res, next ){
    if( !req.form.isValid ){
      return res.render( 'admin/home/edit', {
        type : 'home_soundcloud'
      });
    }

    res.redirect( '/admin' );
  },

  facebook_edit : function ( req, res, next ){
    res.render( 'admin/home/edit', {
      type : 'home_facebook'
    });
  },

  facebook_udpate : function ( req, res, next ){
    if( !req.form.isValid ){
      return res.render( 'admin/home/edit', {
        type : 'home_facebook'
      });
    }

    res.redirect( '/admin' );
  }
});
