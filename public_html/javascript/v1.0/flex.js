
var flex = new Object();

//flex.image_src = '../imagens';

flex.call = function ($function, $obj, $key_code) {

	var $ok;
	var $php = php;
	
	if (!$php.isset($key_code)) {
		$key_code = -1;
		$ok = true;
	}
	else {
		$ok = ($php.gettype($key_code) == "integer");
	}
	
	if ($ok) {

		var $type = $php.gettype($function);
		var $run  = false;
		
		if ($type == "function") {
			$run = true;
		}
		else if ($type == "string") {
			
			if ($function) {
				
				if ($php.isset($obj)) {
					$function = $php.str_replace(["this", "key"], [$obj.getJSCall(), $key_code.toString()], $function);
				}
				
				$run = true;
			}
			
		}
	
		if ($run) {
			setTimeout($function, 0);
		}
	
	}
	
};

flex.attribute2class = function (str) {
	return php.str_replace(" ", "", php.ucwords(php.str_replace("_", " ", php.trim(str))));
};

flex.showError = function (child) {
	alert(php.sprintf("flex.get%s.error: (\n\t%s\n)", child.title, php.implode("\n\t", child.err)));
};

flex.getElements = function (type) {

	if (php.is_object(this.inputs) == false) {
		this.inputs = new Object();
	}

	if (type) {

		if (php.is_object(this.inputs[type]) == false) {
			this.inputs[type] = new Object();
		}
            	
    	return this.inputs[type];
	}
   
   return this.inputs;
};

flex.getElement = function (name, type) {
	return this.getElements(type)[name];
};

flex.setElement = function (type, object) {
	type = type.toLowerCase();
	this.getElements(type)[object.getId()] = object;
};

flex.getButton = function (id) {
	return this.getElement(id, "button");
};

flex.getCheckBox = function (id) {
	return this.getElement(id, "checkbox");
};

flex.getComboBox = function (id) {
	return this.getElement(id, "combobox");
};

flex.getDatagrid = function (id) {
	return this.getElement(id, "datagrid");
};

flex.getLinkButton = function (id) {
	return this.getElement(id, "linkbutton");
};

flex.getRadioBox = function (id) {
	return this.getElement(id, "radiobox");
};

flex.getTextArea = function (id) {
	return this.getElement(id, "textarea");
};

flex.getTextBox = function (id) {
	return this.getElement(id, "textbox");
};

flex.setValue = function (arg) {
	
	if (php.isset(arg) == true) {
		
		if (php.is_string(arg) == true) {
		
			if (php.is_numeric(arg) == true) {
				return php.floatval(arg);
			}
		
			if (arg == "true") {
				return true;
			}
		
			if (arg == "false") {
				return false;
			}
			
		}

		return arg;
	}
	
	return "";
};

flex.getString = function (arg) {
	return php.is_string(arg) || php.is_numeric(arg) ? arg.toString() : "";
};

flex.getNumber = function (arg) {
	return php.is_numeric(arg) ? php.floatval(arg) : 0;
};

flex.getBoolean = function (arg) {
	return arg ? (arg == "false" ? false : true) : false;
};

flex.getArray = function (arg) {
	return php.is_array(arg) ? arg : new Array();
};

flex.getObject = function (arg) {
	return php.is_object(arg) ? arg : new Array();
};
