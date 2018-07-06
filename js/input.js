$(function(){
	'use strict';

	window.Input = function(selector){
		var $ele
			,$error_ele
			,me = this//封装this
			,rule = {
				required:true
			};

		function init(){
			find_ele();
			get_error_ele();
			parse_rule();
			me.load_validator();
			listen();
		}

		function listen(){
			$ele.on('blur', function(){
				var valid = me.validator.is_valid(me.get_val());//获取新val值传入
				if(valid)
					$error_ele.hide();
				else
					$error_ele.show();
			})
		}

		function get_error_ele(){
			$error_ele = $(get_error_selector());//选中某个错误信息：使用'$'选择器
		}

		function get_error_selector(){
			return '#' + $ele.attr('name') + '-input-error';//获取当前这个错误类型
		}

		this.load_validator = function(){
			var val = this.get_val();
			this.validator = new Validator(val, rule);
		}

		this.get_val = function(){
			return $ele.val();
		}

		function find_ele(){
			if(selector instanceof jQuery){
				$ele = selector;
			}
			$ele = $(selector);
		}

		function parse_rule(){
			//jquery中data方法可提取类名中‘-’后面的内容
			var rule_str = $ele.data('rule');
			if(!rule_str)
				return;
			var rule_arr = rule_str.split('|');//['min:18']
			for(var i = 0;i<rule_arr.length;i++){
				var item = rule_arr[i];
				var item_arr = item.split(':');//['min','18']
				rule[item_arr[0]] = JSON.parse(item_arr[1]);//{min:18}
			}
		}

		init();
	}
})