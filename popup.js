document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggleBtn');
    const statusDiv = document.getElementById('status');

    // Load status awal
    chrome.storage.local.get(['paused'], (result) => {
        updateUI(!!result.paused);
    });

    toggleBtn.addEventListener('click', () => {
        chrome.storage.local.get(['paused'], (result) => {
            const newState = !result.paused;
            chrome.storage.local.set({ paused: newState }, () => {
                updateUI(newState);
            });
        });
    });

    function updateUI(isPaused) {
        if (isPaused) {
            statusDiv.innerText = "Status: PAUSED";
            statusDiv.style.color = "red";
            toggleBtn.innerText = "Lanjutkan";
            toggleBtn.className = "paused";
        } else {
            statusDiv.innerText = "Status: AKTIF";
            statusDiv.style.color = "green";
            toggleBtn.innerText = "Pause";
            toggleBtn.className = "";
        }
    }
});

