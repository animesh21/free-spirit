/**
 * Categories controller
 */
(function() {
angular
	.module('invisionApp')

	.controller('CategoriesController', [
		'categoriesService',
		function (categoriesSvc) {
			'use strict';

			var vm = this;

			categoriesSvc.getCategories().then(setCategories);

			function setCategories(categories) {
				vm.categories = categories;
			}

		}
	]);

})();
