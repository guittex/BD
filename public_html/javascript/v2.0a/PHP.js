
function IPHP() {
	
	this.array_keys = function ($mixed) {
		
		var $type  = this.gettype($mixed);
		var $keys  = [];
		var $count = 0;
		
		if ($type == "array" || $type == "object") {
			
			for (var $att_name in $mixed) {
				$keys[$count] = $att_name;
				$count++;
			}
			
		}
		
		$keys.sort();
		
		return $keys;
	};
	
	this.addslashes = function ($string) {

		var $chars, $arr, $len, $i, $c;
		
		$string = this.is_string($string) ? $string : "";
		$len    = $string.length;
		$chars  = ["\\", "'", '"'];
		$arr    = [];
		
		for ($i = 0; $i < $len; $i++) {
			
			$c = $string.substr($i, 1);
			
			if ($chars.indexOf($c) != -1) {
				$arr[$arr.length] = "\\";
			}
			
			$arr[$arr.length] = $c;
		}
		
		return $arr.join("");
	};
	
	this.count = function ($mixed) {
		
		var $type  = this.gettype($mixed);
		var $count = 0;
		
		if ($type == "array") {
			$count = $mixed.length;
		}
		else if ($type == "object") {
			
			for (var $index in $mixed) {
				
				if (!this.is_function($mixed[$index])) {
					$count++;
				}
				
			}
			
		}
		
		return $count;
	};
	
	this.empty = function ($mixed) {
		
		var $type = this.gettype($mixed);
		
		if ($type == "array" || $type == "string") {
			return ($mixed.length == 0);
		}
		else if ($type == "boolean") {
			return ($mixed == false);
		}
		else if ($type == "double" || $type == "integer") {
			return ($mixed == 0);
		}
		else if ($type == "NULL") {
			return true;
		}
		
		return false;
	};
	
	this.explode = function ($separator, $str) {
		return $str.toString().split($separator.toString());
	};

	this.floatval = function ($mixed) {
		return (this.is_numeric($mixed) ? parseFloat($mixed) : 0);
	};
	
	this.get_class = function ($object) {

		var $class = "";
		
		if (this.is_object($object)) {
			$class = $object.constructor.toString().split("(")[0].split(" ")[1];
		}
		
		return $class;
	};
	
	this.get_object_vars = function ($object) {
		
		var $arr   = [];
		var $count = 0;
		
		if (this.is_object($object)) {
			
			for (var $i in $object) {
				$arr[$count] = $i;
				$count++;
			}
			
		}
		
		return $arr;
	};
	
	this.gettype = function ($mixed) {
		
		var $type = "";
		
		if ($mixed !== undefined) {
			
			$type = typeof($mixed);
			
			if ($type == "number") {
				$type = $mixed.toString().indexOf(".") != -1 ? "double" : "integer";
			}
			else if ($type == "object") {
				$type = $mixed !== null ? ($mixed instanceof Array ? "array" : $type) : "NULL";
			}
			
		}
		
		return $type;
	};
	
	this.implode = function ($glue, $pieces) {
		return (this.is_array($pieces) ? $pieces.join($glue.toString()) : "");
	};
	
	this.intval = function ($mixed) {
		return (this.is_numeric($mixed) ? parseInt($mixed) : 0);
	};
	
	this.isset = function ($mixed) {
		return ($mixed !== undefined && $mixed !== null);
	};
	
	this.is_array = function ($mixed) {
		return (this.gettype($mixed) == "array");
	};
	
	this.is_boolean = function ($mixed) {
		return (this.gettype($mixed) == "boolean");
	};
	
	this.is_function = function ($mixed) {
		return (this.gettype($mixed) == "function");
	};
	
	this.is_numeric = function ($mixed) {
		
		function is_numeric_hasChar($mixed) {
			
			var $valid  = "0123456789.";
			var $error  = false;
			var $len    = $mixed.length;
			
			if ($len > 0) {
				
				var $start = ($mixed.substr(0, 1) == "-" ? 1 : 0);
				
				for (var $i = $start; $i < $len; $i++) {
					
					if ($valid.indexOf($mixed.substr($i, 1)) == -1) {
						$error = true;
						break;
					}
					
				}
				
			}
			
			return $error;
		};
		
		var $type = this.gettype($mixed);
		
		if ($type == "double" || $type == "integer") {
			return true;
		}
		else if ($type == "string") {
			
			if (!is_numeric_hasChar($mixed)) {
			
				if (!isNaN(parseFloat($mixed)) && isFinite($mixed)) {
					return true;
				}

			}
			
		}
		
		return false;
	};
	
	this.is_object = function ($mixed) {
		return (this.gettype($mixed) == "object");
	};
	
	this.is_string = function ($mixed) {
		return (this.gettype($mixed) == "string");
	};
	
	this.join = function ($glue, $pieces) {
		return this.implode($glue, $pieces);
	};

	this.ltrim = function ($str, $clist) {
		
		$str   = $str ? $str.toString() : "";
		$clist = $clist ? $clist.toString() : " \n \r \t";
		
		if ($str && $clist) {
			
			while ($clist.indexOf($str.substr(0, 1)) != -1) {
				$str = $str.substr(1);
			}
			
		}
		
		return $str;
	};

    this.number_format = function () {

    	var $float         = arguments[0] ? arguments[0].toString() : "";
    	var $decimals      = arguments[1] ? parseInt(arguments[1])  : 0;
    	var $dec_point     = arguments[2] ? arguments[2].toString() : ".";
    	var $thousands_sep = arguments[3] ? arguments[3].toString() : ",";
    	
    	var $format, $len, $arr, $money, $cents, $f_money, $f_cents, $len_mo, $len_ce, $chk, $aux;

    	var number_format_integer = function ($v) {
    		$v = parseInt($v);
    		return (!isNaN($v) ? $v : 0);
    	};
    	
    	var number_format_isAllNine = function ($v) {
    		
    		var $c, $l;
    		
    		$v = $v.toString();
    		$l = $v.length;
    		$c = 0;
    		
    		for (var $x = 0; $x < $l; $x++) {
    			
    			if ($v.substr($x, 1) == '9') {
    				$c++;
    			}
    			
    		}
    		
    		return ($c == $l);
    	};
    	
    	$format = "";
    	$len    = $float.length;

    	if ($len > 0) {
    		
    		$arr     = this.explode('.', $float);
    		$money   = this.isset($arr[0]) ? number_format_integer($arr[0]) : 0;
    		$cents   = this.isset($arr[1]) ? number_format_integer($arr[1]) : "";
    		$f_money = "";
    		$f_cents = "";
    		
    		$len_mo = $money.toString().length;
    		$len_ce = $cents.toString().length;

    		if ($decimals >= 0) {
    			
    			if ($decimals > $len_ce) {
    				$f_cents = this.str_pad($cents, $decimals, 0, "RIGHT");
    			}
    			else {

    				if ($decimals == 0) {
    					
    					if ($len_ce > 0) {
    						
    						$chk = number_format_integer($cents.toString().substr(0, 1));
    						
    						if ($chk >= 5) {
    							$money++;
    						}
    						
    					}
    					
    				}
    				else {
    					
    					if ($decimals != $len_ce) {
    						
    						$chk = number_format_integer($cents.toString().substr($decimals, 1));
    						
    						if ($chk >= 5) {
    							
    							$aux = number_format_integer($cents.toString().substr(0, $decimals));
    							
    							if (number_format_isAllNine($aux) == true) {
    								$money++;
    								$cents = this.str_repeat("0", $decimals);
    							}
    							else {
    								$cents = $aux + 1;
    							}
    							
    							$f_cents = $cents.toString().substr(0, $decimals);
    						}
    						else {
    							$f_cents = $cents.toString().substr(0, $decimals);
    						}
    						
    					}
    					else {    					
    						$f_cents = $cents.toString().substr(0, $decimals);
    					}

    				}

    			}
    			
    		}
    		
    		$money  = $money.toString();
    		$len_mo = $money.length;
    		
    		if ($len_mo <= 12) {
        		
	    		if ($len_mo >= 10 && $len_mo <= 12) {
	    			$f_money = $money.substr(0, ($len_mo - 9)) + "" + $thousands_sep + "" + $money.substr(($len_mo - 9), 3) + "" + $thousands_sep + "" + $money.substr(($len_mo - 6), 3) + "" + $thousands_sep + "" + $money.substr(($len_mo - 3), 3);    			
	    		}
	    		else if ($len_mo >= 7 && $len_mo <= 9) {
	    			$f_money = $money.substr(0, ($len_mo - 6)) + "" + $thousands_sep + "" + $money.substr(($len_mo - 6), 3) + "" + $thousands_sep + "" + $money.substr(($len_mo - 3), 3);
	    		}
	    		else if ($len_mo >= 4 && $len_mo <= 6) {
	    			$f_money = $money.substr(0, ($len_mo - 3)) + "" + $thousands_sep + "" + $money.substr(($len_mo - 3), 3);
	    		}
	    		else if ($len_mo >= 1 && $len_mo <= 3) {
	    			$f_money = $money.substr(0, $len_mo);
	    		}
	    		else if ($len_mo == 0) {
	    			$f_money = 0;
	    		}
    		
    		}
    		else {
    			$f_money = $money;
    		}
    		
    		if ($decimals > 0) {
    			$format = $f_money + "" + $dec_point + "" + $f_cents;
    		}
    		else {
    			$format = $f_money;
    		}

    	}
    	
    	return $format;
    };
	
	this.print_r = function ($mixed, $return, $info) {
		
		function print_r_info($var, $info) {
			
			var $type      = Php.gettype($var);
			var $undefined = "undefined";

			if ($info) { // var_dump

				if ($type) {

					if ($type == "array") {
						return Php.sprintf("%s(%s)", $type, $var.length);
					}
					else if ($type == "boolean") {
						return Php.sprintf("bool(%s)", $var);
					}
					else if ($type == "double") {
						return Php.sprintf("float(%s)", $var);
					}
					else if ($type == "function") {
						return "function () {[user code]}";
//						return $var.toString(); // se nao converter a function para string, o JS executa e retorna o valor da funcao
					}
					else if ($type == "integer") {
						return Php.sprintf("int(%s)", $var);
					}
					else if ($type == "NULL") {
						return $type;
					}
					else if ($type == "object") {
						return Php.sprintf("%s(%s)# (%s)", $type, Php.get_class($var), Php.count($var));
					}
					else if ($type == "string") {
						return Php.sprintf('%s(%s) "%s"', $type, $var.length, $var);
					}

					return null;
				}

			}
			else { // print_r

				if ($type) {

					if ($type == "array") {
						return Php.ucfirst($type);
					}
					else if ($type == "function") {
						return "function () {[user code]}";
//						return $var.toString(); // se nao converter a function para string, o JS executa e retorna o valor da funcao
					}
					else if ($type == "NULL") {
						return $type;
					}
					else if ($type == "object") {
						return Php.sprintf("%s Object", Php.ucfirst(Php.get_class($var)));
					}

					return $var;
				}

			}

			return $undefined;
		}

		function print_r_format($mixed, $ident, $info) {
			
			var $type = Php.gettype($mixed);
			var $spc  = Php.str_repeat(" ", $ident * 2);
			var $spc2 = Php.str_repeat(" ", ($ident * 2) + 4);
			var $str  = "";
			
			if ($type == "array" || $type == "object") {
				
				$str += "";
				$str += print_r_info($mixed, $info);
				$str += "\n";
				$str += $spc;
				$str += $info ? "{" : "(";
				$str += "\n";

				for (var $x in $mixed) {
					$str += Php.sprintf("%s[%s] => %s\n", $spc2, ($info ? (Php.is_string($x) ? Php.sprintf('"%s"', $x) : $x) : $x), print_r_format($mixed[$x], ($ident + 4), $info));
				}

				$str += $spc;
				$str += $info ? "}" : ")";
				$str += "\n";
			}
			else {
				$str = print_r_info($mixed, $info);
			}
			
			return $str;
		}
		
		$return = this.is_boolean($return) ? $return : false;
		$info   = this.is_boolean($info) ? $info : false;
		
		var $output = "<pre>" + print_r_format($mixed, 0, $info) + "</pre>";
		
		if (!$return) {
			document.write($output);
		}
		
		return $output;
	};
	
	this.rtrim = function ($str, $clist) {
		return this.strrev(this.ltrim(this.strrev($str), $clist));
	};
	
	this.sprintf = function () {
		
		var $format, $search;
		
		for (var $i = 0, $len = arguments.length; $i < $len; $i++) {
			
			if ($i == 0) {
				$format = arguments[0].toString();
			}
			else {
				
				$format = $format.replace("%s", arguments[$i]);
				$search = ("{" + ($i - 1) + "}");
				
				do {
					$format = $format.replace($search, arguments[$i]);
				}
				while ($format.indexOf($search) != -1);
			}
			
		}
		
		return $format;
	};
	
	this.stripslashes = function ($string) {
		
		var $chars, $arr, $len, $i, $c;
		
		$string = this.is_string($string) ? $string : "";
		$len    = $string.length;
		$chars  = ["\\\\", "\\'", '\\"'];
		$arr    = [];
		
		for ($i = 0; $i < $len; $i++) {
			
			$c = $string.substr($i, 2);
			
			if ($chars.indexOf($c) != -1) {
				$arr[$arr.length] = $c.substr(1, 1);
			}
			else {
				$arr[$arr.length] = $c;
			}

			$i++;
		}
		
		return $arr.join("");
	};

	this.substr_count = function ($haystack, $needle) {
		
		var $count = 0;
		
		if ($haystack && $needle) {
			
			$haystack = $haystack.toString();
			$needle   = $needle.toString();
		
			while ($haystack.indexOf($needle) != -1) {
				$haystack = $haystack.replace($needle, "");
				$count++;
			}

		}
		
		return $count;
	};

/** string str_pad($input, $pad_length, $pad_string, $pad_type); */
    this.str_pad = function () {

        var $input      = this.isset(arguments[0]) ? arguments[0].toString() : "";
        var $pad_length = this.isset(arguments[1]) ? parseInt(arguments[1]) : 0;
        var $pad_string = this.isset(arguments[2]) ? arguments[2].toString().substr(0, 1) : "";
        var $pad_type   = this.isset(arguments[3]) ? arguments[3].toString().toUpperCase() : "PAD_LEFT";
        
        var $len        = $pad_length - $input.length;
        var $aux        = this.str_repeat($pad_string, $len);
        
        if ($pad_type.indexOf("BOTH") != -1) {
        	return ($aux + "" + $input + "" + $aux);
        }
        
        if ($pad_type.indexOf("RIGHT") != -1) {
        	return ($input + "" + $aux);
        }
        
        return ($aux + "" + $input);
    };
	
	this.str_repeat = function ($str, $mult) {
		
		var $aux = [];
		
		for (var $i = 0; $i < $mult; $i++) {
			$aux[$i] = $str;
		}
		
		return $aux.join("");
	};
	
	this.str_replace = function ($search, $replace, $subject) {
		
		var $stype  = this.gettype($search);
		var $rtype  = this.gettype($replace);
		var $scount = 0;
		
		if ($stype == "array") {
			
			if ($rtype == "array") {
				
				if ($search.length == $replace.length) {
				
					for (var $i = 0, $len = $search.length; $i < $len; $i++) {
						$subject = this.str_replace($search[$i].toString(), $replace[$i].toString(), $subject);
					}
					
				}
				
			}
			else if ($rtype == "string") {
				
				for (var $i = 0, $len = $search.length; $i < $len; $i++) {
					$subject = this.str_replace($search[$i].toString(), $replace, $subject);
				}
				
			}
			
		}
		else if ($stype == "string") {
			
			if ($rtype == "array") {
				
				for (var $i = 0, $len = $replace.length; $i < $len; $i++) {
					$subject = this.str_replace($search, $replace[$i].toString(), $subject);
				}
				
			}
			else if ($rtype == "string") {
				
				if ($subject) {
					
					$subject = $subject.toString();
					$scount  = this.substr_count($subject, $search);
				
					for (var $i = 0; $i < $scount; $i++) {
						$subject = $subject.replace($search, $replace);
					}
					
				}
				
			}
			
		}
		
		return $subject;
	};
	
	this.strrev = function ($str) {
		
		var $i, $z, $len, $aux;
		
		$aux = [];
		$str = $str ? $str.toString() : "";
		$len = $str.length;
		$z   = $len - 1;
		
		for ($i = 0; $i < $len; $i++) {
			$aux[$i] = $str.substr($z, 1);
			$z--;
		}
		
		return $aux.join("");
	};
	
	this.trim = function ($str, $clist) {
		return this.ltrim(this.rtrim($str, $clist), $clist);
	};
	
	this.ucfirst = function ($str) {
		
		var $str = this.is_string($str) ? $str.toString() : "";
		
		if ($str) {
			$str = $str.substr(0, 1).toUpperCase() + "" + $str.substr(1);
		}
		
		return $str;
	};
	
	this.var_dump = function ($mixed, $return) {
		return this.print_r($mixed, $return, true);
	};

}

var Php = new IPHP();
