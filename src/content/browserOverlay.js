/**
 * Clicktionary namespace.
 */

var Clicktionary = {};

/**
 * Controls the browser overlay for the Hello World extension.
 */
Clicktionary.BrowserOverlay = {

    sayHello : function(aEvent) {
      var selRange = content.document.getSelection ();
      document.getElementById('clicktionary-definition-label').value = selRange.getRangeAt(0).toString();
    },

    define : function(aEvent) {
      if(!Clicktionary.BrowserOverlay.checkInput()) {
        document.getElementById('clicktionary-definition-label').value = "Not a word.";
      }

      else {
        var selRange = content.document.getSelection().getRangeAt(0);
        var word = selRange.toString();

        var oReq = new XMLHttpRequest();
        oReq.overrideMimeType("text/xml");
        oReq.onload = function reqListener () {
          console.log(this.responseXML.firstChild.textContent);
          var fullDef = Clicktionary.BrowserOverlay.parseDefinition(this.responseXML.firstChild.textContent);
          var defOne = fullDef.substr(fullDef.indexOf("1."), fullDef.substr(fullDef.indexOf("1.")).indexOf(";"));
          var defOnePretty = (defOne.substr(3) + ".").replace(/\s+/g, " ");
          console.log(defOnePretty);
          document.getElementById('clicktionary-definition-label').value = fullDef;        
        };

        oReq.open("get", "http://services.aonaware.com//DictService/DictService.asmx/DefineInDict?dictId=gcide&word=" + word, true);
        oReq.send();
      }
    },

    parseDefinition : function(definition) {
      if (definition.indexOf("1. ") != -1) {
        var defOne = definition.substr(definition.indexOf("1."), definition.substr(definition.indexOf("1.")).indexOf(";"));
        console.log(defOne);
        var defOnePretty = (defOne.substr(3) + ".").replace(/\s+/g, " ");
      }
      else {
        var defOne = definition.substr(definition.indexOf("."), definition.substr(definition.indexOf(".")).indexOf("."));
        arrayOfLines = definition.match(/[^\r\n]+/g);
        for(var i = arrayOfLines.length - 1; i >= 0; i--) {
          arrayOfLines[i] = arrayOfLines[i].trim();
          if(!arrayOfLines[i] || /^\s*$/.test(arrayOfLines[i])) {
             arrayOfLines.splice(i, 1);
          }
        }
        if(arrayOfLines.length == 1) {
          return "No definition found."
        }

        console.log(arrayOfLines);
        console.log(defOne);
        var defOnePretty = arrayOfLines[5];
      }

      console.log(defOnePretty);
      return defOnePretty;
    },

    checkInput : function(aEvent) {
      var selRange = content.document.getSelection().getRangeAt(0);
      var word = selRange.toString().trim();
      var result = /^[a-zA-Z]*$/.test(word);
      return result;
    }
};



