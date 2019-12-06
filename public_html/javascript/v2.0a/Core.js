
var $GLOBALS = {};
var Ajax     = new IAjax(SERVLET_PREFFIX);

function getImagePath($name) {

	var $path = [IMAGE_PATH];

	if ($name) {
		$path.push($name);
	}

	return $path.join("/");
}

function doResize() {

	var $navigator  = Util.$$("div_navigator");
	var $workspace  = Util.$$("div_workspace");
	var $height     = window.innerHeight - 57 - 20 - 12;
	var $nav_width  = 300;
	var $nav_height = $height - 25;
	var $work_width = window.innerWidth - $nav_width - 12;

	$navigator.width($nav_width);
	$navigator.height($nav_height);

	$workspace.width($work_width);
	$workspace.height($height);

	Popup.resize();
	Workspace.resizeIframes();
}

function IController() {

	this.getServletPath = function ($action) {
		return SERVLET_PATH + "" + $action;
	};

	this.getServletAction = function ($action) {
		return SERVLET_ACTION + "" + $action;
	};

}

function INavigator() {

	this.loadConnections = function () {
		Ajax.call(Controller.getServletAction("loadConnections"), "", null, "div_navigator");
	};

	this.doExport = function ($s) {

		if ($s == 1) {
			alert("Exportar!");
		}
		else {
			Popup.show(function () {
				Popup.title("Exportar");
				Ajax.call(Controller.getServletAction("exportar"), "", null, Popup.body());
			});
		}

	};

	this.doImport = function ($s) {

		if ($s == 1) {
			alert("Importar!");
		}
		else {
			Popup.show(function () {
				Popup.title("Importar");
				Ajax.call(Controller.getServletAction("importar"), "", null, Popup.body());
			});
		}

	};

	this.doRefresh = function () {
		alert("Em Desenvolvimento");
	};

}

function IWorkspace() { // TODO: passar $adapter e $conn_id para o objeto (Workspace($conn_id).open())

	this.getId = function ($conn_id) {
		return ("div_workspace[" + $conn_id + "]");
	};

	this.open = function ($conn_id) {

		var $div_id = this.getId($conn_id);
		var $obj    = Util.$$($div_id);

		this.hideWorkspaces();

		if ($obj.exists()) {
			$obj.show();
			this.collection($conn_id).CONN_ID.value = $conn_id;
			this.focusTextArea($conn_id);
		}
		else {

			// TODO: put tabs too

			$obj = document.createElement("div");

			$obj.setAttribute("id", $div_id);

			document.getElementById("div_workspace").appendChild($obj);

			Ajax.call(Controller.getServletAction("createWorkspace"), ("conn_id=" + $conn_id), function () {
				Workspace.focusTextArea($conn_id);
			}, $obj);

		}

	};

	this.focusTextArea = function ($conn_id, $value) {

		var $obj = document.getElementById(("form[" + $conn_id + "][query]"));

		if ($value) {
			$obj.value += $value;
		}

		$obj.focus();
	};

	this.hideWorkspaces = function () {

		var $all = this.getWorkspaces();

		for (var $index in $all) {
			$all[$index].hide();
		}

	};

	this.getWorkspaces = function () {

		var $preffix = "div_workspace";
		var $plen    = $preffix.length;
		var $divs    = document.getElementById($preffix).getElementsByTagName("div");
		var $all     = [];
		var $count   = 0;

		for (var $index in $divs) {

			if ($divs[$index].id && $divs[$index].id.toString().substr(0, $plen) == $preffix) {
				$all[$count] = Util.$($divs[$index]);
				$count++;
			}

		}

		return $all;
	};

	this.getIframes = function () {
		return document.getElementById("div_workspace").getElementsByTagName("iframe");
	};

	this.resizeIframes = function () {

		var $arr = this.getIframes();

		for (var $index in $arr) {
			Util.$($arr[$index]).height((window.innerHeight - 57 - 20 - 12 - 200 - 25 - 25 - 61));
		}

	};

	this.posta = function ($conn_id, $sql) {

		if ($sql != "") {

			var $ifrm = Php.sprintf("iframe[%s]", $conn_id);
			var $form = document.getElementById("frm");

			Util.$$("conn_id").val(Util.$$(Php.sprintf("form[%s][conn_id]", $conn_id)).val());
			Util.$$("delimiter").val(Util.$$(Php.sprintf("form[%s][delimiter]", $conn_id)).val());
			Util.$$("query").val($sql);

			$form.target = $ifrm;
			$form.submit();
		}

	};

	this.executeQuery = function ($conn_id) {
		this.posta($conn_id, GetSelectedText());
	};

	this.executeScript = function ($conn_id) {
		this.posta($conn_id, document.getElementById(("form[" + $conn_id + "][query]")).value);
	};

	this.execute = function ($conn_id, $event) {

		var $key = parseInt(($event.keyCode ? $event.keyCode : ($event.which ? $event.which : -1)));

		if ($event) {

			if ($key == 120) { // 120 = F9

				if ($event.shiftKey) {
					this.executeScript($conn_id);
				}
				else {
					this.executeQuery($conn_id);
				}

			}
			else if ($key == 119) { // 119 = F8
				this.executeScript($conn_id);
			}
			else if ($key == 113) { // 113 = F2
				this.addPagedSQL($conn_id);
			}
			else if ($key == 32) { // espaço

				if ($event.ctrlKey) {

					var $obj  = this.getContentAssistObject($conn_id);
					var $this = this;

					$obj.show();
					$obj.text("");
					Ajax.call(Controller.getServletAction("showContentAssist"), ("conn_id=" + $conn_id), function () {
						$this.collection($conn_id).CA_SEARCH.self().focus();
					}, $obj);

				}

			}
			else if ($key == 27) { // ESC
				this.getContentAssistObject($conn_id).hide();
			}

		}

	};

	this.getContentAssistObject = function ($conn_id) {
		return this.collection($conn_id).CA_DIV;
	};

	this.addPagedSQL = function ($conn_id) {

		Ajax.call(Controller.getServletAction("addPagedSQL"), ("conn_id=" + $conn_id), function () {
			Workspace.focusTextArea($conn_id, Ajax.get());
		}, null);

	};

	this.filterContentAssist = function ($conn_id) {

		var $collection = this.collection($conn_id);
		var $query      = $collection.CA_SEARCH.val();
		var $grid       = $collection.CA_GRID.self();
		var $linha, $cell, $display;

		for (var $i in $grid.rows) {

			$linha   = $grid.rows[$i];
			$cell    = $linha.cells[1].innerHTML;
			$display = ($query && $cell.startsWith($query) == false ? "none" : "");

			$linha.style.display = $display;
		}

	};

	this.collection = function ($conn_id) {

		var $object = {};

		$object.CONN_ID   = document.getElementById(Php.sprintf("form[%s][conn_id]", $conn_id));
		$object.CA_SEARCH = Util.$$(Php.sprintf("ca_search[%s]", $conn_id));
		$object.CA_GRID   = Util.$$(Php.sprintf("ca_grid[%s]", $conn_id));
		$object.CA_DIV    = Util.$$(Php.sprintf("div_content_assist[%s]", $conn_id));

		return $object;
	};

}

function getItemCollection(id) {

	var collection = new Object();

	collection.parent = Util.$$(id).self();
	collection.left   = Util.$(collection.parent.rows[0].cells[0]);
	collection.middle = Util.$(collection.parent.rows[0].cells[1]);
	collection.right  = Util.$(collection.parent.rows[0].cells[2]);
	collection.image  = collection.left.self().getElementsByTagName("img")[0];

	return collection;
}

function doOverItem(id) {

	var collection = getItemCollection(id);

	collection.image.src = getImagePath((collection.image.src.indexOf("plus") != -1 ? "windows/plus.over.png" : "windows/minus.over.png"));

	collection.left.css("JItemTreeHover");
	collection.middle.css("JItemTreeHover");
	collection.right.css("JItemTreeHover");
}

function doOutItem(id) {

	var collection = getItemCollection(id);

	collection.image.src = getImagePath((collection.image.src.indexOf("plus") != -1 ? "windows/plus.png" : "windows/minus.png"));

	collection.left.css("JItemTree");
	collection.middle.css("JItemTree");
	collection.right.css("JItemTree");
}

function doOpenItem(id, action, params, s, pagina) {

	pagina = pagina ? parseInt(pagina) : -1;

	if (id) {

		var child = Util.$$("div_" + id);

		if (child.isHide()) {
			child.show();
			child.text("Aguarde, carregando...");
			setTimeout(Php.sprintf("doOpenItem('%s', '%s', '%s', 1, '%s')", id, action, params, pagina), 500);
		}
		else {

			var collection = getItemCollection(id);
			var obj_img    = collection.image;
			var p, i;

			if (s == 1) {

				obj_img.src = getImagePath((obj_img.src.toString().indexOf("over.") == -1 ? "windows/minus.png" : "windows/minus.over.png"));

				Ajax.call(action, (params + "&pagina=" + pagina), function () {

					if ($GLOBALS.item_click) {
						setTimeout($GLOBALS.item_click, 20);
					}

				}, child);

			}
			else {
				obj_img.src = getImagePath((obj_img.src.toString().indexOf("over.") == -1 ? "windows/plus.png" : "windows/plus.over.png"));
				child.text("");
				child.hide();
			}

		}

	}

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

var Controller = new IController();
var Navigator  = new INavigator();
var Workspace  = new IWorkspace();
