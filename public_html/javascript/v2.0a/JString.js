
String.prototype.startsWith = function ($needle) {
	return (this && this.substr(0, $needle.length) == $needle);
};
