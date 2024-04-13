document.getElementById('plantForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const watering = document.getElementById('watering').value;
    const seasons = document.getElementById('seasons').value;
    const instructions = document.getElementById('instructions').value;

    try {
        const response = await fetch('/api/plants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, watering, seasons, instructions })
        });
        const { plant } = await response.json();

        const plantCard = document.createElement('div');
        plantCard.classList.add('plant-card');
        plantCard.innerHTML = `
            <h2>${plant.name}</h2>
            <p><strong>Watering Information:</strong> ${plant.watering}</p>
            <p><strong>Seasons:</strong> ${plant.seasons}</p>
            <p><strong>Planting Instructions:</strong> ${plant.instructions}</p>
        `;

        document.getElementById('plantList').appendChild(plantCard);

        // Clear form fields
        document.getElementById('plantForm').reset();
    } catch (err) {
        console.error('Error:', err);
    }
});

// Fetch plants on page load
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/plants');
        const { plants } = await response.json();

        plants.forEach(plant => {
            const plantCard = document.createElement('div');
            plantCard.classList.add('plant-card');
            plantCard.innerHTML = `
                <h2>${plant.name}</h2>
                <p><strong>Watering Information:</strong> ${plant.watering}</p>
                <p><strong>Seasons:</strong> ${plant.seasons}</p>
                <p><strong>Planting Instructions:</strong> ${plant.instructions}</p>
            `;

            document.getElementById('plantList').appendChild(plantCard);
        });
    } catch (err) {
        console.error('Error:', err);
    }
});
