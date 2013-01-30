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
    before( this.current_artist,         { only : [ 'index' ]});
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
    var args = {
      body : req.body
    };

    if( !req.form.isValid ){
      return res.render( 'admin/releases/new', {
        body : args.body
      });
    }

    Post.insert( args, next,
      function (){
        res.render( 'admin/releases/new', {
          body            : args.body,
          is_artist_found : false
        });
      },
      function ( release ){
        res.redirect( '/admin/releases/' + release._id );
      }
    );
  },

  index : function ( req, res, next ){
    var page = req.query.page ? parseInt( req.query.page ) : 0;
    var args = {
      query : req.query_cond,
      limit : 6,
      skip  : page
    };

    Release.index( args, next,
      function (){
        res.render( 'releases/index', {
          _assets  : 'admin/releases/assets/_index',
          releases : []
        });
      },
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
      function (){
        self.no_content( req, res );
      },
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
      function (){
        self.no_content( req, res );
      },
      function ( release ){
        res.render( 'admin/releases/edit', {
          ori_release : release
        });
      }
    );
  },

  update : function ( req, res, next ){
    var self = this;
    var args = {
      id   : req.params.id,
      body : req.body
    };

    if( !req.form.isValid ){
      return res.render( 'admin/releases/edit', {
        body : args.body
      });
    }

    Release.update( args, next,
      function (){
        res.render( 'admin/releases/edit', {
          body            : args.body,
          is_artist_found : false
        });
      },
      function (){
        self.no_content( req, res );
      },
      function ( release ){
        res.redirect( '/admin/releases/' + release._id );
      }
    );
  },

  destroy : function ( req, res, next ){
    var self = this;

    Release.destroy( req.params.id, next,
      function (){
        self.no_content( req, res );
      },
      function (){
        res.redirect( '/admin/releases' );
      }
    );
  }
});
