var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/songs' );
var Release     = Model( 'Release' );
var Song        = Model( 'Song' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.is_authenticated );

    before( this.validate_index_n_new,     { only : [ 'index', 'new' ]});
    before( this.validate_show_n_edit,     { only : [ 'show', 'edit' ]});
    before( this.validate_create_n_update, { only : [ 'create', 'update' ]});
    before( this.is_validate,              { only : [ 'index', 'show', 'new', 'edit' ]});

    before( this.namespace );
    before( this.current_songs,          { only : [ 'index', 'show', 'new', 'edit' ]});
    before( this.current_song_for_index, { only : [ 'index', 'new' ]});
    before( this.current_song_for_show,  { only : [ 'show', 'edit' ]});
  },

  new : function ( req, res, next ){
    res.render( 'releases/show', {
      _assets    : 'admin/releases/assets/_show',
      admin_view : 'new'
    });
  },

  create : function ( req, res, next ){
    var args = {
      body : req.body
    };

    if( !req.form.isValid ){
      res.render( 'releases/show', {
        _assets    : 'admin/releases/assets/_show',
        admin_view : 'new',
        body       : args.body
      });

      return;
    }

    Song.insert( args, next, function ( song ){
      res.redirect( '/admin/releases/' + req.params.release_id + '/songs/' + song._id );
    });
  },

  index : function ( req, res, next ){
    var self = this;
    var args = {
      query : {
        id : req.params.release_id
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

  show : function ( req, res, next ){
    this.index( req, res, next );
  },

  edit : function ( req, res, next ){
    res.render( 'releases/show', {
      _assets    : 'admin/releases/assets/_show',
      admin_view : 'edit'
    });
  },

  update : function ( req, res, next ){
    var args = {
      id   : req.params.id,
      body : req.body
    };

    if( !req.form.isValid ){
      res.render( 'releases/show', {
        _assets    : 'admin/releases/assets/_show',
        admin_view : 'edit'
      });

      return;
    }

    Song.update( args, next,
      function ( song ){
        res.redirect( '/admin/releases/' + req.params.release_id + '/songs/' + song._id );
      }
    );
  },

  destroy : function ( req, res, next ){
    Song.destroy( req.params.id, next, function (){
      res.redirect( '/admin/releases' + req.params.release_id );
    });
  }
});
