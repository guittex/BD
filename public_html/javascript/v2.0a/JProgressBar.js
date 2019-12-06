
function JProgressBar($id, $type) {
	
	this.TYPE      = Php.isset($type) ? $type : ""; // clean || circle
	this.ID        = $id;
	this.PARENT_ID = "parent_" + this.ID;
	this.DIV_ID    = "div_" + this.ID;
	
	this.PERC_ID   = this.ID + "_perc";
	this.PERC2_ID  = this.ID + "_perc2";
	this.IMAGE_ID  = this.ID + "_perc3";
	this.TITLE_ID  = this.ID + "_title";
	this.INFO_ID   = this.ID + "_info";
	this.INFO2_ID  = this.ID + "_info2";
	this.DESC_ID   = this.ID + "_desc";
	
	this.show = function () {
		Util.$$(this.PARENT_ID).show();
	};
	
	this.hide = function () {
		Util.$$(this.PARENT_ID).hide();
	};
	
	if (this.TYPE == "") {
	
		this.perc = function ($text) {
			this.collection().perc.text($text);
		};
		
		this.title = function ($text) {
			this.collection().title.text($text);
		};
		
		this.clock = function ($text) {
			this.collection().clock.text($text);
		};
	
	}
	
	if (this.TYPE == "" || this.TYPE == "circle") {
	
		this.info = function ($text) {
			this.collection().info.text($text);
		};
		
	}
	else if (this.TYPE == "clean") {
		
		this.info = function ($text) {
			this.collection().desc.text($text);
		};
		
	}

	this.collection = function () {
		
		var $collection = new Object();
		var $obj        = this;
		
		$collection.parent = {background : function () {return Util.$$($obj.PARENT_ID).background($obj.getImagePath((arguments[0] + ".png")));}};
		$collection.perc   = {text  : function () {return Util.$$($obj.PERC_ID).text(arguments[0]);}};
		$collection.perc2  = {text  : function () {return Util.$$($obj.PERC2_ID).text(arguments[0]);}};
		$collection.image  = {width : function () {return Util.$$($obj.IMAGE_ID).width(arguments[0]);}};
		$collection.title  = {text  : function () {return Util.$$($obj.TITLE_ID).text(arguments[0]);}};
		$collection.info   = {text  : function () {return Util.$$($obj.INFO_ID).text(arguments[0]);}};
		$collection.desc   = {text  : function () {return Util.$$($obj.DESC_ID).text(arguments[0]);}};
		$collection.clock  = {text  : function () {return Util.$$($obj.INFO2_ID).text(arguments[0]);}};

		return $collection;
	};
	
	this.getImagePath = function ($name) {
		
		var $aux = [];
		
		$aux[0] = IMAGE_PATH ? IMAGE_PATH : "./public_html/images";
		
		if ($name) {
			$aux[1] = $name;
		}
		
		return $aux.join("/");
	};

	this.create = function () {
		
		var $div_id, $html, $style, $width;
		
		$div_id = arguments[0] ? arguments[0] : this.DIV_ID;
		
		$html  = "";
		$style = (this.TYPE == "clean" ? "" : Php.sprintf("width:449px; height:165px; background:url(%s);", this.getImagePath("progressbar.bg.png")));
		$width = (this.TYPE == "clean" ? "100%" : "395px");
		
		if (this.TYPE == "circle") {
			$html += Php.sprintf('<div id="%s" align="left" style="width:200px; height:200px; background:url(%s);">', this.PARENT_ID, this.getImagePath("0.png"));
			$html += '<div style="height:42px;"></div>';
			$html += '<table style="width:100%; height:115px;" border="0" cellpadding="0" cellspacing="0">';
			$html += '<tr>';
			$html += Php.sprintf('<td align="center"><div id="%s"></div></td>', this.INFO_ID);
			$html += '</tr>';
			$html += "</table>";
			$html += "</div>";
		}
		else {
		
			$html += Php.sprintf('<div id="%s" align="left" style="%s">', this.PARENT_ID, $style);
			$html += '<div style="padding-left:30px; padding-top:9px;">';
			$html += '<table width="100%" border="0" cellpadding="0" cellspacing="0">';
			
			if (this.TYPE == "") {
				$html += '<tr><td height="10"><div id="' + this.PERC_ID + '"></div></td></tr>';
				$html += '<tr><td height="30"></td></tr>';
				$html += '<tr><td height="18"><div id="' + this.TITLE_ID + '" class="medium"></div></td></tr>';
				$html += '<tr><td height="18"><div id="' + this.PERC2_ID + '" class="medium"></div></td></tr>';
				$html += '<tr><td height="5"></td></tr>';
			}
	
			$html += '<tr><td height="16"><div style="width:' + $width + '; height:16px; position:relative; background:rgb(192, 192, 192); border:1px solid rgb(120, 120, 120);">';
			$html += '<div style="width:100%; position:absolute; left:0px; top:0px;"><img id="' + this.IMAGE_ID + '" src="' + this.getImagePath("loading.png") + '" style="width:0%; height:16px;" /></div>';
			$html += '<div style="width:100%; position:absolute; left:0px; top:0px; color:#FFFFFF; text-shadow: black 0.1em 0.1em 0.1em;" align="center" id="' + this.DESC_ID + '"></div>';
			$html += '</div></td></tr>';
			
			if (this.TYPE == "") {
				$html += '<tr><td height="20"></td></tr>';
				$html += '<tr><td><div id="' + this.INFO_ID + '" class="medium"></div></td></tr>';
				$html += '<tr><td><div id="' + this.INFO2_ID + '" class="medium"></div></td></tr>';
			}
			else {
				$html += '<tr><td><div id="' + this.INFO_ID + '" align="center"></div></td></tr>';
			}
	
			$html += '</table>';
			$html += '</div>';
			$html += '</div>';
		}

		Util.$$($div_id).text($html);
	};

	this.init = function () {

		var $n = arguments.length;
		
		if ($n > 0) {
		
			if ($n == 1) {
				this.update(arguments[0]);
			}
			else {
				this.update(parseInt(arguments[0]), parseInt(arguments[1]));
			}
			
		}

	};
	
	this.update = function () {
		
		var $n = arguments.length;
		var $perc, $perc_ds, $perc_bg, $qt, $total, $info, $collection = this.collection();
		
		if ($n > 0) {

			if ($n > 1) {
				$qt      = parseInt(arguments[0]);
				$total   = parseInt(arguments[1]);
				$perc    = parseInt((100 * $qt / $total));
				$perc    = $perc <= 100 ? $perc : 100;
				$perc_ds = $perc + "%";
				$perc    = $qt >= $total ? 100 : $perc;
			}
			else if ($n == 1) {
				$perc    = parseInt((arguments[0].toString().indexOf("%") != -1 ? arguments[0].toString().replace("%") : arguments[0]));
				$perc_ds = $perc + "%";
			}
			
			if (this.TYPE == "circle") {
				
				$perc_bg = $perc;
				$info    = [];
				
				if ($n > 1) {
					$info[$info.length] = Php.sprintf('<div style="font-size:16pt;">%s</div>', $perc_ds);
					$info[$info.length] = Php.sprintf('<div style="font-size:11px;">%s of %s</div>', $qt, $total);
				}
				else if ($n == 1) {
					$info[$info.length] = Php.sprintf('<div style="font-size:24pt;">%s</div>', $perc_ds);
				}
				
				$collection.parent.background($perc_bg);
				$collection.info.text($info.join(""));
			}
			else {

				$collection.image.width($perc_ds);

				if (this.TYPE == "clean") {
					
					if ($n > 1) {
						$info = Php.sprintf("%s (%s of %s)", $perc_ds, $qt, $total);
					}
					else if ($n == 1) {
						$info = $perc_ds;
					}
					
					$collection.desc.text($info);
				}
				else if (this.TYPE == "") {
					$collection.perc.text(($perc_ds + " conclu&iacute;do(s)"));
					$collection.perc2.text(($perc_ds + " conclu&iacute;do(s)"));
				}
			
			}

		}
		
	};
	
}
