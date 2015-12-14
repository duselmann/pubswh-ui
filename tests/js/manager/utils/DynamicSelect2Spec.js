/* jslint browser: true */

define([
	'utils/DynamicSelect2'
], function(DynamicSelect2) {
	"use strict";

	describe('DynamicSelect2', function() {

		describe('Tests for getSelectOptions', function() {
			var resultOptions;

			it('Expects that if the lookupType is a String in options, it will be used to form the lookup url', function() {
				resultOptions = DynamicSelect2.getSelectOptions({lookupType : 'nameType'});

				expect(resultOptions.ajax.url).toEqual('test_lookup/nameType')
			});

			it('Expects that if the lookType is a function, it will be used at run time to form the lookup url', function() {
				var choice;
				var getType = function() {
					return choice;
				};
				resultOptions = DynamicSelect2.getSelectOptions({lookupType : getType});

				choice = 'type1';
				expect(resultOptions.ajax.url()).toEqual('test_lookup/type1');

				choice = 'type2';
				expect(resultOptions.ajax.url()).toEqual('test_lookup/type2');
			});

			it('Expects that the ajax.data function should add mimetype and any search term to the lookup query', function() {
				var data;
				resultOptions = DynamicSelect2.getSelectOptions({lookupType : 'nameType'});
				data = resultOptions.ajax.data({});
				expect(data).toEqual({mimetype : 'json'});

				data = resultOptions.ajax.data({term : 'ab'});
				expect(data).toEqual({
					mimetype : 'json',
					text : 'ab'
				});
			});

			it('Expects that the parentId and getParentId parameters are used to set a parameter when retrieving data', function() {
				var id;
				var getId = function() {
					return id;
				};
				var dataResult;
				resultOptions = DynamicSelect2.getSelectOptions({
					lookupType : 'nameType',
					parentId : 'parent',
					getParentId : getId
				});

				id = 'id1';
				dataResult = resultOptions.ajax.data();
				expect(dataResult).toEqual({
					mimetype : 'json',
					parent : 'id1'
				});

				id = 'id2';
				dataResult = resultOptions.ajax.data();
				expect(dataResult).toEqual({
					mimetype : 'json',
					parent : 'id2'
				});

				dataResult = resultOptions.ajax.data({term : 'cd'});
				expect(dataResult).toEqual({
					mimetype : 'json',
					parent : 'id2',
					text : 'cd'
				});
			});

			it('Expects that if defaults are specified they are added to the returned results', function() {
				resultOptions = DynamicSelect2.getSelectOptions({lookupType : 'nameType'}, {allowClear : true, theme : 'mytheme'});
				expect(resultOptions.allowClear).toBe(true);
				expect(resultOptions.theme).toEqual('mytheme');
			});
		});
	});
});