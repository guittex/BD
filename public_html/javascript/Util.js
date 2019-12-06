
var Util = new Object();

Util.getKeyCode = function ($event) {
	return (this.isIE() ? $event.keyCode : $event.which);
};

Util.isEnter = function ($event) {
	return (this.getKeyCode($event) == 13);
};

Util.isIE = function () {
	return (window.navigator.userAgent.toLowerCase().indexOf("edge") != -1 || window.navigator.userAgent.toLowerCase().indexOf(".net") != -1);
};

Util.isMobile = function () {
	return (window.navigator.userAgent.toLowerCase().indexOf("android ") != -1 || window.navigator.userAgent.toLowerCase().indexOf("mobile ") != -1);
};
