!function () {
    var row        = document.querySelector('.drop-down');
    var rowStyle1  = document.querySelector('.drop-down i');
    var rowStyle2  = document.querySelector('.upShow i');
    var downDetail = document.querySelector('.down-detail');
    var upDetail   = document.querySelector('.up-detail');
    var upShow     = document.querySelector('.upShow');
    var isHover    = false;

    var judge = function () {
        if (!isHover) {
            rowStyle1.className = 'icon-down';
            downDetail.style.display = 'none';
        }
    };
    row.addEventListener('mouseover', function () {
        rowStyle1.className = 'icon-up';
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
    });
    upShow.addEventListener('click', function () {
        var status = upDetail.style.display;
        if (status === 'none') {
            rowStyle2.className = 'icon-down';
            upDetail.style.display = 'block';
        } else {
            rowStyle2.className = 'icon-up';
            upDetail.style.display = 'none';
        }
    });

    !function () {
        [].forEach.call(document.querySelectorAll('.watch'), function (item) {
            item.addEventListener("click", function () {
                document.querySelector('.vedio-alert').style.display = "block";
                document.querySelector('.section-home-video').style.display = "block";
            });
        });
        var cls = document.querySelector('.cls');
        cls && cls.addEventListener("click", function () {
            document.querySelector('.vedio-alert').style.display = "none";
            document.querySelector('.section-home-video').style.display = "none";
            document.querySelector('.video-play').load();
        });
    }()
}()