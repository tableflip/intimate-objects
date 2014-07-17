(function () {
  var form = $('form')
  
  form.submit(function (e) {
    e.preventDefault()

    $.post(form.attr('action'), {email: $('[type=email]').val()}, function () {
      form.replaceWith('<p>Thanks, your request has been submitted - please check your email to confirm.')
    })
  })
})()

var $mapbox = $('#mapbox')
var loc = $mapbox.data('location')
var name = [$mapbox.data('location-name'), $mapbox.data('location-street1')].filter(function(i) { return !!i }).join(', ')
if (loc) {
  var coords = [loc[1], loc[0]]

  var map = L.map('mapbox', {
    center: coords,
    zoom:15,
    attributionControl:false,
    zoomControl: false
  })

  L.tileLayer("http://{s}tile.stamen.com/toner/{z}/{x}/{y}.png", {
    "minZoom":      0,
    "maxZoom":      20,
    "subdomains":   ["", "a.", "b.", "c.", "d."],
    "scheme":       "xyz",
    "attribution":""
  }).addTo(map);

  var marker = L.circleMarker(map.getCenter(), {
    color:'#000',
    opacity:0.9
  })
  marker.addTo(map)
  marker.bindPopup('<a target="_blank" href="https://www.google.com.au/maps/place/'+ coords.join(",") +'/@' + coords.join(",") + ',8z?q='+ name +'">' + name +' </a>')

}
