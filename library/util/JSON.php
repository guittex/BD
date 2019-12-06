<?php

class JSON {
	
	public static function read($filename) {
		
		if (file_exists($filename)) {

		    if (!is_readable($filename)) {
		        throw new Exception("filename $filename is not readable.");
		    }

			return json_decode(file_get_contents($filename));
		}
		
		return null;
	}
	
	public static function write($filename, $object, $indent = false) {

		$type = gettype($object);

		if ($type == 'array' || $type == 'object') { // nao funciona com propriedades protected e private

			$aux = $type == 'array' ? $object : get_object_vars($object);

			if (!empty($aux)) {

			    if (is_writable($filename) !== true) {
			        throw new Exception("filename $filename is not writeable.");
			    }

   				file_put_contents($filename, self::parse($object, $indent));
			    return true;
			}

		}

		return false;
	}
	
	public static function parse($mixed, $indent = false) {
		
		$json = '';
		$type = gettype($mixed);
		$num  = func_num_args();
		
		// TODO: implementar a indentacao para formatar o arquivo gerado na collection.save
		
		if ($type == 'array' || $type == 'object') {
			
			$json   = array();
			$atts   = $type == 'array' ? $mixed : get_object_vars($mixed);
			$format = ['array' => ['[%s]', '{1}'], 'object' => ['{%s}', '"{0}" : {1}']];

			foreach ($atts as $att_name => $att_value) {
				$json[] = PString::format($format[$type][1], $att_name, self::parse($att_value, $indent, false));
			}
			
			$json = sprintf($format[$type][0], implode(', ', $json));
		}
		else if ($type == 'boolean') {
			$json = $mixed ? 'true' : 'false';
		}
		else if ($type == 'double' || $type == 'integer') {
			$json = $mixed;
		}
		else if ($type == 'NULL') {
			$json = 'null';
		}
		else {
			$json = $num < 3 ? $mixed : ('"' . addslashes($mixed) . '"');
		}

		return $json;
	}
	
}
