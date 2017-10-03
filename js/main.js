// 首页图片轮播
    var swiper1 = new Swiper('.swiper-container', {
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        autoplay : 3000,
        autoplayDisableOnInteraction : false,
        preloadImages: false,
        lazyLoading : true
    });

    var swiper2 = new Swiper('.hreo-turn', {
	  onInit: function(swiper){ 
	    swiperAnimateCache(swiper); //隐藏动画元素 
	    swiperAnimate(swiper); //初始化完成开始动画
	  }, 
	  onSlideChangeEnd: function(swiper){ 
	    swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
	  },
	  pagination : '.swiper-pagination',
	  paginationClickable :true
	});

	var swiper3 = new Swiper('.play-turn', {
        pagination: '.swiper-pagination',
        effect: 'cube',
        grabCursor: true,
        cube: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94
        }
    });

    !function () {
    	document.getElementById('watch').addEventListener("click", function () {
			document.querySelector('.vedio-alert').style.display = "block";
			document.querySelector('.section-home-video').style.display = "block";
	    });

    	document.getElementById('cls').addEventListener("click", function () {
			document.querySelector('.vedio-alert').style.display = "none";
			document.querySelector('.section-home-video').style.display = "none";
			document.getElementById('video').load();
    	});
    }()