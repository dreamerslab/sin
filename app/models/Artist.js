module.exports = {
  statics : {

    insert : function ( args, next, created ){
      created();
    },

    index : function ( args, next, no_content, ok ){
      // 記得 sort by updated_at，由新到舊
      ok();
    },

    show : function ( args, next, no_content, ok ){
      ok();
    },

    update : function ( args, next, updated ){
      updated();
    },

    destroy : function ( args, next, deleted ){
      deleted();
    }
  }
};