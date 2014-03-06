/**
 * XULSchoolChrome namespace.
 */

var XULSchoolChrome = {};

/**
 * Controls the browser overlay for the Hello World extension.
 */
XULSchoolChrome.BrowserOverlay = {
  /**
   * Says 'Hello' to the user.
   */
  // sayHello : function(aEvent) {
  //   let stringBundle = document.getElementById("xulschoolhello-string-bundle");
  //   let message = stringBundle.getString("xulschoolhello.greeting.label");

  //   window.alert(message);
  // }

    sayHello : function(aEvent) {
      var selRange = content.document.getSelection ();
      document.getElementById('clicktionary-definition-label').value = selRange.getRangeAt(0).toString();
    },

    define : function(aEvent) {
      var selRange = content.document.getSelection().getRangeAt(0);
      var word = selRange.toString();

      var oReq = new XMLHttpRequest();
      oReq.overrideMimeType("text/xml");
      oReq.onload = function reqListener () {
        var fullDef = this.responseXML.firstChild.textContent;
        var defOne = fullDef.substr(fullDef.indexOf("1."), fullDef.substr(fullDef.indexOf("1.")).indexOf(";"));
        var defOnePretty = (defOne.substr(3) + ".").replace(/\s+/g, " ");
        console.log(defOnePretty);
        document.getElementById('clicktionary-definition-label').value = defOnePretty;        
      };

      oReq.open("get", "http://services.aonaware.com//DictService/DictService.asmx/DefineInDict?dictId=gcide&word=" + word, true);
      oReq.send();


    }
};



