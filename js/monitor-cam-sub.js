document.querySelectorAll('.control').forEach(control => {
    const checkbox = control.querySelector('.can-toggle');
    const stateDiv = control.querySelector('.toggleState');
    const label = control.querySelector('.toggleSwitch');

    // 페이지 로드 시 초기 상태 반영
    if (checkbox.checked) {
        stateDiv.textContent = 'on';
        label.style.background = '#0065EA';
    } else {
        stateDiv.textContent = 'off';
        label.style.background = '#999';
    }

    // 변화 이벤트
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            stateDiv.textContent = 'on';
            label.style.background = '#0065EA';
        } else {
            stateDiv.textContent = 'off';
            label.style.background = '#999';
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const radios = document.querySelectorAll('input[name="option"]');
    const textarea = document.querySelector('.req03-txt');

    // 기본 상태 설정 (req01 선택, textarea 숨김)
    document.getElementById('radio-req01').checked = true;
    textarea.style.display = 'none';

    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (document.getElementById('radio-req03').checked) {
                textarea.style.display = 'block';
            } else {
                textarea.style.display = 'none';
            }
        });
    });
});
