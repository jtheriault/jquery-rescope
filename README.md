What is it
==========
Rescope is a jQuery plugin for creating a mock DOM within the bounds of a 
test.  This can be used in place of creating a mock jQuery to simulate 
accessing the target DOM or writing test HTML separately from your test.   

Example
=======
Here is a test for a hypothetical app whose *cancelSave* method is meant to hide
a div of ID *saveDialog*.
```
var $mock = $('<div id="saveDialog">Save me!</div>').rescope();

// Inject jQuery instance tied to our mock DOM
app = new App($mock);

// Perform tested action
app.cancelSave();

ok(!$mock('#saveDialog').is(':visible'), 'Cancel hides dialog div');
```

Options
=======
### css
*default: {display: 'none', height: '100%', width: '100%'}*

Sets the CSS properties of the iframe element in which the DOM is scoped.  This
is intended for cases when the test depends upon a specific rendering situation
(e.g. within a non-scrolling document).
 
Roadmap
=======
~~Bower registration~~
Build process
