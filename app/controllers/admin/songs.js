var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/songs' );
var Song        = Model( 'Song' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.is_authenticated );

    before( this.validate_index_n_new,     { only : [ 'index', 'new' ]});
    before( this.validate_show_n_edit,     { only : [ 'show', 'edit' ]});
    before( this.validate_create_n_update, { only : [ 'create', 'update' ]});
    before( this.is_validate,              { only : [ 'index', 'show', 'new', 'edit' ]});

    before( this.namespace );
    before( this.current_release,        { only : [ 'index', 'show', 'new', 'edit', 'destroy' ]});
    before( this.current_song_for_index, { only : [ 'index', 'new' ]});
    before( this.current_song_for_show,  { only : [ 'show', 'edit' ]});
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
    var args = req.form;

    args.release = req.release;

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
      res.redirect( '/admin/releases/' + req.params.release_id + '/songs/' + song._id );
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
    var args = req.form;

    args.release = req.release;

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
      function ( song ){
        res.redirect( '/admin/releases/' + req.params.release_id + '/songs/' + song._id );
      });
  },

  destroy : function ( req, res, next ){
    var args = {
      id      : req.params.id,
      release : req.release
    };

    Song.destroy( args, next, function (){
      res.redirect( '/admin/releases' + req.params.release_id );
    });
  }
});
