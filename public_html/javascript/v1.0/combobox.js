
flex.ComboBox = function () {

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
	this.getSize = function () {return flex.getString(this.args["size"]);};
	this.getOnClick = function () {return flex.getString(this.args["onclick"]);};
	this.getDisabled = function () {return flex.getBoolean(this.args["disabled"]);};
				
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
	
	this.setSize = function () {
		this.args["size"] = flex.getString(arguments[0]);
	};
	
	this.setOnClick = function () {
		this.args["onclick"] = flex.getString(arguments[0]);
	};
	
	this.setDisabled = function () {
		this.args["disabled"] = flex.getBoolean(arguments[0]);
	};
	
	// FIM BEAN
	
	this.show = function () {
		util.show(this.parent_name);
	};
	
	this.hide = function () {
		util.hide(this.parent_name);	
	};

	this.render = function () {

		var arr  = Array();
		var novo = Array();
//		var tams = Array();
		var opt  = this.getOptions();
		var len  = opt.length;
		var x;

		this.closed        = true;
		this.line_height   = 22;
		this.list_time     = 2;
		this.image_src     = flex.image_src;
		this.imager_width  = 27;
		this.image_width   = 3;
		this.image_height  = 26;
		this.div_name      = php.sprintf("div_%s", this.getId());
		this.parent_name   = php.sprintf("parent_%s", this.getId());
		this.label_name    = php.sprintf("label_%s", this.getId());
		
		this.img_left_disabled   = "field_left.png";
		this.img_middle_disabled = "field_middle.png";
		this.img_right_disabled  = "combo.right.disabled.png";
		this.img_left_down       = "field_left_on.png";
		this.img_middle_down     = "field_middle_on.png";
		this.img_right_down      = "combo.right.down.png";
		this.img_left_focus      = "field_left_on.png";
		this.img_middle_focus    = "field_middle_on.png";
		this.img_right_focus     = "combo.right.down.png";
		this.img_left_over       = "field_left_on.png";
		this.img_middle_over     = "field_middle_on.png";
		this.img_right_over      = "combo.right.down.png";
		this.img_left_out        = "field_left.png";
		this.img_middle_out      = "field_middle.png";
		this.img_right_out       = "combo.right.out.png";
		this.img_arrow           = "arrow.gif";

		this.img_left_disabled   = php.sprintf("%s/%s", this.image_src, this.img_left_disabled);
		this.img_middle_disabled = php.sprintf("%s/%s", this.image_src, this.img_middle_disabled);
		this.img_right_disabled  = php.sprintf("%s/%s", this.image_src, this.img_right_disabled);
		this.img_left_down       = php.sprintf("%s/%s", this.image_src, this.img_left_down);
		this.img_middle_down     = php.sprintf("%s/%s", this.image_src, this.img_middle_down);
		this.img_right_down      = php.sprintf("%s/%s", this.image_src, this.img_right_down);
		this.img_left_focus      = php.sprintf("%s/%s", this.image_src, this.img_left_focus);
		this.img_middle_focus    = php.sprintf("%s/%s", this.image_src, this.img_middle_focus);
		this.img_right_focus     = php.sprintf("%s/%s", this.image_src, this.img_right_focus);
		this.img_left_over       = php.sprintf("%s/%s", this.image_src, this.img_left_over);
		this.img_middle_over     = php.sprintf("%s/%s", this.image_src, this.img_middle_over);
		this.img_right_over      = php.sprintf("%s/%s", this.image_src, this.img_right_over);
		this.img_left_out        = php.sprintf("%s/%s", this.image_src, this.img_left_out);
		this.img_middle_out      = php.sprintf("%s/%s", this.image_src, this.img_middle_out);
		this.img_right_out       = php.sprintf("%s/%s", this.image_src, this.img_right_out);
		this.img_arrow           = php.sprintf("%s/%s", this.image_src, this.img_arrow);
		
		if (this.getDisabled()) {
			this.img_left    = this.img_left_disabled;
			this.img_middle  = this.img_middle_disabled;
			this.img_right   = this.img_right_disabled;
		}
		else {
			this.img_left    = this.img_left_out;
			this.img_middle  = this.img_middle_out;
			this.img_right   = this.img_right_out;
		}

		for (x = 0; x < len; x++) {

			if (php.in_array(opt[x].value, arr) == false) {
				arr[arr.length]   = opt[x].value;
				novo[novo.length] = opt[x];
			}
			
		}
		
		if (novo.length == 0) {
			novo[0] = [{value: "", text: ""}];
		}
		
		this.setOptions(novo);
		
		opt  = this.getOptions();
		len  = opt.length;

		this.selectedIndex(0);

		if (this.getSelected() == "") {
			this.setSelected(this.getOptions(this.selectedIndex()).value);
		}
		
		if (this.getSize() == "") {
			this.setSize("100px");	
		}
		
		if (len < 5) {			
			this.list_height = this.line_height * len;
		}
		else {
			this.list_height = this.line_height * 5;
		}
		
		if (document.all) {
			this.list_height += 2;
		}

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

			this.args.options[x].checked = function (arg) {
				
				if (arg != undefined) {

					var optionIndex = this.index;
					var obj_main    = this.parent;
					var collection  = this.parent.getCollection();
					
					if (obj_main.disabled() == false) {
					
						this._checked = flex.getBoolean(arg);

						var obj_table_text = collection.label;
						
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
						
							obj_table_text.value = this.text;
						}
						else {

							obj_main.selectedIndex(0);

							if (util.o(obj_main.getId())) {
								util.o(obj_main.parent_name).removeChild(util.o(obj_main.getId()));
							}

							obj_table_text.value = this.text;
						}

						this.out();
					}

				}
				else {
					return flex.getBoolean(this._checked);
				}
				
			};

			this.args.options[x].down = function () {
				
			};
			
			this.args.options[x].up = function () {
				
			};
			
			this.args.options[x].over = function () {

//				var optionIndex = this.index;
				var obj_main    = this.parent;
				
				if (obj_main.disabled() == false) {
					this.getCollection().item.className = "combo_option_over";
				}
				
			};
			
			this.args.options[x].out = function () {

//				var optionIndex = this.index;
				var obj_main    = this.parent;

				if (obj_main.disabled() == false) {
					this.getCollection().item.className = (this.checked() ? "combo_option_down" : "combo_option");
				}

			};
			
			this.args.options[x].click = function () {

//				var optionIndex = this.index;
				var obj_main    = this.parent;
				
				if (obj_main.disabled() == false) {
				
					if (obj_main.closed == false) {

						var obj_checked = obj_main.getOptions(obj_main.selectedIndex());

						obj_checked.checked(false);
						this.checked(true);
						
						setTimeout(php.sprintf("flex.get%s('%s').close();", obj_main.title, obj_main.getId()), 250);
				
						if (obj_main.getOnClick() != "") {
							setTimeout(obj_main.getOnClick(), (obj_main.list_height * obj_main.list_time + 300));
						}
					
					}

				}
				
			};
			
			this.args.options[x].getCollection = function () {
				
				var collection_parent = this.parent.getCollection();
				var collection = new Object();
				
				collection.item = collection_parent.table.rows[this.index].cells[0];
				
				return collection;
			};

		}

		this.onmousedown = php.sprintf("flex.get%s('%s').down();", this.title, this.getId());
		this.onmouseup   = php.sprintf("flex.get%s('%s').up();", this.title, this.getId());
		this.onmouseover = php.sprintf("flex.get%s('%s').over();", this.title, this.getId());
		this.onmouseout  = php.sprintf("flex.get%s('%s').out();", this.title, this.getId());
		this.onclick     = php.sprintf("flex.get%s('%s').click(1);", this.title, this.getId());

		this.retorno  = "";
		this.retorno += php.sprintf('<div id="%s" ', this.parent_name);
		this.retorno += php.sprintf('onmousedown="%s" ', this.onmousedown);
		this.retorno += php.sprintf('onmouseup="%s" ', this.onmouseup);
		this.retorno += php.sprintf('onmouseover="%s" ', this.onmouseover);
		this.retorno += php.sprintf('onmouseout="%s" ', this.onmouseout);
		this.retorno += php.sprintf('onclick="%s" ', this.onclick);
		this.retorno += ">";
		
		if (this.checked()) {
			this.retorno += "<input ";
			this.retorno += 'type="hidden" ';
			this.retorno += php.sprintf('name="%s" ', this.getName());
			this.retorno += php.sprintf('id="%s" ', this.getId());
			this.retorno += php.sprintf('value="%s" ', this.selectedValue());
			this.retorno += " />";
		}

		this.retorno += php.sprintf('<div style="float:left; width:%spx; height:%spx;"><img src="%s" style="width:%spx; height:%spx;" /></div>', this.image_width, this.image_height, this.img_left, this.image_width, this.image_height);
		this.retorno += '<div ';
		this.retorno += php.sprintf('style="float:left; background:url(%s); width:%s; height:%spx; padding-top:4px;" ', this.img_middle, this.getSize(), (parseInt(this.image_height) - 6));
		this.retorno += php.sprintf('class="%s" ', (this.getDisabled() ? "nobg flex_disabled" : "nobg campo"));
		this.retorno += ">";
		this.retorno += php.sprintf('<input type="text" id="%s" value="%s" onkeyup="flex.get%s(\'%s\').search(this.value);" style="width:100%;" class="nobg campo" %s ', this.label_name, this.selectedText(), this.title, this.getId(), (this.getDisabled() ? "disabled" : ""));
		this.retorno += " />";
		this.retorno += "</div>";
		this.retorno += php.sprintf('<div style="float:left; width:%spx;"><img src="%s" style="width:%spx; height:%spx;" /></div>', this.imager_width, this.img_right, this.imager_width, this.image_height);
		this.retorno += '<br clear="all" />';
		this.retorno += php.sprintf('<div style="position:relative;"><div style="width:%s; height:%spx; display:%s; position:absolute; overflow:auto; border: 1px solid #999999; background:#FFFFFF;">', '100%', (this.closed ? 1 : this.list_height), (this.closed ? "none" : ""));
		this.retorno += '<table style="width:100%;">';
		
		for (x = 0; x < len; x++) {
			
			this.onmousedown = php.sprintf("flex.get%s('%s').getOptions(%s).down();", this.title, this.getId(), x);
			this.onmouseup   = php.sprintf("flex.get%s('%s').getOptions(%s).up();", this.title, this.getId(), x);
			this.onmouseover = php.sprintf("flex.get%s('%s').getOptions(%s).over();", this.title, this.getId(), x);
			this.onmouseout  = php.sprintf("flex.get%s('%s').getOptions(%s).out();", this.title, this.getId(), x);
			this.onclick     = php.sprintf("flex.get%s('%s').getOptions(%s).click();", this.title, this.getId(), x);

			this.retorno += "<tr>";
			this.retorno += '<td style="height:14px;" nowrap ';
			this.retorno += php.sprintf('class="%s" ', (this.getOptions(x).checked() ? "combo_option_down" : "combo_option"));
			this.retorno += php.sprintf('onmousedown="%s" ', this.onmousedown);
			this.retorno += php.sprintf('onmouseup="%s" ', this.onmouseup);
			this.retorno += php.sprintf('onmouseover="%s" ', this.onmouseover);
			this.retorno += php.sprintf('onmouseout="%s" ', this.onmouseout);
			this.retorno += php.sprintf('onclick="%s" ', this.onclick);
			this.retorno += ">";
			this.retorno += opt[x].text != undefined ? opt[x].text : "";
			this.retorno += "</td>";
			this.retorno += "</tr>";
		}

		this.retorno += "</table>";
		this.retorno += "</div></div>";
		this.retorno += "</div>";

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
					options[this.selectedIndex()].checked(false);
					options[x].checked(true);
					break;
				}
				
			}
			
		}
		else {
			return flex.getString(this.getOptions(this.selectedIndex()).value);
		}
		
	};
	
	this.selectedText = function (arg) {
		
		if (arg != undefined) {
			
			var x, len;
			var options = this.getOptions();
			
			arg = flex.getString(arg);
			
			for (x = 0, len = options.length; x < len; x++) {
				
				if (arg == options[x].text) {
					options[this.selectedIndex()].checked(false);
					options[x].checked(true);
					break;
				}
				
			}
			
		}
		else {
			return flex.getString(this.getOptions(this.selectedIndex()).text);
		}
		
	};
	
	this.checked = function (arg) {
		
		if (arg != undefined) {
			this.getOptions(this.selectedIndex()).checked(arg);
		}
		else {
			return this.getOptions(this.selectedIndex()).checked();
		}
		
	};
	
	this.disabled = function (arg) {
		
		if (arg != undefined) {
			
			this.setDisabled(arg);

			var collection = this.getCollection();
			var classname;
			
			if (this.getDisabled() == true) {
				this.img_left   = this.img_left_disabled;
				this.img_middle = this.img_middle_disabled;
				this.img_right  = this.img_right_disabled;
				classname       = "nobg flex_disabled";
			}
			else {
				this.img_left   = this.img_left_out;
				this.img_middle = this.img_middle_out;
				this.img_right  = this.img_right_out;
				classname       = "nobg campo";
			}
					
			collection.left.src = this.img_left;
			collection.middle.style.background = php.sprintf("url('%s')", this.img_middle);
			collection.right.src = this.img_right;
			collection.label.className = classname;
			collection.label.disabled  = this.getDisabled();

			if (this.closed == false) {
				this.close();
			}

		}
		else {
			return this.getDisabled();
		}
		
	};
	
	this.over = function () {
		
		if (!this.getDisabled()) {
			
			if (this.closed == true) {

				var collection = this.getCollection();
				
				collection.left.src = this.img_left_over;
				collection.middle.style.background = php.sprintf("url('%s')", this.img_middle_over);
				collection.right.src = this.img_right_over;
			}

		}
		
	};
	
	this.out = function () {
		
		if (!this.getDisabled()) {
			
			if (this.closed == true) {
			
				var collection = this.getCollection();
				
				collection.left.src = this.img_left_out;
				collection.middle.style.background = php.sprintf("url('%s')", this.img_middle_out);
				collection.right.src = this.img_right_out;
			}

		}
		
	};

	this.down = function () {
		
		if (!this.getDisabled()) {

			var collection = this.getCollection();
					
			collection.left.src = this.img_left_down;
			collection.middle.style.background = php.sprintf("url('%s')", this.img_middle_down);
			collection.right.src = this.img_right_down;
		}
		
	};
	
	this.up = function () {
		
		if (!this.getDisabled()) {
			this.over();
		}
		
	};
	
	this.click = function (s) {
		
		if (!this.getDisabled()) {

			if (this.closed == true) {
				this.down();
				this.open();
			}
			else {
				
				var collection = this.getCollection();

				if (php.array_search(php.trim(collection.label.value), util.getTuple("text", this.getOptions()), false) == -1) {
					collection.label.value = this.getOptions(this.selectedIndex()).text;
				}

				this.close(null, null, 1);
			}

		}
		
	};
	
	this.open = function (status, height) {

		if (this.closed == true) {
		
			var obj_list, x;
			var collection = this.getCollection();
		
			status   = status ? status : 0;
			obj_list = collection.list;
		
			if (status == 1) {
				
				obj_list.style.height = height + "px";
				
				if (height == this.list_height) {
					this.closed = false;
				}
				
			}
			else {
				
				collection.label.readOnly = document.all ? true : false;
				collection.label.focus();
				
				obj_list.style.display = "";
				
				for (x = 0; x < this.list_height; x++) {
					setTimeout(php.sprintf("flex.get%s('%s').open(1, %s);", this.title, this.getId(), (x + 1)), x * this.list_time);
				}
				
			}
			
		}

	};
	
	this.close = function (status, height, s) {
		
		if (this.closed == false) {
		
			var obj_list;
			var collection = this.getCollection();
			
			status   = status ? status : 0;
			obj_list = collection.list;
		
			if (status == 1) {
				
				obj_list.style.height = height + "px";
				
				if (height == 0) {

					obj_list.style.display = "none";
					this.closed = true;

					if (s == 1) {
						this.over();
					}
					else {
						this.out();
					}

				}
				
			}
			else {
				
				collection.label.readOnly = document.all ? false :true;
				this.search("");				

				var i = 0;
				
				obj_list.style.display = "";
				obj_list.style.height = this.list_height + "px";

				for (var x = this.list_height; x > 0; x--) {
					setTimeout(php.sprintf("flex.get%s('%s').close(1, %s, '%s');", this.title, this.getId(), (x - 1), s), i * this.list_time);
					i++;
				}

			}
			
		}
		
	};

	this.search = function (v) {

		var collection = this.getCollection();
		var obj = collection.table.rows;
		var x;
		
		for (x = 0, len = obj.length; x < len; x++) {
			obj[x].style.display = (php.stripos(obj[x].cells[0].innerHTML, v) !== false ? "" : "none");
		}

	};
	
	this.getCollection = function () {
		
		var collection = new Object();
		
		collection.parent = util.o(this.parent_name);
		
		if (collection.parent) {
			collection.left   = collection.parent.getElementsByTagName("div")[0].getElementsByTagName("img")[0];
			collection.middle = collection.parent.getElementsByTagName("div")[1];
			collection.right  = collection.parent.getElementsByTagName("div")[2].getElementsByTagName("img")[0];
			collection.list   = collection.parent.getElementsByTagName("div")[4];
			collection.table  = collection.list.getElementsByTagName("table")[0];
			collection.label  = util.o(this.label_name);
		}
		
		return collection;
	};

	// INICIO

	this.args = new Object();
	
	this.setOptions(arguments[0]);
	this.setName(arguments[1]);
	this.setId(arguments[2]);
	this.setSelected(arguments[3]);
	this.setSize(arguments[4]);
	this.setOnClick(arguments[5]);
	this.setDisabled(arguments[6]);

	this.title = "ComboBox";
	
	if (this.doValidate() == true) {
		flex.setElement(this.title, this);
	}
	else {
		flex.showError(this);
	}

};
