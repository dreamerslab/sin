var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/releases' );
var Release     = Model( 'Release' );
var Song        = Model( 'Song' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.is_authenticated );

    before( this.validate_show_n_edit,     { only : [ 'show', 'edit' ]});
    before( this.validate_create_n_update, { only : [ 'create', 'update' ]});
    before( this.is_validate,              { only : [ 'show', 'edit' ]});

    before( this.namespace );
    before( this.banner_type );
    before( this.current_banner );
    before( this.nav_querystring,        { only : [ 'index' ]});
    before( this.is_artists_found,       { only : [ 'create', 'update' ]});
    before( this.current_release,        { only : [ 'show' ]});
    before( this.current_song_for_index, { only : [ 'show' ]});
  },

  banner_type : function ( req, res, next ){
    req.banner_type = 'releases';
    next();
  },

  new : function ( req, res, next ){
    res.render( 'admin/releases/new' );
  },

  create : function ( req, res, next ){
    var args = req.form;

    if( req.body.cover ) args.cover = req.body.cover;

    args.is_artists_found = req.is_artists_found;

    if( !req.form.isValid ){
      return res.render( 'admin/releases/new', {
        ori_body : req.body
      });
    }

    Release.insert( args, next,
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
      });
  },

  index : function ( req, res, next ){
    var args = {
      artist : req.query.artist,
      limit  : 6,
      page   : req.page
    };

    res.locals({
      title        : '三十而立 sincerely music | 作品',
      nav_selected : 'releases',
      _assets      : [ 'admin-releases-index' ]
    });

    Release.index( args, next,
      // no content
      function (){
        res.render( 'admin/releases/index', {
          releases : [],
          qs_prev  : '',
          qs_next  : ''
        });
      },
      // ok
      function ( releases, more ){
        if( !more ) req.qs_next = null;
        res.render( 'admin/releases/index', {
          releases : releases,
          qs_prev  : req.qs_prev,
          qs_next  : req.qs_next
        });
      });
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
        res.render( 'admin/releases/show', {
          title        : '三十而立 sincerely music | ' + release.name,
          nav_selected : 'releases',
          _assets      : [ 'admin-releases-show', 'admin-songs' ],
          release      : release,
          songs        : release.songs,
          current_song : req.current_song
        });
      });
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
          ori_body : release
        });
      });
  },

  update : function ( req, res, next ){
    var self = this;
    var args = req.form;

    if( req.body.cover ) args.cover = req.body.cover;

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
      });
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
      function ( songs ){
        var args_for_song;

        console.log( songs );

        songs.forEach( function ( song_id, index ){
          args_for_song = {
            id : song_id
          };

          Song.destroy( args_for_song,
            function ( err ){
              LOG.error( 500, 'Song remove fail', err );
            },
            function ( err ){
              LOG.error( 500, 'Song remove fail, not found', err );
            },
            function (){
              LOG.debug( 'Song remove done', song_id );
            });
        });

        res.redirect( '/admin/releases' );
      });
  }
});
