function f_prepare_menu() {
  //create menu html
  f_create_menu_html_from_json();
  //create menus and hide them
  $.each(_main_menu, function(_entry_index, _entry) {
    $("#menu-"+_entry["menu-name"]).menu().hide();
  });
  //clear menus when click
  $("body").on("click", f_hide_all_menu);
  //show sub menus when mouse is over the main menu
  $("#panda-main-menu>li>div").each(function() {
    $(this).on("mouseover", function(event) {
      //hide all menu
      f_hide_all_menu();
      event.stopPropagation();

      //show the selected menu
      var _menu_name = "#menu-" + $(this).text();
      console.log("clicked menu name is:" + _menu_name);

      $(_menu_name).show("fast");
    });
  });
  //add handler for the real menu items
  $(".panda-menu-item").on("click", function() {
    //get selected menu name
    var _menu_name = "";
    $(this).parentsUntil("#panda-main-menu").each(function(){
      var _menu_obj = $(this);
      if(_menu_obj.is("li")) {
        _menu_name = _menu_obj.children("div").text() + "/" + _menu_name;
      }
    });
    //show the location
    $("#current-location").text(_menu_name);
    //TODO: add other functions here
  });
}

function f_create_menu_html_from_json() {
  var _html="";
  //get simulation data
  $.each(_main_menu, function(_entry_index, _entry) {
    //build the level-1 menu
    var _menu_name = _entry["menu-name"];
    _html += '<li class="ui-button ui-corner-top ui-widget">\r\n'
          + '\t<div>'+ _menu_name +'</div>\r\n';
    //build the level-2 menu
    if(_entry["child"]) {
      if(_entry_index < _main_menu.length -1) {
        _html += '\t<ul id="menu-' + _menu_name + '" class="panda-menu-level-2">\r\n';
      } 
      else {
        _html += '\t<ul id="menu-' + _menu_name + '" class="panda-menu-level-2-last">\r\n';
      }
      //build the child items
      _html += f_create_child_menu(_entry["child"]);
      _html += '\t</ul>\r\n';
      _html += '</li>\r\n';
    }
  });
  console.log(_html);

  $("#panda-main-menu").prepend(_html);
}

function f_create_child_menu(_data) {
  //var _html = '<div>'+ _data["menu-name"]+'</div>\r\n';
  var _html = "";

  $.each(_data, function(_entry_index, _entry) {
    if(_entry["child"]) {
      _html += '\t\t<li><div>' + _entry["menu-name"]+ '</div>\r\n';
      _html += "\t\t<ul>\r\n";
      _html += f_create_child_menu(_entry["child"]);
      _html += "\t\t</ul>\r\n";
      _html += '\t\t</li>\r\n';
    }
    else {
      _html += '\t\t<li><div class="panda-menu-item">' + _entry["menu-name"]+ '</div></li>\r\n';
    }
  });

  return _html;
}

function f_hide_all_menu () {
  $("#panda-main-menu>li>ul").each(function() {
    $(this).hide();
  });
}