module.exports = {
  statics : {

    index : function ( args, next, no_content, ok ){
      // 記得 sort by updated_at，由新到舊
      ok();
    },

    show : function ( args, next, no_content, ok ){
      ok();
    }
  }
};