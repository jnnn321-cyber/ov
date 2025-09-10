
let date = new Date();
let selectedKey = null; // 선택된 날짜 저장

// 날짜 문자열 포맷 함수
const pad = n => String(n).padStart(2, "0");
const makeKey = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

// today-view 업데이트 함수
const updateTodayView = (dateObj) => {
    const yy = String(dateObj.getFullYear()).slice(2);
    const mm = pad(dateObj.getMonth() + 1);
    const dd = pad(dateObj.getDate());
    const weekday = weekdays[dateObj.getDay()];
    $(".today-view").text(`${yy}.${mm}.${dd} ${weekday}`);
};

const renderCalender = () => {
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();

    document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];

    if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
            prevDates.unshift(PLDate - i);
        }
    }

    for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
    }

    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    const dates = prevDates.concat(thisDates, nextDates);
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);

    // HTML 생성
    const html = dates.map((d, i) => {
        const inThisMonth = i >= firstDateIndex && i <= lastDateIndex;
        const condition = inThisMonth ? 'this' : 'other';
        let classes = "date";

        const key = makeKey(viewYear, viewMonth, d);

        // 오늘이면 today 클래스 추가
        if (inThisMonth && viewYear === todayYear && viewMonth === todayMonth && d === todayDate) {
            classes += " today";
        }

        // 선택한 날짜 복원
        if (selectedKey === key && inThisMonth) {
            classes += " selected";
        }

        return `<button class="${classes}" type="button" data-date="${key}" data-inmonth="${inThisMonth}">
                    <div class="${condition}">${d}</div>
                </button>`;
    }).join("");

    document.querySelector('.dates').innerHTML = html;
};

// 월 이동
const prevMonth = () => {
    date.setMonth(date.getMonth() - 1);
    renderCalender();
};
const nextMonth = () => {
    date.setMonth(date.getMonth() + 1);
    renderCalender();
};
const goToday = () => {
    date = new Date();
    renderCalender();

    const today = new Date();
    selectedKey = makeKey(today.getFullYear(), today.getMonth(), today.getDate());
    updateTodayView(today);

    $(".date").removeClass("selected");
    $(`.date[data-date="${selectedKey}"]`).addClass("selected");
};

// 날짜 클릭 이벤트 (이벤트 위임)
$(document).on("click", ".date", function () {
    $(".date").removeClass("selected");
    $(this).addClass("selected");

    if ($(this).data("inmonth") === true || $(this).data("inmonth") === "true") {
        selectedKey = $(this).data("date"); // 선택값 저장

        const selectedDate = new Date(selectedKey);
        updateTodayView(selectedDate);
    }
});

// 초기 렌더링 + 오늘 날짜 선택 표시
$(document).ready(function () {
    renderCalender();

    const today = new Date();
    selectedKey = makeKey(today.getFullYear(), today.getMonth(), today.getDate());
    updateTodayView(today);

    $(".date").removeClass("selected");
    $(`.date[data-date="${selectedKey}"]`).addClass("selected");
});

