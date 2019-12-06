
function PHP() {
	
	this.weekday     = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday");
	this.months      = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
	this.daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	
	this.chars = [];

	this.chars[32] = " ";
	this.chars[33] = "!";
	this.chars[34] = '"';
	this.chars[35] = "#";
	this.chars[36] = "$";
	this.chars[37] = "%";
	this.chars[38] = "&";
	this.chars[39] = "'";
	this.chars[40] = "(";
	this.chars[41] = ")";
	this.chars[42] = "*";
	this.chars[43] = "+";
	this.chars[44] = ",";
	this.chars[45] = "-";
	this.chars[46] = ".";
	this.chars[47] = "/";
	this.chars[48] = "0";
	this.chars[49] = "1";
	this.chars[50] = "2";
	this.chars[51] = "3";
	this.chars[52] = "4";
	this.chars[53] = "5";
	this.chars[54] = "6";
	this.chars[55] = "7";
	this.chars[56] = "8";
	this.chars[57] = "9";
	this.chars[58] = ":";
	this.chars[59] = ";";
	this.chars[60] = "<";
	this.chars[61] = "=";
	this.chars[62] = ">";
	this.chars[63] = "?";
	this.chars[64] = "@";
	this.chars[65] = "A";
	this.chars[66] = "B";
	this.chars[67] = "C";
	this.chars[68] = "D";
	this.chars[69] = "E";
	this.chars[70] = "F";
	this.chars[71] = "G";
	this.chars[72] = "H";
	this.chars[73] = "I";
	this.chars[74] = "J";
	this.chars[75] = "K";
	this.chars[76] = "L";
	this.chars[77] = "M";
	this.chars[78] = "N";
	this.chars[79] = "O";
	this.chars[80] = "P";
	this.chars[81] = "Q";
	this.chars[82] = "R";
	this.chars[83] = "S";
	this.chars[84] = "T";
	this.chars[85] = "U";
	this.chars[86] = "V";
	this.chars[87] = "W";
	this.chars[88] = "X";
	this.chars[89] = "Y";
	this.chars[90] = "Z";
	this.chars[91] = "[";
	this.chars[92] = "\\";
	this.chars[93] = "]";
	this.chars[94] = "^";
	this.chars[95] = "_";
	this.chars[96] = "`";
	this.chars[97] = "a";
	this.chars[98] = "b";
	this.chars[99] = "c";
	this.chars[100] = "d";
	this.chars[101] = "e";
	this.chars[102] = "f";
	this.chars[103] = "g";
	this.chars[104] = "h";
	this.chars[105] = "i";
	this.chars[106] = "j";
	this.chars[107] = "k";
	this.chars[108] = "l";
	this.chars[109] = "m";
	this.chars[110] = "n";
	this.chars[111] = "o";
	this.chars[112] = "p";
	this.chars[113] = "q";
	this.chars[114] = "r";
	this.chars[115] = "s";
	this.chars[116] = "t";
	this.chars[117] = "u";
	this.chars[118] = "v";
	this.chars[119] = "w";
	this.chars[120] = "x";
	this.chars[121] = "y";
	this.chars[122] = "z";
	this.chars[123] = "{";
	this.chars[124] = "|";
	this.chars[125] = "}";
	this.chars[126] = "~";
	this.chars[128] = "€";
	this.chars[129] = "";
	this.chars[130] = "‚";
	this.chars[131] = "ƒ";
	this.chars[132] = "„";
	this.chars[133] = "…";
	this.chars[134] = "†";
	this.chars[135] = "‡";
	this.chars[136] = "ˆ";
	this.chars[137] = "‰";
	this.chars[138] = "Š";
	this.chars[139] = "‹";
	this.chars[140] = "Œ";
	this.chars[141] = "";
	this.chars[142] = "Ž";
	this.chars[143] = "";
	this.chars[144] = "";
	this.chars[145] = "‘";
	this.chars[146] = "’";
	this.chars[147] = "“";
	this.chars[148] = "”";
	this.chars[149] = "•";
	this.chars[150] = "–";
	this.chars[151] = "—";
	this.chars[152] = "˜";
	this.chars[153] = "™";
	this.chars[154] = "š";
	this.chars[155] = "›";
	this.chars[156] = "œ";
	this.chars[157] = "";
	this.chars[158] = "ž";
	this.chars[159] = "Ÿ";
	this.chars[160] = " ";
	this.chars[161] = "¡";
	this.chars[162] = "¢";
	this.chars[163] = "£";
	this.chars[164] = "¤";
	this.chars[165] = "¥";
	this.chars[166] = "¦";
	this.chars[167] = "§";
	this.chars[168] = "¨";
	this.chars[169] = "©";
	this.chars[170] = "ª";
	this.chars[171] = "«";
	this.chars[172] = "¬";
	this.chars[173] = "­";
	this.chars[174] = "®";
	this.chars[175] = "¯";
	this.chars[176] = "°";
	this.chars[177] = "±";
	this.chars[178] = "²";
	this.chars[179] = "³";
	this.chars[180] = "´";
	this.chars[181] = "µ";
	this.chars[182] = "¶";
	this.chars[183] = "·";
	this.chars[184] = "¸";
	this.chars[185] = "¹";
	this.chars[186] = "º";
	this.chars[187] = "»";
	this.chars[188] = "¼";
	this.chars[189] = "½";
	this.chars[190] = "¾";
	this.chars[191] = "¿";
	this.chars[192] = "À";
	this.chars[193] = "Á";
	this.chars[194] = "Â";
	this.chars[195] = "Ã";
	this.chars[196] = "Ä";
	this.chars[197] = "Å";
	this.chars[198] = "Æ";
	this.chars[199] = "Ç";
	this.chars[200] = "È";
	this.chars[201] = "É";
	this.chars[202] = "Ê";
	this.chars[203] = "Ë";
	this.chars[204] = "Ì";
	this.chars[205] = "Í";
	this.chars[206] = "Î";
	this.chars[207] = "Ï";
	this.chars[208] = "Ð";
	this.chars[209] = "Ñ";
	this.chars[210] = "Ò";
	this.chars[211] = "Ó";
	this.chars[212] = "Ô";
	this.chars[213] = "Õ";
	this.chars[214] = "Ö";
	this.chars[215] = "×";
	this.chars[216] = "Ø";
	this.chars[217] = "Ù";
	this.chars[218] = "Ú";
	this.chars[219] = "Û";
	this.chars[220] = "Ü";
	this.chars[221] = "Ý";
	this.chars[222] = "Þ";
	this.chars[223] = "ß";
	this.chars[224] = "à";
	this.chars[225] = "á";
	this.chars[226] = "â";
	this.chars[227] = "ã";
	this.chars[228] = "ä";
	this.chars[229] = "å";
	this.chars[230] = "æ";
	this.chars[231] = "ç";
	this.chars[232] = "è";
	this.chars[233] = "é";
	this.chars[234] = "ê";
	this.chars[235] = "ë";
	this.chars[236] = "ì";
	this.chars[237] = "í";
	this.chars[238] = "î";
	this.chars[239] = "ï";
	this.chars[240] = "ð";
	this.chars[241] = "ñ";
	this.chars[242] = "ò";
	this.chars[243] = "ó";
	this.chars[244] = "ô";
	this.chars[245] = "õ";
	this.chars[246] = "ö";
	this.chars[247] = "÷";
	this.chars[248] = "ø";
	this.chars[249] = "ù";
	this.chars[250] = "ú";
	this.chars[251] = "û";
	this.chars[252] = "ü";
	this.chars[253] = "ý";
	this.chars[254] = "þ";
	this.chars[255] = "ÿ";

    this.array_keys = function (input, search_value) {

        var r = false;
        var x = 0;
        var i = "";
        
        search_value = search_value ? search_value : null;
        
        if (this.is_array(input)) {
            
            r = Array();
            
            for (i in input) {
            	
            	if (input[i] != undefined) {
                
	                if (search_value != null) {
	                    
	                    if (search_value.toString() == input[i].toString()) {
	                        r[x] = i;
	                        x++;
	                    }
	                    
	                }
	                else {
	                    r[x] = i;
	                    x++;
	                }
                
            	}
                    
            }
            
        }
     
        return r;        
    };
    
    this.array_merge = function () {
    	
    	var type, len, arr;
    	var index = 0;
    	var r = new Object();
    	var x = 0;
    	var key;

    	for (x = 0, len = arguments.length; x < len; x++) {
    		
    		arr  = arguments[x];
    		type = this.gettype(arr);
    		
    		if (type == "array" || type == "object") {
    			
    			for (var y in arr) {
    				key    = type == "object" ? y : index;
    				r[key] = arr[y];
    				index++;
    			}
    			
    		}
    		
    	}
    	
    	return r;
    };

/** int array_search(mixed_needle, array_haystack);
 * retorna a chave se encontrar o valor mixed no array e retorna -1 caso contrario */
	this.array_search = function (mixed_needle, array_haystack, case_sensitive) {
		
		var aux  = -1;
		var type = this.gettype(array_haystack);
		
		case_sensitive = case_sensitive ? case_sensitive : true;
		mixed_needle   = mixed_needle != undefined ? mixed_needle.toString() : '';

		if (type == "array" || type == "object") {
		
			for (var x in array_haystack) {

				if (array_haystack[x] != undefined) {

					if (case_sensitive == false) {

						if (array_haystack[x].toString().toLowerCase() == mixed_needle.toLowerCase()) {
							aux = x;
							break;
						}

					}
					else {

						if (array_haystack[x].toString() == mixed_needle) {
							aux = x;
							break;
						}

					}

				}

			}
		
		}

		return aux;
	};

	this.array_shift = function (array) {
		
		var first  = true;
		var type   = this.gettype(array);
		var result = type == 'object' ? new Object() : new Array();
		
		if (type == 'array' || type == 'object') {
			
			for (var x in array) {
				
				if (first == false) {
					result[x] = array[x];
				}
				
				first = false;
			}
			
		}
		
		return result;
	};
	
	this.array_sum = function (array) {
		
		var sum  = 0;
		var type = this.gettype(array);
		
		if (type == 'array' || type == 'object') {
			
			for (var x in array) {
				sum += this.floatval(array[x]);
			}
			
		}
	
		return sum;
	};
	
/** array array_unique(array); retira os valores duplicados do array */
	this.array_unique = function (array) {

		var aux = Array();
		var len = this.count(array);
		var x;

		  for (x = 0; x < len; x++) {

			  if (!this.in_array(array[x], aux)) {
				aux[x] = array[x];
			  }

		  }

		return aux;
	};
	
	this.array_values = function (input) {
	    
	    var r = false;
	    var x = 0;
	    var i = "";

	    if (this.is_array(input)) {
	        
	        r = Array();
	        
	        for (i in input) {
	            r[x] = input[i];
	            x++;
	        }
	        
	    }
	 
        return r;
	};

    this.checkdate = function (month, day, year) {
        
        month = this.intval(month);
        day   = this.intval(day);
        year  = this.intval(year);      
        
        var meses_impar  = [1,3,5,7,8,10,12];
        var bissexto_fim = 28;
        
        if (day >= 1 && day <= 31) {
            
            if (month >= 1 && month <= 12) {
                
                if (month == 2) {
                    
                    if (year % 4 == 0) {
                        
                        if (year % 100 == 0) {
                    
                            if (year % 400 == 0) {
                                bissexto_fim = 29;
                            }
                        
                        }
                        else {
                            bissexto_fim = 29;
                        }                           

                    }   
                    
                    if (day <= bissexto_fim) {
                        return true;
                    }
                    
                }
                else {
                    
                    if ((this.in_array(month, meses_impar) == true) || (this.in_array(month, meses_impar) == false && day != 31)) {
                        return true;
                    }
                    
                }
                
            }
            
        }           
        
        return false;
    };

	this.chr = function (codepoint) {
		return this.chars[codepoint];
	};

/** int count(array); */
	this.count = function (array) {
	    
	    if (this.is_array(array)) {
	        return array.length;
	    }
	    
		return 0;
	};

	this.date = function (format, timestamp) {
		
		var date_isLetter = function (c) {
			
			var validos1, validos2, validos3, validos4, validos5, validos, k;
			
			validos1 = php.range(48, 57);
			validos2 = php.range(65, 90);
			validos3 = php.range(97, 122);
			validos4 = php.range(128, 159);
			validos5 = php.range(161, 255);
			validos  = php.array_merge(validos1, validos2, validos3, validos4, validos5);
			
			c = c.toString();
			k = php.array_search(c, php.chars);

			if (k != -1) {
				
				if (php.in_array(k, validos)) {
					return true;
				}
				
			}
			
			return false;
		};
		
		var date, args, d, x, len, c, bissexto;
		var $month, $year, $hour;
		
		format   = format ? format : "";
		date     = "";
		args     = new Object();
		d        = this.getdate(timestamp);
		bissexto = false;
		$month   = parseInt(d["mon"]);
		$year    = parseInt(d["year"]);
		$hour    = parseInt(d["hours"]);

		if ($month == 2) {
			
			if ($year % 4 == 0) {
				
				if ($year % 100 == 0) {
					
					if ($year % 400 == 0) {                    
						bissexto = true;
					}

				}
				else {
					bissexto = true;
				}
				
			}
			
		}
		
		args["F"] = d["month"];
		args["l"] = d["weekday"];		
		args["D"] = d["weekday"] ? d["weekday"].toString().substr(0, 3) : "";
		args["M"] = d["month"] ? d["month"].toString().substr(0, 3) : "";
		
		args["w"] = d["wday"];
		args["j"] = d["mday"];
		args["n"] = d["mon"];

		args["d"] = this.str_pad(d["mday"], 2, "0");
		args["m"] = this.str_pad(d["mon"], 2, "0");
		args["Y"] = this.str_pad(d["year"], 4, "0");
		args["G"] = d["hours"];
		args["H"] = this.str_pad(d["hours"], 2, "0");
		args["i"] = this.str_pad(d["minutes"], 2, "0");
		args["s"] = this.str_pad(d["seconds"], 2, "0");
		args["y"] = args["Y"].substr(2, 2);
		args["N"] = d["wday"] == 0 ? 7 : d["wday"];
		args["t"] = bissexto == true && $month == 2 ? 29 : this.daysInMonth[$month - 1];
		args["L"] = bissexto == true ? 1 : 0;
		args["a"] = $hour >= 0 && $hour <= 11 ? "am" : "pm";
		args["A"] = args["a"].toUpperCase();
		args["g"] = ($hour == 0 ? 12 : ($hour > 12 ? $hour - 12 : $hour)); // hora de 1 a 12 sem zero a esquerda
		args["h"] = this.str_pad(args["g"], 2, "0");

		if (d["mday"] == 1 || d["mday"] == 21 || d["mday"] == 31) {
			args["S"] = "st";
		}
		else if (d["mday"] == 2 || d["mday"] == 22) {
			args["S"] = "nd";
		}
		else if (d["mday"] == 3 || d["mday"] == 23) {
			args["S"] = "rd";
		}
		else {
			args["S"] = "th";
		}
		
		var ant, pos;
		
		for (x = 0, len = format.length; x < len; x++) {
			
			c   = format.substr(x, 1);
			ant = x > 0 ? format.substr((x-1), 1) : "";
			pos = format.substr((x+1), 1);
			
			if (this.isset(args[c]) && date_isLetter(ant) == false && date_isLetter(pos) == false) {
				date += args[c];
			}
			else {
				date += c;
			}
			
		}

		return date;
	};

/** void echo(); */
    this.echo = function () {

        var x, len;

          for (x = 0, len = arguments.length; x < len; x++) {
            this.print(arguments[x]);
          }

    };
    
    this.empty = function ($var) {

    	var $type  = this.gettype($var);
    	var $empty = false;
    	
    	if ($type == "array") {
    		$empty = ($var.length == 0);
    	}
    	else if ($type == "boolean") {
    		$empty = ($var == false);
    	}
    	else if ($type == "NULL") {
    		$empty = true;
    	}
    	else if ($type == "double" || $type == "integer") {
    		$empty = ($var == 0);
    	}
    	else if ($type == "string") {
    		$empty = ($var.length == 0 || $var == "0");
    	}
    	
    	return $empty;
    };

/** string ereg(pattern, string); */
    this.ereg = function (pattern, string) {
        
        pattern = pattern != undefined ? pattern.toString() : '';
        string  = string  != undefined ? string.toString() : '';

        var len  = this.strlen(string);
        var plen = this.strlen(pattern);
        var ok   = false;
        var x;

          for (x = 0; x < len; x++) {

              if (string.substr(x, plen) == pattern) {
                ok = true;
                break;
              }

          }

         return ok;
    };
    
/** string eregi(pattern, string); */
    this.eregi = function (pattern, string) {
        
        pattern = pattern != undefined ? pattern.toString() : '';
        string  = string  != undefined ? string.toString() : '';

        var len  = this.strlen(string);
        var plen = this.strlen(pattern);
        var ok   = false;
        var x;

          for (x = 0; x < len; x++) {

              if (string.substr(x, plen).toLowerCase() == pattern.toLowerCase()) {
                ok = true;
                break;
              }

          }

         return ok;
    };

/** array explode(separator, str); */
    this.explode = function (separator, str) {
        
        str = str != undefined ? str.toString() : '';

        var out  = Array();
        var slen = this.strlen(separator);
        var len  = this.strlen(str);
        var i    = 0;
        var j    = 0;       
        var aux  = "";
        
          for (i = 0; i < len; i++) {

           	  if (str.substr(i, slen) == separator) {
                out[j] = aux;
                aux = "";
                j++;
                i += slen - 1;
              }
              else {
                aux += str.substr(i, 1);
              }

          }
          
          if (aux.length > 0) {
        	  out[j] = aux;
        	  j++;
          }
          
          if (len >= slen) {
        	  
        	  if (separator == str.substr(slen * -1)) {
        		  out[j] = "";
        	  }
        	  
          }

        return out;
    };

/** float floatval($var); */
    this.floatval = function ($var) {
        
    	var ok = false;
    	
    	if (this.isset($var) == true) {
    		
    		if (typeof($var) == "number") {
    			$var = $var.toString();
    		}
			
    		if (typeof($var) == "string") {
    			ok = true;
    		}

		}
    	
        if (ok == true) {
             
        	$var = this.trim($var);
        	var validos = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
        	var len     = this.strlen($var.toString());
            var aux     = '';
            var neg     = $var.substr(0, 1) == '-' ? true : false;
            var ini     = neg ? 1 : 0;
            var add     = len == (neg ? 2 : 1) ? true : false;
            var x, c;
            
            for (x = ini; x < len; x++) {
                
                c = $var.substr(x, 1);
                
                if (this.in_array(c, validos) == true) {
                	
                	if (c != '0') {
        				add = true;
        			}
        			
        			if (add == true) {
        				aux += c;
        			}
                	
                }
                else {
                	break;
                }
                
            }
            
            if (aux != "") {
            	
            	aux = parseFloat(this.sprintf("%s%s", (neg ? '-' : ''), aux));
            	
            	if (!isNaN(aux)) {
            		return aux;
            	}

            }

        }

        return 0;
    };

	this.get_object_vars = function (obj) {
		
		var aux = new Array();
		var i = 0;
		var x = "";
		
		if (this.is_object(obj)) {
			
			for (x in obj) {
				
				if (this.isset(obj[x]) == true) {
					aux[i] = x;
					i++;
				}

			}
			
		}
		
		return aux;
	};    
    
    this.getdate = function (timestamp) {

		if (timestamp == undefined) {
			timestamp = this.mktime();		
		}

		var date   = new Date(timestamp);			
		var object = new Object();

		object["seconds"] = date.getSeconds();
		object["minutes"] = date.getMinutes();
		object["hours"]   = date.getHours();
		object["mday"]    = date.getDate();
		object["wday"]    = date.getDay();
		object["mon"]     = date.getMonth() + 1;
		object["year"]    = date.getFullYear();
		object["yday"]    = -1;
		object["weekday"] = this.weekday[object["wday"]];
		object["month"]   = this.months[object["mon"] - 1];
		object["0"]       = timestamp;

		return object;
    };

/** mixed gettype($var);
 * Get the type of a variable */
    this.gettype = function ($var) {
    	
    	var $type = typeof($var);
    	
    	if ($var !== undefined) {
    		
    		if ($type == "number") {
    			$type = ($var.toString().indexOf(".") != -1 ? "double" : "integer");
    		}
    		else if ($type == "object") {
    			
    			if ($var === null) {
    				$type = "NULL";
    			}
    			else {
    				
    				if ($var instanceof Object && $var instanceof Array) {
    					$type = "array";
    				}
    				
    			}
    			
    		}
    		
    	}
    	else {
    		$type = "";
    	}
    	
    	return $type;
    };

/** string implode(string glue, array peaces); */
    this.implode = function (glue, peaces) {

        var first = true;
        var str   = "";
        var key   = "";

		for (key in peaces) {
			str  += (first == true ? "" : glue) + "" + peaces[key];
			first = false;
		}

        return str;
    };
    
/** bool in_array(mixed_needle, array); */
    this.in_array = function (mixed_needle, array_haystack) {
        return (this.array_search(mixed_needle, array_haystack) == -1 ? false : true);
    };

/** int intval($var); */
    this.intval = function ($var) {
        
    	var ok = false;
    	
    	if (this.isset($var) == true) {
    		
    		if (typeof($var) == "number") {
    			$var = $var.toString();
    		}
			
    		if (typeof($var) == "string") {
    			ok = true;
    		}

		}
    	
        if (ok == true) {
             
        	$var = this.trim($var);
        	var validos = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        	var len     = this.strlen($var.toString());
            var aux     = '';
            var neg     = $var.substr(0, 1) == '-' ? true : false;
            var ini     = neg ? 1 : 0;
            var add     = len == (neg ? 2 : 1) ? true : false;
            var x, c;
            
            for (x = ini; x < len; x++) {
                
                c = $var.substr(x, 1);
                
                if (this.in_array(c, validos) == true) {
                	
                	if (c != '0') {
        				add = true;
        			}
        			
        			if (add == true) {
        				aux += c;
        			}
                	
                }
                else {
                	break;
                }
                
            }
            
            if (aux != "") {
            	
            	aux = parseInt(this.sprintf("%s%s", (neg ? '-' : ''), aux));
            	
            	if (!isNaN(aux)) {
            		return aux;
            	}
            	
            }

        }

        return 0;
    };

/** bool is_array($var); */
    this.is_array = function ($var) {
    	
   		if ($var instanceof Object) {
    		
   			if ($var instanceof Array) {
   				return true;
       		}
    			
    	}
    	
    	return false;
    };

    this.is_null = function ($var) {
    	var type = this.gettype($var);
    	return (type == "undefined" || type == "NULL" ? true : false);
    };    
    
/** bool is_numeric(value); */
    this.is_numeric = function (value) {

    	if (this.isset(value) == true) {
    		
    		if (typeof(value) == "number") {
   				
    			if (value < 0) {
    				return true;
    			}

    			value = value.toString();
    		}
			
    		if (typeof(value) == "string") {
			
				if (value != "." && value != "-") {
				
					var validos  = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "-"];
					var len      = this.strlen(value);
					var aux      = "";
					var qt_valid = 0;
					var qt_traco = 0;
					var $char    = "";
					var x;
					
					if (len > 0) {

						for( x = 0; x < len; x++) {

							$char = value.substr(x, 1);
							
							if (this.in_array($char, validos) == true) {
								aux += $char;
								qt_valid++;
							}

						}

						if (qt_valid == len) {
							
							qt_traco = this.substr_count(aux, "-", 0);
							
							if (this.substr_count(aux, ".", 0) < 2 && qt_traco < 2) {
								
								if (qt_traco == 1) {
									
									if (aux.substr(0, 1) != "-") {
										return false;
									}
									
								}
								
								return true;
							}
							
						}

					}
				
				}
			
			}

		}

        return false;
    };

/** bool is_object($var); */
    this.is_object = function ($var) {
    	
   		if (typeof($var) == "object") {
    		
   			if ($var instanceof Object) {
    		
   				if ($var instanceof Array) {
   					return false;
   				}

   				return true;
   			}

   		}

    	return false;
    };    
    
/** bool is_string($var); */
    this.is_string = function ($var) {
    	return (this.gettype($var) == "string" ? true : false);
    };
    
    this.isset = function ($var) {
    	var type = this.gettype($var);
    	return (type == "" || type == "NULL" ? false : true);
    };

/** string join(string glue, array peaces); an Alias for implode */
    this.join = function (glue, peaces) {
    	return this.implode(glue, peaces);
    };

/** string ltrim(string str, [string charlist]); */
    this.ltrim = function (str, charlist) {
    	
    	var ltrim_process = function (str, charlist) {

    		str      = str.toString();
    		charlist = charlist.toString();

    		var clen = php.strlen(charlist);

    		if (clen > 0) {

    			if (php.strpos(charlist, str.substr(0, 1)) !== false) {
    			
    				do {
    					str = str.substr(1);
    				}
    				while (php.strpos(charlist, str.substr(0, 1)) !== false);
    			
    			}

    		}
    		
    		return str;
    	};

    	if (charlist === undefined) {
    		charlist = " ";
    	}
    	else {
    		charlist = charlist.toString();
    	}

		return ltrim_process(str, charlist);
    };    
    
    this.mktime = function (hour, min, sec, mon, day, year) {
    	
    	var now, date, f;
    	
    	now  = new Date();

    	hour = hour != undefined ? hour : now.getHours();
    	min  = min  != undefined ? min  : now.getMinutes();
    	sec  = sec  != undefined ? sec  : now.getSeconds();
    	mon  = mon  != undefined ? mon  : now.getMonth() + 1;
    	day  = day  != undefined ? day  : now.getDate();
    	year = year != undefined ? year : now.getFullYear();
    	
    	f    = this.sprintf("%s/%s/%s %s:%s:%s", mon, day, year, hour, min, sec);
    	date = new Date(f);
    	
    	return date.getTime();
    };    

    this.print_r = function ($var, $return) {
    
        var print_r_type = function (obj) {
            
            if (obj === null || obj === undefined || obj === false) {
                str = "";
            }
            else if (obj === true) {
                str = "1";
            }
            else {
                str = obj.toString();
            }

            return str;
        };
        
        var print_r_format = function (obj, cur_depth, pad_val, pad_char) {
    
            if (cur_depth > 0) {
                cur_depth++;
            }
    
            var base_pad  = php.str_repeat(pad_char, pad_val * cur_depth);
            var thick_pad = php.str_repeat(pad_char, pad_val * (cur_depth + 1));
            var str = "";
            
            if (typeof(obj) == "object") {

            	if (obj instanceof Array || obj instanceof Object) {
            
                	str += "" + (obj instanceof Array ? "Array" : "Object") + " (\n" + base_pad + "\n";
            
                	for (var key in obj) {
            
                    	if (obj[key] instanceof Array || obj[key] instanceof Object) {
                        	str += thick_pad + "[" + key + "] => " + print_r_format(obj[key], cur_depth + 1, pad_val, pad_char);
                    	}
                    	else {
                        	str += thick_pad + "[" + key + "] => " + print_r_type(obj[key]) + "\n";
                    	}
            
                	}
            
                	str += base_pad + ")\n\n";
            	}
            	else {
            		str = print_r_type(obj);
            	}
            
            }
            else {
                str = print_r_type(obj);
            }
            
            return str;
        };

        var pad_char = " ";
        var pad_val  = 4;
        var output   = this.sprintf("<pre>%s</pre>", print_r_format($var, 0, pad_val, pad_char));
    
        if ($return !== true) {
            this.print(output);
            return true;
        }
    
    	return output;
    };    

   this.print = function (s) {
        document.write(s);
    };

/** void printf(string_format, arg0, arg1...); */
    this.printf = function () {
    	
    	var string_format = arguments[0];
    	var array_args    = Array();
    	var len = arguments.length;
    	var i = 0;
    	var x;
    	
    	for (x = 1; x < len; x++) {
   			array_args[i] = arguments[x];
    		i++;
    	}
    	
    	this.echo(this.vsprintf(string_format, array_args));
    };

/** array range(low, high, [int step]); */
	this.range = function (low, high, step) {
		
		low  = low.toString();
		high = high.toString();
		step = step ? step : 1;

		var aux = [];
		var i   = 0;
		var ok  = false;
		var use = false;
		var x;
		
		if (typeof(low) == "string" && typeof(high) == "string") {
			
			var chars = this.chars;
			var start, end;

			start = this.array_search(low, chars);
			end   = this.array_search(high, chars);

			if (start != -1 && end != -1) {
				ok  = true;
				use = true;
			}
			else {
				
				if (this.is_numeric(low) && this.is_numeric(high)) {
					start = parseInt(low);
					end   = parseInt(high);
					ok    = true;
				}
				
			}
			
			if (ok == true) {

				if (start > end) {
					
					for (x = start; x >= end; x-= step) {
						aux[i] = (use == true ? chars[x] : x);
						i++;
					}
					
				}
				else {
	
					for (x = start; x <= end; x+= step) {
						aux[i] = (use == true ? chars[x] : x);
						i++;
					}
					
				}
			
			}

		}

		return aux;		
	};
	
	this.rtrim = function (str, charlist) {
		
		var len = arguments.length;
		
		if (len == 2) {
			str = this.strrev(this.ltrim(this.strrev(str), charlist));
		}
		else if (len == 1) {
			str = this.strrev(this.ltrim(this.strrev(str)));
		}
		
		return str;
	};
	
/** int sizeof(array); */
	this.sizeof = function (array) {
		return this.count(array);
	};

/** string sprintf(string_format, arg0, arg1...); */
    this.sprintf = function () {

    	var string_format = arguments[0];
    	var array_args    = Array();
    	var len = arguments.length;
    	var i = 0;
    	var x;
    	
    	for (x = 1; x < len; x++) {
    		array_args[i] = arguments[x];
    		i++;
    	}
    	
    	return this.vsprintf(string_format, array_args);
    };
    
    this.str_pad = function (input, pad_length, pad_string, pad_type) {

        input      = input ? input.toString() : "";
        pad_length = parseInt(pad_length);
        pad_string = pad_string != undefined ? pad_string.toString().substr(0, 1) : "";
        pad_type   = pad_type ? pad_type : "PAD_LEFT";
        
        var len = pad_length - input.length;
        var aux = this.str_repeat(pad_string, len);
        
		if (this.strpos(pad_type.toUpperCase(), "BOTH") !== false) {
			return this.sprintf("%s%s%s", aux, input, aux);
		}
		else {

        	if (this.strpos(pad_type.toUpperCase(), "RIGHT") !== false) {
            	return this.sprintf("%s%s", input, aux);
        	}

			return this.sprintf("%s%s", aux, input);
		}

    };

    this.str_repeat = function (input, mult) {
    
        input = input ? input.toString() : "";
        mult  = parseInt(mult);
    
        var i;
        var s = "";
    
        for (i = 0; i < mult; i++) {
            s += input;
        }
    
        return s;
    };

/** Replace all occurrences of the search string with the replacement string */
	this.str_replace = function ($search, $replace, $subject) {
		
		if (this.is_array($search)) {
			
			var $rtype = this.gettype($replace);
			var $count = 0;
			
			for (var $i in $search) {
				
				if ($rtype == "array") {
					
					if (this.isset($replace[$count])) {
						$subject = this.str_replace($search[$i].toString(), $replace[$count], $subject);
					}
					
				}
				else if ($rtype == "string") {
					$subject = this.str_replace($search[$i].toString(), $replace, $subject);
				}

				$count++;
			}
			
		}
		else {
			
			$search  = $search.toString();
			$subject = $subject.toString();
			
			var $rtype = this.gettype($replace);
			var $count = 0;
			
			if ($search != "") {
			
				if ($rtype == "array") {
					
					var $rlen = this.count($replace);
					
					if ($rlen > 0) {
						
						while ($subject.indexOf($search) != -1) {
							
							if ($count < $rlen) {
								$subject = $subject.replace($search, $replace[$count]);
							}
							else {
								break;
							}
							
							$count++;
						}
						
					}
					
				}
				else if ($rtype == "string") {
				
					while ($subject.indexOf($search) != -1) {
						$subject = $subject.replace($search, $replace);
					}
					
				}
			
			}
			
		}
		
		return $subject;
	};

/** int strlen(str); */
    this.strlen = function (str) {
        
        if (typeof(str) == "number") {
        	str = str.toString();
        }
        
        if (typeof(str) == "string") {
            return str.length;
        }
        
        return 0;
    };

    this.stripos = function (haystack, needle) {
        haystack = haystack ? haystack.toString().toLowerCase() : "";
        needle   = needle   ? needle.toString().toLowerCase() : "";
        return this.strpos(haystack, needle);
    };

    this.strpos = function (haystack, needle) {
        
        haystack = haystack ? haystack.toString() : "";
        needle   = needle   ? needle.toString() : "";
        
        var hlen = haystack.length;
        var nlen = needle.length;
        var x;
        
        for (x = 0; x < hlen; x++) {
            
            if (haystack.substr(x, nlen) == needle) {            
                return x;
            }
            
        }
        
        return false;
    };
    
    this.strripos = function (haystack, needle) {
        haystack = haystack ? haystack.toString().toLowerCase() : "";
        needle   = needle   ? needle.toString().toLowerCase() : "";
        return this.strrpos(haystack, needle);    	
    };
    
    this.strrpos = function (haystack, needle) {

        haystack = haystack ? haystack.toString() : "";
        needle   = needle   ? needle.toString() : "";
        
        var hlen = haystack.length;
        var nlen = needle.length;
        var x, y;
        
        for (x = hlen; x > 0; x--) {
            
        	y = x - 1;
        	
            if (haystack.substr(y, nlen) == needle) {            
                return y;
            }
            
        }
        
        return false;
    };

/** string strrev(string); */
    this.strrev = function (string) {
        
        string  = string != undefined ? string : '';
        string  = string.toString();        
        
        var len = this.strlen(string) - 1;
        var aux = "";
        var x;

          for (x=len;x>=0;x--) {
              
              if (string.substr(x, 1) != undefined) {
                  aux += string.substr(x, 1);
              }
            
          }

        return aux;
    };
    
    this.strtolower = function (str) {
    	
    	if (this.is_string(str) == true) {
    		return str.toLowerCase();
    	}
    	
    	return "";
    };
    
    this.strtoupper = function (str) {
    	
    	if (this.is_string(str) == true) {
    		return str.toUpperCase();
    	}
    	
    	return "";
    };
/**
string substr(string str, int start [, int length])
Returns part of a string */
    this.substr = function (string_str, int_start, int_length) {
    	
    	if (this.is_string(string_str) == true) {
    		
    		if (this.is_numeric(int_length) == true) {
    			return string_str.substr(this.intval(int_start), this.intval(int_length));
    		}
    		
    		return string_str.substr(this.intval(int_start));
    		
    	}
    	
    	return "";
    };
/**
substr_count($haystack, $needle, $offset, $length) 
Count the number of substring occurrences*/
    this.substr_count = function (haystack, needle, offset, length) {
    	
    	var count = 0;
    	var hlen, nlen, x, aux;
    	
    	if (this.is_string(haystack) == true && this.is_string(needle) == true) {

    		hlen   = haystack.length;
    		nlen   = needle.length;
    		offset = typeof(offset) ? offset : 0;
    		length = typeof(length) ? length : 0;
    		offset = (offset < (hlen - 1) ? offset : hlen);
    		length = (length > 0 && length < hlen ? length : hlen);
    		
    		if (offset > length) {
    			aux    = offset;
    			offset = length;
    			length = aux;
    		}
    		
    		for (x = offset; x < length; x++) {
    			
    			if (haystack.substr(x, nlen) == needle) {
    				count++;
    			}
    			
    		}
    		
    	}
    	
    	return count;
    };
    
/** string trim(string str, [string charlist]); */
	this.trim = function (str, charlist) {
		
		var len = arguments.length;
		
		if (len == 2) {
			str = this.ltrim(str, charlist);
			str = this.rtrim(str, charlist);
		}
		else if (len == 1) {
			str = this.ltrim(str);
			str = this.rtrim(str);
		}
		
		return str;
	};
	
	this.ucfirst = function (str) {
		
		if (this.is_string(str)) {
			str = this.trim(str);		
			return str.substr(0, 1).toUpperCase() + "" + str.substr(1).toLowerCase();
		}
		
		return "";	
	};
	
	this.ucwords = function (str) {
		
		if (this.is_string(str)) {
		
			var arr = this.explode(" ", str);
			var aux = Array();
			var x   = "";
		
			for (x in arr) {
				aux[x] = this.ucfirst(arr[x]);
			}
			
			return this.implode(" ", aux);
		}
		
		return "";
	};
	
	this.var_dump = function ($expression, $return) {
		
		var var_dump_type = function ($expression) {
		
			var type = typeof($expression);
			
			if ($expression === null) {
				return 'NULL';
			}
			else if ($expression === undefined) {
				return 'undefined';
			}
			
			if (type == "object") {
				
				if (php.is_array($expression)) {
					return php.sprintf("array(%s)", php.count(php.array_keys($expression)));
				}
				else if (php.is_object($expression)) {
					return php.sprintf("object(Object)#1 (%s)", php.count(php.get_object_vars($expression)));
				}
				
			}
			else if (type == "boolean") {
				return php.sprintf('%s(%s)', type, $expression);
			}
			else if (type == "number") {
				
				$expression = $expression.toString();
				type = ($expression.indexOf(".") != -1 ? "float" : "int");
				
				return php.sprintf('%s(%s)', type, $expression);
			}
			else if (type == "string") {
				return php.sprintf('%s(%s) "%s"', type, $expression.length, $expression);
			}
			
			return $expression;
		};
		
		var var_dump_value = function ($expression) {
			
			var type = typeof($expression);
			
			if (type == "number") {
				return $expression;
			}
			else if (type == "string") {
				
				if (php.is_numeric($expression)) {
					return $expression;
				}
				
				return php.sprintf('"%s"', $expression);
			}
			
			return null;
		};
		
		var var_dump_format = function (obj, cur_depth, pad_val, pad_char) {

            if (cur_depth > 0) {
                cur_depth++;
            }
    
            var base_pad  = php.str_repeat(pad_char, pad_val * cur_depth);
            var thick_pad = php.str_repeat(pad_char, pad_val * (cur_depth + 2));
            var type      = php.gettype(obj);
            var str       = "";

            if (type == "array" || type == "object") {

            	str += php.sprintf("\n%s%s {\n", base_pad, var_dump_type(obj), base_pad);

            	for (var key in obj) {

            		if (obj[key] != undefined) {

            			type = php.gettype(obj[key]);

            			if (type == "array" || type == "object") {
            				str += php.sprintf("%s[%s]=>%s", thick_pad, var_dump_value(key), var_dump_format(obj[key], cur_depth + 1, pad_val, pad_char));
            			}
            			else {
            				str += php.sprintf("%s[%s]=>\n%s%s\n", thick_pad, var_dump_value(key), thick_pad, var_dump_type(obj[key]));
            			}

            		}

            	}

            	str += base_pad + "}\n";
            }
            else {
            	str = var_dump_type(obj);
            }
            
            return str;
		};

		$return = $return == undefined ? false : $return;
		$return = $return ? true : false;
		
		var pad_char = " ";
		var pad_val  = 1;		
		var output   = this.sprintf("<pre>%s</pre>", var_dump_format($expression, 0, pad_val, pad_char));
		
		if ($return == true) {
			return output;
		}

		this.print(output);
	};

/** int vprintf(string_format, array_args) */
	this.vprintf = function (string_format, array_args) {
		this.echo(this.strlen(this.vsprintf(string_format, array_args)));
	};
	
/** string vsprintf(string_format, array_args) */	
	this.vsprintf = function (string_format, array_args) {

        var len    = string_format.length;
        var count  = array_args.length;
        var simbol = "%s"; 
		var sblen  = simbol.length;
        var i      = 0;
        var s      = "";
        var x;
        
        if (count > 0) {
        
   	        for (x = 0; x < len; x++) {
   	        	
                if (string_format.substr(x, sblen).toLowerCase() == simbol) {
           	    	s += array_args[i];
					x += sblen - 1;
       	            i++;
   	            }
                else {
           	        s += string_format.substr(x, 1);
       	        }
   	        	
   	        }               

        	for (x = 0; x < count; x++) {
        		s = this.str_replace("{" + x + "}", array_args[x], s);
        	}
        
        	string_format = s;
        }
        
        return string_format;
	};
	
}

var php = new PHP();
