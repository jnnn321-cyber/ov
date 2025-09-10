let date = new Date();

// 일정 데이터 (원하는 텍스트 추가 가능)
const events = {
    "2025-08-27": ["송도해수욕장 CCTV구역 1-1", "송도해수욕장 CCTV구역 1-2", "송도해수욕장 CCTV구역 1-3"],
    "2025-09-01": ["송도해수욕장 CCTV구역 1-1", "송도해수욕장 CCTV구역 1-2", "송도해수욕장 CCTV구역 1-3"],
    "2025-09-02": ["송도해수욕장 CCTV구역 1-1", "송도해수욕장 CCTV구역 1-2", "송도해수욕장 CCTV구역 1-3"]
};

// 날짜 문자열 포맷 함수
const pad = n => String(n).padStart(2, "0");
const makeKey = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;


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

    // 오늘 날짜
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
        let classes = inThisMonth ? "date" : "date";


        // 오늘이면 today 클래스 추가
        if (inThisMonth && viewYear === todayYear && viewMonth === todayMonth && d === todayDate) {
            classes += " today";
        }


        let eventText = "";
        if (inThisMonth) {
            const fullDate = makeKey(viewYear, viewMonth, d);
            if (events[fullDate]) {
                eventText = events[fullDate]
                    .map(ev => `<div class="event">${ev}</div>`)
                    .join("");
            }
        }

        return `<div class="${classes}"><div class="${condition}">${d}</div><a class="event-list" href="#">${eventText}</a></div>`;
    }).join("");

    document.querySelector('.dates').innerHTML = html;

};


renderCalender();

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
};
