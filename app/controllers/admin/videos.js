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
    before( this.get_info_from_youtube, { only : [ 'create', 'update' ]});
  },

  new : function ( req, res, next ){
    res.render( 'admin/videos/new' );
  },

  create : function ( req, res, next ){
    if( !req.form.isValid ){
      return res.render( 'admin/videos/new', {
        ori_body : req.body
      });
    }

    Video.insert( req.youtube_info, next,
      // artist not found
      function (){
        res.render( 'admin/videos/new', {
          ori_body        : req.body,
          is_artist_found : false
        });
      },
      // created
      function (){
        res.redirect( 'admin/videos' );
      }
    );
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
      }
    );
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
      }
    );
  },

  update : function ( req, res, next ){
    var self = this;

    if( !req.form.isValid ){
      return res.render( 'admin/videos/edit', {
        ori_body : req.body
      });
    }

    Video.update( req.youtube_info, next,
      // artist not found
      function (){
        res.render( 'admin/videos/edit', {
          ori_body        : req.body,
          is_artist_found : false
        });
      },
      // no content
      function (){
        self.no_content( req, res );
      },
      function (){
        res.redirect( '/admin/videos' );
      }
    );
  },

  destroy : function ( req, res, next ){
    Video.destroy( req.params.id, next,
      // no content
      function (){
        self.no_content( req, res );
      },
      function (){
        res.redirect( '/admin/videos' );
      }
    );
  }
});