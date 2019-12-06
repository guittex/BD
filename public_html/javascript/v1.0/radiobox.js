
flex.RadioBox = function () {

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
	this.getSelected = function () {return flex.getString(this.args["selected"]);};
	this.getOnClick = function () {return flex.getString(this.args["onclick"]);};
	this.getVertical = function () {return flex.getBoolean(this.args["vertical"]);};
				
	this.setOptions = function () {
		this.args["options"] = flex.getArray(arguments[0]);
	};
	
	this.setName = function () {
		this.args["name"] = flex.getString(arguments[0]);
	};
	
	this.setId = function () {
		this.args["id"] = flex.getString(arguments[0]);
	};
	
	this.setSelected = function () {
		this.args["selected"] = flex.getString(arguments[0]);
	};
	
	this.setOnClick = function () {
		this.args["onclick"] = flex.getString(arguments[0]);
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

	this.render = function (div_name) {

		div_name = div_name != undefined ? div_name : this.div_name;

		if (util.o(div_name)) {
			util.setText(div_name, this.retorno);
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

	this.selectedIndex = function (arg) {
		
		if (arg != undefined) {
			this.sindex = flex.getNumber(arg);
		}
		else {		
			return flex.getNumber(this.sindex);
		}
		
	};
	
	this.selectedValue = function (arg) {

		if (arg != undefined) {
			
			var x, len;
			var options = this.getOptions();
			
			arg = flex.getString(arg);
			
			for (x = 0, len = options.length; x < len; x++) {
				
				if (arg == options[x].value) {
					options[x].checked(true);
					options[x].click();
					options[x].out();
					break;
				}
				
			}
			
		}
		else {
			
			if (this.selectedIndex() > -1) {
				return flex.getString(this.getOptions(this.selectedIndex()).value);
			}

			return null;
		}
		
	};
	
	this.selectedText = function (arg) {
		
		if (arg != undefined) {
			
			var x, len;
			var options = this.getOptions();
			
			arg = flex.getString(arg);
			
			for (x = 0, len = options.length; x < len; x++) {
				
				if (arg == options[x].text) {
					options[x].checked(true);
					options[x].click();
					options[x].out();
					break;
				}
				
			}
			
		}
		else {
			
			if (this.selectedIndex() > -1) {
				return flex.getString(this.getOptions(this.selectedIndex()).text);
			}
			
			return null;
		}
		
	};
	
	this.checked = function (arg) {
		
		if (arg != undefined) {
			
			if (this.selectedIndex() > -1) {
				this.getOptions(this.selectedIndex()).checked(arg);
			}
			
		}
		else {
			
			if (this.selectedIndex() > -1) {
				return this.getOptions(this.selectedIndex()).checked();
			}
			
			return false;
		}
		
	};
	
	this.disabled = function (arg) {
		
		if (arg != undefined) {
			
			if (this.selectedIndex() > -1) {
				this.getOptions(this.selectedIndex()).disabled(arg);
			}

		}
		else {
			
			if (this.selectedIndex() > -1) {
				return this.getOptions(this.selectedIndex()).disabled();
			}
			
			return false;
		}
		
	};
	
	this.enableAll = function () {
		
		var options = this.getOptions();
		
		for (var i = 0, len = options.length; i < len; i++) {
			options[i].disabled(false);
		}
		
	};
	
	this.disableAll = function () {
		
		var options = this.getOptions();
		
		for (var i = 0, len = options.length; i < len; i++) {
			options[i].disabled(true);
		}
		
	};

	// INICIO

	this.args = new Object();
	
	this.setOptions(arguments[0]);
	this.setName(arguments[1]);
	this.setId(arguments[2]);
	this.setSelected(arguments[3]);
	this.setOnClick(arguments[4]);
	this.setVertical(arguments[5]);

	this.title = "RadioBox";
	
	if (this.doValidate() == true) {
		
		var arr  = Array();
		var novo = Array();
		var opt  = this.getOptions();
		var len  = opt.length;
		var x;

		this.image_src    = flex.image_src;
		this.image_width  = 12;
		this.image_height = 12;
		this.div_name     = php.sprintf("div_%s", this.getId());
		this.parent_name  = php.sprintf("parent_%s", this.getId());
		
		this.img_checked_disabled = "radiobox_checked[disabled].gif";
		this.img_checked_over     = "radiobox_checked[over].gif";
		this.img_checked_out      = "radiobox_checked[out].gif";
		
		this.img_disabled         = "radiobox[disabled].gif";
		this.img_down             = "radiobox[down].gif";
		this.img_over             = "radiobox[over].gif";
		this.img_out              = "radiobox[out].gif";

		this.img_checked_disabled = php.sprintf("%s/%s", this.image_src, this.img_checked_disabled);
		this.img_checked_over     = php.sprintf("%s/%s", this.image_src, this.img_checked_over);
		this.img_checked_out      = php.sprintf("%s/%s", this.image_src, this.img_checked_out);
		this.img_disabled         = php.sprintf("%s/%s", this.image_src, this.img_disabled);
		this.img_down             = php.sprintf("%s/%s", this.image_src, this.img_down);
		this.img_over             = php.sprintf("%s/%s", this.image_src, this.img_over);
		this.img_out              = php.sprintf("%s/%s", this.image_src, this.img_out);

		for (x = 0; x < len; x++) {

			if (php.in_array(opt[x].value, arr) == false) {
				arr[arr.length]   = opt[x].value;
				novo[novo.length] = opt[x];
			}
			
		}
		
		this.setOptions(novo);
		
		opt  = this.getOptions();
		len  = opt.length;

		this.selectedIndex(-1);

		for (x = 0; x < len; x++) {
			
			if (this.getSelected() == opt[x].value) {
				this.selectedIndex(x);
				this.args.options[x]._checked = true;
			}
			else {
				this.args.options[x]._checked = false;
			}

			this.args.options[x].index     = x;
			this.args.options[x].parent    = this;
			this.args.options[x]._disabled = false;
			
			this.args.options[x].setText = function (new_text) {
				
				this.text = new_text;
				
				var optionIndex = this.index;
				var obj_main    = this.parent;
				var obj_label, aux_index;

				if (obj_main.getVertical()) {
					aux_index = (optionIndex + 1) * 2;
					obj_label = util.o(obj_main.parent_name).getElementsByTagName("table")[0].rows[0].cells[aux_index-1];
				}
				else {
					obj_label = util.o(obj_main.parent_name).getElementsByTagName("table")[0].rows[optionIndex].cells[1];
				}
				
				obj_label.innerHTML = this.text;
			
			};
			
			this.args.options[x].checked = function (arg) {
				
				if (arg != undefined) {
					
					if (this.disabled() == false) {
					
						this._checked = flex.getBoolean(arg);

						var optionIndex = this.index;
						var obj_main    = this.parent;
						
						if (obj_main.selectedIndex() > -1) {

							var obj_checked = obj_main.getOptions(obj_main.selectedIndex());
							var st_aux      = obj_checked.disabled();
						
							if (optionIndex != obj_checked.index) {
								
								if (obj_checked.checked()) {
									
									obj_checked._checked = false;
									obj_main.selectedIndex(-1);
									
									if (util.o(obj_main.getId())) {
										util.o(obj_main.parent_name).removeChild(util.o(obj_main.getId()));
									}
									
								}
								
								if (st_aux == true) {
									obj_checked.disabled(false);
									obj_checked.out();
									obj_checked.disabled(true);
								}
								else {
									obj_checked.out();
								}
								
							}
						
						}
						
						if (this.checked()) {

							obj_main.selectedIndex(optionIndex);

							if (!util.o(obj_main.getId())) {
								
								var obj = document.createElement("input");
								
								obj.setAttribute("type", "hidden");
								obj.setAttribute("name", obj_main.getName());
								obj.setAttribute("id", obj_main.getId());
								obj.setAttribute("value", obj_main.selectedValue());
								
								util.o(obj_main.parent_name).appendChild(obj);
							}
							
						}
						else {

							obj_main.selectedIndex(-1);

							if (util.o(obj_main.getId())) {
								util.o(obj_main.parent_name).removeChild(util.o(obj_main.getId()));
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
					
					obj_img.src          = (this.disabled() ? (this.checked() ? obj_main.img_checked_disabled : obj_main.img_disabled) : (this.checked() ? obj_main.img_checked_out : obj_main.img_out));
					obj_label.className  = (this.disabled() ? "flex_disabled" : (this.checked() ? "radio_down_left" : "radio_out_left"));
					obj_label2.className = (this.disabled() ? "flex_disabled" : (this.checked() ? "radio_down_right" : "radio_out_right"));
				}
				else {
					return flex.getBoolean(this._disabled);
				}
				
			};

			this.args.options[x].down = function () {
				
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
					
					if (this.checked() == true) {
						obj_img.src          = obj_main.img_down;
						obj_label.className  = "radio_down_left";
						obj_label2.className = "radio_down_right";
					}
					else {
						obj_img.src          = obj_main.img_over;
						obj_label.className  = "radio_over_left";
						obj_label2.className = "radio_over_right";
					}
					
				}
				
			};

			this.args.options[x].up = function () {
				this.over();
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
					
					obj_img.src          = (this.checked() ? obj_main.img_checked_over : obj_main.img_over);
					obj_label.className  = "radio_over_left";
					obj_label2.className = "radio_over_right";
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
					
					obj_img.src          = (this.checked() ? obj_main.img_checked_out : obj_main.img_out);
					obj_label.className  = (this.checked() ? "radio_down_left" : "radio_out_left");
					obj_label2.className = (this.checked() ? "radio_down_right" : "radio_out_right");
				}
				
			};

			this.args.options[x].click = function () {

				if (this.disabled() == false) {
					
//					var optionIndex = this.index;
					var obj_main    = this.parent;

					this.checked(true);
					this.over();
					
					if (obj_main.getOnClick() != "") {
						setTimeout(obj_main.getOnClick(), 0);
					}
				
				}
				
			};

		}
		
		this.retorno  = "";
		this.retorno += php.sprintf('<div id="%s">', this.parent_name);
		
		for (x = 0; x < len; x++) {
			
			this.onmousedown = php.sprintf("flex.get%s('%s').getOptions(%s).down();", this.title, this.getId(), x);
			this.onmouseup   = php.sprintf("flex.get%s('%s').getOptions(%s).up();", this.title, this.getId(), x);
			this.onmouseover = php.sprintf("flex.get%s('%s').getOptions(%s).over();", this.title, this.getId(), x);
			this.onmouseout  = php.sprintf("flex.get%s('%s').getOptions(%s).out();", this.title, this.getId(), x);
			this.onclick     = php.sprintf("flex.get%s('%s').getOptions(%s).click();", this.title, this.getId(), x);

			if (x == 0) {
				
				if (this.checked()) {
					this.retorno += "<input ";
					this.retorno += 'type="hidden" ';
					this.retorno += php.sprintf('name="%s" ', this.getName());
					this.retorno += php.sprintf('id="%s" ', this.getId());
					this.retorno += php.sprintf('value="%s" ', this.selectedValue());
					this.retorno += " />";
				}

				this.retorno += '<table style="width:100%;">';
				this.retorno += this.getVertical() ? "<tr>" : "";
			}

			if (!this.getVertical()) {
				this.retorno += "<tr>";
			}
			
			this.retorno += '<td style="width:16px; height:20px;" align="center" ';
			this.retorno += php.sprintf('class="%s" ', (this.getOptions(x).disabled() ? "flex_disabled" : (this.getOptions(x).checked() ? "radio_down_left" : "radio_out_left")));
			this.retorno += php.sprintf('onmousedown="%s" ', this.onmousedown);
			this.retorno += php.sprintf('onmouseup="%s" ', this.onmouseup);
			this.retorno += php.sprintf('onmouseover="%s" ', this.onmouseover);
			this.retorno += php.sprintf('onmouseout="%s" ', this.onmouseout);
			this.retorno += php.sprintf('onclick="%s" ', this.onclick);
			this.retorno += ">";
			
			this.retorno += "<img ";
			this.retorno += php.sprintf('src="%s" ', (this.getOptions(x).disabled() ? (this.getOptions(x).checked() ? this.img_checked_disabled : this.img_disabled) : (this.getOptions(x).checked() ? this.img_checked_out : this.img_out)));
			this.retorno += php.sprintf('style="width:%spx; height:%spx;" ', this.image_width, this.image_height);
			this.retorno += php.sprintf('onmousedown="%s" ', this.onmousedown);
			this.retorno += php.sprintf('onmouseup="%s" ', this.onmouseup);
			this.retorno += php.sprintf('onmouseover="%s" ', this.onmouseover);
			this.retorno += php.sprintf('onmouseout="%s" ', this.onmouseout);
			this.retorno += php.sprintf('onclick="%s" ', this.onclick);
			this.retorno += " />";
			this.retorno += "</td>";

			this.retorno += '<td style="padding-left:4px; padding-right:4px;" ';
			this.retorno += php.sprintf('class="%s" ', (this.getOptions(x).disabled() ? "flex_disabled" : (this.getOptions(x).checked() ? "radio_down_right" : "radio_out_right")));
			this.retorno += php.sprintf('onmousedown="%s" ', this.onmousedown);
			this.retorno += php.sprintf('onmouseup="%s" ', this.onmouseup);
			this.retorno += php.sprintf('onmouseover="%s" ', this.onmouseover);
			this.retorno += php.sprintf('onmouseout="%s" ', this.onmouseout);
			this.retorno += php.sprintf('onclick="%s" ', this.onclick);
			this.retorno += ">";
			this.retorno += opt[x].text;
			this.retorno += (!this.getVertical() ? "</td></tr>" : "&nbsp;&nbsp;");
		}
		
		this.retorno += this.getVertical() ? "</tr>" : "";
		this.retorno += "</table>";
		this.retorno += "</div>";
		
		flex.setElement(this.title, this);
	}
	else {
		flex.showError(this);
	}

};
