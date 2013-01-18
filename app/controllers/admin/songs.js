var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/songs' );
var Release     = Model( 'Release' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.is_authenticated );

    before( this.validate_index_n_new,     { only : [ 'index', 'new' ]});
    before( this.validate_show_n_edit,     { only : [ 'show', 'edit' ]});
    before( this.validate_create_n_update, { only : [ 'create', 'update' ]});
    before( this.is_validate,              { only : [ 'index', 'show', 'new', 'edit' ]});

    before( this.namespace );
    before( this.current_songs, { only : [ 'index', 'show', 'new', 'edit' ]});
    before( this.current_song,  { only : [ 'index', 'show', 'new', 'edit' ]});
  },

  new : function ( req, res, next ){
    res.render( 'releases/show', {
      _assets    : 'admin/releases/assets/_show',
      admin_view : 'new'
    });
  },

  create : function ( req, res, next ){
    if( !req.form.isValid ){
      res.render( 'releases/show', {
        _assets    : 'admin/releases/assets/_show',
        admin_view : 'new'
      });

      return;
    }

    res.render( 'releases/show', {
      _assets : 'admin/releases/assets/_show'
    });
  },

  index : function ( req, res, next ){
    var self = this;
    var args = {
      cond : {
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
    if( !req.form.isValid ){
      res.render( 'releases/show', {
        _assets    : 'admin/releases/assets/_show',
        admin_view : 'edit'
      });

      return;
    }

    res.render( 'releases/show', {
      _assets : 'admin/releases/assets/_show'
    });
  },

  destroy : function ( req, res, next ){
    res.render( 'releases/show', {
      _assets : 'admin/releases/assets/_show'
    });
  }
});
