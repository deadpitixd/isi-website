function formatAssetName(filename) {
    if (filename.includes('win64') || filename.includes('.exe')) return 'Windows (64-bit)';
    if (filename.includes('linux') || (!filename.includes('.exe') && !filename.includes('.app'))) {
        return 'Linux (x64)';
    }
    if (filename.includes('macos') || filename.includes('darwin')) return 'macOS (Apple/Intel)';
    
    return "Unknown";
}

const gittoken = "";

document.addEventListener("DOMContentLoaded", async () => {
    const owner = 'deadpitixd';
    const repo = 'isi';
    const tag = 'beta-1';
    const url = `https://api.github.com/repos/${owner}/${repo}/releases`;

    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': `Bearer ${gittoken}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const releases = await response.json();

        const container = document.getElementById("download-container");

        container.replaceChildren();
        if (gittoken){
            container.insertAdjacentHTML("beforeend","<h1>WARNING: GITHUB TOKEN IS PRESENT, DO NOT COMMIT<br><br><br><br><br><br></h1>");
        }
        releases.forEach(data => {
            container.insertAdjacentHTML("beforeend",`<h1>${data.name}</h1>
                ${data.name?.includes("Legacy") ? "<h3>Warning, this is a legacy release.</h3>" : ""}
                Published on ${data.published_at.split('T')[0]} by @${data.author["login"]}<br>
                <h2>Release logs:</h2>
                <div class="changelog-box">
                ${marked.parse(data.body)}
                </div>
                `);
            data.assets.forEach(asset => {
                container.insertAdjacentHTML("beforeend",`
                    <a href="${asset.browser_download_url}">${asset.name}</a> for ${formatAssetName(asset.name)}<br>
                    Size: ${Math.round(asset.size / 1024 / 1024 * 100) / 100} MB
                `);
            });
        });

    } catch (error) {
        console.error('Error fetching release metadata:', error);
    }
});