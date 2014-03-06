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
      alert(selRange.toString ());
  	}
};



