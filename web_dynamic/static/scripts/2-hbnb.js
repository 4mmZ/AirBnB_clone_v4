$(document).ready(function() {
    let checkedAmenities = [];

    $('.amenity-checkbox').change(function() {
        let amenityId = $(this).parent().data('id');

        if (this.checked) {
            checkedAmenities.push(amenityId);
        } else {
            checkedAmenities = checkedAmenities.filter(function(id) {
                return id !== amenityId;
            });
        
        }
        $('.amenities h4').text('Checked Amenities: ' + checkedAmenities.join(', '));

    });

    $.get('http://http://0.0.0.0:5001/api/v1/status/', function(data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
});
