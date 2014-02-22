window.onload = init;

function init() {

	// Initialize map
	var map = L.mapbox.map('map', 'pichot.gdo5mg5o', {
  		detectRetina: true
	});

	// Add geoJSON layer for private parcels
	L.geoJson(parcels, {
		onEachFeature: bindPrivateInfo, // Call this function on each geoJSON feature
		style: { 'color': parcelColors["private"] }
	}).addTo(map);
	
	// Add geoJSON layer for state parcels
	L.geoJson(state_parcels, {
		onEachFeature: bindStateInfo,
		style: { 'color': parcelColors["state"] }
	}).addTo(map);
	
	// Add search box
	new L.Control.GeoSearch({
        provider: new L.GeoSearch.Provider.Google(),
        position: 'topcenter'
    }).addTo(map);

  // Add legend
  var legend = L.control({position: 'bottomright'});
  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'), labels = [];

		labels.push('<i style="background:' + parcelColors["private"] + '"></i> ' + 'private parcels');
		labels.push('<i style="background:' + parcelColors["state"] + '"></i> ' + 'state parcels');

		div.innerHTML = labels.join('<br>');
		return div;
  };
  legend.addTo(map);
}

// Attach an informational popup to each polygon
function bindPrivateInfo(feature, layer) {
		layer.bindPopup('Address: ' + feature.properties.Address + '<br>' +
						'City: ' + 	  feature.properties.City );	
}

function bindStateInfo(feature, layer) {
	layer.bindPopup('Description: ' + feature.properties.ownerdesc + '<br>' +
					'Lesee Name: ' + feature.properties.vn_leseenm );
}

// get color depending on parcel type
parcelColors = {
  "private": "#FF0000",
  "state": "#B31453"
}
