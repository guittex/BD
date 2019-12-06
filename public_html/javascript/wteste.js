
function teste($id) {
	Typing.call_user_func(function () {
		alert('function teste');
    }, [$id], "(int)", "teste : void");
}

try {

	teste();
	
//	new JRadioBoxGroup({options : [new JRadioBox("M", "Male"), new JRadioBox("F", "Female")], id: "sexo", selected : "F", label : "Sexo:", click : function () {}}).create();
//	alert([JRadioBoxGroup("el").selectedValue(), JRadioBoxGroup("el").selectedText()]);

}
catch (e) {
	alert(e);
}
