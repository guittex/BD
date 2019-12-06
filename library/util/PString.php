<?php

class PString {
	
	protected $val;
	
	function __construct($string) {
		$this->val = "{$string}";
	}
	
	function __toString() {
		return "{$this->val}";
	}
	
/** bool endsWith([$needle1, $needle2, ...]); */
	public function endsWith() {
	
		$num  = func_num_args();
		$args = func_get_args();
	
		if ($num > 0) {
	
			if ($num > 1) {
	
				$ok = false;
	
				foreach ($args as $needle) {
	
					if ($this->endsWith($needle)) {
						$ok = true;
						break;
					}
	
				}
	
				return $ok;
			}
			else {
				return ($args[0] && substr($this->val, (strlen($args[0]) * -1)) == $args[0]);
			}
	
		}
		else {
			die('PString.endsWith::error::no argument has passed');
		}
	
		return false;
	}
	
/** bool equals([$needle1, $needle2, ...]); */
	public function equals() {
		
		$num  = func_num_args();
		$args = func_get_args();
		
		if ($num > 0) {
			
			if ($num > 1) {
				
				$ok = false;
				
				foreach ($args as $needle) {
					
					if ($this->equals($needle)) {
						$ok = true;
						break;
					}
					
				}
				
				return $ok;
			}
			else {
				return ($this->val == $args[0]);
			}
			
		}
		else {
			die('PString.equals::error::no argument has passed');
		}

		return false;
	}
	
	public function indexOf($needle) {
		$pos = strpos($this->val, $needle);
		return ($pos !== false ? $pos : -1);
	}
	
	public function lastIndexOf($needle) {
		$pos = strrpos($this->val, $needle);
		return ($pos !== false ? $pos : -1);
	}
	
	public function length() {
		return strlen($this->val);
	}
	
	public function ltrim($character_mask = null) {
	
		if (isset($character_mask)) {
			return ltrim($this->val, $character_mask);
		}
	
		return ltrim($this->val);
	}
	
	public function pad($pad_length, $pad_string = null, $pad_type = null) {
		
		$pad_string = isset($pad_string) ? $pad_string : '';
		$pad_type   = isset($pad_type) ? $pad_type : STR_PAD_RIGHT;
		
		return str_pad($this->val, $pad_length, $pad_string, $pad_type);
	}
	
	public function repeat($multiplier) {
		return str_repeat($this->val, $multiplier);
	}
	
	public function replaceAll($search, $replace) {
		return str_replace($search, $replace, $this->val);
	}
	
	public function rtrim($character_mask = null) {
	
		if (isset($character_mask)) {
			return rtrim($this->val, $character_mask);
		}
	
		return rtrim($this->val);
	}
	
	public function split($delimiter) {
		return explode($delimiter, $this->val);
	}
	
/** bool startsWith([$needle1, $needle2, ...]); */
	public function startsWith() {
		
		$num  = func_num_args();
		$args = func_get_args();
		
		if ($num > 0) {
				
			if ($num > 1) {
		
				$ok = false;
		
				foreach ($args as $needle) {
						
					if ($this->startsWith($needle)) {
						$ok = true;
						break;
					}
						
				}
		
				return $ok;
			}
			else {
				return ($args[0] && substr($this->val, 0, strlen($args[0])) == $args[0]);
			}
				
		}
		else {
			die('PString.startsWith::error::no argument has passed');
		}
		
		return false;
	}
	
	public function substr($start, $limit = null) {
		
		if (isset($limit)) {
			return substr($this->val, $start, $limit);
		}
		
		return substr($this->val, $start);
	}
	
	public function toLowerCase() {
		return strtolower($this->val);
	}
	
	public function toUpperCase() {
		return strtoupper($this->val);
	}
	
	public function trim($character_mask = null) {
		
		if (isset($character_mask)) {
			return trim($this->val, $character_mask);
		}
		
		return trim($this->val);
	}
	
	public static function format() {
		
		$args   = func_get_args();
		$format = array_shift($args);
		
		if (!empty($format)) {
			
			foreach ($args as $index => $val) {
				$format = str_replace(('{' . $index . '}'), $val, $format);
			}
			
		}
		
		return $format;
	}
	
}
