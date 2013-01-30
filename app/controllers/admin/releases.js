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
    before( this.current_songs,          { only : [ 'show' ]});
    before( this.current_song_for_index, { only : [ 'show' ]});
  },

  current_song : function ( req, res, next ){
    if( !req.songs.length ) return next();

    req.current_song = song[ 0 ];

    next();
  },

  new : function ( req, res, next ){
    res.render( 'admin/releases/new' );
  },

  create : function ( req, res, next ){
    if( !req.form.isValid ){
      return res.render( 'admin/releases/new', {
        ori_body : req.body
      });
    }

    Post.insert( req.form, next,
      // artist not found
      function (){
        res.render( 'admin/releases/new', {
          ori_body        : req.body,
          is_artist_found : false
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
      query : {
        id : req.params.id
      }
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

    if( !req.form.isValid ){
      return res.render( 'admin/releases/edit', {
        ori_body : req.body
      });
    }

    Release.update( req.form, next,
      // artist not found
      function (){
        res.render( 'admin/releases/edit', {
          ori_body        : req.body,
          is_artist_found : false
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

    Release.destroy( req.params.id, next,
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
