var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/live' );
var Live        = Model( 'Live' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.is_authenticated );

    before( this.validate_edit,            { only : [ 'edit' ]});
    before( this.validate_create_n_update, { only : [ 'create', 'update' ]});
    before( this.is_validate,              { only : [ 'edit' ]});

    before( this.namespace );
    before( this.banner_type );
    before( this.current_banner );
    before( this.nav_querystring, { only : [ 'index' ]});
  },

  banner_type : function ( req, res, next ){
    req.banner_type = 'live';
    next();
  },

  index : function ( req, res, next ){
    var page = req.query.page ? parseInt( req.query.page ) : 0;
    var args = {
      artist : req.query.artist,
      limit  : 10,
      skip   : page
    };

    Live.index( args, next,
      // no content
      function (){
        res.render( 'live/index', {
          _assets : 'admin/live/assets/_index',
          lives   : []
        });
      },
      // ok
      function ( lives ){
        res.render( 'live/index', {
          _assets : 'admin/live/assets/_index',
          lives   : lives
        });
      });
  },

  new : function ( req, res, next ){
    res.render( 'admin/live/new' );
  },

  create : function ( req, res, next ){
    var args = req.form;

    if( !req.form.isValid ){
      return res.render( 'admin/live/new', {
        ori_body : req.body
      });
    }

    Live.insert( args, next, function ( live ){
      res.redirect( '/admin/live' );
    });
  },

  edit : function ( req, res, next ){
    var self = this;
    var args = {
      id : req.params.id
    };

    Live.show( args, next,
      // no content
      function (){
        self.no_content( req, res );
      },
      // ok
      function ( live ){
        res.render( 'admin/live/edit', {
          ori_body : live
        });
      });
  },

  update : function ( req, res, next ){
    var self = this;
    var args = req.form;

    if( !req.form.isValid ){
      return res.render( 'admin/live/edit', {
        ori_body : req.body
      });
    }

    Live.update_props( args, next,
      // no content
      function (){
        self.no_content( req, res );
      },
      // updated
      function (){
        res.redirect( '/admin/live' );
      });
  },

  destroy : function ( req, res, next ){
    var self = this;
    var args = {
      id : req.params.id
    };

    Live.destroy( args, next,
      // no content
      function (){
        self.no_content( req, res );
      },
      // ok
      function (){
        res.redirect( '/admin/live' );
      });
  }
});
