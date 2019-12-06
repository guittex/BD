
flex.Datagrid = function () {

	if (this.img_src == undefined) {
		this.img_src = flex.image_src;
	}
	
	if (this.img_src != undefined) {
		this.img_src += this.img_src.substr(-1) == "/" ? "" : "/";
	}
	
	this.doClean = function () {

		var grid     = document.getElementById(this.$id);
		var selected = grid.selectedLinha;
		
		if (selected != -1) {
			grid.selectedLinha = -1;
			this.outTupla(grid.rows[selected]);
		}
		
	};

	this.upTupla = function (Line) {

		var Parent   = Line.Tabela;
		var index    = Line.Indice;
//		var tipo     = Line.Tipo;
		var selected = Parent.selectedLinha;

		Parent.selectedLinha = index;

		if (selected != -1) {
			this.outTupla(Parent.rows[selected]);
		}

	};

	this.downTupla = function (Line) {
		
		var Parent   = Line.Tabela;
		var index    = Line.Indice;
//		var tipo     = Line.Tipo;
		var selected = Parent.selectedLinha;
		var x, len;

		if (selected != index) {
			
			for (x = 0, len = Line.cells.length; x < len; x++) {
				Line.cells[x].className = "grid_td grid_td_down";
			}
			
		}
		
	};
	
	this.overTupla = function (Line) {
		
		var Parent   = Line.Tabela;
		var index    = Line.Indice;
//		var tipo     = Line.Tipo;
		var selected = Parent.selectedLinha;
		var x, len;
		
		if (selected != index) {
			
			for (x = 0, len = Line.cells.length; x < len; x++) {
				Line.cells[x].className = "grid_td grid_td_over";
			}
			
		}
		
	};
	
	this.outTupla = function (Line) {

		var Parent   = Line.Tabela;
		var index    = Line.Indice;
		var tipo     = Line.Tipo;
		var selected = Parent.selectedLinha;
		var x, len;
		
		if (selected != index) {
			
			for (x = 0, len = Line.cells.length; x < len; x++) {
				Line.cells[x].className = "grid_td " + (tipo % 2 == 0 ? "grid_par" : "grid_impar");
			}
			
		}

	};

	this.doAnimate = function () {
		
	};
	
	this.animate = function ($id) {

		this.$id = $id;
		
		var grid = document.getElementById($id);
		var x, k, lines, len, cols;
//		var i = "";
//		var src_img = this.img_src + "grid_bg.jpg";
		var y = 0;
		
		if (grid) {
			
			if (grid.className == "grid") {
	
				grid.selectedLinha = -1;
	
				lines = grid.rows;
	
				for (x = 0, len = lines.length; x < len; x++) {
						
					if (lines[x].cells[0].tagName.toString().toUpperCase() != "TH") {
						lines[x].Tabela         = grid;
						lines[x].Indice         = x;
						lines[x].Tipo           = y;
						lines[x]["onmousedown"] = function (event) {datagrid.downTupla(this);};
						lines[x]["onmouseup"]   = function (event) {datagrid.upTupla(this);};
						lines[x]["onmouseover"] = function (event) {datagrid.overTupla(this);};
	                    lines[x]["onmouseout"]  = function (event) {datagrid.outTupla(this);};
						datagrid.outTupla(lines[x]);
						y++;
					}
					else {
							
						for (k = 0, cols = lines[x].cells.length; k < cols; k++) {
								
							if (lines[x].cells[k].tagName.toString().toUpperCase() == "TH") {
								lines[x].cells[k]["className"]   = "grid_th grid_th_image";
								lines[x].cells[k]["onmousedown"] = function (event) {this.className = "grid_th grid_th_image_down";};
								lines[x].cells[k]["onmouseover"] = function (event) {this.className = "grid_th grid_th_image_over";};
								lines[x].cells[k]["onmouseout"]  = function (event) {this.className = "grid_th grid_th_image";};
								lines[x].cells[k]["onmouseup"]   = function (event) {this.className = "grid_th grid_th_image"; datagrid.doClean();};
							}
	
						}
							
						y = 0;
					}
	
				}
	
			}
		
		}

	};

};

var datagrid = new flex.Datagrid();
