
function Util() {
	
	this.getBrowser = function () {
		
		var $nav = navigator.userAgent.toString();
		
		if ($nav.indexOf("Chrome") != -1) {
			$nav = "chrome";
		}
		else if ($nav.indexOf("Firefox") != -1) {
			$nav = "firefox";
		}
		else {
			$nav = "";
		}
		
		return $nav;
	};
	
	this.accessValid = function () {
		return (this.getBrowser() != "");
	};
    
    this.doShowResult = function (id_retorno, id_aux) {
        
        id_retorno = id_retorno ? id_retorno : "div_retorno";
        id_aux     = id_aux ? id_aux : "div_aux";
        
        var obj_retorno = this.o(id_retorno);
        var obj_aux     = this.o(id_aux);
//      var obj_grid    = top.datagrid ? top.datagrid : datagrid;
        
        if (obj_retorno) {
            
            if (obj_aux) {
                obj_retorno.innerHTML = obj_aux.innerHTML;
                obj_aux.innerHTML = "";
            }
            else {
                alert(php.sprintf(lang.translate(31), id_aux));
            }
            
        }
        else {
        	alert(php.sprintf(lang.translate(31), id_retorno));
        }

    };

    this.doShowMessage = function (msg) {
    	this.doShowError(msg, "div_sucesso", "sucesso");
    };
    
    this.doShowError = function (error, div_id, className) {
        
    	className = className ? className : "erro";
    	div_id = div_id ? div_id : "div_error";
        var obj = this.o(div_id);
        
        if (obj) {
            obj.innerHTML = php.sprintf('<table style="width:%s;"><tr><td class="' + className + '">%s</td></tr></table>', '100%', error);
        }
        else {
            alert(php.sprintf(lang.translate(31), div_id));
        }
        
    };
    
	this.add_evento = function (id, evType, fn) {
	
		var obj = this.o(id);
		
		if (obj.addEventListener) {
			obj.addEventListener(evType, fn, true);
		}
		
		if (obj.attachEvent) {
			obj.attachEvent("on" + evType, fn);
		}
		
	};
	
	this.o = function (id) {
		
		var obj = null;
		
		if (typeof(id) == "object") {
			obj = id;
		}
		else {
		
			if (top.document.getElementById(id)) {
		    	obj = top.document.getElementById(id);
			}
        	else {
        	
        		if (document.getElementById(id)) {
            		obj = document.getElementById(id);
            	}

        	}
        
		}

		return obj;
	};
	
	this.isHide = function (id) {
		return (this.getDisplay(id) == "none" ? true : false);
	};
	
	this.show = function (id) {
		this.setDisplay(id, "");
	};
	
	this.hide = function (id) {
		this.setDisplay(id, "none");
	};
	
	this.show_hide = function (id) {
		(this.isHide(id) == true ? this.show(id) : this.hide(id));
	};
	
	this.setValue = function (id, value) {
		this.o(id).value = value;
	};
	
	this.setText = function (id, value) {
		this.o(id).innerHTML = value;
	};
	
	this.setDisplay = function (id, value) {
		this.o(id).style.display = value;
	};
	
	this.setWidth = function (id, value) {
		this.o(id).style.width = value;
	};
	
	this.setHeight = function (id, value) {
		this.o(id).style.height = value;
	};
	
	this.setLeft = function (id, value) {
		this.o(id).style.left = value;
	};
	
	this.setTop = function (id, value) {
		this.o(id).style.top = value;
	};
	
	this.getValue = function (id) {
		return this.o(id).value;
	};
	
	this.getText = function (id) {
		return this.o(id).innerHTML;
	};
	
	this.getDisplay = function (id) {
		return this.o(id).style.display;
	};
	
	this.getWidth = function (id) {
		return this.o(id).style.width;
	};
	
	this.getHeight = function (id) {
		return this.o(id).style.height;
	};
	
	this.getLeft = function (id) {
		return this.o(id).style.left;
	};
	
	this.getTop = function (id) {
		return this.o(id).style.top;
	};
	
	this.setOpacity = function (id, value) {

		var obj = null;
		
		if (typeof(id) == "string") {
			obj = this.o(id);
		}
		else if (typeof(id) == "object") {
			obj = id;
		}

		obj.style.opacity = (value * 0.01);
		obj.style.filter = "alpha(opacity = " + value + ")";
	};
	
	this.eh_data = function (data) {
	
		data = data.toString();
		
		if (php.strlen(data) == 10) {

			if (data.substr(2, 1) == '/' && data.substr(5, 1) == '/') {

				var d = data.substr(0, 2);
				var m = data.substr(3, 2);
				var y = data.substr(6, 4);
			
				if (php.is_numeric(d) && php.is_numeric(m) && php.is_numeric(y)) {
					return php.checkdate(m, d, y);
				}
				
			}
			
		}
		
		return false;
	};

	this.date_compare = function (date1, date2) {
	
		var a = parseInt(date1.substr(6, 4) + '' + date1.substr(3, 2) + '' + date1.substr(0, 2));
		var b = parseInt(date2.substr(6, 4) + '' + date2.substr(3, 2) + '' + date2.substr(0, 2));
		
		return (a > b ? true : false);
	};
	
	this.getStringNumbers = function ($string) {
		
		var $aux = '';
		var $x, $len;
		
		for ($x = 0, $len = php.strlen($string); $x < $len; $x++) {
			
			$c = php.substr($string, $x, 1);
			
			if (php.is_numeric($c)) {
				$aux += $c;
			}
			
		}
		
		return $aux;
	};
	
	this.getFormat = function (flex_obj, format) {
		
		var tecla = gevent;
//		var type  = typeof(id);
		var str   = "";
		var len   = 0;
		
		if (flex_obj) {

			str = this.getStringNumbers(flex_obj.getValue());
			len = str.length;
			r   = str;
			
			if (!php.in_array(tecla, [8, 9, 13, 27])) {

				if (format == "DATA") {
					
					if (len >= 1 && len <= 8) {
						
						if (len >= 5 && len <= 8) {
							r = str.substr(0, 2) + '/' + str.substr(2, 2) + '/' + str.substr(4);
						}
						else if (len == 4) {
							r = str.substr(0, 2) + '/' + str.substr(2, 2) + '/';
						}
						else if (len == 3) {
							r = str.substr(0, 2) + '/' + str.substr(2, 1);
						}
						else if (len == 2) {
							r = str.substr(0, 2) + '/';
						}
						else if (len == 1) {
							r = str.substr(0, 1);
						}
						
					}
					
				}
				else if (format == "CNPJ") {
					
					if (len >= 1 && len <= 14) {
						
						if (len == 2) {
							r = str.substr(0, 2) + '.';
						}
						else if (len == 3) {
							r = str.substr(0, 2) + '.' + str.substr(2, 1);
						}
						else if (len == 4) {
							r = str.substr(0, 2) + '.' + str.substr(2, 2);
						}
						else if (len == 5) {
							r = str.substr(0, 2) + '.' + str.substr(2, 3) + '.';
						}			
						else if (len == 6) {
							r = str.substr(0, 2) + '.' + str.substr(2, 3) + '.' + str.substr(5, 1);
						}
						else if (len == 7) {
							r = str.substr(0, 2) + '.' + str.substr(2, 3) + '.' + str.substr(5, 2);
						}
						else if (len == 8) {
							r = str.substr(0, 2) + '.' + str.substr(2, 3) + '.' + str.substr(5, 3) + '/';
						}
						else if (len == 9) {
							r = str.substr(0, 2) + '.' + str.substr(2, 3) + '.' + str.substr(5, 3) + '/' + str.substr(8, 1);
						}
						else if (len == 10) {
							r = str.substr(0, 2) + '.' + str.substr(2, 3) + '.' + str.substr(5, 3) + '/' + str.substr(8, 2);
						}			
						else if (len == 11) {
							r = str.substr(0, 2) + '.' + str.substr(2, 3) + '.' + str.substr(5, 3) + '/' + str.substr(8, 3);
						}
						else if (len == 12) {
							r = str.substr(0, 2) + '.' + str.substr(2, 3) + '.' + str.substr(5, 3) + '/' + str.substr(8, 4) + '-';
						}
						else if (len == 13) {
							r = str.substr(0, 2) + '.' + str.substr(2, 3) + '.' + str.substr(5, 3) + '/' + str.substr(8, 4) + '-' + str.substr(12, 1);
						}
						else if (len == 14) {
							r = str.substr(0, 2) + '.' + str.substr(2, 3) + '.' + str.substr(5, 3) + '/' + str.substr(8, 4) + '-' + str.substr(12, 2);
						}
					
					}
					
				}
				else if (format == "CPF") {

					if (len >= 1 && len <= 11) {
						
						if (len == 3) {
							r = str.substr(0, 3) + '.';
						}
						else if (len == 4) {
							r = str.substr(0, 3) + '.' + str.substr(3, 1);
						}
						else if (len == 5) {
							r = str.substr(0, 3) + '.' + str.substr(3, 2);
						}
						else if (len == 6) {
							r = str.substr(0, 3) + '.' + str.substr(3, 3) + '.';
						}			
						else if (len == 7) {
							r = str.substr(0, 3) + '.' + str.substr(3, 3) + '.' + str.substr(6, 1);
						}
						else if (len == 8) {
							r = str.substr(0, 3) + '.' + str.substr(3, 3) + '.' + str.substr(6, 2);
						}
						else if (len == 9) {
							r = str.substr(0, 3) + '.' + str.substr(3, 3) + '.' + str.substr(6, 3) + '-';
						}
						else if (len == 10) {
							r = str.substr(0, 3) + '.' + str.substr(3, 3) + '.' + str.substr(6, 3) + '-' + str.substr(9, 1);
						}
						else if (len == 11) {
							r = str.substr(0, 3) + '.' + str.substr(3, 3) + '.' + str.substr(6, 3) + '-' + str.substr(9, 2);
						}			
					
					}

				}
				else if (format == "PHONE") {
				
					if (len >= 1 && len <= 10) {
						
						if (len == 1) {
							r = "(" + str.substr(0, 1);
						}
						else if (len == 2) {
							r = "(" + str.substr(0, 2) + ")";
						}
						else if (len == 3) {
							r = "(" + str.substr(0, 2) + ") " + str.substr(2, 1);
						}
						else if (len == 4) {
							r = "(" + str.substr(0, 2) + ") " + str.substr(2, 2);
						}
						else if (len == 5) {
							r = "(" + str.substr(0, 2) + ") " + str.substr(2, 3);
						}
						else if (len == 6) {
							r = "(" + str.substr(0, 2) + ") " + str.substr(2, 4) + "-";
						}
						else if (len == 7) {
							r = "(" + str.substr(0, 2) + ") " + str.substr(2, 4) + "-" + str.substr(6, 1);
						}
						else if (len == 8) {
							r = "(" + str.substr(0, 2) + ") " + str.substr(2, 4) + "-" + str.substr(6, 2);
						}
						else if (len == 9) {
							r = "(" + str.substr(0, 2) + ") " + str.substr(2, 4) + "-" + str.substr(6, 3);
						}
						else if (len == 10) {
							r = "(" + str.substr(0, 2) + ") " + str.substr(2, 4) + "-" + str.substr(6, 4);
						}
						
					}
				
				}
				else if (format == "DECIMAL") {
					
					if (len == 0) {
						r = 0;
					}
					else if (len > 0 && len <= 11) {
						
						if (len >= 3) {
							
							var money = str.substr(0, (len - 2));
							var cents = str.substr(-2, 2);
							var len_m = money.length;
							var len_c = cents.length;
							
							if (len_c == 0) {
								cents = "00";
							}
							else if (len_c == 1) {
								cents += "0";
							}
							
							if (len_m == 4) {
								money = money.substr(0, 1) + "." + money.substr(1, 3);
							}
							else if (len_m == 5) {
								money = money.substr(0, 2) + "." + money.substr(2, 3);
							}
							else if (len_m == 6) {
								money = money.substr(0, 3) + "." + money.substr(3, 3);
							}
							else if (len_m == 7) {
								money = money.substr(0, 1) + "." + money.substr(1, 3) + "." + money.substr(4, 3);
							}
							else if (len_m == 8) {
								money = money.substr(0, 2) + "." + money.substr(2, 3) + "." + money.substr(5, 3);
							}
							else if (len_m == 9) {
								money = money.substr(0, 3) + "." + money.substr(3, 3) + "." + money.substr(6, 3);
							}
							else if (len_m == 10) {
								money = money.substr(0, 1) + "." + money.substr(1, 3) + "." + money.substr(4, 3) + "." + money.substr(7, 3);
							}
							else if (len_m == 11) {
								money = money.substr(0, 2) + "." + money.substr(2, 3) + "." + money.substr(5, 3) + "." + money.substr(8, 3);
							}
							else if (len_m == 12) {
								money = money.substr(0, 3) + "." + money.substr(3, 3) + "." + money.substr(6, 3) + "." + money.substr(9, 3);
							}
							
							r = money + "," + cents;
						}
						
					}	
				
				}
			
				return r;
			}
			
			return flex_obj.getValue();
		}
		
		return null;
	};
	
	this.doFormatar = function (flex_obj, format) {
		flex_obj.setValue(util.o(flex_obj.getId()).value);
		flex_obj.setValue(this.getFormat(flex_obj, format));
	};
	
	this.doFormatarCNPJ = function (flex_obj) {
		this.doFormatar(flex_obj, "CNPJ");
	};
	
	this.doFormatarCPF = function (flex_obj) {
		this.doFormatar(flex_obj, "CPF");
	};
	
	this.doFormatarTelefone = function (flex_obj) {
		this.doFormatar(flex_obj, "PHONE");
	};
	
	this.doFormatarValor = function (flex_obj) {
		this.doFormatar(flex_obj, "DECIMAL");
	};
	
	this.doFormatarData = function (flex_obj) {
		this.doFormatar(flex_obj, "DATA");
	};

/** retorna a tupla da matriz 'haystack' e coluna 'needle' */
	this.getTuple = function (needle, haystack) {
		
		var tuple = new Array();
		
		for (var x in haystack) {
			tuple[x] = haystack[x][needle];
		}
		
		return tuple;
	};
	
	this.getWeek = function (v) {
		
		var arr  = [32, 33, 34, 35, 36, 37, 38];
		var week = [];
		var x;
		
		for (x = 0; x < 7; x++) {
			week[x] = lang.translate(arr[x]);
		}
		
		if (v != undefined) {
			return week[v];
		}
		
		return week;
	};
    
}	

function ProgressBar(id, msg) {

	this.id          = id;
	this.msg         = msg;
	this.parent_name = this.id + "_pb_parent";
	this.label_name  = this.id + "_pb_label";

    this.show = function (id) {
        util.show(this.parent_name);
    };

    this.hide = function (id) {
        util.hide(this.parent_name);
    };
    
    this.update = function () {

		var args_len = arguments.length;
		var width, index, total;

		if (args_len == 1) {
			width = parseInt(arguments[0]);
		}
		else if (args_len == 2) {
			index = arguments[0];
			total = arguments[1];
			width = Math.ceil((100 * index) / total);
		}
		else {
			width = 0;
		}

        width = (width < 100 ? width : 100) + "%";

        util.setWidth(this.id, width);
        util.setText(this.label_name, width);
    };
    
    this.render = function (div_name) {
        
        var s = "";
        
        this.msg = this.msg ? this.msg : lang.translate(27);
        
        s += '<br />';
        s += '<table id="' + this.parent_name + '" style="width:50%;" align="center">';
        s += '<tr>';
        s += '<td style="border-top:1px solid #B2B2B2; border-bottom:1px solid #8C8C8C; border-left:1px solid #9B9B9B; border-right:1px solid #9B9B9B;">';
        s += '<table id="' + this.id + '" style="width:0%;"><tr><td style="height:13px; background-image:url(../imagens/loading.gif);"></td></tr></table>';
        s += '</td>';
        s += '</tr>';
        s += '<tr><td><div align="center">' + this.msg + ', ' + lang.translate(28) + '<br /><span id="' + this.label_name + '">0%</span> concluído.</div></td></tr>';
        s += '</table>';
        
        if (div_name && util.o(div_name)) {
        	util.setText(div_name, s);	
        }
        else {
        	document.write(s);
        }
        
    };

}

var util = new Util();
