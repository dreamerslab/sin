module.exports = function ( map ){
  map.get( '/','home#index' );

  map.resources( 'news',     { only : [ 'index', 'show' ]});
  map.resources( 'artists',  { only : [ 'index', 'show' ]});

  map.resources(
    'releases',
    { only : [ 'index', 'show' ]},
    function ( releases ){
      releases.resources( 'songs', { only : [ 'index', 'show' ]});
    }
  );

  map.get( 'videos',  'videos#index' );
  map.get( 'live',    'live#index' );
  map.get( 'contact', 'contact#index' );

  map.get( 'admin', 'admin/home#index' );
  map.namespace( 'admin', function ( admin ){
    admin.get(    'login',    'sessions#new' );
    admin.post(   'sessions', 'sessions#create' );
    admin.delete( 'sessions', 'sessions#destroy' );

    admin.get( 'home/soundcloud/edit', 'home#soundcloud_edit' );
    admin.put( 'home/soundcloud',      'home#soundcloud_udpate' );

    admin.get( 'home/facebook/edit', 'home#facebook_edit' );
    admin.put( 'home/facebook',      'home#facebook_udpate' );

    admin.get( 'banners/edit/:type', 'banners#edit' );
    admin.put( 'banners/edit/:type', 'banners#update' );

    admin.resources( 'news' );
    admin.resources( 'artists' );
    admin.resources( 'releases', function ( releases ){
      releases.resources( 'songs' );
    });
    admin.resources( 'videos', { except : [ 'show' ]});
    admin.resources( 'live',   { except : [ 'show' ]});
  });
};
