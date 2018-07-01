$(function(){
	'use strict';
	// 选中页面中所有的input[data-rule]

	// 解析每一个input的验证规则

	//验证

	var validator = new Validator('15',{
		max:100,
		min:10,
	});

	var result = validator.validate_max();
	console.log('result:',result);
});


