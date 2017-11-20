!function () {
    var row = document.querySelector('.drop-down');
    var rowStyle = document.querySelector('.drop-down i');
    var downDetail = document.querySelector('.down-detail');

    var isHover = false;
    var judge = function () {
        if (!isHover) {
            rowStyle.className = 'icon-down';
            downDetail.style.display = 'none';
        }
    };
    row.addEventListener('mouseover', function () {
        rowStyle.className = 'icon-up';
        downDetail.style.display = 'block';
        isHover = true;
    });
    downDetail.addEventListener('mouseover', function () {
        isHover = true;
    });
    [row, downDetail].forEach(function (i) {
        i.addEventListener('mouseout', function () {
            isHover = false;
            setTimeout(judge, 100);
        });
    })

    !function () {
        [].forEach.call(document.querySelectorAll('.watch'), function (item) {
            item.addEventListener("click", function () {
                document.querySelector('.vedio-alert').style.display = "block";
                document.querySelector('.section-home-video').style.display = "block";
            });
        });
        document.querySelector('.cls').addEventListener("click", function () {
            document.querySelector('.vedio-alert').style.display = "none";
            document.querySelector('.section-home-video').style.display = "none";
            document.querySelector('.video-play').load();
        });
    }()
}()