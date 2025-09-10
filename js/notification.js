$(".notification-tab li").on("click", function () {
    console.log("탭 li 클릭됨:", $(this).text());
});

$(document).ready(function () {
    $(".notification-tab li").on("click", function () {
        const $clickedLi = $(this);
        const $tab = $clickedLi.find(".tab");
        const isAll = $tab.hasClass("all");
        const selectedText = $.trim($tab.text());

        // 탭 on 클래스 토글
        $(".notification-tab li").removeClass("on");
        $clickedLi.addClass("on");

        // 리스트 필터링
        $(".noti-list ul li").each(function () {
            const sortText = $.trim($(this).find(".sort").text());

            if (isAll || sortText === selectedText) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});