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

  $.get("http://http://0.0.0.0:5001/api/v1/status/", function (data) {
    if (data.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });

  fetch("http://0.0.0.0:5001/api/v1/places_search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((place) => {
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
    });
});
