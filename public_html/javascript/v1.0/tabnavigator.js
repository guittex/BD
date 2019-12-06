
var NAVIGATOR = {};

function getTabNavigator($id) {
	return NAVIGATOR[$id];
}

function TabNavigator($options, $id, $selected, $width, $height, $click) {
	
	this.$options  = php.isset($options) ? $options : [];
	this.$id       = php.isset($id) ? $id : "";
	this.$selected = php.isset($selected) ? $selected : -1;
	this.$width    = php.isset($width) ? $width : "10px";
	this.$height   = php.isset($height) ? $height : "";
	this.$click    = php.isset($click) ? $click : "";
	
	this.getImagePath = function ($filename) {
		
		if (php.isset($filename)) {
			return (flex.image_src + "/" + $filename);
		}

		return (flex.image_src + "/");
	};
	
	this.getImage = function ($filename) {
		return php.sprintf('<img src="%s" border="0" />', this.getImagePath($filename));
	};
	
	this.call = function ($callback) {
		flex.call($callback, this);
	};
	
	this.options = function ($index) {
		
		if (php.isset($index)) {
			return this.$options[$index];
		}
		
		return this.$options;
	};
	
	this.render = function ($div_id) {
		
		util.o((php.isset($div_id) ? $div_id : ("div_" + this.$id))).innerHTML = this.$retorno;
		
		if (this.selectedIndex() > -1) {
			this.$options[this.selectedIndex()].load();
		}
		
	};
	
	this.getJSCall = function () {
		return php.sprintf("NAVIGATOR['%s']", this.$id);
	};
	
	this.selectedIndex = function () {
		return this.$sindex;
	};
	
	this.selected = function ($index) {
		return ($index == this.$sindex);
	};
	
	this.scope = function ($index) {
		
		var $scope = "";
		
		if ($index > -1) {
		
			var $prev = php.isset(this.$options[$index - 1]);
			var $next = php.isset(this.$options[$index + 1]);
			
			if ($prev) {
				
				if ($next) {
					$scope = "middle";
				}
				else {
					$scope = "right";
				}
				
			}
			else {
				
				if ($next) {
					$scope = "left";
				}
				else {
					$scope = "unique";
				}
				
			}
			
		}
		
		return $scope;
	};
	
	this.css = function ($index, $selected) {
		
		var $scope = this.scope($index);
		var $css   = {};
		var $ok, $ok2;
		
		if (php.isset($selected)) {
			$ok  = $selected;
			$ok2 = false;
		}
		else {
			$ok  = this.selected($index);
			$ok2 = this.selected(($index + 1));
		}
			
		if ($scope == "unique") { // unique (total == 1)
			$css.fix    = $ok ? "tabnavigator_fix2" : "tabnavigator_fix";
			$css.left   = $ok ? "tab_left_checked" : "tab_left";
			$css.middle = $ok ? "tab_middle_checked" : "tab_middle";
			$css.right  = $ok ? "tab_right_checked" : "tab_right";
			$css.body   = $ok ? "" : "hidden";
		}
		else if ($scope == "left") { // left
			$css.fix    = $ok ? "tabnavigator_fix2" : "tabnavigator_fix";
			$css.left   = $ok ? "tab_left_checked" : "tab_left";
			$css.middle = $ok ? "tab_middle_checked" : "tab_middle";
			$css.right  = $ok ? "tab_right_checked2" : ($ok2 ? "hidden" : "tab_right2");
			$css.body   = $ok ? "" : "hidden";
		}
		else if ($scope == "middle") { // middle
			$css.fix    = $ok ? "tabnavigator_fix2" : "tabnavigator_fix";
			$css.left   = $ok ? "tab_left_checked2" : "hidden";
			$css.middle = $ok ? "tab_middle_checked" : "tab_middle";
			$css.right  = $ok ? "tab_right_checked2" : ($ok2 ? "hidden" : "tab_right2");
			$css.body   = $ok ? "" : "hidden";
		}
		else if ($scope == "right") { // right
			$css.fix    = $ok ? "tabnavigator_fix2" : "tabnavigator_fix";
			$css.left   = $ok ? "tab_left_checked2" : "hidden";
			$css.middle = $ok ? "tab_middle_checked" : "tab_middle";
			$css.right  = $ok ? "tab_right_checked" : "tab_right";
			$css.body   = $ok ? "" : "hidden";
		}
		
		if ($css.left == "tab_left_checked") {
			$css.left2 = "tab.left.selected.png";
		}
		else if ($css.left == "tab_left") {
			$css.left2 = "tab.left.png";
		}
		else if ($css.left == "tab_left_checked2") {
			$css.left2 = "tab.left.selected2.png";
		}
		else {
			$css.left2 = "";
		}
		
		if ($css.right == "tab_right_checked") {
			$css.right2 = "tab.right.selected.png";
		}
		else if ($css.right == "tab_right") {
			$css.right2 = "tab.right.png";
		}
		else if ($css.right == "tab_right2") {
			$css.right2 = "tab.right2.png";
		}
		else if ($css.right == "tab_right_checked2") {
			$css.right2 = "tab.right.selected2.png";
		}
		else {
			$css.right2 = "";
		}

		return $css;
	};
	
	this.uncheckAll = function () {
		
		for (var $x in this.$options) {
			this.$options[$x].checked(false, false);
		}
		
		this.$sindex = -1;
	};
	
// INICIO PROCESSAMENTO
	
	if (this.$id) {
		
		var $total  = this.$options.length;
		var $tabs   = "";
		var $bodies = "";
		var $x, $css;
		
		this.$sindex = -1;
		
		for ($x = 0; $x < $total; $x++) {
			
			if ($x == this.$selected) {
				this.$sindex = this.$selected;
			}
			
		}
		
		for ($x = 0; $x < $total; $x++) {
			
			this.$options[$x].$parent = this.$id;
			this.$options[$x].$index  = $x;
			
			this.$options[$x].selected = function () {
				return this.self().selected(this.$index);
			};

			this.$options[$x].checked = function ($arg, $change_sindex) {
				
				if (php.isset($arg)) {
					
					$change_sindex = php.isset($change_sindex) ? $change_sindex : true;

					if ($change_sindex) {
						this.self().uncheckAll();
					}
					
					var $collection = this.collection();
					var $css        = this.self().css(this.$index, $arg);
					var $scope      = this.self().scope(this.$index);
					
					$collection.fix.className    = $css.fix;
					$collection.left.className   = $css.left;
					$collection.middle.className = $css.middle;
					$collection.right.className  = $css.right;
					$collection.body.className   = $css.body;
					$collection.left2.src        = this.self().getImagePath($css.left2);
					$collection.right2.src       = this.self().getImagePath($css.right2);

					this.self().$sindex = $arg ? this.$index : -1;
					
					if ($scope == "middle" || $scope == "right") {

						if ($arg) {
						
							var $prev_collection = this.self().$options[this.$index - 1].collection();
							var $prev_css        = this.self().css((this.$index - 1));
							
							$prev_collection.right.className = $prev_css.right;
						}
						
					}
					
				}
				else {
					return this.selected();
				}
				
			};
			
			this.$options[$x].body = function ($content) {
				
				if (php.isset($content)) {
					this.collection().body.innerHTML = $content;
				}
				else {
					return this.collection().body.innerHTML;
				}

			};
			
			this.$options[$x].load = function () {
				
				if (this.body() == "") {
					this.refresh();
				}
				
			};
			
			this.$options[$x].refresh = function () {
				
				if (this.$action) {
					this.body(ajax.execute(this.$action));
				}

			};
			
			this.$options[$x].click = function () {
				
				var $sindex = this.self().selectedIndex();
				
				if ($sindex > -1) {
					this.self().$options[$sindex].checked(false, false);
				}

				this.checked(true);
				this.load();
				this.call(this.self().$click);
			};
			
			this.$options[$x].label = function ($string) {
				
				if (php.isset($string)) {
					
					var $collection = this.collection();
					
					$collection.label.innerHTML = $string;
					this.$label = $string;
				}
				else {
					return this.$label;
				}
				
			};
			
			this.$options[$x].call = function ($callback) {
				this.self().call($callback);
			};
			
			this.$options[$x].collection = function () {
				
				var $c = {};
				
				$c.parent = util.o(this.self().$id);
				$c.fix    = $c.parent.rows[0].cells[this.$index + 1];
				$c.left   = $c.fix.getElementsByTagName("table")[0].rows[0].cells[0];
				$c.middle = $c.fix.getElementsByTagName("table")[0].rows[0].cells[1];
				$c.right  = $c.fix.getElementsByTagName("table")[0].rows[0].cells[2];
				$c.body   = util.o(php.sprintf("%s[%s]", this.self().$id, this.$index));
				$c.label  = $c.middle;
				$c.left2  = $c.left.getElementsByTagName("img")[0];
				$c.right2 = $c.right.getElementsByTagName("img")[0];
				
				return $c;
			};
			
			this.$options[$x].getJSCall = function () {
				return php.sprintf("%s.options(%s)", this.self().getJSCall(), this.$index);
			};
			
			this.$options[$x].self = function () {
				return NAVIGATOR[this.$parent];
			};
			
			NAVIGATOR[this.$id] = this;
			
			$css = this.css($x);
			
			$tabs += php.sprintf('<td class="%s" valign="bottom" nowrap>', $css.fix);
			$tabs += '<table cellpadding="0" cellspacing="0">';
			$tabs += '<tr>';
			$tabs += php.sprintf('<td class="%s">%s</td>', $css.left, this.getImage($css.left2));
		    $tabs += php.sprintf('<td class="%s" onclick="%s.click();" nowrap>%s</td>', $css.middle, this.$options[$x].getJSCall(), this.$options[$x].$label);
		    $tabs += php.sprintf('<td class="%s">%s</td>', $css.right, this.getImage($css.right2));
		    $tabs += '</tr>';
		    $tabs += '</table>';
		    $tabs += '</td>';
			
			$bodies += php.sprintf('<div id="%s[%s]" class="%s"></div>', this.$id, $x, $css.body);
		}
		
		this.$retorno = "";
		
		this.$retorno += php.sprintf('<table id="%s" cellpadding="0" cellspacing="0">', this.$id);
		this.$retorno += php.sprintf('<tr>');
		this.$retorno += php.sprintf('<td class="tabnavigator_fix" style="width:10px;">&nbsp;</td>');
		this.$retorno += $tabs;
		this.$retorno += php.sprintf('<td class="tabnavigator_fix" style="width:%s;">&nbsp;</td>', this.$width);
		this.$retorno += php.sprintf('</tr>');
	    this.$retorno += php.sprintf('<tr>');
		this.$retorno += php.sprintf('<td class="tabnavigator_body" colspan="%s" style="height:%s;" valign="top">', ($total + 2), this.$height);
		this.$retorno += $bodies;
		this.$retorno += php.sprintf('</td>');
		this.$retorno += php.sprintf('</tr>');
		this.$retorno += php.sprintf('</table>');
		
		NAVIGATOR[this.$id] = this;
	}
	else {
		alert("Id do TabNavigator não informado!");
	}
	
}
