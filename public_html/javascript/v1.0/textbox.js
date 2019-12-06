
flex.TextBox = function () {

	// INICIO BEAN

	this.getType = function () {return flex.getString(this.args["type"]);};
	this.getName = function () {return flex.getString(this.args["name"]);};
	this.getId = function () {return flex.getString(this.args["id"]);};
	this.getValue = function () {return flex.getString(this.args["value"]);};
	this.getSize = function () {return flex.getString(this.args["size"]);};	
	this.getMaxLength = function () {return flex.getNumber(this.args["maxlength"]);};
	this.getClass = function () {return flex.getString(this.args["class"]);};
	this.getStyle = function () {return flex.getString(this.args["style"]);};
	this.getOnKeyPress = function () {return flex.getString(this.args["onkeypress"]);};	
	this.getOnKeyUp = function () {return flex.getString(this.args["onkeyup"]);};
	this.getOnKeyDown = function () {return flex.getString(this.args["onkeydown"]);};
	this.getOnFocus = function () {return flex.getString(this.args["onfocus"]);};
	this.getOnBlur = function () {return flex.getString(this.args["onblur"]);};
	this.getDisplayAsPassword = function () {return flex.getBoolean(this.args["DisplayAsPassword"]);};
	this.getRequired = function () {return flex.getBoolean(this.args["required"]);};
	this.getReadOnly = function () {return flex.getBoolean(this.args["readonly"]);};
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
	
	this.setMaxLength = function () {
		
		this.args["maxlength"] = flex.getNumber(arguments[0]);
		
		if (util.o(this.getId())) {
			util.o(this.getId()).maxLength = this.getMaxLength();
		}
		
	};
	
	this.setClass = function () {
		this.args["class"] = flex.getString(arguments[0]);
	};
	
	this.setStyle = function () {
		this.args["style"] = flex.getString(arguments[0]);
	};
	
	this.setOnKeyPress = function () {
		this.args["onkeypress"] = flex.getString(arguments[0]);
	};
	
	this.setOnKeyUp = function () {
		this.args["onkeyup"] = flex.getString(arguments[0]);
	};
	
	this.setOnKeyDown = function () {
		this.args["onkeydown"] = flex.getString(arguments[0]);
	};
	
	this.setOnFocus = function () {
		this.args["onfocus"] = flex.getString(arguments[0]);
	};
	
	this.setOnBlur = function () {
		this.args["onblur"] = flex.getString(arguments[0]);
	};
	
	this.setDisplayAsPassword = function () {
		this.args["DisplayAsPassword"] = flex.getBoolean(arguments[0]);
	};
	
	this.setRequired = function () {
		
		this.args["required"] = flex.getBoolean(arguments[0]);
		
		if (this.getDisabled() == false) {
			this.setClass("nobg campo");
			
			if (util.o(this.parent_name)) {
				this.blur();
				util.o(this.getId()).className = this.getClass();
			}
					
		}
		
	};
	
	this.setReadOnly = function () {
		this.args["readonly"] = flex.getBoolean(arguments[0]);
		
		if (util.o(this.getId())) {
			util.o(this.getId()).readOnly = this.getReadOnly();
		}
		
	};
	
	this.setDisabled = function () {
		
		this.args["disabled"] = flex.getBoolean(arguments[0]);
		this.setClass((this.getDisabled() ? "nobg flex_disabled" : "nobg campo"));
		
		if (util.o(this.getId())) {
			this.blur();
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

	this.focus = function (v) {
		
		if (v == undefined) {
			this.checked = true;
		}
	
		if (!this.getDisabled()) {
		
			var obj = util.o(this.parent_name);
	
			obj.rows[0].cells[0].getElementsByTagName("img")[0].src = this.img_left_over;
			obj.rows[0].cells[1].style.background = php.sprintf("url('%s')", this.img_middle_over);
			obj.rows[0].cells[2].getElementsByTagName("img")[0].src = this.img_right_over;
			
			if (this.getOnFocus()) {
				setTimeout(this.getOnFocus(), 0);
			}
			
		}

	};

	this.blur = function (v) {

		if (v == undefined) {
			this.checked = false;
		}

		var obj = util.o(this.parent_name);

		if (this.getDisabled()) {
			this.img_left    = this.img_left_out;
			this.img_middle  = this.img_middle_out;
			this.img_right   = this.img_right_out;			
		}
		else {
		
			if (this.getRequired()) {
				this.img_left    = this.img_left_req;
				this.img_middle  = this.img_middle_req;
				this.img_right   = this.img_right_req;
			}
			else {
				this.img_left    = this.img_left_out;
				this.img_middle  = this.img_middle_out;
				this.img_right   = this.img_right_out;
			}

		}

		obj.rows[0].cells[0].getElementsByTagName("img")[0].src = this.img_left;
		obj.rows[0].cells[1].style.background = php.sprintf("url('%s')", this.img_middle);
		obj.rows[0].cells[2].getElementsByTagName("img")[0].src = this.img_right;

		if (v == undefined) {

			this.setValue(util.o(this.getId()).value);
		
			if (!this.getDisabled()) {
			
				if (this.getOnBlur()) {
					setTimeout(this.getOnBlur(), 0);
				}
			
			}
		
		}
		
	};
	
	this.over = function () {
		this.focus(1);
	};
	
	this.out = function () {
		
		if (!this.checked) {
			this.blur(1);
		}
		
	};
	
	this.keyUp = function (ev) {
		
		if (!this.getDisabled()) {
			
			if (this.getOnKeyUp()) {
				gevent = document.all ? event.keyCode : ev.which;
				setTimeout(this.getOnKeyUp(), 0);
			}
			
		}
		
	};

	// INICIO
	
	this.args = new Object();

	this.setDisplayAsPassword(arguments[0]);
	this.setName(arguments[1]);
	this.setId(arguments[2]);
	this.setValue(arguments[3]);
	this.setSize(arguments[4]);	
	this.setMaxLength(arguments[5]);
	this.setRequired(arguments[6]);
	this.setReadOnly(arguments[7]);
	this.setDisabled(arguments[8]);
	this.setOnKeyPress(arguments[9]);
	this.setOnKeyUp(arguments[10]);
	this.setOnKeyDown(arguments[11]);
	this.setOnFocus(arguments[12]);
	this.setOnBlur(arguments[13]);
	
	this.title = "TextBox";

	if (this.doValidate() == true) {

		this.image_src    = flex.image_src;
		this.image_width  = 3;
		this.image_height = 26;
		this.div_name     = php.sprintf("div_%s", this.getId());
		this.parent_name  = php.sprintf("parent_%s", this.getId());
		
		this.setType((this.getDisplayAsPassword() ? "password" : "text"));
		this.setClass((this.getDisabled() ? "nobg flex_disabled" : "nobg campo"));
		this.setStyle(php.sprintf("%s%s", "width:100%;", this.getStyle()));
		
		this.img_left_req    = "field_left_req.png";
		this.img_middle_req  = "field_middle_req.png";
		this.img_right_req   = "field_right_req.png";
		this.img_left_over   = "field_left_on.png";
		this.img_middle_over = "field_middle_on.png";
		this.img_right_over  = "field_right_on.png";
		this.img_left_out    = "field_left.png";
		this.img_middle_out  = "field_middle.png";
		this.img_right_out   = "field_right.png";

		this.img_left_req    = php.sprintf("%s/%s", this.image_src, this.img_left_req);
		this.img_middle_req  = php.sprintf("%s/%s", this.image_src, this.img_middle_req);
		this.img_right_req   = php.sprintf("%s/%s", this.image_src, this.img_right_req);
		this.img_left_over   = php.sprintf("%s/%s", this.image_src, this.img_left_over);
		this.img_middle_over = php.sprintf("%s/%s", this.image_src, this.img_middle_over);
		this.img_right_over  = php.sprintf("%s/%s", this.image_src, this.img_right_over);
		this.img_left_out    = php.sprintf("%s/%s", this.image_src, this.img_left_out);
		this.img_middle_out  = php.sprintf("%s/%s", this.image_src, this.img_middle_out);
		this.img_right_out   = php.sprintf("%s/%s", this.image_src, this.img_right_out);
		
		if (this.getDisabled()) {
			this.img_left    = this.img_left_out;
			this.img_middle  = this.img_middle_out;
			this.img_right   = this.img_right_out;			
		}
		else {
		
			if (this.getRequired()) {
				this.img_left    = this.img_left_req;
				this.img_middle  = this.img_middle_req;
				this.img_right   = this.img_right_req;
			}
			else {
				this.img_left    = this.img_left_out;
				this.img_middle  = this.img_middle_out;
				this.img_right   = this.img_right_out;
			}

		}

		this.retorno  = "";
		this.retorno += php.sprintf('<table id="%s" style="width:%s; height:%spx;"><tr>', this.parent_name, this.getSize(), this.image_height);
		this.retorno += php.sprintf('<td style="width:%spx;"><img src="%s" style="width:%spx; height:%spx;" /></td>', this.image_width, this.img_left, this.image_width, this.image_height);
		this.retorno += php.sprintf('<td style="background:url(%s);">', this.img_middle);

		this.retorno += "<input ";
		this.retorno += php.sprintf('type="%s" ', this.getType());
		this.retorno += php.sprintf('name="%s" ', this.getName());
		this.retorno += php.sprintf('id="%s" ', this.getId());
		this.retorno += php.sprintf('value="%s" ', this.getValue());
		this.retorno += php.sprintf('maxlength="%s" ', (this.getMaxLength() > 0 ? this.getMaxLength() : ""));
		this.retorno += php.sprintf('style="%s" ', this.getStyle());
		this.retorno += php.sprintf('class="%s" ', this.getClass());
		this.retorno += php.sprintf('onkeypress="%s" ', this.getOnKeyPress());
		this.retorno += php.sprintf('onkeydown="%s" ', this.getOnKeyDown());
		this.retorno += php.sprintf('onkeyup="%s" ', php.sprintf("flex.get%s('%s').keyUp(event);", this.title, this.getId()));
		this.retorno += php.sprintf('onfocus="%s" ', php.sprintf("flex.get%s('%s').focus();", this.title, this.getId()));
		this.retorno += php.sprintf('onblur="%s" ', php.sprintf("flex.get%s('%s').blur();", this.title, this.getId()));
		this.retorno += php.sprintf('onmouseover="%s" ', php.sprintf("flex.get%s('%s').over();", this.title, this.getId()));
		this.retorno += php.sprintf('onmouseout="%s" ', php.sprintf("flex.get%s('%s').out();", this.title, this.getId()));
		this.retorno += (this.getReadOnly() ? "readonly " : "");
		this.retorno += (this.getDisabled() ? "disabled " : "");

		this.retorno += " />";
		
		this.retorno += "</td>";
		this.retorno += php.sprintf('<td style="width:%spx;"><img src="%s" style="width:%spx; height:%spx;" /></td>', this.image_width, this.img_right, this.image_width, this.image_height);
		this.retorno += "</tr></table>";
		
		flex.setElement(this.title, this);
	}
	else {
		flex.showError(this);
	}

};

var gevent;
