document.addEventListener("DOMContentLoaded", function() {
fetch('/ref/navcorner.html')
        .then(response => {
            if (!response.ok) throw new Error("HTTP error " + response.status);
            return response.text();
        })
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');

            // 1. Find and inject the header layout content
            const headerContent = doc.querySelector('.header');
            if (headerContent) {
                const headerSlot = document.getElementById('shared-header');
                headerSlot.className = "header"; 
                headerSlot.innerHTML = headerContent.innerHTML;
            }

            // 2. Find and inject the sidebar navigation content
            const sidebarContent = doc.querySelector('.leftSide');
            if (sidebarContent) {
                const sidebarSlot = document.getElementById('shared-sidebar');
                sidebarSlot.className = "leftSide"; 
                sidebarSlot.innerHTML = sidebarContent.innerHTML;
            }
        })
        .catch(error => console.error("Error loading layout components:", error));
});
