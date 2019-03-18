(function () {
  var file = file || "README.md";
  var reader = new stmd.DocParser();
  var writer = new stmd.HtmlRenderer();
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200) {
      display(xhr);
    }
  };

  function display(xhr) {
    var parsed = reader.parse(xhr.responseText);
    var content = writer.renderBlock(parsed);
    document.getElementsByTagName('body')[0].innerHTML = content;

    // fix anchors
    var h2s = document.getElementsByTagName("h2");
    for(var i=0; i<h2s.length;i++){
      var anchorName = h2s[i].innerHTML.toLowerCase().replace(" ", "-");
      h2s[i].setAttribute('id', anchorName);
      h2s[i].setAttribute('name', anchorName);
    }

    // fix links
    var links = document.getElementsByTagName("a");
    for(var i=0; i<links.length;i++){
      if(links[i].getAttribute('href').substring(0, 1) != "#"){
        links[i].setAttribute('target', '_blank');
      }
    }

    
    /* try to extract h1 title and use as title for page
       if no h1, use name of file 
    */
    try {
      document.title = document.querySelector('h1').textContent
    } catch (e) {
      document.title = file;
    }
  }

  xhr.open('GET', file);
  xhr.send();
})();

