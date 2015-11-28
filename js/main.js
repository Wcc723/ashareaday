require.config({
	paths: {
		jquery: 'jquery-2.0.2.min',
		aTypeFilter: 'aTypeFilter',
		run_prettify: 'run_prettify',
		aCart:  'aCart',
		a_banner: 'demo/a_banner',
		forAll: 'all'
	}

});
require(['app'], function(app){
	app.initialize();});



