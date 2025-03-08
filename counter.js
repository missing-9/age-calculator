// 使用不蒜子(busuanzi)统计网站访问量

// 创建全局访问计数器元素
const globalCounterDiv = document.createElement('div');
globalCounterDiv.className = 'global-counter';
document.querySelector('.container').appendChild(globalCounterDiv);

// 初始化不蒜子计数器
function initBusuanzi() {
    // 动态加载不蒜子脚本
    const script = document.createElement('script');
    script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
    script.async = true;
    
    // 监听脚本加载完成事件
    script.onload = function() {
        console.log('不蒜子脚本加载完成');
        // 创建显示元素
        updateGlobalCounter();
    };
    
    script.onerror = function() {
        console.error('不蒜子脚本加载失败');
        // 如果加载失败，显示一个友好的提示
        globalCounterDiv.innerHTML = `<div class="milestone">全球访问统计加载中...</div>`;
    };
    
    document.head.appendChild(script);
}

// 显示全局访问计数
function updateGlobalCounter() {
    // 创建不蒜子统计元素
    const counterElement = document.createElement('div');
    counterElement.className = 'milestone';
    counterElement.innerHTML = `全球总访问量: <span id="busuanzi_value_site_pv" class="result-highlight">0</span> 次 | 访问人数: <span id="busuanzi_value_site_uv" class="result-highlight">0</span> 人`;
    
    // 清空并添加新元素
    globalCounterDiv.innerHTML = '';
    globalCounterDiv.appendChild(counterElement);
    
    // 添加一个小小的归属标注
    const attribution = document.createElement('div');
    attribution.style.fontSize = '10px';
    attribution.style.marginTop = '5px';
    attribution.style.opacity = '0.6';
    attribution.innerHTML = '统计数据由 <a href="https://busuanzi.ibruce.info/" target="_blank" style="color:inherit;text-decoration:underline;">不蒜子</a> 提供';
    globalCounterDiv.appendChild(attribution);
}

// 初始化全局计数器
function initGlobalCounter() {
    initBusuanzi();
}

// 导出函数供app.js使用
window.initGlobalCounter = initGlobalCounter;