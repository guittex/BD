
function PString($str) {
	
	this.VAL = Php.isset($str) ? $str.toString() : "";
	
	this.startsWith = function ($needle) {
		return ($needle && this.VAL.substr(0, $needle.length) == $needle);
	};
	
	this.endsWith = function ($needle) {
		return ($needle && this.VAL.substr(($needle.length * -1)) == $needle);
	};
	
}

function JElement($selector) {
	
	this.self = function () {
		
		var $type = Php.gettype($selector);
		var $obj  = null;
		
		if ($type == "string") {
			
			var $c = $selector.substr(0, 1);
			
			if ($c == "#") { // id
				$obj = document.getElementById($selector.substr(1));
			}
			else {
				
				if ($selector.indexOf("#") == -1) {
					
					if ($c == ".") { // css tag
						
						// TODO: terminar
						
					}
					else {
						
					}
					
				}
				
			}
			
		}
		else if ($type == "object") {
			$obj = $selector;
		}
		
		return $obj;
	};
	
	this.att = function ($name, $new_value) {
		
		var $obj = this.self();
		
		if ($obj != null) {
			
			var $split = $name.split(".");
			var $len   = $split.length;
			var $value = null;
			
			if ($len == 2) {
				
				if (Php.isset($new_value)) {
					$obj[$split[0]][$split[1]] = $new_value;
				}
				
				$value = $obj[$split[0]][$split[1]];
			}
			else if ($len == 1) {
				
				if (Php.isset($new_value)) {
					$obj[$split[0]] = $new_value;
				}
				
				$value = $obj[$split[0]];
			}
			
			return $value;
		}
		else {
			console.log(("Warning::JElement(" + $selector + ") not exists."));
		}

		return null;
	};
	
	this.exists = function () {
		return (Php.is_object(this.self()));
	};
	
	this.val = function () {
		
		if (arguments.length > 0) {
			this.att("value", arguments[0]);
		}
		
		return this.att("value");
	};
	
	this.value = function () {
		return this.val(arguments[0]);
	};
	
	this.html = function () {
		
		if (arguments.length > 0) {
			this.att("innerHTML", arguments[0]);
		}
		
		return this.att("innerHTML");
	};
	
	this.text = function () {
		return this.html(arguments[0]);
	};
	
	this.concat = function ($new_value) {
		
		if (Php.isset($new_value)) {
			
			var $class, $att, $glue, $aux, $old;
			
			$class = Php.get_class(this.self());
			
			if ($class == "HTMLTextAreaElement") {
				$att  = "value";
				$glue = "\n";
			}
			else {
				$att  = "innerHTML";
				$glue = "<br />";
			}
			
			$old  = this.att($att);
			$aux  = [$old, $new_value];
			$glue = $old ? $glue : "";
			
			this.att($att, $aux.join($glue));
		}
		
	};
	
	this.css = function () {
		
		if (arguments.length > 0) {
			this.att("className", arguments[0]);
		}
		
		return this.att("className");
	};
	
	this.readonly = function () {
		
		if (arguments.length > 0) {
			this.att("readOnly", arguments[0]);
		}
		
		return this.att("readOnly");
	};
	
	this.disabled = function () {
		
		if (arguments.length > 0) {
			this.att("disabled", arguments[0]);
		}
		
		return this.att("disabled");
	};
	
	this.src = function () {
		
		if (arguments.length > 0) {
			this.att("src", arguments[0]);
		}
		
		return this.att("src");
	};
	
	this.background = function () {
		
		if (arguments.length > 0) {
			this.att("style.background", arguments[0]); // TODO: fix
		}
		
		return this.att("style.background");
	};
	
	this.focus = function () {
		this.self().focus();
	};
	
	this.show = function () {
		this.self().style.display = "";
	};
	
	this.hide = function () {
		this.self().style.display = "none";
	};
	
	this.show_hide = function () {
		
		if (this.isVisible()) {
			this.hide();
		}
		else {
			this.show();
		}
		
	};
	
	this.showHide = function () {
		this.show_hide();
	};
	
	this.isHide = function () {
		return (this.att("style.display") == "none");
	};
	
	this.isVisible = function () {
		return (this.isHide() == false);
	};
	
	this.on = function () {
		this.self().style.visibility = "visible";
	};
	
	this.off = function () {
		this.self().style.visibility = "hidden";
	};
	
	this.width = function () {
		
		if (arguments.length > 0) {
			this.att("style.width", (Php.is_numeric(arguments[0]) ? ("" + arguments[0] + "px") : arguments[0]));
		}
		
		return this.att("style.width");
	};
	
	this.height = function () {
		
		if (arguments.length > 0) {
			this.att("style.height", (Php.is_numeric(arguments[0]) ? ("" + arguments[0] + "px") : arguments[0]));
		}
		
		return this.att("style.height");
	};
	
	this.left = function () {
		
		if (arguments.length > 0) {
			this.att("style.left", (Php.is_numeric(arguments[0]) ? ("" + arguments[0] + "px") : arguments[0]));
		}
		
		return this.att("style.left");
	};
	
	this.top = function () {
		
		if (arguments.length > 0) {
			this.att("style.top", (Php.is_numeric(arguments[0]) ? ("" + arguments[0] + "px") : arguments[0]));
		}
		
		return this.att("style.top");
	};
	
	this.center = function ($width, $height) {
		
		$width  = parseInt(($width ? $width : this.width()));
		$height = parseInt(($height ? $height : this.height()));
		
		this.att("style.position", "absolute");
		
		if ($width > 0) {
			this.width($width);
			this.left((((window.innerWidth - $width) / 2)));
		}
		
		if ($height > 0) {
			this.height($height);
			this.top((((window.innerHeight - $height) / 2)));
		}
		
	};
	
	this.position = function () {
		return this.att("style.position", arguments[0]);
	};
	
	this.opacity = function ($value) {
		
		var $self = this.self();
		
		$self.style.opacity = $value * 0.01;
		$self.style.filter  = "alpha(opacity=" + $value + ")";
	};

}

function IUtil() {
	
	this.ELEMENTS = {};
	
	this.$ = function ($selector) {
		return new JElement($selector);
	};
	
	this.$$ = function ($id) {
		return new JElement(("#" + $id));
	};
	
	this.isIE = function () {
		return (window.navigator.userAgent.toLowerCase().indexOf("edge") != -1 || window.navigator.userAgent.toLowerCase().indexOf(".net") != -1);
	};
	
	this.isMobile = function () {
		return (window.navigator.userAgent.toLowerCase().indexOf("android ") != -1 || window.navigator.userAgent.toLowerCase().indexOf("mobile ") != -1);
	};
	
	this.isEnter = function ($event) {
		return (this.getKeyCode($event) == 13);
	};
	
	this.getKeyCode = function ($event) {
		return (this.isIE() ? $event.keyCode : $event.which);
	};
	
	this.call = function ($obj, $function, $event) {
		
		var $key_code = (Php.isset($event) ? this.getKeyCode($event) : -1);
		var $ok       = (Php.gettype($key_code) == "integer");

		if ($ok) {

			var $type = Php.gettype($function);
			var $run  = false;
			
			if ($type == "function") {
				$run = true;
			}
			else if ($type == "string") {
				
				if ($function) {
					
					if (Php.isset($obj)) {
						$function = Php.str_replace("$this.getKey()", $key_code.toString(), $function);
						$function = Php.str_replace("$this", $obj.getJSCall(), $function);
						$function = Php.str_replace("this", Php.sprintf("document.getElementById('%s')", $obj.getId()), $function);
					}
					
					$run = true;
				}
				
			}
		
			if ($run) {
				setTimeout($function, 0);
			}
		
		}

	};
	
	this.hideInterval = function ($total, $id, $index) {
		
		var $obj;
		
		for (var $i = 0; $i <= $total; $i++) {
			
			$obj = this.$$(Php.sprintf($id, $i));
			
			if ($obj.exists()) {
				$obj.hide();
			}
			
		}
		
		$obj = this.$$(Php.sprintf($id, $index));
		
		if ($obj.exists()) {
			this.$$(Php.sprintf($id, $index)).show();
		}

	};
	
	this.clean = function ($str, $valid) {
		
		var $value = $str ? $str.toString() : "";
		var $aux   = "";
		var $c;
		
		for (var $i = 0, $len = $value.length; $i < $len; $i++) {
			
			$c = $value.substr($i, 1);
			
			if ($valid.indexOf($c) != -1) {
				$aux += $c;
			}
			
		}
		
		return $aux;
	};
	
	this.format = function ($str, $mask, $valid) {
		
		var $aux = "", $count = 0, $m, $c, $len;
		
		$valid = Php.isset($valid) ? $valid.toString() : "0123456789";
		$str   = this.clean($str, $valid);
		
		if ($str && $mask) {
			
			$len = $str.length;
			
			for (var $i = 0, $mlen = $mask.length; $i < $mlen; $i++) {
				
				$c = $str.substr($count, 1);
				$m = $mask.substr($i, 1);
				
				if ($m == "9") {
					$aux += $c;
					$count++;
				}
				else {
					$aux += $m;
				}
				
				if ($count >= $len) {
					break;
				}
				
			}
			
		}
		
		return $aux;
	};
	
	this.toCNPJ = function ($str) {
		return this.format($str, '99.999.999/9999-99');
	};
	
	this.toCPF = function ($str) {
		return this.format($str, '999.999.999-99');
	};
	
	this.toCEP = function ($str) {
		return this.format($str, '99999-999');
	};
	
	this.toData = function ($str) {
		return this.format($str, '99/99/9999');
	};
	
	this.toDecimal = function ($str) {
		
		var $clean = this.clean($str.toString(), "1234567890");
		var $len   = $clean.length;
		var $mask  = {};
		
		$mask[17] = "999.999.999.999.999,99";
		$mask[16] = "99.999.999.999.999,99";
		$mask[15] = "9.999.999.999.999,99";
		$mask[14] = "999.999.999.999,99";
		$mask[13] = "99.999.999.999,99";
		$mask[12] = "9.999.999.999,99";
		$mask[11] = "999.999.999,99";
		$mask[10] = "99.999.999,99";
		$mask[9]  = "9.999.999,99";
		$mask[8]  = "999.999,99";
		$mask[7]  = "99.999,99";
		$mask[6]  = "9.999,99";
		$mask[5]  = "999,99";
		$mask[4]  = "99,99";
		$mask[3]  = "9,99";
		
		if ($len >= 3 && $len <= 17) {
			return this.format($clean, $mask[$len]);
		}
		
		return $str;
	};
	
	this.toHora = function ($str) {
		return this.format($str, '99:99');
	};
	
	this.toInscricaoEstadual = function ($str) {
		return this.format($str, '999.999.999.999');
	};
	
	this.toTelefone = function ($str) {
		return this.format($str, '(99) 9999-9999');
	};
	
/** bool is(string $str, string $mask); */
	this.is = function () {
		
		var $str    = Php.trim((Php.isset(arguments[0]) && arguments[0] !== "" ? arguments[0].toString() : ""));
		var $mask   = arguments[1].toString();
		var $len    = $str.length;
		var $mlen   = $mask.length;
		var $valid  = "0123456789";
		var $ok     = true;
		
		if ($len > 0 && $len == $mlen) {
			
			var $c = null;
			var $m = null;
			var $i = 0;
			
			for ($i = 0; $i < $len; $i++) {
				
				$c = $str.substr($i, 1);
				$m = $mask.substr($i, 1);
				
				if ($m == "9") {
					$ok = ($valid.indexOf($c) != -1);
				}
				else {
					$ok = ($c == $m);
				}
				
				if (!$ok) {
					break;
				}
				
			}
			
			return $ok;
		}
		
		return false;
	};
	
	this.isCEP = function ($str) {
		return this.is($str, "99999-999");
	};
	
	this.isCNPJ = function ($str) {
		return this.is($str, "99.999.999/9999-99");
	};
	
	this.isCPF = function ($str) {
		return this.is($str, "999.999.999-99");
	};
	
	this.isData = function ($str) {
		return this.is($str, "99/99/9999");
	};

	this.isDecimal = function ($str) {
		
		var $len  = $str ? $str.toString().length : 0;
		var $mask = {};
		
		if ($len >= 4 && $len <= 22) { // TODO: implementar tamanho infinito
			
			$mask[22] = "999.999.999.999.999,99";
			$mask[21] = "99.999.999.999.999,99";
			$mask[20] = "9.999.999.999.999,99";
			$mask[18] = "999.999.999.999,99";
			$mask[17] = "99.999.999.999,99";
			$mask[16] = "9.999.999.999,99";
			$mask[14] = "999.999.999,99";
			$mask[13] = "99.999.999,99";
			$mask[12] = "9.999.999,99";
			$mask[10] = "999.999,99";
			$mask[9]  = "99.999,99";
			$mask[8]  = "9.999,99";
			$mask[6]  = "999,99";
			$mask[5]  = "99,99";
			$mask[4]  = "9,99";

			if (Php.isset($mask[$len])) {
				return this.is($str, $mask[$len]);
			}

		}
		
		return false;
	};

	this.isEmail = function ($str) {

		var $aux, $ok, $arr, $suffix, $split, $address, $domain, $pos;
		
		$str = $str ? Php.trim($str.toString()) : "";
	
		if ($str !== "" && Php.substr_count($str, "@") == 1) {
			
			$aux = new PString($str);
			$ok  = false;
			$arr = ['.com.br', '.org.br', '.gov.br', '.com', '.org'];
			
			for (var $i in $arr) {
				
				$suffix = $arr[$i];
				
				if ($aux.endsWith($suffix)) {
					
					$split   = $str.split('@');
					$address = $split[0];
					$pos     = $split[1].indexOf(".");
					$domain  = $pos != -1 ? $split[1].substr(0, $pos) : "";

					if (this.isAddress($address) && this.isDomain($domain)) {
						$ok = true;
						break;
					}
					
				}
				
			}
			
			return $ok;
		}
	
		return false;
	};

	this.isHora = function ($str) {
		return this.is($str, "99:99");
	};
	
	this.isInscricaoEstadual = function ($str) {
		return this.is($str, "999.999.999.999");
	};
	
	this.isInteger = function ($str) {
		
		var $len = $str.toString().length;
		
		if ($len > 0) {
			return this.is($str, Php.str_repeat("9", $len));
		}
		
		return false;
	};
	
	this.isTelefone = function ($str) {
		return this.is($str, "(99) 9999-9999");
	};

	this.isDiscardKeys = function ($keyCode) {
		
		var $discard = "8 13 35 36 37 38 39 40 46"; // backspace, enter, del, home, end, setas
		
		return ($discard.indexOf($keyCode.toString()) != -1); 
	};
	
	this.doFormatar = function ($mask, $id, $keyCode) {
		
		var $valid = "1234567890";
		
		if (!this.isDiscardKeys($keyCode)) { 
			
			var $obj, $str, $len;
			
			$obj = this.$$($id);
			
			$obj.val(this.clean($obj.val(), $valid));

			if ($mask == "CEP") {
				$obj.val(this.toCEP($obj.val().toString().substr(0, 8)));
			}
			else if ($mask == "CNPJ") {
				$obj.val(this.toCNPJ($obj.val().toString().substr(0, 14)));
			}
			else if ($mask == "CPF") {
				$obj.val(this.toCPF($obj.val().toString().substr(0, 11)));
			}
			else if ($mask == "DATA") {
				$obj.val(this.toData($obj.val().toString().substr(0, 8)));
			}
			else if ($mask == "HORA") {
				$obj.val(this.toHora($obj.val().toString().substr(0, 4)));
			}
			else if ($mask == "TELEFONE") {
				$obj.val(this.toTelefone($obj.val().toString().substr(0, 10)));
			}
			else if ($mask == "IE") {
				$obj.val(this.toInscricaoEstadual($obj.val().toString().substr(0, 12)));
			}
			else if ($mask == "DECIMAL") {
				
				var $money, $cents, $amask = [];
				
				$str = $obj.val().toString().substr(0, 14);
				$len = $str.length;
				
				if ($len >= 3) {
					
					$amask[12] = "999.999.999.999";
					$amask[11] = "99.999.999.999";
					$amask[10] = "9.999.999.999";
					$amask[9]  = "999.999.999";
					$amask[8]  = "99.999.999";
					$amask[7]  = "9.999.999";
					$amask[6]  = "999.999";
					$amask[5]  = "99.999";
					$amask[4]  = "9.999";
					$amask[3]  = "999";
					$amask[2]  = "99";
					$amask[1]  = "9";
					
					$money = parseInt($str.substr(0, ($len - 2))).toString();
					$cents = $str.substr(-2, 2);
					
					$obj.val(Php.sprintf("%s,%s", this.format($money, $amask[$money.length], $valid), $cents));
				}
				else {
					$obj.val($str);
				}
				
			}
			
		}
		
	};
	
	this.isClean = function ($str, $valid) {
	
		var $aux, $len, $ok, $i, $c;
		
		$valid = Php.isset($valid) ? $valid : '_-0123456789.ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$aux   = [];
		$len   = $str.length;
	
		if ($len > 0) {
				
			$ok = true;
				
			for ($i = 0; $i < $len; $i++) {
					
				$c = $str.substr($i, 1).toUpperCase();
					
				if ($valid.indexOf($c) == -1) {
					$ok = false;
					break;
				}
					
			}
				
			return $ok;
		}
	
		return false;
	}
	
/** checa se é valido o que está antes do @ */
	this.isAddress = function ($str) {
		return this.isClean($str);
	};
	
	this.isDomain = function ($str) {
		return this.isClean($str, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
	};

}

var Util = new IUtil();
