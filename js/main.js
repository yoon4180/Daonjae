window.onload = () => {
    AOS.init();

    //헤더 스크롤 시 고정 위치
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 40) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }
    });

    //헤더 2차 메뉴
    $('.depth-01').on('click', function (e) {
        e.preventDefault();

        if ($(this).siblings('.depth-02').css('display') == 'none') {
            $('.depth-01').siblings('.depth-02').slideUp();
            $('.depth-01').removeClass('active');

            $(this).siblings('.depth-02').slideDown();
            $(this).addClass('active');
        } else {
            $(this).siblings('.depth-02').slideUp();
            $(this).removeClass('active');
        }
    });

    //메인 비주얼 슬라이드
    var swiper = new Swiper(".main_img", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        effect: "fade",
    });

    //섹션2 스티키
    let $section = $('#section2');
    let $imgs = $section.find('.image_wrap .img');
    let $points = $section.find('.point');

    let sectionTop = $section.offset().top;
    let sectionHeight = $section.outerHeight();
    let winH = $(window).height();

    $(window).on('scroll', function () {
        let scrollTop = $(window).scrollTop();
        let scrollPos = scrollTop - sectionTop;

        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            // 전체 진행 비율 (0~1)
            let progress = scrollPos / (sectionHeight - winH);

            // 포인트 개수 (3개)
            let totalPoints = $points.length;
            let sectionPerPoint = 1 / totalPoints; // 1/3씩 차지

            // 현재 포인트 인덱스
            let pointIndex = Math.floor(progress / sectionPerPoint);
            if (pointIndex >= totalPoints) pointIndex = totalPoints - 1;

            // 각 포인트 내에서 세부 진행도 (0~1)
            let localProgress = (progress - sectionPerPoint * pointIndex) / sectionPerPoint;
            if (localProgress < 0) localProgress = 0;
            if (localProgress > 1) localProgress = 1;

            // 포인트 전환
            $points.removeClass('on');
            $points.eq(pointIndex).addClass('on');

            // 이미지 전환 (각 포인트마다 2장)
            let imgStart = pointIndex * 2; // 예: point1→0, point2→2, point3→4
            let currentImg = imgStart + (localProgress < 0.5 ? 0 : 1); // 절반 지점 기준으로 1,2 전환
            if (currentImg >= $imgs.length) currentImg = $imgs.length - 1;

            $imgs.removeClass('on');
            $imgs.eq(currentImg).addClass('on');
        }
    });

    //섹션3 비디오
    const videoContainer = document.querySelector("#section3 .video_container");
    const section = document.querySelector("#section3");

    window.addEventListener("scroll", () => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // section이 화면에 보일 때만 계산
        if (rect.top < windowHeight && rect.bottom > 0) {
            // progress 0 ~ 1
            let progress = 1 - (rect.bottom / (rect.height + windowHeight));
            // scale 1 ~ 1.5
            let scale = 1 + progress * 0.5;
            videoContainer.style.transform = `scale(${scale})`;
        }
    });


    // 섹션5 가로스크롤
    let section01Top = document.querySelector('#section5').offsetTop;
    console.log(section01Top)
    window.addEventListener('scroll', () => {
        let transformX = -1 / 15 * window.scrollY + section01Top / 15

        if (transformX < -200) {
            document.querySelector('.scrollX').style.transform = `translateX(-200vw)`
        } else if (transformX < 0) {
            document.querySelector('.scrollX').style.transform = `translateX(${transformX}vw)`
        }
    });

    //섹션6 카드 슬라이드
    var swiper = new Swiper(".card_album", {
        effect: "cards",
        grabCursor: true,
    });

    //섹션6 아이콘 호버
    $('.ask_btn.call').hover(
        function () {
            $(this).find('img').attr('src', 'img/icon_call_main.png');
        },
        function () {
            $(this).find('img').attr('src', 'img/icon_call_white.png');
        }
    );

    // 카카오 버튼
    $('.ask_btn.kakao').hover(
        function () {
            $(this).find('img').attr('src', 'img/icon_kakao_main.png');
        },
        function () {
            $(this).find('img').attr('src', 'img/icon_kakao_white.png');
        }
    );

    // 고정 버튼 상호작용
    $('.fixed_btn .btn.main').on('click', function () {
        $('.fixed_btn').toggleClass('active');
    });

    $('.fixed_btn .btn.top').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 600);
    });
}