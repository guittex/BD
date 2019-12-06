
var JString = new Object();

JString.format = function () {

	var $format = "";
	
	for (var $i = 0, $len = arguments.length; $i < $len; $i++) {

		if ($i == 0) {
			$format = arguments[$i].toString();
		}
		else {

			$format = $format.replace("%s", arguments[$i]);
			$search = ("{" + ($i - 1) + "}");

			do {
				$format = $format.replace($search, arguments[$i]);
			}
			while ($format.indexOf($search) != -1);

		}

	}
	
	return $format;
};
