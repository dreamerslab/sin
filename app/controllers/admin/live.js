var Application = require( './application' );
var validations = require( LIB_DIR + 'validations/live' );
var Live        = Model( 'Live' );

module.exports = Application.extend( validations, {

  init : function ( before, after ){
    before( this.is_authenticated );

    before( this.validate_edit,            { only : [ 'edit' ]});
    before( this.validate_create_n_update, { only : [ 'create', 'update' ]});
    before( this.is_validate,              { only : [ 'edit' ]});

    before( this.namespace );
  },

  index : function ( req, res, next ){
    var page = req.query.page ? parseInt( req.query.page ) : 0;
    var args = {
      artist : req.query.artist,
      limit  : 10,
      skip   : page
    };

    Live.index( args, next,
      // no content
      function (){
        res.render( 'live/index', {
          _assets : 'admin/live/assets/_index',
          lives   : []
        });
      },
      // ok
      function ( lives ){
        res.render( 'live/index', {
          _assets : 'admin/live/assets/_index',
          lives   : lives
        });
      }
    );
  },

  new : function ( req, res, next ){
    res.render( 'admin/live/new' );
  },

  create : function ( req, res, next ){
    if( !req.form.isValid ){
      return res.render( 'admin/live/new', {
        ori_body : req.body
      });
    }

    Live.insert( req.form, next, function ( live ){
        res.redirect( '/admin/live' );
      }
    );
  },

  edit : function ( req, res, next ){
    res.render( 'admin/live/edit' );
  },

  update : function ( req, res, next ){
    if( !req.form.isValid ){
      return res.render( 'admin/live/edit', {
        body : req.body
      });
    }

    Live.update( req.form, next,
      function ( live ){
        res.redirect( '/admin/live/' + live._id );
      }
    );
  },

  destroy : function ( req, res, next ){
    Live.destroy( req.params.id, next, function (){
      res.redirect( '/admin/live' );
    });
  }
});
