// 生日数据存储在localStorage中
const BIRTHDAY_KEY = 'age_calculator_birthday';

// DOM元素
const birthdaySection = document.getElementById('birthday-section');
const resultSection = document.getElementById('result-section');
const birthdayInput = document.getElementById('birthday');
const ageResultDiv = document.getElementById('age-result');

// 按钮
const saveBirthdayBtn = document.getElementById('save-birthday-btn');
const resetBirthdayBtn = document.getElementById('reset-birthday-btn');

// 获取保存的生日
function getBirthday() {
    return localStorage.getItem(BIRTHDAY_KEY) || null;
}

// 保存生日信息
function saveBirthdayToStorage(birthday) {
    localStorage.setItem(BIRTHDAY_KEY, birthday);
}

// 保存生日信息
function saveBirthday(birthday) {
    if (!birthday) {
        alert('请选择您的生日！');
        return false;
    }
    
    saveBirthdayToStorage(birthday);
    return true;
}

// 计算精确年龄
function calculateExactAge(birthday) {
    const birthDate = new Date(birthday);
    const now = new Date();
    
    const diffTime = now - birthDate;
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    
    const years = Math.floor(diffYears);
    const remainingDays = (diffYears - years) * 365.25;
    const months = Math.floor(remainingDays / 30.44);
    const days = Math.floor(remainingDays % 30.44);
    const hours = Math.floor(((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const minutes = Math.floor(((diffTime % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = Math.floor(((diffTime % (1000 * 60)) / 1000));
    
    return {
        years,
        months,
        days,
        hours,
        minutes,
        seconds
    };
}

// 显示年龄结果
function showAgeResult() {
    const birthday = getBirthday();
    if (!birthday) return;
    
    const age = calculateExactAge(birthday);
    
    // 计算生命阶段和描述
    let lifeStage = "";
    let lifeDescription = "";
    let stageIcon = "";
    
    if (age.years < 3) {
        lifeStage = "婴幼儿期";
        lifeDescription = "这是人生的起点，充满了无限可能。";
        stageIcon = "<img src='images/baby.png' alt='婴幼儿' class='stage-icon' />";
    } else if (age.years < 12) {
        lifeStage = "童年期";
        lifeDescription = "童年是人生中最纯真的时光，充满了好奇与探索。";
        stageIcon = "<img src='images/child.png' alt='童年' class='stage-icon' />";
    } else if (age.years < 18) {
        lifeStage = "青少年期";
        lifeDescription = "这是寻找自我、建立价值观的重要阶段。";
        stageIcon = "<img src='images/teen.png' alt='青少年' class='stage-icon' />";
    } else if (age.years < 30) {
        lifeStage = "青年期";
        lifeDescription = "充满活力与梦想，是人生中最富创造力的时期。";
        stageIcon = "<img src='images/adult.png' alt='青年' class='stage-icon' />";
    } else if (age.years < 45) {
        lifeStage = "壮年期";
        lifeDescription = "事业与家庭的黄金时期，承担着更多责任。";
        stageIcon = "<img src='images/adult.png' alt='壮年' class='stage-icon' />";
    } else if (age.years < 60) {
        lifeStage = "中年期";
        lifeDescription = "沉淀与收获的时期，智慧与经验并存。";
        stageIcon = "<img src='images/adult.png' alt='中年' class='stage-icon' />";
    } else if (age.years < 75) {
        lifeStage = "初老期";
        lifeDescription = "回顾与传承的时期，享受生活的平静与从容。";
        stageIcon = "<img src='images/adult.png' alt='初老期' class='stage-icon' />";
    } else {
        lifeStage = "老年期";
        lifeDescription = "智慧的巅峰，见证了时代的变迁，值得尊敬。";
        stageIcon = "<img src='images/adult.png' alt='老年' class='stage-icon' />";
    }
    
    // 更新进度条
    const averageLifespan = 80; // 平均寿命假设为80岁
    const lifeProgress = Math.min((age.years / averageLifespan) * 100, 100);
    document.getElementById('life-progress').style.width = `${lifeProgress}%`;
    
    ageResultDiv.innerHTML = `
        <div class="time-milestone">您已经在这个世界上度过了：</div>
        <div class="time-details">
            <span class="result-highlight">${age.years}</span> 年 
            <span class="result-highlight">${age.months}</span> 个月 
            <span class="result-highlight">${age.days}</span> 天
        </div>
        <div class="time-details">
            <span class="result-highlight">${age.hours}</span> 小时 
            <span class="result-highlight">${age.minutes}</span> 分钟 
            <span class="result-highlight">${age.seconds}</span> 秒
        </div>
        <div class="life-stage">
            ${stageIcon}
            <strong>当前人生阶段：${lifeStage}</strong><br>
            ${lifeDescription}
        </div>
    `;
    ageResultDiv.style.display = 'block';
}

// 更新年龄显示（每秒更新）
function startAgeTimer() {
    showAgeResult();
    return setInterval(showAgeResult, 1000);
}

// 显示生日设置界面
function showBirthdaySection() {
    birthdaySection.classList.add('active');
    resultSection.classList.remove('active');
}

// 显示结果界面
function showResultSection() {
    birthdaySection.classList.remove('active');
    resultSection.classList.add('active');
}

// 初始化应用
function initApp() {
    // 检查是否已设置生日
    const birthday = getBirthday();
    if (birthday) {
        showResultSection();
        ageTimer = startAgeTimer();
    } else {
        showBirthdaySection();
    }
}

// 事件监听
let ageTimer = null;

// 保存生日按钮点击事件
saveBirthdayBtn.addEventListener('click', () => {
    const birthday = birthdayInput.value;
    
    if (saveBirthday(birthday)) {
        showResultSection();
        ageTimer = startAgeTimer();
    }
});

// 重置生日按钮点击事件
resetBirthdayBtn.addEventListener('click', () => {
    showBirthdaySection();
    if (ageTimer) {
        clearInterval(ageTimer);
        ageTimer = null;
    }
});

// 初始化应用
initApp();