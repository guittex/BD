
flex.CheckBox = function () {

	// INICIO BEAN

	this.getOptions = function (index) {
		
		var a = flex.getArray(this.args["options"]);
		
		if (index != undefined) {
			return a[index];
		}
		
		return a;
	};
	
	this.getName = function () {return flex.getString(this.args["name"]);};
	this.getId = function () {return flex.getString(this.args["id"]);};
	this.getVertical = function () {return flex.getBoolean(this.args["vertical"]);};
				
	this.setOptions = function () {
		this.args["options"] = flex.getArray(arguments[0]); // value, text, checked e disabled
	};
	
	this.setName = function () {
		this.args["name"] = flex.getString(arguments[0]);
	};
	
	this.setId = function () {
		this.args["id"] = flex.getString(arguments[0]);
	};
	
	this.setVertical = function () {
		this.args["vertical"] = flex.getBoolean(arguments[0]);
	};
	
	// FIM BEAN
	
	this.show = function () {
		util.show(this.parent_name);
	};
	
	this.hide = function () {
		util.hide(this.parent_name);	
	};

	this.render = function () {

		if (util.o(this.div_name)) {
			util.setText(this.div_name, this.retorno);
		}
		else {
			php.echo(this.retorno);
		}

	};
	
	this.doValidate = function () {
		
		this.err = [];

		if (php.empty(this.getName()) == true) {
			this.err[0] = "atributo name não informado.";
		}
		
		if (php.empty(this.getId()) == true) {
			this.err[1] = "atributo id não informado.";
		}
		else {
		
			if (util.o(this.getId())) {
				this.err[1] = php.sprintf("Objeto com id(%s) já existe!", this.getId());
			}
		
		}
		
		return (this.err.length == 0);
	};
	
	this.checkAll = function (_bool) {
		
		var x, opt, len;
		
		_bool = _bool != undefined ? flex.getBoolean(_bool) : true;
		opt   = this.getOptions();
		len   = opt.length;
		
		for (x = 0; x < len; x++) {
			opt[x].checked(_bool);			
		}
		
	};
	
	this.disableAll = function (_bool) {

		var x, opt, len;
		
		_bool = _bool != undefined ? flex.getBoolean(_bool) : true;
		opt   = this.getOptions();
		len   = opt.length;
		
		for (x = 0; x < len; x++) {
			opt[x].disabled(_bool);			
		}

	};
	
	this.anySelected = function () {
		
		var x, opt, len, ret;

		opt = this.getOptions();
		len = opt.length;
		ret = false;

		for (x = 0; x < len; x++) {
				
			if (opt[x].checked()) {
				ret = true;
				break;
			}
							
		}
		
		return ret;
	};
	
	this.selectedValue = function (v) {
		
		if (v != undefined) {

			var x, opt, len;

			opt = this.getOptions();
			len = opt.length;

			for (x = 0; x < len; x++) {
				
				if (v == opt[x].value) {
					opt[x].checked(true);
					break;
				}
							
			}
			
		}
		
	};
	
	this.selectedText = function (v) {

		if (v != undefined) {

			var x, opt, len;

			opt = this.getOptions();
			len = opt.length;

			for (x = 0; x < len; x++) {
				
				if (v == opt[x].text) {
					opt[x].checked(true);
					break;
				}
							
			}
			
		}

	};

	// INICIO

	this.args = new Object();
	
	this.setOptions(arguments[0]);
	this.setName(arguments[1]);
	this.setId(arguments[2]);
	this.setVertical(arguments[3]);
	this.args.onclick = flex.getBoolean(arguments[4]);

	this.title = "CheckBox";
	
	if (this.doValidate() == true) {
		
//		var arr  = Array();
//		var novo = Array();
		var opt  = this.getOptions();
		var len  = opt.length;
		var x;

		this.image_src    = flex.image_src;
		this.image_width  = 13;
		this.image_height = 13;
		this.div_name     = php.sprintf("div_%s", this.getId());
		this.parent_name  = php.sprintf("parent_%s", this.getId());
		
		this.img_checked_disabled = "checkbox_checked[disabled].gif";
		this.img_checked_over     = "checkbox_checked[over].gif";
		this.img_checked_out      = "checkbox_checked[out].gif";
		
		this.img_disabled         = "checkbox[disabled].gif";
		this.img_over             = "checkbox[over].gif";
		this.img_out              = "checkbox[out].gif";

		this.img_checked_disabled = php.sprintf("%s/%s", this.image_src, this.img_checked_disabled);
		this.img_checked_over     = php.sprintf("%s/%s", this.image_src, this.img_checked_over);
		this.img_checked_out      = php.sprintf("%s/%s", this.image_src, this.img_checked_out);
		this.img_disabled         = php.sprintf("%s/%s", this.image_src, this.img_disabled);
		this.img_over             = php.sprintf("%s/%s", this.image_src, this.img_over);
		this.img_out              = php.sprintf("%s/%s", this.image_src, this.img_out);

		for (x = 0; x < len; x++) {
			this.args.options[x]._checked  = flex.getBoolean(this.args.options[x].checked);
			this.args.options[x]._disabled = flex.getBoolean(this.args.options[x].disabled);
			this.args.options[x].index     = x;
			this.args.options[x].parent    = this;

			this.args.options[x].getName = function () {
				return (php.sprintf("%s[%s]", this.parent.getName(), this.index));
			};

			this.args.options[x].getId = function () {
				return (php.sprintf("%s[%s]", this.parent.getId(), this.index));
			};

			this.args.options[x].checked = function (arg) {
				
				if (arg != undefined) {
					
					if (this.disabled() == false) {
					
						this._checked = flex.getBoolean(arg);

//						var optionIndex = this.index;
						var obj_main    = this.parent;
						
						if (this.checked()) {
							
							if (!util.o(this.getId())) {
								
								var obj = document.createElement("input");
								
								obj.setAttribute("type", "hidden");
								obj.setAttribute("name", this.getName());
								obj.setAttribute("id", this.getId());
								obj.setAttribute("value", this.value);

								util.o(obj_main.parent_name).appendChild(obj);
							}
							
						}
						else {

							if (util.o(this.getId())) {
								util.o(obj_main.parent_name).removeChild(util.o(this.getId()));
							}

						}

						this.out();
					}

				}
				else {
					return flex.getBoolean(this._checked);
				}
				
			};

			this.args.options[x].disabled = function (arg) {
				
				if (arg != undefined) {

					var optionIndex = this.index;
					var obj_main    = this.parent;
					var obj_img, obj_label, obj_label2, aux_index;

					this._disabled = flex.getBoolean(arg);

					if (obj_main.getVertical()) {
						aux_index  = (optionIndex + 1) * 2;
						obj_img    = util.o(obj_main.parent_name).getElementsByTagName("table")[0].rows[0].cells[aux_index-2].getElementsByTagName("img")[0];
						obj_label  = util.o(obj_main.parent_name).getElementsByTagName("table")[0].rows[0].cells[aux_index-2];
						obj_label2 = util.o(obj_main.parent_name).getElementsByTagName("table")[0].rows[0].cells[aux_index-1];
					}
					else {
						obj_img    = util.o(obj_main.parent_name).getElementsByTagName("table")[0].rows[optionIndex].cells[0].getElementsByTagName("img")[0];
						obj_label  = util.o(obj_main.parent_name).getElementsByTagName("table")[0].rows[optionIndex].cells[0];
						obj_label2 = util.o(obj_main.parent_name).getElementsByTagName("table")[0].rows[optionIndex].cells[1];
					}
					
					obj_img.src = (this.disabled() ? (this.checked() ? obj_main.img_checked_disabled : obj_main.img_disabled) : (this.checked() ? obj_main.img_checked_out : obj_main.img_out));
					
					if (this.text) {
					
						if (obj_label) {
							obj_label.className = (this.disabled() ? "flex_disabled" : "radio_out_left");
						}

						if (obj_label2) {
							obj_label2.className = (this.disabled() ? "flex_disabled" : "radio_out_right");
						}
						
					}

				}
				else {
					return flex.getBoolean(this._disabled);
				}
				
			};

			this.args.options[x].over = function () {
				
				if (this.disabled() == false) {
					
					var optionIndex = this.index;
					var obj_main    = this.parent;
					var obj_img, obj_label, obj_label2, aux_index;

					if (obj_main.getVertical()) {
						aux_index  = (optionIndex + 1) * 2;
						obj_img    = util.o(obj_main.parent_name).getElementsByTagName("table")[0].rows[0].cells[aux_index-2].getElementsByTagName("img")[0];
						obj_label  = util.o(obj_main.parent_name).getElementsByTagName("table")[0].rows[0].cells[aux_index-2];
						obj_label2 = util.o(obj_main.parent_name).getElementsByTagName("table")[0].rows[0].cells[aux_index-1];
					}
					else {
						obj_img    = util.o(obj_main.parent_name).getElementsByTagName("table")[0].rows[optionIndex].cells[0].getElementsByTagName("img")[0];
						obj_label  = util.o(obj_main.parent_name).getElementsByTagName("table")[0].rows[optionIndex].cells[0];
						obj_label2 = util.o(obj_main.parent_name).getElementsByTagName("table")[0].rows[optionIndex].cells[1];
					}
					
					obj_img.src = (this.checked() ? obj_main.img_checked_over : obj_main.img_over);
					
					if (this.text) {
					
						if (obj_label) {
							obj_label.className = "radio_over_left";
						}

						if (obj_label2) {
							obj_label2.className = "radio_over_right";
						}

					}

				}
				
			};
			
			this.args.options[x].out = function () {

				if (this.disabled() == false) {
					
					var optionIndex = this.index;
					var obj_main    = this.parent;
					var obj_img, obj_label, obj_label2, aux_index;

					if (obj_main.getVertical()) {
						aux_index  = (optionIndex + 1) * 2;
						obj_img    = util.o(obj_main.parent_name).getElementsByTagName("table")[0].rows[0].cells[aux_index-2].getElementsByTagName("img")[0];
						obj_label  = util.o(obj_main.parent_name).getElementsByTagName("table")[0].rows[0].cells[aux_index-2];
						obj_label2 = util.o(obj_main.parent_name).getElementsByTagName("table")[0].rows[0].cells[aux_index-1];
					}
					else {
						obj_img    = util.o(obj_main.parent_name).getElementsByTagName("table")[0].rows[optionIndex].cells[0].getElementsByTagName("img")[0];
						obj_label  = util.o(obj_main.parent_name).getElementsByTagName("table")[0].rows[optionIndex].cells[0];
						obj_label2 = util.o(obj_main.parent_name).getElementsByTagName("table")[0].rows[optionIndex].cells[1];
					}
					
					obj_img.src = (this.checked() ? obj_main.img_checked_out : obj_main.img_out);
					
					if (this.text) {
					
						if (obj_label) {
							obj_label.className = "radio_out_left";
						}
					
						if (obj_label2) {
							obj_label2.className = "radio_out_right";
						}

					}

				}
				
			};

			this.args.options[x].click = function () {

				if (this.disabled() == false) {
					
					var optionIndex = this.index;
					var obj_main    = this.parent;
	
					this.checked((this.checked() ? false : true));
					this.over();
					
					if (obj_main.args.onclick) {
						var $var = php.str_replace('[', '_', php.str_replace(']', '', php.ucwords(php.strtolower(obj_main.getName()))));
						setTimeout(php.sprintf("%s_Click(%s, flex.getCheckBox('%s'));", $var, optionIndex, obj_main.getId()), 0);
					}
				
				}
				
			};

		}
		
		this.retorno  = "";
		this.retorno += php.sprintf('<div id="%s">', this.parent_name);
		this.retorno += '<table style="width:100%;">';
		this.retorno += (this.getVertical() ? '<tr>' : "");
		
		for (x = 0; x < len; x++) {
			
			this.onmouseover = php.sprintf("flex.get%s('%s').getOptions(%s).over();", this.title, this.getId(), x);
			this.onmouseout  = php.sprintf("flex.get%s('%s').getOptions(%s).out();", this.title, this.getId(), x);
			this.onclick     = php.sprintf("flex.get%s('%s').getOptions(%s).click();", this.title, this.getId(), x);

			if (this.args.options[x].disabled() == true) {
				
				if (this.args.options[x].checked() == true) {
					this.img = this.img_checked_disabled;
				}
				else {
					this.img = this.img_disabled;
				}
				
				this._class  = "flex_disabled";
				this._class2 = "flex_disabled";
			}
			else {
				
				if (this.args.options[x].checked() == true) {
					this.img = this.img_checked_out;
				}
				else {
					this.img     = this.img_out;
					this._class  = "radio_out_left";
					this._class2 = "radio_out_right";
				}

			}
			
			this.retorno += (!this.getVertical() ? '<tr>' : "");
			this.retorno += '<td style="width:17px; height:22px;" align="center" ';
			this.retorno += php.sprintf('class="%s" ', this._class);
			this.retorno += php.sprintf('onmouseover="%s" ', this.onmouseover);
			this.retorno += php.sprintf('onmouseout="%s" ', this.onmouseout);
			this.retorno += '>';

			if (this.args.options[x].checked() == true) {
				this.retorno += php.sprintf("<input ");
				this.retorno += php.sprintf('type="%s"', "hidden");
				this.retorno += php.sprintf('name="%s"', this.args.options[x].getName());
				this.retorno += php.sprintf('id="%s"', this.args.options[x].getId());
				this.retorno += php.sprintf('value="%s"', this.args.options[x].value);
				this.retorno += php.sprintf(" />");
			}
			
			this.retorno += "<img ";
			this.retorno += php.sprintf('src="%s" ', this.img);
			this.retorno += php.sprintf('style="width:%spx; height:%spx;" ', this.image_width, this.image_height);
			this.retorno += php.sprintf('onmouseover="%s" ', this.onmouseover);
			this.retorno += php.sprintf('onmouseout="%s" ', this.onmouseout);
			this.retorno += php.sprintf('onclick="%s" ', this.onclick);
			this.retorno += " />";

			this.retorno += '</td>';
			this.retorno += '<td style="padding-left:4px; padding-right:4px;" nowrap ';
			this.retorno += php.sprintf('class="%s" ', this._class2);
			this.retorno += php.sprintf('onmouseover="%s" ', this.onmouseover);
			this.retorno += php.sprintf('onmouseout="%s" ', this.onmouseout);
			this.retorno += php.sprintf('onclick="%s" ', this.onclick);
			this.retorno += '>';
			
			if (opt[x].text) {
				this.retorno += opt[x].text;
			}

			this.retorno += "</td>";
			this.retorno += (!this.getVertical() ? '</tr>' : "");
		}
		
		this.retorno += (this.getVertical() ? '</tr>' : "");
		this.retorno += "</table>";
		this.retorno += "</div>";
		
		flex.setElement(this.title, this);
	}
	else {
		flex.showError(this);
	}

};
