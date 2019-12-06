
var Typing;

function Exception(e, o) {

	this.toString = function () {
		
		var str = "";
		
		for (var i in o) {
			str += "" + i + "\n";
		}
		
		return JString.format("Exception: %s [%s] [%s]\n%s", e, Typing.gettype(o, true), o.constructor.toString());
	};

}

function Typing() {
	
};

Typing = new Typing();

Typing.stackTrace = {};

Typing.validate = function ($func_args, $arg_types, $func_info, $object) {

	// TODO: implementar ? nos parametros como sendo opcional (undefined only)
	// TODO: parametro nao pode ser tipo NULL
	// TODO: implemenar tipo 'mixed' para parametros e retorno
	// TODO: aceitar multiplos tipos? (separados por |)
	// TODO: armazenar chamadas em array (trilha)
	// TODO: checar parametros
	// TODO: checar retorno
	
	throw new Exception('teste validacao tipagem', $object);
};

/** 
 * @description execução de todos os metodos do projeto similando tipagem de dados (parametros e retorno)
 * @param function $callback
 * @param array $func_args - lista de parametros de $callback
 * @param string $arg_types - tipagem dos parametros ex: (string, string) - com parenteses
 * @param string $func_info - nome e retorno da funcao (ex: 'metodo : string|null')
 * @param object (opcional) - se for function avulsa, nao passar este parametro 
 * @returns mixed */
Typing.call_user_func = function ($callback, $func_args, $arg_types, $func_info, $object) {

	this.validate([$callback, $func_args, $arg_types, $func_info, $object], "(function, array, string, string, ?object)", "call_user_func : void", this);
	this.validate($func_args, $arg_types, $func_info, $object);

	alert("Teste");

	var $return_value = $callback();
	
	

};

/** 
 * @description get the type of a variable
 * @param mixed $mixed
 * @param bool $strict (se for true, retorna o nome da classe se $mixed for object. se $mixed for array, retorna no padrao java, ex: string[][])
 * @returns string */
Typing.gettype = function ($mixed, $strict) {

	var $type;

    $strict = $strict ? $strict : false;
	$type   = ($mixed !== undefined ? typeof($mixed) : "");

    if ($type == "number") {
        $type = $mixed.toString().indexOf(".") != -1 ? "double" : "integer";
    }
    else if ($type == "object") {

    	$type = $mixed !== null ? ($mixed instanceof Array ? "array" : $type) : "NULL";

    	if ($strict === true) {
    		
    		if ($type == "object") {
    			$type = $mixed.constructor.toString().split("(")[0].split(" ")[1];
    		}
    		else if ($type == "array") {
    			// TODO: implementar pegar array recursivo (ex: object[] | JRadioBox[] | string[][])
    		}

    	}

    }

    return $type;
};

/** 
 * @example isset('10') : bool - returns true (checa o valor de $mixed e retorna null se for null ou undefined)
 * @example isset(null, []) : mixed - returns [] (se $mixed for null ou undefined, retorna $default)
 * @param mixed $mixed
 * @param mixed $default
 * @returns mixed */
Typing.isset = function ($mixed, $default) {

    if (arguments.length > 1) {
        return (this.isset($mixed) ? $mixed : $default);
    }

    return ($mixed !== undefined); // ao usar strict, deverei tratar undefined e null separadamente
//    return ($mixed !== undefined && $mixed !== null); // php is not typing
};

Typing.is = function ($mixed, $validTypes) {
	return this.call_user_func(function () {
		
		var $type = this.gettype($mixed);

		return ($type && $validTypes.indexOf($type) != -1);
    }, [$class, $objectVars], "(mixed, string)", "bool", this);
};

Typing.is_array = function ($mixed) {
	return (this.gettype($mixed, false) == "array");
};

Typing.is_boolean = function ($mixed) {
	return (this.gettype($mixed) == "boolean");
};

Typing.is_double = function ($mixed) {
	return (this.gettype($mixed) == "double");
};

Typing.is_function = function ($mixed) {
	return (this.gettype($mixed) == "function");
};

Typing.is_integer = function ($mixed) {
	return (this.gettype($mixed) == "integer");
};

Typing.is_null = function ($mixed) {
	return (this.gettype($mixed) == "NULL");
};

Typing.is_object = function ($mixed) {
	return (this.gettype($mixed, false) == "object");
};

Typing.is_string = function ($mixed) {
	return (this.gettype($mixed) == "string");
};

Typing.is_callable = function ($mixed) {
	return this.is_function($mixed);
};

Typing.is_bool = function ($mixed) {
	return this.is_boolean($mixed);
};

Typing.is_int = function ($mixed) {
	return this.is_integer($mixed);
};

/** 
 * @description retorna ou seta a propriedade $propertyName de um objeto $object
 * @param object $object
 * @param string $propertyName
 * @param mixed $new_value (opcional)
 * @param function $callback (opcional)
 * @returns mixed */
Typing.get_set = function ($object, $propertyName, $new_value, $callback) {
	return this.call_user_func(function () {

		// TODO: implementar propriedades duplas (ex: style.display)
		
		var $isCallable = Typing.isset($callback);

		if (Typing.isset($new_value)) {
			$object[$propertyName] = ($isCallable ? $callback($new_value) : $new_value);
		}

		return (Typing.isset($object[$propertyName]) ? ($isCallable ? $callback($object[$propertyName]) : $object[$propertyName]) : null);
    }, [$object, $propertyName, $new_value, $callback], "(object, string, ?mixed, ?function)", "get_set : mixed", this);
};

/** 
 * @description seta as propriedades do objeto $class com as propriedades de $objectVars (metodos nao sao setados)
 * @param object $class
 * @param object $objectVars
 * @returns void */
Typing.setByObject = function ($class, $objectVars) {
	this.call_user_func(function () {

    	for (var $attr in $objectVars) {

    		if (!Typing.is_callable($objectVars[$attr])) { // se nao for metodo
    			Typing.get_set($class, $attr.toUpperCase(), $objectVars[$attr]);
    		}

    	}

    }, [$class, $objectVars], "(object, object)", "setByObject : void", this);
};
