$(document).ready(function() {
    // ローカルストレージからデータを読み込み、リストに表示する関数
    function displayList() {
        $('#list').empty(); // リストをクリア

        // ローカルストレージのすべてのアイテムをループしてリストに表示
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const data = JSON.parse(localStorage.getItem(key));
            $('#list').append(`<li><input type="checkbox" class="deleteCheckbox" value="${key}"><strong>アーティスト名:</strong> ${data.artistName}, <strong>曲名:</strong> ${data.songName}, <strong>音声ファイルパス:</strong> ${data.audioPath}, <strong>リリース日:</strong> ${key}</li>`);
        }
    }

    // ページ読み込み時にリストを表示
    displayList();

    // 登録フォームのsubmitイベント
    $('#entryForm').submit(function(event) {
        event.preventDefault(); // デフォルトのフォーム送信を防ぐ

        // 入力値を取得
        const artistName = $('#artistName').val();
        const songName = $('#songName').val();
        const audioPath = $('#audioPath').val();
        const releaseDate = $('#releaseDate').val();

        // ローカルストレージに保存
        localStorage.setItem(releaseDate, JSON.stringify({artistName: artistName, songName: songName, audioPath: audioPath}));

        // リストを更新して表示
        displayList();

        // フォームをクリア
        $('#entryForm')[0].reset();
    });

    // 削除ボタンのclickイベント
    $('#deleteButton').on('click', function() {
        // チェックされた削除対象のデータを取得して削除
        $('.deleteCheckbox:checked').each(function() {
            const deleteKey = $(this).val();
            localStorage.removeItem(deleteKey);
        });

        // リストを更新して表示
        displayList();

        // チェックボックスをリセット
        $('.deleteCheckbox').prop('checked', false);
    });
});