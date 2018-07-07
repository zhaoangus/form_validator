$(function(){
	'use strict';

	window.Validator = function(val,rule){


		this.is_valid = function(new_val){//new_val是为了使val值随着输入动态响应
			var key;
			if(new_val !== undefined)
			val = new_val || val;

			//如果不是必填项且用户未填写任何内容则直接判定为合法
			if(!rule.required && !val)
				return true;
			for(key in rule){
				//防止重复检查
				if(key === 'required')
					continue;

				var r = this['validate_'+ key]();//即validate_max()...
				if(!r) return false;
			}
			return true;
		}

		this.validate_max = function(){
			pre_max_min();
			return val <= rule.max;
		}

		this.validate_min = function(){
			pre_max_min();
			return val >= rule.min;
		}

		this.validate_maxlength = function(){
			pre_length();
			return val.length <= rule.maxlength;
		}

		this.validate_minlength = function(){
			pre_length();
			return val.length >= rule.minlength;
		}

		this.validate_numeric = function(){
			return $.isNumeric(val);
		}

		this.validate_required = function(){
			var real = $.trim(val);
			if(!real && real!==0)
				return false;
			return true;
		}

		//用户名，使用正则表达式
		this.validate_pattern = function(){
			var reg = new RegExp(rule.pattern);
			return reg.test(val);
		}

		//用于完成this.validate_max或this.validate_min的前置工作
		function pre_max_min(){
			val = parseFloat(val);
		}

		//用于完成this.validate_maxlength或this.validate_minlength的前置工作
		function pre_length(){
			val = val.toString();
		}
	}
})