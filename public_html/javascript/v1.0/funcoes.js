
var tabs = new Object();

function removeArgs() {
	util.o("div_hiddens").innerHTML = "";
}

function setArg(name, value) {
	util.o("div_hiddens").innerHTML += php.sprintf('<input type="hidden" name="%s" value="%s" />', name, value);
}

function getJSArg(needle, haystack) { // EX: se haystack = 'conn_id=14&table=tabela' e needle = 'table', a fun��o retornar� 'tabela' 

	var arr = php.explode("&", haystack);
	var ret = "";
	var x, len, args;
	
	for (x = 0, len = arr.length; x < len; x++) {
		
		if (arr[x]) {
			
			args = php.explode("=", arr[x]);
			
			if (args[0] == needle) {
				ret = args[1];
				break;
			}
			
		}
		
	}

	return ret;
}

function doOpenPopup(action, params) {
	
	scrollTo(0, 0);
	
	util.show("div_pagina_aux");
	util.show("div_popup");
	
	var popup_w = 800;
	var popup_h = 600;
	
	util.o("div_popup").style.width  = popup_w + "px";
	util.o("div_popup").style.height = popup_h + "px";
	
	util.o("div_popup2").style.width  = (popup_w - 3) + "px";
	util.o("div_popup2").style.height = (popup_h - 22) + "px";
	
	util.o("div_popup").style.left = ((screen.width  - popup_w) / 2) + "px";
	util.o("div_popup").style.top  = ((screen.height - popup_h) / 2) + "px";
	
	ajax.set("div_popup2", action, params);
}

function doClosePopup() {
	util.o("div_popup2").innerHTML = "";
	util.hide("div_pagina_aux");
	util.hide("div_popup");	
}

function setPopupTitle(v) {
	util.o("popup_title").innerHTML = v;
}

function doAdd(server_name, action, params) { // abre formulario de add e edi��o
	
	if (params) {
		params += "&db=" + server_name;
	}
	else {
		params = "db=" + server_name;
	}
	
	if (action == "get_connections") {
		doOpenPopup((server_name + ".edit_connection"), params);
	}
	else {	
		alert(php.sprintf("%s, %s, %s", server_name, action, params));
	}
	
}

function doEdit(server_name, action, params) {

	if (params) {
		params += "&db=" + server_name;
	}
	else {
		params = "db=" + server_name;
	}
	
	if (action == "get_attributes") {
		doOpenPopup((server_name + ".edit_connection"), params);
	}
	else {
		
		if (php.strpos(params, "routine_name=") !== false) {
			doOpenPopup((server_name + ".edit_routine"), params);
		}
		else {		
			alert(php.sprintf("%s, %s, %s", server_name, action, params));
		}
			
	}

}

function doDelete(server_name, action, params) {
	alert(php.sprintf("%s, %s, %s", server_name, action, params));
}

function doList(server_name, action, params, pag) {

	showResults(server_name);
	
	var conn_id   = getJSArg("conn_id", params);
	var tablename = getJSArg("table", params);
	
	g("conn_id").value = conn_id; // pendente
	g("sql").value     = php.sprintf("SELECT * FROM %s ORDER BY 1", tablename);
	g("pag").value     = pag != undefined ? (pag > 1 ? pag : 1) : 1;

	removeArgs();
	setArg("table", tablename);

	document.frm.action = ROOT_PATH + "/index.php?action=" + server_name + ".show_results";
	document.frm.target = server_name + "_ifrm_results";
	document.frm.submit();
}

function doStructure(server_name, action, params) {
	
	if (action == "get_columns") {
		doOpenPopup((server_name + ".show_structure"), params);
	}
	else {
		alert(php.sprintf("%s, %s, %s", server_name, action, params));
	}

}

function doExecute(server_name) {
	posta(server_name, 120);
}

function doClean(server_name) {
	
	var ifrm_f9 = php.sprintf('%s_ifrm_results', server_name);
	var ifrm_f5 = php.sprintf('%s_ifrm_script', server_name);
	
	if (util.isHide(ifrm_f5) == false) {
		util.o(ifrm_f5).src = "";
	}
	
	if (util.isHide(ifrm_f9) == false) {
		util.o(ifrm_f9).src = "";
	}
	
}

function doImport(server_name, action, params) {
	doOpenPopup((server_name + ".import"), params);
}

function doExport(server_name, action, params) {
	
	var connections, radio_exp_connections, radio_exp_options;
	
	doOpenPopup((server_name + ".show_form_export"), params);
	
	connections = server.getByName(server_name).connections;
//	exp_options = eval(ajax.execute((server_name + ".get_export_options")));
	
	radio_exp_connections = new flex.RadioBox(connections, "radio_exp_connections", "radio_exp_connections");
	radio_exp_options     = new flex.RadioBox(connections, "radio_exp_options", "radio_exp_options");
	
	radio_exp_connections.render("div_exp_connections");
	radio_exp_options.render("div_exp_options");
}

function GetSelectedText() {

	var selText = "";
	var text, range, selRange;

	if (window.getSelection) {

		if (document.activeElement && (document.activeElement.tagName.toLowerCase () == "textarea" || document.activeElement.tagName.toLowerCase () == "input")) {
			text    = document.activeElement.value;
			selText = text.substring(document.activeElement.selectionStart, document.activeElement.selectionEnd);
		}
		else {
			selRange = window.getSelection();
			selText  = selRange.toString();
		}

	}
	else {

		if (document.selection.createRange) { // Internet Explorer
			range   = document.selection.createRange();
			selText = range.text;
		}

	}

	return selText;
}

function posta(server_name, tecla) {

	if (tecla == 120) { // F2 ou F9
	
		var combo    = g(server_name + "_conn");
		var textarea = g(server_name + "_statement");
		var ac       = new Array();
		var stext    = GetSelectedText();
		
//		ac[120] = server_name + ".execute_statement";
//		ac[113] = server_name + ".run_script";
	
		ac[120] = server_name + ".run_script";
	
		if (textarea.value != "") {

			g("conn_id").value = combo.value;
			g("sql").value     = stext == "" ? textarea.value : stext;

			showScriptOutput(server_name);

			document.frm.action = ROOT_PATH + "/index.php?action=" + ac[tecla];
			document.frm.target = server_name + "_ifrm_script";
			document.frm.submit();
		}

	}
	
}

function Teste(id, action, params, pagina) {
	g("div_" + id).innerHTML += ajax.execute(action, (params + "&pagina=" + pagina));
}

function Teste2(id, pagina) {
	pagina = parseInt(pagina);
	util.o("div_perc_" + id).innerHTML = Math.ceil((100 * pagina) / $GLOBALS.total) + "%";
}

function Teste3(id) {
	util.hide("div_perc_" + id);
}

function doOpenItem(id, action, params, s, pagina) {
	
	pagina = pagina ? parseInt(pagina) : -1;
	
	if (id) {
		
		var child = g("div_" + id);
		
		if (isHide(child)) {
			show(child);
			child.innerHTML = lang.translate(29);
			setTimeout(php.sprintf("doOpenItem('%s', '%s', '%s', 1, '%s')", id, action, params, pagina), 500);
		}
		else {
			
			var collection = getItemCollection(id);
			var obj_img = collection.image;
			var p, i;

			if (s == 1) {
				
				obj_img.src = php.sprintf("%s/%s", flex.image_src, (obj_img.src.toString().indexOf("over.") == -1 ? "minus.png" : "minus.over.png"));
				
				if (pagina >= 0) {
					
					if (pagina == 0) {
						child.innerHTML = php.sprintf('<div id="div_perc_%s">0%</div>', id);
						$GLOBALS.total  = parseInt(ajax.execute(action, (params + "&pagina=" + pagina)));
						pagina++;
						setTimeout(php.sprintf("doOpenItem('%s', '%s', '%s', 1, '%s')", id, action, params, pagina), 350);
					}
					else {
/*
						for (i = 0; i < $GLOBALS.total; i++) {
							
							p = i + 1;

							setTimeout(php.sprintf("Teste('%s', '%s', '%s', '%s');", id, action, params, p), i * 5);
							setTimeout(php.sprintf("Teste2('%s', '%s');", id, p), i * 10);
							
							if (p == $GLOBALS.total) {
								setTimeout("Teste3('" + id + "');", (i * 5 + 20));
							}
							
						}
*/

						if (pagina <= $GLOBALS.total) {
							
							util.o("div_perc_" + id).innerHTML = Math.ceil((100 * pagina) / $GLOBALS.total) + "%";
							child.innerHTML += ajax.execute(action, (params + "&pagina=" + pagina));
							
							if (pagina != $GLOBALS.total) {
								pagina++;
								setTimeout(php.sprintf("doOpenItem('%s', '%s', '%s', 1, '%s')", id, action, params, pagina), 350);
							}
							else {
								util.hide("div_perc_" + id);
							}
							
						}

					}

				}
				else if (pagina == -1) {
					
					child.innerHTML = ajax.execute(action, (params + "&pagina=" + pagina));
			
					if ($GLOBALS.item_click) {
						setTimeout($GLOBALS.item_click, 20);
					}
			
				}

			}
			else {
				obj_img.src     = php.sprintf("%s/%s", flex.image_src, (obj_img.src.toString().indexOf("over.") == -1 ? "minus.png" : "plus.over.png"));
				child.innerHTML = "";
				hide(child);
			}
				
		}
		
	}
	
}

function doCloseWorkSpaces() {
	
	var $s = server.$servers;
	
	for (var $x in $s) {
		hide("div_workspace[" + $s[$x].name + "]");
	}
	
}

function doOpenWorkSpace($server_name, $conn_id) {

	var $server = server.getByName($server_name);
	var $tid    = php.sprintf("workspace[%s]", $server_name);
	var $wid    = "div_" + $tid;
	var $oid    = "output_" + $server_name;
	var $woid   = "div_" + $oid;
	var $lb     = php.sprintf("<label title='%s'>%s</label>", $server.connections[$conn_id].info, $server.connections[$conn_id].label);
	
	doShowWorkSpace($server_name);
	
	if (util.o($wid).innerHTML == "") {
	
		var $workspace = [];
		var $output    = [];
		
		$workspace[$workspace.length] = {$label: $lb, $action: php.sprintf("%s.get_workspace&conn_id=%s", $server_name, $conn_id)};
	
	  	new TabNavigator($workspace, $tid, 0, (PANEL_WIDTH + "px"));
	  	getTabNavigator($tid).render();
	  	
	  	$output[$output.length] = {$label: lang.translate(12), $action: php.sprintf("%s.get_iframe_results&conn_id=%s", $server_name, $conn_id)};
	  	$output[$output.length] = {$label: lang.translate(13), $action: php.sprintf("%s.get_iframe_script&conn_id=%s", $server_name, $conn_id)};
	  	
	  	new TabNavigator($output, $oid, 1, (PANEL_WIDTH + "px"));
	  	getTabNavigator($oid).render();
	  	getTabNavigator($oid).$options[1].load();
	  	getTabNavigator($oid).$options[0].checked(true);
	  	getTabNavigator($oid).$options[0].load();
  	}
	else {
	
		if ($conn_id != undefined) {
			util.o(($server_name + "_conn")).value = $conn_id;
			getTabNavigator($tid).$options[0].$action = php.sprintf("%s.get_workspace&conn_id=%s", $server_name, $conn_id);
			getTabNavigator($tid).$options[0].label($lb);
		}

	}
  	
  	g($server_name + "_statement").focus();
}

function doShowWorkSpace($server_name) {
	doCloseWorkSpaces();
	show("div_workspace[" + $server_name + "]");
}

function getItemCollection(id) {
	
	var collection = new Object();
	
	collection.parent = util.o(id);
	collection.left   = collection.parent.getElementsByTagName("div")[0];
	collection.middle = collection.parent.getElementsByTagName("div")[1];
	collection.right  = collection.parent.getElementsByTagName("div")[2];
	collection.image  = collection.left.getElementsByTagName("img")[0];
	
	return collection;
	
}

function doOverItem(id) {

	var collection = getItemCollection(id);

	collection.image.src = flex.image_src + "/" + (php.strpos(collection.image.src, "plus") ? "plus.over.png" : "minus.over.png");

	collection.left.className   = "flex_over2";
	collection.middle.className = "flex_over";
	collection.right.className  = "flex_over";
}

function doOutItem(id) {

	var collection = getItemCollection(id);

	collection.image.src = flex.image_src + "/" + (php.strpos(collection.image.src, "plus") ? "plus.png" : "minus.png");

	collection.left.className   = "flex_out2";
	collection.middle.className = "flex_out";
	collection.right.className  = "flex_out";
}

function Tab(id, img_name, label, checked, click, size) {

	this.render = function (div_name) {
		
		if (div_name != undefined) {
			document.getElementById(div_name).innerHTML = this._retorno;
		}
		else {
			document.write(this._retorno);
		}
		
	};

	this.label = function (v) {
		
		if (v != undefined) {
			this._label = v;
			g(this._label_name).innerHTML = this._label;
		}
		else {
			return this._label;
		}
		
	};
	
	this.checked = function (v) {
		
		if (v != undefined) {
			this._checked = v;
			this.out();			
		}
		else {
			return this._checked;
		}
		
	};
	
	this.over = function () {
		g(this._par_name).className = this._checked ? "tab_over_checked" : "tab_over_unchecked";
	};
	
	this.out = function () {
		g(this._par_name).className = this._checked ? "tab_checked" : "tab_unchecked";
	};
	
	this.click = function (v) {

		if (v != undefined) {
			this._click = v;
		}
		else {
			this.checked((this.checked() == true ? false : true));
			//this.checked(true);
			this.over();
			setTimeout(this._click, 10);
		}
		
	};
	
	this._id       = id;
	this._img_name = img_name;
	this._label    = label   ? label   : "";
	this._checked  = checked ? checked : false;
	this._click    = click   ? click   : "";
	this._size     = size    ? size    : "";

	this._img_src    = flex.image_src + '/';	
	this._div_name   = "div_" + this._id;
	this._par_name   = "parent_" + this._id;
	this._label_name = "label_" + this._id;
	
	var classname = (this._checked ? "tab_checked" : "tab_unchecked");
	var eventos   = "";
	
	eventos += php.sprintf(" onmouseover=\" tabs['%s'].over(); \" ", this._id);
	eventos += php.sprintf(" onmouseout=\" tabs['%s'].out(); \" ", this._id);
	eventos += php.sprintf(" onclick=\" tabs['%s'].click(); \" ", this._id);
	
	this._retorno = "";

	this._retorno += php.sprintf('<div %s id="%s" style="width:%s; padding-top:3px;" class="%s">', eventos, this._par_name, this._size, classname);
	this._retorno += (this._img_name ? php.sprintf('<div style="width:24px; float:left; padding-left:2px;" align="center" %s><img src="%s%s" style="width:16px; height:16px;" /></div>', eventos, this._img_src, this._img_name) : '');
	this._retorno += php.sprintf('<div id="%s" style="float:left; padding-left:2px;">%s</div>', this._label_name, this._label);
	this._retorno += php.sprintf('</div>');
	
	tabs[this._id] = this;
}

function MenuFileItemOver(id) {
	var obj = util.o(id);
	obj.getElementsByTagName("div")[0].innerHTML        = php.sprintf('<img src="%s/menu_file.left.png" style="width:4px; height:18px;" />', flex.image_src);
	obj.getElementsByTagName("div")[1].style.background = php.sprintf("url('%s/menu_file.middle.png')", flex.image_src);
	obj.getElementsByTagName("div")[2].innerHTML        = php.sprintf('<img src="%s/menu_file.right.png" style="width:4px; height:18px;" />', flex.image_src);
}

function MenuFileItemOut(id) {
	var obj = util.o(id);
	obj.getElementsByTagName("div")[0].innerHTML        = '&nbsp;';
	obj.getElementsByTagName("div")[1].style.background = '';
	obj.getElementsByTagName("div")[2].innerHTML        = '&nbsp;';
}

function setTitle(v) {
	document.title = v;
	g("Title").innerHTML = "&nbsp;" + v;
}

function getTitle() {
	return g("Title").innerHTML;
}

function showResults($server_name) {
	getTabNavigator(("output_" + $server_name)).$options[0].checked(true);
}

function showScriptOutput($server_name) {
	getTabNavigator(("output_" + $server_name)).$options[1].checked(true);
}

function g(id) {
	
	var g = new Object();
	
	if (typeof(id) == "string") {
		
		g = document.getElementById(id);
		
		if (!g) {
			g = top.document.getElementById(id);
		}
		
	}
	else if (typeof(id) == "object") {
		g = id;
	}
	
	return g;
}

function show(id) {
	g(id).style.display = "";
}

function hide(id) {
	g(id).style.display = "none";
}

function showHide(id) {
	
	if (isHide(id)) {
		show(id);
	}
	else {
		hide(id);
	}
	
}

function show_hide(id) {
	showHide(id);
}

function isHide(id) {
	return (g(id).style.display == "none" ? true : false);
}

function doNewConnection($server_name, $conn_id) {
	$server_name = $server_name ? $server_name : "";
	$conn_id     = $conn_id ? $conn_id : "";
	doOpenPopup(php.sprintf("%s.new_connection&conn_id=%s", $server_name, $conn_id));
}
