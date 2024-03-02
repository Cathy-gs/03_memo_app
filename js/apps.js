document.getElementById("musicForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const artist = document.getElementById("artist").value;
    const song = document.getElementById("song").value;
    const youtubeLink = document.getElementById("youtubeLink").value;

    let playlist = JSON.parse(localStorage.getItem("playlist")) || [];
    playlist.push({ artist, song, youtubeLink });
    localStorage.setItem("playlist", JSON.stringify(playlist));

    displayPlaylist();
    this.reset();
});

function displayPlaylist() {
    const playlistDiv = document.getElementById("playlist");
    playlistDiv.innerHTML = "";
    const playlist = JSON.parse(localStorage.getItem("playlist")) || [];
    playlist.forEach((item, index) => {
        const listItem = document.createElement("div");
        listItem.innerHTML = `
            <input type="checkbox" id="item${index}" name="item${index}">
            <label for="item${index}">
                <strong>アーティスト:</strong> ${item.artist}<br>
                <strong>曲名:</strong> <a href="${item.youtubeLink}" target="_blank">${item.song}</a><br>
            </label><br><br>
        `;
        playlistDiv.appendChild(listItem);
    });

    // プレイリストが空でない場合、削除ボタンを表示
    const deleteButton = document.getElementById("deleteButton");
    deleteButton.style.display = (playlist.length > 0) ? "block" : "none";
}

function deleteSelected() {
    const playlist = JSON.parse(localStorage.getItem("playlist")) || [];
    for (let i = playlist.length - 1; i >= 0; i--) {
        const checkbox = document.getElementById(`item${i}`);
        if (checkbox.checked) {
            playlist.splice(i, 1);
        }
    }
    localStorage.setItem("playlist", JSON.stringify(playlist));
    displayPlaylist();
};

displayPlaylist();