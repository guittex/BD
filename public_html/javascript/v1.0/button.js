
flex.Button = function () {

	// INICIO BEAN

	this.getType = function () {return flex.getString(this.args["type"]);};
	this.getName = function () {return flex.getString(this.args["name"]);};
	this.getId = function () {return flex.getString(this.args["id"]);};
	this.getValue = function () {return flex.getString(this.args["value"]);};
	this.getSize = function () {return flex.getString(this.args["size"]);};	
	this.getClass = function () {return flex.getString(this.args["class"]);};
	this.getStyle = function () {return flex.getString(this.args["style"]);};
	this.getOnMouseDown = function () {return flex.getString(this.args["onmousedown"]);};
	this.getOnMouseUp   = function () {return flex.getString(this.args["onmouseup"]);};
	this.getOnMouseOver = function () {return flex.getString(this.args["onmouseover"]);};
	this.getOnMouseOut  = function () {return flex.getString(this.args["onmouseout"]);};
	this.getOnFocus = function () {return flex.getString(this.args["onfocus"]);};
	this.getOnBlur = function () {return flex.getString(this.args["onblur"]);};
	this.getOnClick = function () {return flex.getString(this.args["onclick"]);};
	this.getDisabled = function () {return flex.getBoolean(this.args["disabled"]);};
				
	this.setType = function () {
		this.args["type"] = flex.getString(arguments[0]);
	};
	
	this.setName = function () {
		this.args["name"] = flex.getString(arguments[0]);
	};
	
	this.setId = function () {
		this.args["id"] = flex.getString(arguments[0]);
	};
	
	this.setValue = function () {
		
		this.args["value"] = flex.getString(arguments[0]);
		
		if (util.o(this.getId())) {
			util.setValue(this.getId(), this.getValue());
		}
		
	};
	
	this.setSize = function () {
		
		this.args["size"] = flex.getString(arguments[0]);
		
		if (util.o(this.parent_name)) {
			util.setWidth(this.parent_name, this.getSize());
		}
		
	};
	
	this.setClass = function () {
		this.args["class"] = flex.getString(arguments[0]);
	};
	
	this.setStyle = function () {
		this.args["style"] = flex.getString(arguments[0]);
	};
	
	this.setOnMouseDown = function () {
		this.args["onmousedown"] = flex.getString(arguments[0]);
	};
	
	this.setOnMouseUp = function () {
		this.args["onmouseup"] = flex.getString(arguments[0]);
	};
	
	this.setOnMouseOver = function () {
		this.args["onmouseover"] = flex.getString(arguments[0]);
	};
	
	this.setOnMouseOut = function () {
		this.args["onmouseout"] = flex.getString(arguments[0]);
	};
	
	this.setOnFocus = function () {
		this.args["onfocus"] = flex.getString(arguments[0]);
	};
	
	this.setOnBlur = function () {
		this.args["onblur"] = flex.getString(arguments[0]);
	};
	
	this.setOnClick = function () {
		this.args["onclick"] = flex.getString(arguments[0]);
	};
	
	this.setDisabled = function () {

		this.args["disabled"] = flex.getBoolean(arguments[0]);
		this.setClass((this.getDisabled() ? "nobg bold flex_disabled" : "nobg bold botao"));

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

		var collection = this.getCollection();

		if (collection.parent) {

			collection.left.src                = this.img_left;
			collection.middle.style.background = php.sprintf("url('%s')", this.img_middle);
			collection.right.src               = this.img_right;

			util.o(this.getId()).className = this.getClass();
			util.o(this.getId()).disabled  = this.getDisabled();
		}

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

	this.down = function () {
		this.focus();
	};
	
	this.up = function () {
		this.over();
	};

	this.out = function () {
		this.blur();
	};

	this.over = function () {
		
		var collection = this.getCollection();

		collection.left.src                = this.img_left_over;
		collection.middle.style.background = php.sprintf("url('%s')", this.img_middle_over);
		collection.right.src               = this.img_right_over;
	};

	this.focus = function () {
	
		var collection = this.getCollection();
	
		collection.left.src                = this.img_left_focus;
		collection.middle.style.background = php.sprintf("url('%s')", this.img_middle_focus);
		collection.right.src               = this.img_right_focus;
	};

	this.blur = function () {
	
		var collection = this.getCollection();
	
		collection.left.src                = this.img_left_out;
		collection.middle.style.background = php.sprintf("url('%s')", this.img_middle_out);
		collection.right.src               = this.img_right_out;
	};
	
	this.click = function () {
		
		if (this.getOnClick()) {
			setTimeout(this.getOnClick(), 0);
		}
		
	};
	
	this.getCollection = function () {
		
		var collection = new Object();
		
		collection.parent = util.o(this.parent_name);
		
		if (collection.parent) {
			collection.left   = collection.parent.getElementsByTagName("div")[0].getElementsByTagName("img")[0];
			collection.middle = collection.parent.getElementsByTagName("div")[1];
			collection.right  = collection.parent.getElementsByTagName("div")[2].getElementsByTagName("img")[0];
		}
		
		return collection;
	};

	// INICIO

	this.args = new Object();

	this.setType(arguments[0]);
	this.setName(arguments[1]);
	this.setId(arguments[2]);
	this.setValue(arguments[3]);
	this.setSize(arguments[4]);
	this.setDisabled(arguments[5]);
	this.setOnClick(arguments[6]);
	this.setOnMouseDown(arguments[7]);
	this.setOnMouseUp(arguments[8]);
	this.setOnMouseOver(arguments[9]);
	this.setOnMouseOut(arguments[10]);
	this.setOnFocus(arguments[11]);
	this.setOnBlur(arguments[12]);

	this.title = "Button";
	
	if (this.doValidate() == true) {
		
		this.image_src    = flex.image_src;
		this.image_width  = 7;
		this.image_height = 22;
		this.div_name     = php.sprintf("div_%s", this.getId());
		this.parent_name  = php.sprintf("parent_%s", this.getId());
		
		this.setType((this.getType() == "button" || this.getType() == "submit" ? this.getType() : "button"));
		this.setClass((this.getDisabled() ? "nobg bold flex_disabled" : "nobg bold botao"));
		this.setStyle(php.sprintf("%s%s", "width:100%;", this.getStyle()));
		this.setOnMouseDown(php.sprintf("%s%s", php.sprintf("flex.get%s('%s').down();", this.title, this.getId()), this.getOnMouseDown()));
		this.setOnMouseUp(php.sprintf("%s%s", php.sprintf("flex.get%s('%s').up();", this.title, this.getId()), this.getOnMouseUp()));
		this.setOnMouseOver(php.sprintf("%s%s", php.sprintf("flex.get%s('%s').over();", this.title, this.getId()), this.getOnMouseOver()));
		this.setOnMouseOut(php.sprintf("%s%s", php.sprintf("flex.get%s('%s').out();", this.title, this.getId()), this.getOnMouseOut()));
		this.setOnFocus(php.sprintf("%s%s", php.sprintf("flex.get%s('%s').focus();", this.title, this.getId()), this.getOnFocus()));
		this.setOnBlur(php.sprintf("%s%s", php.sprintf("flex.get%s('%s').blur();", this.title, this.getId()), this.getOnBlur()));
		
		this.onclick = php.sprintf("flex.get%s('%s').click();", this.title, this.getId());
		
		this.img_left_disabled   = "button_left[disabled].png";
		this.img_middle_disabled = "button_middle[disabled].png";
		this.img_right_disabled  = "button_right[disabled].png";
		this.img_left_down       = "button_left[down].png";
		this.img_middle_down     = "button_middle[down].png";
		this.img_right_down      = "button_right[down].png";
		this.img_left_focus      = "button_left[focus].png";
		this.img_middle_focus    = "button_middle[focus].png";
		this.img_right_focus     = "button_right[focus].png";
		this.img_left_over       = "button_left[over].png";
		this.img_middle_over     = "button_middle[over].png";
		this.img_right_over      = "button_right[over].png";
		this.img_left_out        = "button_left[out].png";
		this.img_middle_out      = "button_middle[out].png";
		this.img_right_out       = "button_right[out].png";

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

		this.retorno  = "";
		this.retorno += php.sprintf('<div id="%s">', this.parent_name);
		this.retorno += php.sprintf('<div style="float:left; width:%spx;"><img src="%s" style="width:%spx; height:%spx;" /></div>', this.image_width, this.img_left, this.image_width, this.image_height);
		this.retorno += php.sprintf('<div style="float:left; height:20px; padding-top:2px; background:url(%s);">', this.img_middle);

		this.retorno += "<input ";
		this.retorno += php.sprintf('type="%s" ', this.getType());
		this.retorno += php.sprintf('name="%s" ', this.getName());
		this.retorno += php.sprintf('id="%s" ', this.getId());
		this.retorno += php.sprintf('value="%s" ', this.getValue());
		this.retorno += php.sprintf('style="%s" ', this.getStyle());
		this.retorno += php.sprintf('class="%s" ', this.getClass());
		this.retorno += php.sprintf('onmousedown="%s" ', this.getOnMouseDown());
		this.retorno += php.sprintf('onmouseup="%s" ', this.getOnMouseUp());
		this.retorno += php.sprintf('onmouseover="%s" ', this.getOnMouseOver());
		this.retorno += php.sprintf('onmouseout="%s" ', this.getOnMouseOut());
		this.retorno += php.sprintf('onfocus="%s" ', this.getOnFocus());
		this.retorno += php.sprintf('onblur="%s" ', this.getOnBlur());
		this.retorno += php.sprintf('onclick="%s" ', this.onclick);
		this.retorno += (this.getDisabled() ? "disabled " : "");
		this.retorno += " />";
		
		this.retorno += "</div>";
		this.retorno += php.sprintf('<div style="float:left; width:%spx;"><img src="%s" style="width:%spx; height:%spx;" /></div>', this.image_width, this.img_right, this.image_width, this.image_height);
		this.retorno += "</div>";

		flex.setElement(this.title, this);
	}
	else {
		flex.showError(this);
	}

};
