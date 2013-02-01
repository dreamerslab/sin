var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/releases' );
var Release     = Model( 'Release' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.is_authenticated );

    before( this.validate_show_n_edit,     { only : [ 'show', 'edit' ]});
    before( this.validate_create_n_update, { only : [ 'create', 'update' ]});
    before( this.is_validate,              { only : [ 'show', 'edit' ]});

    before( this.namespace );
    before( this.is_artists_found,       { only : [ 'create', 'update' ]});
    before( this.current_release,        { only : [ 'show' ]});
    before( this.current_song_for_index, { only : [ 'show' ]});
  },

  new : function ( req, res, next ){
    res.render( 'admin/releases/new' );
  },

  create : function ( req, res, next ){
    var args = req.form;

    args.is_artists_found = req.is_artists_found;

    if( !req.form.isValid ){
      return res.render( 'admin/releases/new', {
        ori_body : req.body
      });
    }

    Post.insert( args, next,
      // not found
      function (){
        res.render( 'admin/releases/new', {
          ori_body         : req.body,
          is_artists_found : false
        });
      },
      // created
      function ( release ){
        res.redirect( '/admin/releases/' + release._id );
      }
    );
  },

  index : function ( req, res, next ){
    var page = req.query.page ? parseInt( req.query.page ) : 0;
    var args = {
      artist : req.query.artist,
      limit  : 6,
      skip   : page
    };

    Release.index( args, next,
      // no content
      function (){
        res.render( 'releases/index', {
          _assets  : 'admin/releases/assets/_index',
          releases : []
        });
      },
      // ok
      function ( releases ){
        res.render( 'releases/index', {
          _assets  : 'admin/releases/assets/_index',
          releases : releases
        });
      }
    );
  },

  show : function ( req, res, next ){
    var self = this;
    var args = {
      id : req.params.id
    };

    Release.show( args, next,
      // no content
      function (){
        self.no_content( req, res );
      },
      // ok
      function ( release ){
        res.render( 'releases/show', {
          _assets      : 'admin/releases/assets/_show',
          release      : release,
          songs        : req.songs,
          current_song : req.current_song
        });
      }
    );
  },

  edit : function ( req, res, next ){
    var self = this;
    var args = {
      id : req.params.id
    };

    Release.show( args, next,
      // no content
      function (){
        self.no_content( req, res );
      },
      // ok
      function ( release ){
        res.render( 'admin/releases/edit', {
          ori_release : release
        });
      }
    );
  },

  update : function ( req, res, next ){
    var self = this;
    var args = req.form;

    args.is_artists_found = req.is_artists_found;

    if( !req.form.isValid ){
      return res.render( 'admin/releases/edit', {
        ori_body : req.body
      });
    }

    Release.update_props( args, next,
      // not found
      function (){
        res.render( 'admin/releases/edit', {
          ori_body         : req.body,
          is_artists_found : false
        });
      },
      // no content
      function (){
        self.no_content( req, res );
      },
      // updated
      function ( release ){
        res.redirect( '/admin/releases/' + release._id );
      }
    );
  },

  destroy : function ( req, res, next ){
    var self = this;
    var args = {
      id : req.params.id
    };

    Release.destroy( args, next,
      // no content
      function (){
        self.no_content( req, res );
      },
      // deleted
      function (){
        res.redirect( '/admin/releases' );
      }
    );
  }
});
