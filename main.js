import './reset.css';
import './style.css';

// import Swiper JS
import Swiper from 'swiper';
// import Swiper styles
import 'swiper/css';

new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

async function reverseGeocode(lat, lng) {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=address&access_token=pk.eyJ1IjoiYXJtaW5kcyIsImEiOiJjbGVta3F5OGIxNm9yM3ZtaXhrbDVzOTR6In0.CKcXAK61aJH7wOTgmULKpQ&language=en&limit=1`,
    );
    const data = await response.json();
    return data.features[0].place_name;
  } catch (error) {
    console.error(error);
  }
}

async function performReverseGeocoding() {
  const lat = 51.27714;
  const lng = 4.41826;

  try {
    // Show the loader
    const loader = document.querySelector('.loader');
    loader.style.display = 'block';

    const placeName = await reverseGeocode(lat, lng);
    console.log(placeName);
    document.getElementById('footer-left-reversegeolocation').textContent =
      placeName;

    // Hide the loader
    loader.style.display = 'none';
  } catch (error) {
    console.error(error);
  }
}

performReverseGeocoding();
