var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/artists' );
var Artist      = Model( 'Artist' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.is_authenticated );

    before( this.validate_show_n_edit,     { only : [ 'show', 'edit' ]});
    before( this.validate_create_n_update, { only : [ 'create', 'update' ]});
    before( this.is_validate,              { only : [ 'show', 'edit' ]});

    before( this.namespace );
    before( this.banner_type );
    before( this.current_banner );
    before( this.nav_querystring, { only : [ 'index' ]});
    before( this.current_artist,  { only : [ 'show', 'edit' ]});
    before( this.recent_news,     { only : [ 'show' ]});
    before( this.recent_videos,   { only : [ 'show' ]});
    before( this.recent_releases, { only : [ 'show' ]});
  },

  banner_type : function ( req, res, next ){
    req.banner_type = 'artists';
    next();
  },

  new : function ( req, res, next ){
    res.render( 'admin/artists/new' );
  },

  create : function ( req, res, next ){
    var args = req.form;

    if( req.body.link_name1 !== undefined ) args.link_name1 = req.body.link_name1;
    if( req.body.link_name2 !== undefined ) args.link_name2 = req.body.link_name2;
    if( req.body.link_name3 !== undefined ) args.link_name3 = req.body.link_name3;
    if( req.body.link_name4 !== undefined ) args.link_name4 = req.body.link_name4;
    if( req.body.link_name5 !== undefined ) args.link_name5 = req.body.link_name5;

    if( req.body.thumb ) args.thumb = req.body.thumb;
    if( req.body.cover ) args.cover = req.body.cover;

    if( !req.form.isValid ){
      return res.render( 'admin/artists/new', {
        ori_body : req.body
      });
    }

    Artist.insert( args, next,
      // exist
      function (){
        res.render( 'admin/artists/new', {
          ori_body      : req.body,
          exist_err_msg : '此名字已被使用'
        });
      },
      // created
      function ( artist ){
        res.redirect( '/admin/artists/' + artist._id );
      });
  },

  index : function ( req, res, next ){
    var args = {
      artist : req.query.artist,
      limit  : 3,
      page   : req.page
    };

    res.locals({
      title        : '三十而立 sincerely music | 藝人',
      nav_selected : 'artists',
      _assets      : [ 'admin-artists-index' ]
    });

    Artist.index( args, next,
      // no content
      function (){
        res.render( 'artists/index', {
          artists : [],
          qs_prev : '',
          qs_next : ''
        });
      },
      // ok
      function ( artists, more ){
        if( !more ) req.qs_next = null;
        res.render( 'artists/index', {
          artists : artists,
          qs_prev : req.qs_prev,
          qs_next : req.qs_next
        });
      });
  },

  show : function ( req, res, next ){
    res.render( 'artists/show', {
      title        : '三十而立 sincerely music | ' + req.artist.name,
      nav_selected : 'artists',
      _assets      : [ 'admin-artists-show' ],
      artist       : req.artist,
      posts        : req.posts,
      videos       : req.videos,
      releases     : req.releases
    });
  },

  edit : function ( req, res, next ){
    res.render( 'admin/artists/edit', {
      ori_body : req.artist
    });
  },

  update : function ( req, res, next ){
    var self = this;
    var args = req.form;

    if( req.body.link_name1 !== undefined ) args.link_name1 = req.body.link_name1;
    if( req.body.link_name2 !== undefined ) args.link_name2 = req.body.link_name2;
    if( req.body.link_name3 !== undefined ) args.link_name3 = req.body.link_name3;
    if( req.body.link_name4 !== undefined ) args.link_name4 = req.body.link_name4;
    if( req.body.link_name5 !== undefined ) args.link_name5 = req.body.link_name5;

    if( req.body.thumb ) args.thumb = req.body.thumb;
    if( req.body.cover ) args.cover = req.body.cover;

    if( !req.form.isValid ){
      return res.render( 'admin/artists/edit', {
        ori_body : req.body
      });
    }

    Artist.update_props( args, next,
      // not found
      function (){},
      // no content
      function (){
        self.no_content( req, res );
      },
      // updated
      function ( artist ){
        res.redirect( '/admin/artists/' + artist._id );
      });
  },

  destroy : function ( req, res, next ){
    var self = this;
    var args = {
      id : req.params.id
    };

    Artist.destroy( args, next,
      function (){
        self.no_content( req, res );
      },
      function (){
        res.redirect( '/admin/artists' );
      });
  }
});
