var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/home' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.is_authenticated );

    before( this.validate_update, { only : [ 'soundcloud_udpate', 'facebook_udpate' ]});
    before( this.is_validate,     { only : [ 'soundcloud_udpate', 'facebook_udpate' ]});

    before( this.namespace );
  },

  index : function ( req, res, next ){
    res.render( 'home/index', {
      title   : '三十而立 sincerely music',
      _assets : 'admin/home/assets/_index'
    });
  },

  soundcloud_edit : function ( req, res, next ){
    // 送 hidden input, type 'home_soundcloud'
    res.render( 'admin/home/edit' );
  },

  soundcloud_udpate : function ( req, res, next ){
    res.redirect( '/admin' );
  },

  facebook_edit : function ( req, res, next ){
    // 送 hidden input, type 'home_facebook'
    res.render( 'admin/home/edit' );
  },

  facebook_udpate : function ( req, res, next ){
    res.redirect( '/admin' );
  }
});
