
JRadioBox = function ($value, $text) {

    this.VALUE = $value;
    this.TEXT  = $text;

    this.value = function () {
        return Typing.get_set(this, "VALUE", arguments[0]);
    };

    this.text = function () {
        return Typing.get_set(this, "TEXT", arguments[0]);
    };

};

/** 
 * @description JRadioBoxGroup - properties => options (JRadioBox[]), id, selected, label, click (function)
 * @returns JRadioBoxGroup */
JRadioBoxGroup = function () {

    var $type = Typing.gettype(arguments[0]);

    if ($type == "string") { // id
        return Typing.isset(JComponent.JELEMENTS[arguments[0]], null);
    }
    else if ($type == "object") {

        Typing.setByObject(this, arguments[0]);
        this.PARENT_ID = "parent_" + this.ID;
        this.DIV_ID    = "div_" + this.ID;

        this.selectedValue = function () {

        };

        this.selectedText = function () {

        };

        this.create = function () {

            var $html    = "";
            var $divName = "#" + this.DIV_ID;

            $html += 'radiobox';
            
            $($divName).html($html);
        };

        JComponent.JELEMENTS[this.ID] = this;
    }

};
