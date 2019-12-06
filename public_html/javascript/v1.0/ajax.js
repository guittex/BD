
function Ajax() {
	
	this.file = ROOT_PATH + "/index.php";

	this.execute = function(action, str_params) {
	
		str_params = str_params ? str_params : "";
		
		if (str_params.toString().substr(0, 1) == "&") {
			str_params = str_params.substr(1);
		}
		
		str_params = 'action=' + action + '' + (str_params ? '&' + str_params + '' : '');
		
		this.instance.open("POST", (this.file + '?' + str_params), false);
		
		this.instance.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//		this.instance.setRequestHeader("Content-length", str_params.length);
//		this.instance.setRequestHeader("Connection", "close");
		
		this.instance.send(str_params);
		
		return this.instance.responseText;
	};
	
	this.set = function (div_id, action, str_params, s) {
		
		if (s == 1) {
			util.setText(div_id, this.execute(action, str_params));
		}
		else {
			util.setText(div_id, this.getLoadingMessage());
			setTimeout(php.sprintf("ajax.set('%s', '%s', '%s', 1);", div_id, action, str_params), 0);
		}

	};
	
	this.getLoadingMessage = function () {
		return php.sprintf('<table style="width:100%; height:100%;"><tr><td class="bold" style="font-size:14pt;" align="center">%s</td></tr></table>', 'Aguarde, carregando...');
	};

	this.getAjaxObject = function() {
		return new XMLHttpRequest();
	};
	
	this.urlBuilder = function(obj) {
	
		var att_name = "";
		var url = '';
		
		if (obj) {
		
			for (att_name in obj) {
				url += "&" + att_name + "=" + obj[att_name];
			}
			
		}
		
		return url;
	};
	
	this.instance = this.getAjaxObject();
}
	
var ajax = new Ajax();
