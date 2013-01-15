var Application = require( './application' );

module.exports = Application.extend({

  index : function ( req, res, next ){
    res.render( 'home/index', {
      title            : '三十而立 sincerely music',
      _assets          : 'admin/home/assets/_index',
      is_authenticated : req.session.is_authenticated
    });
  },

  edit : function ( req, res, next ){
    res.render( 'admin/home/edit' );
  },

  update : function ( req, res, next ){
    res.render( 'admin/home/update' );
  }
});
