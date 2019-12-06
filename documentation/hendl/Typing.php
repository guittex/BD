<?php

class Typing {

	public function __overload($methodName, $func_get_args, $typingCallback) {
	
		try {
			$callback = Typing::validate($this, $methodName, $func_get_args, $typingCallback);
			return call_user_func_array($callback, $func_get_args);
		}
		catch (Exception $e) {
			throw new Exception(sprintf('%s in %s.%s', $e->getMessage(), get_class($this), $methodName));
		}

	}

	/**
	 * @param string|object $className
	 * @param string $methodName
	 * @param string|array $passedTypesList
	 * @param string|array $typingList
	 * @return string*/
	public static function formatInvalidMethodMessage($className, $methodName, $passedTypesList = null, $typingList = null) {

		$type = gettype($typingList);

		if ($type == 'array' || $type == 'string') {
			$methodName = implode('', [$methodName, '(', ($type == 'array' ? implode(', ', $typingList) : $typingList), ')']);
		}

		return sprintf('The method %s in the type %s is not applicable for the arguments (%s)', $methodName, (is_object($className) ? get_class($className) : $className), (is_array($passedTypesList) ? implode(', ', $passedTypesList) : $passedTypesList));
	}

	private static function getTypes($func_get_args) {

		$passedTypesList = [];

		foreach ($func_get_args as $p) {
			array_push($passedTypesList, gettype($p));
		}

		return $passedTypesList;
	}

	public static function isValid($typing, $passedType) {

		if ($typing != 'mixed') {
			return ((strpos($typing, $passedType) !== false) || ($typing == 'object' && $passedType == 'NULL'));
		}

		return true;
	}

	public static function validate($className, $methodName, $func_get_args, $types) {

		$thisTyping = ['string|object', 'string', 'array', 'array'];
		$thisClass  = 'Typing';
		$thisMethod = 'validate';
		$thisTypes  = self::getTypes(func_get_args());
		$error      = 0;

		if (count($thisTypes) != 4) {
			throw new Exception(self::formatInvalidMethodMessage($thisClass, $thisMethod, $thisTypes, $thisTyping));
		}

		foreach ($thisTypes as $index => $passedType) {

			if (!self::isValid($thisTyping[$index], $passedType)) {
				$error = 1;
				break;
			}

		}

		if ($error) {
			throw new Exception(self::formatInvalidMethodMessage($thisClass, $thisMethod, $thisTypes, $thisTyping));
		}

		$passedTypes = self::getTypes($func_get_args);
		$passedCount = count($func_get_args);

		if (!isset($types[$passedCount])) {
			throw new Exception(self::formatInvalidMethodMessage($className, $methodName, (implode(', ', $passedTypes) . ') - (callback params not passed'), str_repeat('?', $passedCount)));
		}

		$object = $types[$passedCount];

		if (!is_string(@$object[0])) {
			throw new Exception(sprintf('The method %s of the type %s expects parameter $typingCallback[%s][0] to be string', $methodName, (is_object($className) ? get_class($className) : $className), $passedCount));
		}
		
		$declaredTypes = !empty($object[0]) ? explode(', ', $object[0]) : [];

		if ($passedCount != count($declaredTypes)) {
			throw new Exception(self::formatInvalidMethodMessage($className, $methodName, $passedTypes, $declaredTypes));
		}

		$error = 0;

		foreach ($passedTypes as $index => $passedType) {

			if (!self::isValid($declaredTypes[$index], $passedType)) {
				$error = 1;
				break;
			}

		}

		if ($error) {
			throw new Exception(self::formatInvalidMethodMessage($className, $methodName, $passedTypes, $declaredTypes));
		}

		if (!is_callable(@$object[1])) {
			throw new Exception(sprintf('The method %s of the type %s expects parameter $typingCallback[%s][1] to be callable', $methodName, (is_object($className) ? get_class($className) : $className), $passedCount));
		}

		return $object[1];
	}

}

