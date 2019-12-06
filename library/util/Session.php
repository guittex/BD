<?php

class Session {

	public static function getAttributeName() {
		return APP_SESSION_ATTRIBUTE;
	}
/**
* @example void append($name, $value);
* @example void append($name, $index, $value); */
	public static function append() {

		$attr = self::getAttributeName();
		$num  = func_num_args();
		$name = func_get_arg(0);

		if ($num >= 3) {
			$index = func_get_arg(1);
			$value = func_get_arg(2);
		}
		else if ($num == 2) {
			$value = func_get_arg(1);
		}

		if (!isset($_SESSION[$attr][$name])) {
			$_SESSION[$attr][$name] = array();
		}

		self::set($name, $value, $index);
	}

/** string concat($name, [$str1, $str2...]); */
	public static function concat() {

		$attr = self::getAttributeName();
		$args = func_get_args();
		$name = array_shift($args);

		if (!isset($_SESSION[$attr][$name])) {
			$_SESSION[$attr][$name] = '';
		}

		return $_SESSION[$attr][$name] .= implode('', $args);
	}

	public static function close() {
		unset($_SESSION[self::getAttributeName()]);
	}
/**
 *
 * @example mixed get($name);
 * @example mixed get($name, boolean $remove);
 * @example mixed get($name, int $index);
*/
	public static function get() {

		$attr = self::getAttributeName();

		if (!isset($_SESSION[$attr])) {
			$_SESSION[$attr] = array();
		}

		$name = func_get_arg(0);

		if (func_num_args() >= 2) {

			$arg1 = func_get_arg(1);
			$type = gettype($arg1);

			if ($type == 'boolean') {
				$remove = $arg1;
			}
			else if ($type == 'integer') {
				$index = $arg1;
			}

		}

		$value = isset($_SESSION[$attr][$name]) ? $_SESSION[$attr][$name] : null;

		if (isset($index)) {

			if (is_array($value)) {
				$value = isset($value[$index]) ? $value[$index] : null;
			}

		}

		if (isset($remove)) {

			if ($remove) {
				self::remove($name);
			}

		}

		return (self::isSerialized($value) ? unserialize($value) : $value);
	}

	public static function init() {
		session_start();
	}
/**
 * @example void remove($name);
 * @example void remove($name, $index); */
	public static function remove() {

		$attr = self::getAttributeName();
		$name = func_get_arg(0);

		if (func_num_args() >= 2) {
			$index = func_get_arg(1);
		}

		if (isset($index)) {

			if (is_array($_SESSION[$attr][$name])) {
				unset($_SESSION[$attr][$name][$index]);
			}

		}
		else {
			unset($_SESSION[$attr][$name]);
		}

	}

	public static function set($name, $value, $index = null) {

		$value = is_object($value) ? serialize($value) : $value;

		if (isset($index)) {
			$_SESSION[self::getAttributeName()][$name][$index] = $value;
		}
		else {
			$_SESSION[self::getAttributeName()][$name] = $value;
		}

	}

	public static function isLogged() {
		return is_object(self::get('user'));
	}

	public static function isSerialized($value) {

		$type = gettype($value);

		if ($type == 'string') {

			$i = 2;

			if (substr($value, 0, 2) == 'O:' && substr($value, -1, 1) == '}') {

				do {
					$i++;
				}
				while (is_numeric(substr($value, $i, 1)));

				if (substr($value, $i, 2) == ':"') {
					return true;
				}

			}

		}

		return false;
	}

}
