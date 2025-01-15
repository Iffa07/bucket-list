function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function convertToUppercase(input) {
    input.value = input.value.toUpperCase();
}



function addBucketItem() {
    const title = document.getElementById('bucketTitle').value.trim();
    const description = document.getElementById('bucketDescription').value.trim();

    if (title === '' || description === '') {
        alert('Please fill in both fields.');
        return;
    }

    const container = document.getElementById('bucketListContainer');
    const bucketItem = document.createElement('div');
    bucketItem.className = 'bucket-item';
    bucketItem.setAttribute('data-title', title.toLowerCase()); // Store the title in lowercase for easier comparison

    bucketItem.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>
        <button onclick="markAsComplete(this)">Mark as Complete</button>
        <button onclick="removeBucketItem(this)">Remove</button>
    `;

    container.appendChild(bucketItem);

    document.getElementById('bucketTitle').value = '';
    document.getElementById('bucketDescription').value = '';
}

function removeBucketItem(button) {
    const bucketItem = button.parentElement;
    bucketItem.remove();
}

function markAsComplete(button) {
    const bucketItem = button.parentElement;

    if (bucketItem.classList.contains('completed')) {
        // If already completed, unmark it
        bucketItem.classList.remove('completed');
        button.textContent = 'Mark as Complete'; // Change button text back
    } else {
        // If not completed, mark it
        bucketItem.classList.add('completed');
        button.textContent = 'Unmark as Complete'; // Change button text to "Unmark"
        alert('🎉 Congratulations on completing this wish!');
    }
}

function filterBucketList() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const bucketItems = Array.from(document.querySelectorAll('.bucket-item'));
    
    // Sort the items based on the search term
    const sortedItems = bucketItems.sort((a, b) => {
        const aTitle = a.getAttribute('data-title');
        const bTitle = b.getAttribute('data-title');
        
        // Check if the search term matches the bucket title
        const aMatches = aTitle.includes(searchInput);
        const bMatches = bTitle.includes(searchInput);

        if (aMatches && !bMatches) {
            return -1; // a should come before b
        } else if (!aMatches && bMatches) {
            return 1; // b should come before a
        }
        return 0; // If both match or neither match, maintain the order
    });

    const container = document.getElementById('bucketListContainer');
    container.innerHTML = ''; // Clear the current container

    // Append the sorted items back to the container
    sortedItems.forEach(item => container.appendChild(item));
}

document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    const xOffset = (clientX / window.innerWidth) * 10 - 5; // Horizontal shift
    const yOffset = (clientY / window.innerHeight) * 10 - 5; // Vertical shift

    document.body.style.backgroundPosition = `${50 + xOffset}% ${50 + yOffset}%`;
});
