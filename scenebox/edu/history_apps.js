// 历史学科应用交互功能

// 历史时间线数据
const timelineData = {
    ancient: {
        china: [
            { year: -2070, event: '夏朝建立', description: '中国历史上第一个世袭制王朝' },
            { year: -1600, event: '商朝建立', description: '青铜文明达到高峰' },
            { year: -1046, event: '周朝建立', description: '分封制和宗法制确立' },
            { year: -221, event: '秦朝统一中国', description: '建立中央集权制度' },
            { year: -206, event: '汉朝建立', description: '丝绸之路开通' }
        ],
        europe: [
            { year: -3000, event: '青铜时代开始', description: '欧洲进入青铜文明' },
            { year: -800, event: '古希腊城邦兴起', description: '民主制度萌芽' },
            { year: -753, event: '罗马建城', description: '罗马文明开始' },
            { year: -27, event: '罗马帝国建立', description: '奥古斯都称帝' },
            { year: 476, event: '西罗马帝国灭亡', description: '古代欧洲结束' }
        ]
    },
    medieval: {
        china: [
            { year: 581, event: '隋朝建立', description: '重新统一中国' },
            { year: 618, event: '唐朝建立', description: '盛唐文化繁荣' },
            { year: 960, event: '宋朝建立', description: '科技文化发达' },
            { year: 1271, event: '元朝建立', description: '蒙古统治中国' },
            { year: 1368, event: '明朝建立', description: '汉族重新统治' }
        ],
        europe: [
            { year: 800, event: '查理曼加冕', description: '神圣罗马帝国建立' },
            { year: 1066, event: '诺曼征服', description: '英国历史转折点' },
            { year: 1095, event: '十字军东征开始', description: '基督教与伊斯兰教冲突' },
            { year: 1347, event: '黑死病爆发', description: '欧洲人口大减' },
            { year: 1453, event: '君士坦丁堡陷落', description: '拜占庭帝国灭亡' }
        ]
    }
};

// 古代文明数据
const civilizationData = {
    'ancient-china': {
        name: '古代中国',
        period: '公元前2070年-公元220年',
        location: '东亚',
        politics: '中央集权制，皇帝制度',
        economy: '农业为主，丝绸之路贸易',
        culture: '儒家思想，汉字文化',
        technology: '四大发明，青铜冶炼',
        achievements: ['万里长城', '兵马俑', '丝绸之路', '造纸术']
    },
    'ancient-egypt': {
        name: '古埃及',
        period: '公元前3100年-公元30年',
        location: '非洲东北部',
        politics: '法老专制，神权政治',
        economy: '农业为主，尼罗河灌溉',
        culture: '多神教，象形文字',
        technology: '金字塔建造，木乃伊制作',
        achievements: ['金字塔', '狮身人面像', '象形文字', '医学发展']
    },
    'ancient-greece': {
        name: '古希腊',
        period: '公元前800年-公元146年',
        location: '地中海东部',
        politics: '城邦制，民主制度',
        economy: '商业贸易，手工业',
        culture: '哲学思辨，奥林匹克',
        technology: '几何学，天文学',
        achievements: ['民主制度', '哲学思想', '奥运会', '戏剧艺术']
    },
    'ancient-rome': {
        name: '古罗马',
        period: '公元前753年-公元476年',
        location: '地中海周边',
        politics: '共和制转帝制，法律完备',
        economy: '商业发达，奴隶制',
        culture: '基督教传播，拉丁文化',
        technology: '道路建设，建筑工程',
        achievements: ['罗马法', '道路网络', '竞技场', '基督教传播']
    }
};

// 历史事件模拟数据
const simulationData = {
    'silk-road': {
        name: '丝绸之路贸易',
        description: '连接东西方的重要贸易路线',
        scenarios: {
            merchant: [
                {
                    situation: '你是一名来自长安的商人，准备前往西域进行贸易。你需要决定携带什么商品。',
                    options: [
                        { text: '丝绸和茶叶', consequence: '这些商品在西域很受欢迎，获得丰厚利润' },
                        { text: '瓷器和香料', consequence: '瓷器易碎，路途颠簸造成损失' },
                        { text: '金银和珠宝', consequence: '贵重物品引来盗贼，旅途危险' }
                    ]
                }
            ]
        }
    }
};

// 生成历史时间线
function generateTimeline() {
    const period = document.getElementById('timeline-period').value;
    const region = document.getElementById('timeline-region').value;
    const display = document.getElementById('timeline-display');
    
    if (!period || !region) {
        alert('请选择历史时期和地区');
        return;
    }
    
    const events = timelineData[period]?.[region] || [];
    
    if (events.length === 0) {
        display.innerHTML = '<div class="timeline-placeholder"><p>暂无该时期和地区的数据</p></div>';
        return;
    }
    
    let timelineHTML = '<div class="timeline-container">';
    
    events.forEach((event, index) => {
        const year = event.year < 0 ? `公元前${Math.abs(event.year)}年` : `公元${event.year}年`;
        timelineHTML += `
            <div class="timeline-item" onclick="showEventDetails(${index}, '${period}', '${region}')">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <div class="timeline-year">${year}</div>
                    <div class="timeline-event">${event.event}</div>
                </div>
            </div>
        `;
    });
    
    timelineHTML += '</div>';
    display.innerHTML = timelineHTML;
}

// 显示事件详情
function showEventDetails(index, period, region) {
    const events = timelineData[period][region];
    const event = events[index];
    const detailsDiv = document.getElementById('event-details');
    
    const year = event.year < 0 ? `公元前${Math.abs(event.year)}年` : `公元${event.year}年`;
    
    detailsDiv.innerHTML = `
        <h4>${event.event}</h4>
        <p><strong>时间：</strong>${year}</p>
        <p><strong>描述：</strong>${event.description}</p>
        <div class="event-analysis">
            <h5>历史意义</h5>
            <p>这一事件在历史发展中具有重要意义，影响了后续的政治、经济和文化发展。</p>
        </div>
    `;
}

// 比较古代文明
function compareCivilizations() {
    const civA = document.getElementById('civilization-a').value;
    const civB = document.getElementById('civilization-b').value;
    const resultDiv = document.getElementById('comparison-result');
    
    if (!civA || !civB) {
        alert('请选择两个文明进行比较');
        return;
    }
    
    if (civA === civB) {
        alert('请选择不同的文明进行比较');
        return;
    }
    
    const dataA = civilizationData[civA];
    const dataB = civilizationData[civB];
    
    resultDiv.innerHTML = `
        <div class="comparison-table">
            <table>
                <thead>
                    <tr>
                        <th>比较项目</th>
                        <th>${dataA.name}</th>
                        <th>${dataB.name}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>时期</strong></td>
                        <td>${dataA.period}</td>
                        <td>${dataB.period}</td>
                    </tr>
                    <tr>
                        <td><strong>地理位置</strong></td>
                        <td>${dataA.location}</td>
                        <td>${dataB.location}</td>
                    </tr>
                    <tr>
                        <td><strong>政治制度</strong></td>
                        <td>${dataA.politics}</td>
                        <td>${dataB.politics}</td>
                    </tr>
                    <tr>
                        <td><strong>经济特点</strong></td>
                        <td>${dataA.economy}</td>
                        <td>${dataB.economy}</td>
                    </tr>
                    <tr>
                        <td><strong>文化特色</strong></td>
                        <td>${dataA.culture}</td>
                        <td>${dataB.culture}</td>
                    </tr>
                    <tr>
                        <td><strong>科技成就</strong></td>
                        <td>${dataA.technology}</td>
                        <td>${dataB.technology}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="achievements-comparison">
            <div class="achievement-column">
                <h4>${dataA.name}主要成就</h4>
                <ul>
                    ${dataA.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            </div>
            <div class="achievement-column">
                <h4>${dataB.name}主要成就</h4>
                <ul>
                    ${dataB.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            </div>
        </div>
        
        <div class="comparison-analysis">
            <h4>比较分析</h4>
            <p>通过对比可以看出，${dataA.name}和${dataB.name}在政治制度、经济模式、文化特色等方面都有各自的特点。这种差异反映了不同地理环境和历史条件下文明发展的多样性。</p>
        </div>
    `;
}

// 开始历史事件模拟
function startSimulation() {
    const event = document.getElementById('historical-event').value;
    const role = document.getElementById('player-role').value;
    const simulationArea = document.getElementById('simulation-area');
    const decisionPanel = document.getElementById('decision-panel');
    
    if (!event || !role) {
        alert('请选择历史事件和角色');
        return;
    }
    
    const eventData = simulationData[event];
    if (!eventData) {
        alert('该事件模拟功能正在开发中');
        return;
    }
    
    simulationArea.innerHTML = `
        <div class="simulation-intro">
            <h3>${eventData.name}</h3>
            <p>${eventData.description}</p>
            <p><strong>你的角色：</strong>${getRoleName(role)}</p>
        </div>
    `;
    
    decisionPanel.style.display = 'block';
    
    // 开始第一个场景
    if (eventData.scenarios[role]) {
        showScenario(eventData.scenarios[role][0], 0);
    } else {
        document.getElementById('scenario-description').innerHTML = '该角色的模拟场景正在开发中';
    }
}

// 显示模拟场景
function showScenario(scenario, index) {
    const scenarioDiv = document.getElementById('scenario-description');
    const optionsDiv = document.getElementById('decision-options');
    
    scenarioDiv.innerHTML = `<p>${scenario.situation}</p>`;
    
    let optionsHTML = '<h5>请选择你的决策：</h5>';
    scenario.options.forEach((option, i) => {
        optionsHTML += `
            <button class="decision-option" onclick="makeDecision(${i}, ${index})">
                ${option.text}
            </button>
        `;
    });
    
    optionsDiv.innerHTML = optionsHTML;
}

// 做出决策
function makeDecision(optionIndex, scenarioIndex) {
    const event = document.getElementById('historical-event').value;
    const role = document.getElementById('player-role').value;
    const eventData = simulationData[event];
    const scenario = eventData.scenarios[role][scenarioIndex];
    const option = scenario.options[optionIndex];
    
    const consequencesDiv = document.getElementById('consequences');
    consequencesDiv.innerHTML = `
        <div class="decision-result">
            <h5>决策结果</h5>
            <p><strong>你的选择：</strong>${option.text}</p>
            <p><strong>结果：</strong>${option.consequence}</p>
        </div>
        <div class="historical-reflection">
            <h5>历史反思</h5>
            <p>在真实的历史中，类似的决策往往会产生深远的影响。通过这次模拟，你可以更好地理解历史人物面临的复杂选择和历史发展的偶然性与必然性。</p>
        </div>
    `;
}

// 获取角色名称
function getRoleName(role) {
    const roleNames = {
        'ruler': '统治者',
        'merchant': '商人',
        'scholar': '学者',
        'citizen': '普通民众'
    };
    return roleNames[role] || role;
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('历史学科应用已加载');
});