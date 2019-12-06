
function IPopup() {

	this.collection = function () {
		
		$c = {};
		
		$c.BG     = Util.$$("div_pagina_aux");
		$c.MAIN   = Util.$$("div_popup");
		$c.TITLE  = Util.$$("div_popup_title");
		$c.BODY   = Util.$$("div_popup_body");
		$c.FOOTER = Util.$$("div_popup_footer");
		
		return $c;
	};
	
	this.title = function ($title) {
		
		var $c = this.collection();
		
		if (Php.isset($title)) {
			$c.TITLE.text($title);
		}
		
		return $c.TITLE;
	};
	
	this.footer = function ($title) {
		
		var $c = this.collection();
		
		if (Php.isset($title)) {
			$c.FOOTER.text($title);
		}
		
		return $c.FOOTER;
	};
	
	this.body = function () {
		return this.collection().BODY;
	};
	
	this.show = function ($callback, $width, $height) {
		
		this.CALLBACK = $callback ? $callback : null;
		
		var $collection = this.collection();
		
		$collection.BG.show();
		$collection.MAIN.show();
		
		this.resize($width, $height);
		this.call();
	};
	
	this.hide = function () {
		
		var $collection = this.collection();
		
		$collection.BODY.text("");
		$collection.MAIN.hide();
		$collection.BG.hide();
	};
	
	this.call = function () {
		
		var $type = Php.gettype(this.CALLBACK);

		if ($type == "function" || ($type == "string" && this.CALLBACK)) {
			setTimeout(this.CALLBACK, 0);
		}
		
	};
	
	this.resize = function ($width, $height) {
		
		var $collection = this.collection();
		
		if ($collection.MAIN.isVisible()) {
			
			this.WIDTH  = $width ? $width : window.innerWidth - 30;
			this.HEIGHT = $height ? $height : window.innerHeight - 30;

			$collection.MAIN.center(this.WIDTH, this.HEIGHT);
		}
		
	};
	
}

var Popup = new IPopup();
