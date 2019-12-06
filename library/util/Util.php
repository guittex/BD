<?php

class Util {
    
    public static function concat() {
        $args = func_get_args();
        return implode('', $args);
    }

/** @deprecated */
	public static function getColumn($resultset, $colname) {
		
		$array = array();
		
		if (is_array($resultset)) {
			
			foreach ($resultset as $linha) {
				$array[] = isset($linha->$colname) ? $linha->$colname : null;
			}
			
		}
		
		return $array;
	}
	
/**
 * @example int getMax(stdClass[] $haystack, string $column_name);
 * @example int getMax(int[] $haystack);
 * */
	public static function getMax() {
		
		$num   = func_num_args();
		$array = array();
		
		if ($num == 2) {
			$array = self::getColumn(func_get_arg(0), func_get_arg(1));
		}
		else if ($num == 1) {
			$array = func_get_arg(0);
		}
		
		rsort($array);
		
		return (!empty($array) ? $array[0] : 0);
	}

/** @deprecated */
	public static function orderBy($resultset, $colname) { // TODO: terminar
		
		if (is_array($resultset)) {
			
			$exp = explode(' ', $colname);
			
			if (isset($exp[1])) {
				$orderby = strtolower($exp[1]);
				$colname = $exp[0];
			}
			else {
				$orderby = 'asc';
			}
			
			$coluna_aux = array();
			$aux = array();
			
			foreach ($resultset as $index => $linha) {
				$coluna_aux[$index] = isset($linha->$colname) ? $linha->$colname : null;
			}
			
			// TODO: implementar ordenação por string data
			
			if ($orderby == 'desc') {
				arsort($coluna_aux);
			}
			else {
				asort($coluna_aux);
			}
			
			foreach ($coluna_aux as $index => $vl) {
				$aux[] = $resultset[$index];
			}
			
			$resultset = $aux;
		}
		
		return $resultset;
	}
	
	public static function removeComments($string) {
	    
	    // TODO: passar para Database
		
		$qt_ini = substr_count($string, '/*');
		$qt_fim = substr_count($string, '*/');
		
		if ($qt_ini == $qt_fim && $qt_ini > 0) {
			
			do {
				
				$ini = strpos($string, '/*');
				$fim = strpos($string, '*/');
				$str = array();
				
				$str[] = substr($string, 0, $ini);
				$str[] = substr($string, ($fim + 2));
				
				$string = implode('', $str);
			}
			while (strpos($string, '/*') && strpos($string, '*/') !== false);
			
		}
		
		return $string;
	}

/**
 * @desc ex: se $args = ['id' => 1, 'nome' => 'teste'] returns 'id=1&nome=teste' 
 * @param array $args
 * @return string */
	public static function toQueryString($args) {

	    // TODO: criar metodo inverso - queryString2array (se eu quiser usar stdClass, dou casting (object) no retorno do metodo que retorna array)
	    // TODO: no javascript tambem usa um metodo deste

	    $aux = array();

	    if (is_array($args)) {

	        foreach ($args as $name => $value) {
	            $aux[] = sprintf('&%s=%s', $name, $value);
	        }

	    }

	    return implode('', $aux);
	}

}
