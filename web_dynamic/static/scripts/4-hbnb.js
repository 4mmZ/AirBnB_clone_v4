$(document).ready(function () {
  let checkedAmenities = [];

  $(".amenity-checkbox").change(function () {
    let amenityId = $(this).parent().data("id");

    if (this.checked) {
      checkedAmenities.push(amenityId);
    } else {
      checkedAmenities = checkedAmenities.filter(function (id) {
        return id !== amenityId;
      });
    }
    $(".amenities h4").text(
      "Checked Amenities: " + checkedAmenities.join(", ")
    );
  });

  $("#searchButton").click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify({ amenities: checkedAmenities }),
      contentType: 'application/json',
      success: function (data) {
        $(".places").empty(); // Clear existing content
        data.forEach(function (place) {
          const article = document.createElement("article");
          article.innerHTML =
            `
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest}</div>
              <div class="number_rooms">${place.number_rooms} Bedrooms</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
            </div>
            <div class="description">${place.description}</div>
        `;
          $(".places").append(article);
        });
      }
    });
  });

  $.get("http://0.0.0.0:5001/api/v1/status/", function (data) {
    if (data.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });

});
