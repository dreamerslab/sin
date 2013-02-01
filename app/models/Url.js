module.exports = {
  statics : {

    index : function ( args, next, no_content, ok ){
      ok();
    },

    show : function ( args, next, no_content, ok ){
      ok();
    },

    update_props : function ( args, next, updated ){
      updated();
    }
  }
};