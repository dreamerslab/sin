module.exports = function ( map ){
  map.get( '/','home#index' );

  map.resources( 'news',     { only : [ 'index', 'show' ]});
  map.resources( 'artists',  { only : [ 'index', 'show' ]});
  map.resources( 'releases', { only : [ 'index', 'show' ]});

  map.get( 'videos',  'videos#index' );
  map.get( 'live',    'lives#index' );
  map.get( 'contact', 'contact#index' );

  map.get( 'admin', 'admin/home#index' );
  map.namespace( 'admin', function ( admin ){
    admin.get( 'edit',  'home#edit' );
    map.put(   'admin', 'home#update' );
    admin.resources( 'news' );
    admin.resources( 'artists' );
    admin.resources( 'releases' );
    admin.resources( 'videos', { except : [ 'show' ]});
    admin.resources( 'live',   { except : [ 'show' ]});
  });
};
