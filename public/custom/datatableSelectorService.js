function setupDataTableSelectorRulesEventListener(jQ, tableId) {
  jQ(tableId).on("click", "td", function (e) {
    let tagname = "";
    if (e) {
      tagname = e.target.tagName.toLowerCase();
    }
    if (tagname == "td") {
      if (jQ(this).parent().hasClass("selected-row-data-grid")) {
        jQ(".selected-row-data-grid")
          .not()
          .removeClass("selected-row-data-grid");
      } else {
        jQ(".selected-row-data-grid")
          .not()
          .removeClass("selected-row-data-grid");
        jQ(this).parent().toggleClass("selected-row-data-grid");
      }
    } else if (tagname === "tr") {
      if (jQ(this).hasClass("selected-row-data-grid")) {
        jQ(".selected-row-data-grid").removeClass("selected-row-data-grid");
      } else {
        jQ(".selected-row-data-grid").removeClass("selected-row-data-grid");
        jQ(this).toggleClass("selected-row-data-grid");
      }
    }
  });
}
