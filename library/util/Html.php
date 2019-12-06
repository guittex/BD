<?php

class Html {

	public static function doLoadCSS() {

		$n    = func_num_args();
		$args = func_get_args();

		if ($n >= 2) {

			foreach ($args as $f) {
				self::doLoadCSS($f);
			}

		}
		else if ($n == 1) {

			$filename = getPath(CSS_PATH, func_get_arg(0), 'css');
			$vars     = ['IMAGE_PATH' => IMAGE_PATH, 'FONT_PATH' => FONT_PATH];

			if (file_exists($filename)) {

				$file = file_get_contents($filename);

				foreach ($vars as $name => $value) {
					$file = str_replace(sprintf('${%s}', $name), getPath($value), $file);
				}

				echo $file;
			}

		}

	}

	public static function doLoadJS() {

		$n    = func_num_args();
		$args = func_get_args();

		if ($n >= 2) {

			foreach ($args as $f) {
				self::doLoadJS($f);
			}

		}
		else if ($n == 1) {

		    $arg0 = func_get_arg(0);

		    if (is_callable($arg0)) {

		        foreach (getDir(JAVASCRIPT_PATH, '.js', false, $arg0) as $f) {

		            $filename = getPath(JAVASCRIPT_PATH, $f, 'js');

		            if (file_exists($filename)) {
		                printf('<script type="text/javascript" src="%s"></script>%s', $filename, "\n");
		            }

		        }

		    }
		    else {

		        $filename = getPath(JAVASCRIPT_PATH, $arg0, 'js');

    			if (file_exists($filename)) {
    				printf('<script type="text/javascript" src="%s"></script>%s', $filename, "\n");
    			}

		    }

		}
		else { // nenhum parametro

			foreach (getDir(JAVASCRIPT_PATH, '.js') as $f) {
				self::doLoadJS($f);
			}

		}

	}

	public static function getFieldValue($fieldname) {
		return strtolower((isset($fieldname) ? $fieldname : 'cd'));
	}

	public static function getFieldText($fieldname) {
		return strtolower((isset($fieldname) ? $fieldname : 'ds'));
	}

	public static function getImagePath($name = null) {
		return getPath(IMAGE_PATH, $name);
	}

	public static function getImage($name = null, $args = array()) {

		$aux = array();

		foreach ($args as $v => $t) {

			if ($v !== 'src') {
				$aux[] = sprintf('%s="%s"', $v, $t);
			}

		}

		return sprintf('<img src="%s" %s />', self::getImagePath($name), implode(' ', $aux));
	}

	public static function getBackground($name) {
		return sprintf('background:url(%s);', self::getImagePath($name));
	}

	public static function getLabel($label) {
		return sprintf('<p class="JLabel" style="display:%s;">%s</p>', (isset($label) ? '' : 'none'), $label);
	}

	public static function getComboBox($options, $id, $selected = null, $label = null, $size = null, $click = null, $disabled = false, $field_value = null, $field_text = null) {

		$field_value = self::getFieldValue($field_value);
		$field_text  = self::getFieldText($field_text);

		$css    = $disabled ? 'JComboBoxDisabled' : 'JComboBox';
		$html   = array();

		$html[] = PString::format('<select class="{4}" name="{0}" id="{0}" style="width:{1};" onchange="{2}" {3}>', $id, self::getSize($size), $click, ($disabled ? 'disabled' : ''), $css);

		foreach ($options as $v => $t) {

			$type = gettype($t);

			if ($type == 'array') {
				$value = $t[$field_value];
				$text  = $t[$field_text];
			}
			else if ($type == 'object') {
				$value = $t->$field_value;
				$text  = $t->$field_text;
			}
			else {
				$value = $v;
				$text  = $t;
			}

			$html[] = PString::format('<option value="{0}" {2}>{1}</option>', $value, $text, ($value == $selected ? 'selected' : ''));
		}

		$html[] = '</select>';

		return implode("\n", $html);
	}

	public static function getTextArea($id, $value = '', $label = '', $width = '', $height = '', $disabled = false, $extra = '') {

		$css = $disabled ? 'JTextAreaDisabled' : 'JTextArea';

		$html[] = self::getLabel($label);
		$html[] = sprintf('<textarea class="%s" name="%s" id="%s" style="width:%s; height:%s;" %s %s>%s</textarea>', $css, $id, $id, $width, $height, $extra, ($disabled ? 'disabled' : ''), $value);

		return implode("\n", $html);
	}

	public static function getTextField($type, $id, $value = null, $label = null, $size = null, $maxlength = null, $disabled = false, $onkeyup = null) {

		$html   = array();
		$size   = self::getSize($size);
		$args   = array();
		$class  = $disabled ? 'JTextFieldDisabled' : 'JTextField';

		$args[] = sprintf('class="%s"', $class);
		$args[] = sprintf('type="%s"', $type);
		$args[] = sprintf('name="%s"', $id);
		$args[] = sprintf('id="%s"', $id);
		$args[] = sprintf('value="%s"', $value);
		$args[] = sprintf('style="width:%s;"', $size);

		if (isset($maxlength)) {
			$args[] = sprintf('maxlength="%s"', $maxlength);
		}

		if (isset($onkeyup)) {
			$args[] = sprintf('onkeyup="%s"', $onkeyup);
		}

		$args[] = $disabled ? 'disabled' : '';

		$html[] = self::getLabel($label);
		$html[] = sprintf('<input %s />', implode(' ', $args));

		return implode("\n", $html);
	}

	public static function getSize($size) {
		return (is_numeric($size) ? "{$size}px" : $size);
	}

	public static function hidden($id, $value) {
		return PString::format('<input type="hidden" name="{0}" id="{0}" value="{1}" />', $id, $value);
	}

	public static function spacer($size = 1) {
		return PString::format('<div style="height:{0};"></div>', self::getSize($size));
	}

	public static function json2object($json) {
		return json_decode(utf8_encode($json));
	}

	public static function getItem($label, $img_name, $id, $action, $params = '', $click = '', $actions = '', $pagina = -1) {

		// TODO: change to JS later (new JItemTree() | new JItem()) JTree.add(new JItem)
		// TODO: arrumar nome das funcoes JS (ex: Database.add, Connection.edit, Function.delete, etc)

		$actions = " {$actions} ";
		$qt = 0;

		$structure = (strpos($actions, ' structure ') !== false);
		$list      = (strpos($actions, ' list ') !== false);
		$add       = (strpos($actions, ' add ') !== false);
		$edit      = (strpos($actions, ' edit ') !== false);
		$delete    = (strpos($actions, ' delete ') !== false);
		$import    = (strpos($actions, ' import ') !== false);
		$export    = (strpos($actions, ' export ') !== false);

		$transactions = array();
		$transactions['structure'] = array($structure, 'Show Structure');
		$transactions['list']      = array($list, 'List');
		$transactions['add']       = array($add, 'Add');
		$transactions['edit']      = array($edit, 'Edit');
		$transactions['delete']    = array($delete, 'Delete');
		$transactions['import']    = array($import, 'Import');
		$transactions['export']    = array($export, 'Export');

		foreach ($transactions as $t) {

			if ($t[0] !== false) {
				$qt++;
			}

		}

//		$server        = $this->getName();
		$server        = '';
//		$id            = sprintf('%s_%s', $server->name, $id);
		$click         = strtolower(substr($click, 0, 8)) == 'function' ? $click : "'" . addslashes($click) . "'";
		$onmouseover   = "doOverItem('{$id}');";
		$onmouseout    = "doOutItem('{$id}');";
		$oncontextmenu = $qt > 0 ? "Util.$$('div_context_menu_{$id}').show_hide();" : '';
//		$onclick       = $action ? sprintf("\$GLOBALS.item_click = %s; doOpenItem('%s', '%s/%s', '%s', 0, '%s');", $click, $id, $server, $action, $params, $pagina) : '';
		$onclick       = $action ? sprintf("\$GLOBALS.item_click = %s; doOpenItem('%s', '%s', '%s', 0, '%s');", $click, $id, $action, $params, $pagina) : '';
		$retorno       = array();

		$retorno[] = PString::format('<table id="{0}" width="100%" cellpadding="0" cellspacing="0"><tr>', $id);
		$retorno[] = sprintf('<td class="JItemTree" oncontextmenu="%s return false;" onclick="%s" onmouseover="%s" onmouseout="%s" style="width:16px;"><img src="%s" style="visibility:%s;" /></td>', $oncontextmenu, $onclick, $onmouseover, $onmouseout, Html::getImagePath('windows/plus.png'), ($action ? 'visible' : 'hidden'));
		$retorno[] = sprintf('<td class="JItemTree" oncontextmenu="%s return false;" onclick="%s" onmouseover="%s" onmouseout="%s" style="width:22px;"><img src="%s" style="width:16px; height:16px;" /></td>', $oncontextmenu, $onclick, $onmouseover, $onmouseout, Html::getImagePath($img_name));
		$retorno[] = sprintf('<td class="JItemTree" oncontextmenu="%s return false;" onclick="%s" onmouseover="%s" onmouseout="%s">%s</td>', $oncontextmenu, $onclick, $onmouseover, $onmouseout, $label);
		$retorno[] = '</tr></table>';
		$retorno[] = sprintf('<div id="div_context_menu_%s" style="display:none; padding-left:20px;">', $id);
		$retorno[] = '<div class="todas" style="">';

		foreach ($transactions as $ac => $t) {

			$action_label = $t[1];

			if ($t[0] !== false) {

				$action_id    = "{$id}_{$ac}";
				$action_img   = "workbench/{$ac}.png";
				$action_click = "Util.$$('div_context_menu_{$id}').hide(); " . ('do' . ucfirst($ac)) . "('{$server}', '{$action}', '{$params}');";

				$retorno[] = sprintf('<table id="%s" style="width:%s;" cellpadding="0" cellspacing="0">', $action_id, '100%');
				$retorno[] = '<tr>';
				$retorno[] = sprintf('<td class="JItemTree" onclick="%s" onmouseover="doOverItem(\'%s\');" onmouseout="doOutItem(\'%s\');" style="width:1px;"><img src="%s" style="display:%s;" /></td>', $action_click, $action_id, $action_id, Html::getImagePath('windows/plus.png'), 'none');
				$retorno[] = sprintf('<td class="JItemTree" onclick="%s" onmouseover="doOverItem(\'%s\');" onmouseout="doOutItem(\'%s\');" style="width:30px;" align="center"><img src="%s" style="width:16px; height:16px;" /></td>', $action_click, $action_id, $action_id, Html::getImagePath($action_img));
				$retorno[] = sprintf('<td class="JItemTree" onclick="%s" onmouseover="doOverItem(\'%s\');" onmouseout="doOutItem(\'%s\');" nowrap>%s</td>', $action_click, $action_id, $action_id, $action_label);
				$retorno[] = '</tr>';
				$retorno[] = '</table>';
			}

		}

		$retorno[] = '</div>';
		$retorno[] = '</div>';
		$retorno[] = sprintf('<div id="div_%s" style="display:none; padding-left:20px;"></div>', $id);

		return implode("\n", $retorno);
	}

	/**
	 * @param array $options
	 * @param array $cols
	 * @param Database $db
	 * @return string */
	public static function datagrid($options, $cols = array(), $db = null) {

		$html  = array();
		$count = 0;

		$html[] = '<table class="grid">';
		$html[] = '<tr>';
		$html[] = sprintf('<th>&nbsp;</th>');

		foreach ($cols as $col) {
			$html[] = sprintf('<th>%s</th>', $col);
		}

		$html[] = '</tr>';

		if (!empty($options)) {

			foreach ($options as $linha) {

				$html[] = '<tr>';
				$html[] = sprintf('<td width="5">%s&nbsp;</td>', ($count + 1));

				foreach ($linha as $value) {

				    if (!isset($value)) {
				        $value = '(null)';
				    }
				    elseif ($value === '') {
				        $value = '';
				    }

					$html[] = sprintf('<td nowrap>%s</td>', htmlentities($db->auto_get($value)));
				}

				$html[] = '</tr>';

				$count++;
			}

		}
		else {
		    $html[] = '<tr><td>no rows selected</td></tr>';
		}

		$html[] = '</table>';

		return implode('', $html);
	}

}
