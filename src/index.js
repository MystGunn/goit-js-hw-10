import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

error.style.display = 'none';
loader.style.display = 'none';

async function populateBreeds() {
  try {
    loader.style.display = 'block';
    breedSelect.style.display = 'none';
    const breeds = await fetchBreeds();
    breedSelect.innerHTML = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
    new SlimSelect({ select: '.breed-select' });
    breedSelect.style.display = 'block';
  } catch (err) {
    error.style.display = 'block';
  } finally {
    loader.style.display = 'none';
  }
}

async function showCatInfo(breedId) {
  try {
    loader.style.display = 'block';
    catInfo.style.display = 'none';
    const cat = await fetchCatByBreed(breedId);
    const breed = cat.breeds[0];
    catInfo.innerHTML = `
      <h2>${breed.name}</h2>
      <img src="${cat.url}" alt="${breed.name}" />
      <p>${breed.description}</p>
      <p><strong>Temperament:</strong> ${breed.temperament}</p>
    `;
    catInfo.style.display = 'block';
  } catch (err) {
    error.style.display = 'block';
  } finally {
    loader.style.display = 'none';
  }
}

breedSelect.addEventListener('change', (event) => {
  const breedId = event.target.value;
  showCatInfo(breedId);
});

populateBreeds();