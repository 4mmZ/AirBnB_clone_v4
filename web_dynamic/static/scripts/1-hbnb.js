$(document).ready(function() {
    var checkedAmenities = [];


    $('.amenity-checkbox').change(function() {
        var amenityId = $(this).parent().data('id');

        if (this.checked) {
            checkedAmenities.push(amenityId);
        } else {
            checkedAmenities = checkedAmenities.filter(function(id) {
                return id !== amenityId;
            });
        
        }
        $('.amenities h4').text('Checked Amenities: ' + checkedAmenities.join(', '));

    });
});
