$(document).ready(function () {
  $("#menu").mmenu({
    // options
  }, {
    // configuration
  })

  $("a[href=#menu]").click(function (e) {
    e.preventDefault()
    $("#menu").trigger("open.mm")
  })
})