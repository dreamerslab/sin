var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/videos' );
var Video       = Model( 'Video' );
var request     = require( 'request' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.is_authenticated );

    before( this.validate_edit,            { only : [ 'edit' ]});
    before( this.validate_create_n_update, { only : [ 'create', 'update' ]});
    before( this.is_validate,              { only : [ 'edit' ]});

    before( this.namespace );
    before( this.banner_type );
    before( this.current_banner );
    before( this.is_artists_found,      { only : [ 'create', 'update' ]});
    before( this.get_info_from_youtube, { only : [ 'create', 'update' ]});
  },

  banner_type : function ( req, res, next ){
    req.banner_type = 'videos';
    next();
  },

  new : function ( req, res, next ){
    res.render( 'admin/videos/new' );
  },

  create : function ( req, res, next ){
    var args = req.youtube_info;

    args.is_artists_found = req.is_artists_found;

    if( !req.form.isValid ){
      return res.render( 'admin/videos/new', {
        ori_body : req.body
      });
    }

    Video.insert( args, next,
      // not found
      function (){
        res.render( 'admin/videos/new', {
          ori_body         : req.body,
          is_artists_found : false
        });
      },
      // created
      function (){
        res.redirect( 'admin/videos' );
      });
  },

  index : function ( req, res, next ){
    var page = req.query.page ? parseInt( req.query.page ) : 0;
    var args = {
      artist : req.query.artist,
      limit  : 5,
      skip   : page
    };

    Video.index( args, next,
      // no content
      function (){
        res.render( 'videos/index', {
          _assets : 'admin/videos/assets/_index',
          videos  : []
        });
      },
      // ok
      function ( videos ){
        res.render( 'videos/index', {
          _assets : 'admin/videos/assets/_index',
          videos  : videos
        });
      });
  },

  edit : function ( req, res, next ){
    var self = this;

    Video.show( req.params.id,
      // no content
      function (){
        self.no_content( req, res );
      },
      // ok
      function ( video ){
        res.render( 'admin/videos/edit', {
          ori_body : video
        });
      });
  },

  update : function ( req, res, next ){
    var self = this;
    var args = req.youtube_info;

    args.is_artists_found = req.is_artists_found;

    if( !req.form.isValid ){
      return res.render( 'admin/videos/edit', {
        ori_body : req.body
      });
    }

    Video.update_props( args, next,
      // not found
      function (){
        res.render( 'admin/videos/edit', {
          ori_body         : req.body,
          is_artists_found : false
        });
      },
      // no content
      function (){
        self.no_content( req, res );
      },
      function (){
        res.redirect( '/admin/videos' );
      });
  },

  destroy : function ( req, res, next ){
    var args = {
      id : req.params.id
    };

    Video.destroy( args, next,
      // no content
      function (){
        self.no_content( req, res );
      },
      function (){
        res.redirect( '/admin/videos' );
      });
  }
});