
function IAjax($file) {
	
	this.URL   = $file ? $file : "./ajax.php";

/** string call($action, $args, $callback, $object_id); */
	this.call = function () {

		this.set(null);
		
		this.ACTION     = arguments[0] !== undefined ? arguments[0].toString() : "";
		this.ARGS       = arguments[1] !== undefined ? this.toUrlArgs(arguments[1]) : "";
		this.CALLBACK   = arguments[2] !== undefined ? arguments[2] : "";
		this.OBJECT_ID  = arguments[3] !== undefined ? arguments[3] : "";
		this.AUTO_EXEC  = arguments[4] !== undefined ? arguments[4] : true;
		this.JS_SCRIPT  = null;
		
		var $parent     = this;
		var $aj         = new XMLHttpRequest();
		
		this.ARGS = this.ARGS.substr(0, 1) == "&" ? this.ARGS.substr(1) : this.ARGS;
		this.ARGS = "ajax=1&action=" + this.ACTION + "" + (this.ARGS ? "&" + this.ARGS : "");

//		this.URL = ROOT_PATH + "/" + this.FILE + "?" + $args;
		this.text(this.getLoadingMessage());
		
		$aj.open("POST", this.URL, true);
		$aj.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // via POST
		
		$aj.onreadystatechange = function () {
				
			if ($aj.readyState == 4) {
					
				var $ret = $aj.responseText;
				var $obj = null;
					
				$parent.set($ret);
				$parent.text($ret);
					
				(function () { // DONE: pega os codigos JAVASCRIPT dentro dos <script> e rodá-los automaticamente
						
					var $scripts = [];
					var $aux     = [];
					var $str     = $ret.toString();
					var $count   = 0;
					var $tag1    = "<script>";
					var $tag2    = "</script>";
					var $tags1   = Php.substr_count($str, $tag1);
					var $tags2   = Php.substr_count($str, $tag2);
					var $pos, $str_aux, $arr_aux, $callback;
						
					if ($str && $tags1 > 0 && $tags1 == $tags2) {
							
						$aux = $str.split($tag2);
							
						for (var $i = 0, $len = $aux.length; $i < $len; $i++) {
								
							if ($aux[$i]) {
									
								$pos = $aux[$i].indexOf($tag1);
									
								if ($pos != -1) {
									$scripts[$count] = $aux[$i].substr(($pos + $tag1.length));
									$count++;
								}
								
							}
								
						}
							
					}
						
					$scripts = $scripts.join("");
					$scripts = ("function () {" + $scripts + "}");
	
					eval("$scripts = " + $scripts + ";");
						
					$parent.JS_SCRIPT = $scripts;
	
					if ($parent.AUTO_EXEC) {
						setTimeout($scripts, 0);
						setTimeout($parent.CALLBACK, 250);
					}

				}());
					
			}
				
		};
		
		$aj.send(this.ARGS);
	};
	
	this.set = function () {
		this.HTML = arguments[0];
	};
	
	this.get = function () {
		return this.HTML;
	};
	
	this.callback = function () {

		var $type  = $php.gettype(this.JS_SCRIPT);
		var $type2 = $php.gettype(this.CALLBACK);
		var $run   = false;
		var $run2  = false;
		
		if ($type == "function" || ($type == "string" && this.JS_SCRIPT)) {
			$run = true;
		}
		
		if ($type2 == "function" || ($type2 == "string" && this.CALLBACK)) {
			$run2 = true;
		}

		if ($run) {
			setTimeout(this.JS_SCRIPT, 0);
		}
		
		if ($run2) {
			setTimeout(this.CALLBACK, 300);
		}

	};
	
	this.getJSON = function () {
		
		var $str = arguments[0] !== undefined ? arguments[0] : this.HTML;
		
		if (this.isJSON($str)) {
			return eval($str);
		}
		
		return null;
	};
	
	this.isJSON = function () {
		
		var $mixed = arguments[0] !== undefined ? arguments[0] : this.get();
		
		if ($mixed !== undefined && typeof($mixed) === "string") {
			
			var $ini  = $mixed.substr(0, 2);
			var $fim  = $mixed.substr(-2, 2);
			var $ini2 = $mixed.substr(0, 1);
			var $fim2 = $mixed.substr(-1, 1);
			
			if ($ini2 == "{" && $fim2 == "}" || $ini2 == "[" && $fim2 == "]") {
				return true;
			}
			else {
			
				if ($ini == "({" && $fim == "})") {
					return true;
				}

			}
			
		}
		
		return false;
	};
	
	this.text = function ($text) {

		var $object_id = this.getDiv();

		if ($object_id != null) {
			$object_id.innerHTML = $text;
		}

	};
	
	this.getDiv = function () {
		
		var $object_id = this.OBJECT_ID !== undefined ? this.OBJECT_ID : null;
		var $obj       = null;
		var $type      = typeof($object_id);
		
		if ($object_id != null && ($type == "object" || $type == "string")) {
			
			if ($type == "object") {
					
				if (typeof($object_id.self) == "function") {
					$obj = $object_id.self();
				}
				else {
					$obj = $object_id;
				}
						
			}
			else {
					
				if (document.getElementById($object_id)) {
					$obj = document.getElementById($object_id);
				}
						
			}

		}
		
		return $obj;
	};
	
	this.divExists = function () {
		return (this.getDiv() != null);
	};
	
	this.getLoadingMessage = function () {
		return 'Aguarde, carregando...';
	};
	
	this.toUrlArgs = function ($object) {
		
		$object = $object !== null && $object !== undefined ? $object : "";
		
		if (typeof($object) == "object") {

			var $aux   = [];
			var $count = 0;
			
			for (var $att_name in $object) {
				$aux[$count] = $att_name + "=" + $object[$att_name];
				$count++;
			}
			
			return $aux.join("&");
		}
		
		return $object;
	};

}
