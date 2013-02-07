var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/songs' );
var Song        = Model( 'Song' );
var Release     = Model( 'Release' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.is_authenticated );

    before( this.validate_index_n_new,     { only : [ 'index', 'new' ]});
    before( this.validate_show_n_edit,     { only : [ 'show', 'edit' ]});
    before( this.validate_create_n_update, { only : [ 'create', 'update' ]});
    before( this.is_validate,              { only : [ 'index', 'show', 'new', 'edit' ]});

    before( this.namespace );
    before( this.banner_type );
    before( this.current_banner );
    before( this.current_release );
    before( this.current_song_for_index, { only : [ 'index', 'new', 'create' ]});
    before( this.current_song_for_show,  { only : [ 'show', 'edit' ]});
  },

  banner_type : function ( req, res, next ){
    req.banner_type = 'releases';
    next();
  },

  new : function ( req, res, next ){
    res.render( 'releases/show', {
      _assets    : 'admin/releases/assets/_show',
      admin_view : 'new',
      release    : req.release,
      songs      : req.release.songs
    });
  },

  create : function ( req, res, next ){
    var self = this;
    var args = req.form;

    args.release    = req.release;
    args.soundcloud = req.body.soundcloud;

    if( !req.form.isValid ){
      res.render( 'releases/show', {
        _assets      : 'admin/releases/assets/_show',
        admin_view   : 'new',
        ori_body     : req.body,
        release      : req.release,
        songs        : req.release.songs,
        current_song : req.current_song
      });

      return;
    }

    Song.insert( args, next, function ( song ){
      args.song_id = song._id;

      Release.add_song( args, next,
        // no content
        function (){
          self.no_content( req, res );
        },
        // added
        function (){
          res.redirect( '/admin/releases/' + req.params.release_id + '/songs/' + song._id );
        });
    });
  },

  index : function ( req, res, next ){
    res.render( 'releases/show', {
      _assets      : 'admin/releases/assets/_show',
      release      : req.release,
      songs        : req.release.songs,
      current_song : req.current_song
    });
  },

  show : function ( req, res, next ){
    this.index( req, res, next );
  },

  edit : function ( req, res, next ){
    res.render( 'releases/show', {
      _assets      : 'admin/releases/assets/_show',
      admin_view   : 'edit',
      release      : req.release,
      songs        : req.release.songs,
      current_song : req.current_song
    });
  },

  update : function ( req, res, next ){
    var self = this;
    var args = req.form;

    args.release    = req.release;
    args.soundcloud = req.body.soundcloud;

    if( !req.form.isValid ){
      res.render( 'releases/show', {
        _assets      : 'admin/releases/assets/_show',
        admin_view   : 'edit',
        ori_body     : req.body,
        release      : req.release,
        songs        : req.release.songs,
        current_song : req.current_song
      });

      return;
    }

    Song.update_props( args, next,
      // no content
      function (){
        self.no_content( req, res );
      },
      // updated
      function ( song ){
        args.song_id = song._id;

        Release.move_song( args, next,
          function (){
            self.no_content( req, res );
          },
          function (){
            res.redirect( '/admin/releases/' + req.params.release_id + '/songs/' + song._id );
          });
      });
  },

  destroy : function ( req, res, next ){
    var self = this;
    var args = {
      id      : req.params.id,
      release : req.release
    };

    Release.remove_song( args, next,
      // no content
      function (){
        self.no_content( req, res );
      },
      // removed
      function ( err, release ){
        Song.destroy( args, next,
          // no content
          function (){
            self.no_content( req, res );
          },
          // deleted
          function (){
            res.redirect( '/admin/releases/' + req.params.release_id );
          });
      });
  }
});
