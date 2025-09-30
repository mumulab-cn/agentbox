// 地理学科应用交互功能

// 地理信息系统数据
const gisData = {
    regions: {
        world: {
            name: '世界',
            center: [0, 0],
            zoom: 2,
            features: ['continents', 'oceans', 'major_cities']
        },
        china: {
            name: '中国',
            center: [104.195, 35.861],
            zoom: 4,
            features: ['provinces', 'rivers', 'mountains', 'cities']
        }
    },
    mapTypes: {
        physical: {
            name: '地形图',
            description: '显示地形地貌、海拔高度等自然地理要素',
            colors: ['#0066cc', '#00cc66', '#ffcc00', '#cc6600', '#ffffff']
        },
        political: {
            name: '政治图',
            description: '显示国家、省份、城市等行政区划',
            colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57']
        },
        climate: {
            name: '气候图',
            description: '显示气候类型、温度、降水等气候要素',
            colors: ['#e74c3c', '#f39c12', '#f1c40f', '#2ecc71', '#3498db']
        }
    }
};

// 气候模拟参数
const climateModel = {
    baseTemperature: 15.0,
    co2Sensitivity: 0.008, // 每ppm CO2对温度的影响
    solarSensitivity: 2.5,  // 太阳辐射对温度的影响
    cloudEffect: -0.02,     // 云量对温度的影响
    forestEffect: -0.01,    // 森林对温度的影响
    iceAlbedo: 0.8,        // 冰雪反照率
    scenarios: {
        current: { co2: 410, solar: 1.0, cloud: 60, forest: 30, ice: 10, ocean: 0 },
        industrial: { co2: 280, solar: 1.0, cloud: 65, forest: 50, ice: 15, ocean: -0.5 },
        'future-low': { co2: 450, solar: 1.0, cloud: 55, forest: 35, ice: 8, ocean: 1.0 },
        'future-high': { co2: 600, solar: 1.0, cloud: 50, forest: 20, ice: 5, ocean: 2.5 }
    }
};

// 地形数据
const terrainData = {
    mountain: {
        name: '山地',
        elevation: '1000-5000米',
        formation: '地壳运动、板块碰撞',
        characteristics: '地势起伏大，坡度陡峭',
        examples: ['喜马拉雅山脉', '阿尔卑斯山', '安第斯山脉'],
        processes: [
            { time: 0, description: '平坦的地壳表面' },
            { time: 25, description: '板块开始碰撞，地壳受压' },
            { time: 50, description: '岩层褶皱隆起，形成山脊' },
            { time: 75, description: '山体继续抬升，形成高峰' },
            { time: 100, description: '风化侵蚀塑造山体形态' }
        ]
    },
    plateau: {
        name: '高原',
        elevation: '1000-4000米',
        formation: '地壳整体抬升',
        characteristics: '地势高而平坦，边缘陡峭',
        examples: ['青藏高原', '巴西高原', '东非高原'],
        processes: [
            { time: 0, description: '低海拔平原地区' },
            { time: 25, description: '地壳开始缓慢抬升' },
            { time: 50, description: '整体海拔显著提高' },
            { time: 75, description: '形成高平台地形' },
            { time: 100, description: '河流切割形成峡谷' }
        ]
    },
    plain: {
        name: '平原',
        elevation: '0-200米',
        formation: '沉积作用、侵蚀作用',
        characteristics: '地势平坦，起伏很小',
        examples: ['华北平原', '亚马逊平原', '欧洲平原'],
        processes: [
            { time: 0, description: '河流携带大量泥沙' },
            { time: 25, description: '泥沙在下游沉积' },
            { time: 50, description: '沉积层逐渐加厚' },
            { time: 75, description: '形成广阔的冲积平原' },
            { time: 100, description: '河道摆动塑造地形' }
        ]
    }
};

// 更新地图显示
function updateMap() {
    const mapType = document.getElementById('map-type').value;
    const region = document.getElementById('region-select').value;
    const mapDisplay = document.getElementById('map-display');
    
    const typeData = gisData.mapTypes[mapType];
    const regionData = gisData.regions[region];
    
    // 获取图层设置
    const cities = document.getElementById('cities').checked;
    const rivers = document.getElementById('rivers').checked;
    const mountains = document.getElementById('mountains').checked;
    const borders = document.getElementById('borders').checked;
    
    let layerInfo = [];
    if (cities) layerInfo.push('城市');
    if (rivers) layerInfo.push('河流');
    if (mountains) layerInfo.push('山脉');
    if (borders) layerInfo.push('边界');
    
    mapDisplay.innerHTML = `
        <div class="map-container">
            <div class="map-canvas" style="background: linear-gradient(45deg, ${typeData.colors.join(', ')})">
                <div class="map-overlay">
                    <h3>${regionData.name}${typeData.name}</h3>
                    <p>${typeData.description}</p>
                    ${layerInfo.length > 0 ? `<p><strong>显示图层：</strong>${layerInfo.join('、')}</p>` : ''}
                </div>
                <div class="map-features">
                    ${cities ? '<div class="city-marker">🏙️ 主要城市</div>' : ''}
                    ${rivers ? '<div class="river-line">🌊 主要河流</div>' : ''}
                    ${mountains ? '<div class="mountain-marker">⛰️ 山脉</div>' : ''}
                    ${borders ? '<div class="border-line">📍 行政边界</div>' : ''}
                </div>
            </div>
            <div class="map-legend">
                <h4>图例</h4>
                <div class="legend-items">
                    ${typeData.colors.map((color, index) => 
                        `<div class="legend-item">
                            <div class="color-box" style="background: ${color}"></div>
                            <span>${getLegendLabel(mapType, index)}</span>
                        </div>`
                    ).join('')}
                </div>
            </div>
        </div>
    `;
}

// 获取图例标签
function getLegendLabel(mapType, index) {
    const labels = {
        physical: ['深海', '平原', '丘陵', '山地', '高山'],
        political: ['国家A', '国家B', '国家C', '国家D', '国家E'],
        climate: ['热带', '亚热带', '温带', '寒带', '极地']
    };
    return labels[mapType][index] || `类型${index + 1}`;
}

// 距离测量
function measureDistance() {
    const resultDiv = document.getElementById('analysis-result');
    resultDiv.innerHTML = `
        <h5>距离测量工具</h5>
        <p>点击地图上两个点进行距离测量</p>
        <div class="measurement-result">
            <p><strong>测量结果：</strong>北京到上海直线距离约 1,067 公里</p>
            <p><strong>实际路径：</strong>考虑地形因素，实际距离约 1,200 公里</p>
        </div>
    `;
}

// 面积计算
function calculateArea() {
    const resultDiv = document.getElementById('analysis-result');
    resultDiv.innerHTML = `
        <h5>面积计算工具</h5>
        <p>绘制多边形区域进行面积计算</p>
        <div class="measurement-result">
            <p><strong>选定区域：</strong>长江三角洲地区</p>
            <p><strong>计算面积：</strong>约 21,000 平方公里</p>
            <p><strong>包含城市：</strong>上海、南京、杭州等</p>
        </div>
    `;
}

// 高程剖面
function elevationProfile() {
    const resultDiv = document.getElementById('analysis-result');
    resultDiv.innerHTML = `
        <h5>高程剖面分析</h5>
        <p>沿指定路径生成高程剖面图</p>
        <div class="elevation-chart">
            <div class="chart-placeholder">
                <p>📈 高程变化图</p>
                <p>从海平面到青藏高原的高程变化</p>
            </div>
            <div class="elevation-data">
                <p><strong>起点：</strong>上海（海拔 4米）</p>
                <p><strong>终点：</strong>拉萨（海拔 3,658米）</p>
                <p><strong>最高点：</strong>唐古拉山口（海拔 5,231米）</p>
            </div>
        </div>
    `;
}

// 空间分析
function spatialAnalysis() {
    const resultDiv = document.getElementById('analysis-result');
    resultDiv.innerHTML = `
        <h5>空间分析工具</h5>
        <p>分析地理要素的空间分布和关系</p>
        <div class="spatial-result">
            <p><strong>分析主题：</strong>人口密度与地形关系</p>
            <p><strong>发现：</strong>人口主要集中在海拔500米以下的平原地区</p>
            <p><strong>相关性：</strong>地形平坦度与人口密度呈正相关（r=0.78）</p>
        </div>
    `;
}

// 更新气候模拟
function updateClimate() {
    const co2 = parseFloat(document.getElementById('co2-level').value);
    const solar = parseFloat(document.getElementById('solar-radiation').value);
    const cloud = parseFloat(document.getElementById('cloud-cover').value);
    const forest = parseFloat(document.getElementById('forest-cover').value);
    const ice = parseFloat(document.getElementById('ice-cover').value);
    const ocean = parseFloat(document.getElementById('ocean-temp').value);
    
    // 更新显示值
    document.getElementById('co2-value').textContent = co2;
    document.getElementById('solar-value').textContent = solar;
    document.getElementById('cloud-value').textContent = cloud;
    document.getElementById('forest-value').textContent = forest;
    document.getElementById('ice-value').textContent = ice;
    document.getElementById('ocean-value').textContent = ocean;
    
    // 计算全球温度
    const baseTemp = climateModel.baseTemperature;
    const co2Effect = (co2 - 280) * climateModel.co2Sensitivity;
    const solarEffect = (solar - 1.0) * climateModel.solarSensitivity;
    const cloudEffect = (cloud - 60) * climateModel.cloudEffect;
    const forestEffect = (forest - 30) * climateModel.forestEffect;
    const iceEffect = (15 - ice) * 0.05; // 冰川减少导致反照率降低
    
    const globalTemp = baseTemp + co2Effect + solarEffect + cloudEffect + forestEffect + iceEffect + ocean;
    
    document.getElementById('global-temp').textContent = globalTemp.toFixed(1) + '°C';
    
    // 更新气候影响
    updateClimateEffects(globalTemp, co2, ice);
    
    // 更新地球模型显示
    updateEarthModel(globalTemp, co2, cloud, ice);
}

// 更新气候影响
function updateClimateEffects(temp, co2, ice) {
    const tempChange = temp - 15.0;
    
    // 海平面变化
    const seaLevel = tempChange * 0.2; // 简化计算
    document.getElementById('sea-level').textContent = 
        seaLevel > 0 ? `+${seaLevel.toFixed(1)}m` : `${seaLevel.toFixed(1)}m`;
    
    // 降水量变化
    let precipitation = '正常';
    if (tempChange > 2) precipitation = '增加显著';
    else if (tempChange > 1) precipitation = '略有增加';
    else if (tempChange < -1) precipitation = '减少';
    document.getElementById('precipitation').textContent = precipitation;
    
    // 极端天气
    let extremeWeather = '低';
    if (tempChange > 3) extremeWeather = '极高';
    else if (tempChange > 2) extremeWeather = '高';
    else if (tempChange > 1) extremeWeather = '中等';
    document.getElementById('extreme-weather').textContent = extremeWeather;
    
    // 生态影响
    let ecosystem = '稳定';
    if (tempChange > 2 || ice < 5) ecosystem = '严重威胁';
    else if (tempChange > 1 || ice < 8) ecosystem = '受到影响';
    document.getElementById('ecosystem').textContent = ecosystem;
}

// 更新地球模型
function updateEarthModel(temp, co2, cloud, ice) {
    const earthSurface = document.querySelector('.earth-surface');
    const atmosphere = document.querySelector('.atmosphere-layer');
    
    // 根据温度调整颜色
    const tempChange = temp - 15.0;
    let surfaceColor = '#4a90e2'; // 正常蓝色
    if (tempChange > 2) surfaceColor = '#e74c3c'; // 红色
    else if (tempChange > 1) surfaceColor = '#f39c12'; // 橙色
    else if (tempChange < -1) surfaceColor = '#3498db'; // 深蓝色
    
    earthSurface.style.background = `radial-gradient(circle, ${surfaceColor}, #2c3e50)`;
    
    // 根据CO2浓度调整大气层
    const atmosphereOpacity = Math.min(0.8, 0.3 + (co2 - 280) / 1000);
    atmosphere.style.background = `radial-gradient(circle, rgba(255,255,255,${atmosphereOpacity}), transparent)`;
}

// 加载气候情景
function loadScenario(scenarioName) {
    const scenario = climateModel.scenarios[scenarioName];
    if (!scenario) return;
    
    document.getElementById('co2-level').value = scenario.co2;
    document.getElementById('solar-radiation').value = scenario.solar;
    document.getElementById('cloud-cover').value = scenario.cloud;
    document.getElementById('forest-cover').value = scenario.forest;
    document.getElementById('ice-cover').value = scenario.ice;
    document.getElementById('ocean-temp').value = scenario.ocean;
    
    updateClimate();
}

// 加载地形
function loadTerrain() {
    const terrainType = document.getElementById('terrain-type').value;
    const terrain = terrainData[terrainType];
    const infoDiv = document.getElementById('terrain-info');
    
    infoDiv.innerHTML = `
        <h4>${terrain.name}</h4>
        <p><strong>海拔范围：</strong>${terrain.elevation}</p>
        <p><strong>形成原因：</strong>${terrain.formation}</p>
        <p><strong>主要特征：</strong>${terrain.characteristics}</p>
        <p><strong>典型例子：</strong>${terrain.examples.join('、')}</p>
    `;
    
    // 更新3D模型显示
    updateTerrainModel(terrainType);
}

// 更新地形模型
function updateTerrainModel(terrainType) {
    const model = document.getElementById('terrain-model');
    
    const modelStyles = {
        mountain: 'linear-gradient(45deg, #8B4513, #D2691E, #F4A460)',
        plateau: 'linear-gradient(to top, #228B22, #32CD32, #90EE90)',
        plain: 'linear-gradient(to bottom, #87CEEB, #98FB98, #90EE90)',
        basin: 'linear-gradient(to top, #4682B4, #87CEEB, #B0E0E6)',
        valley: 'linear-gradient(45deg, #2F4F4F, #708090, #B0C4DE)',
        coastal: 'linear-gradient(to right, #4682B4, #F0E68C, #90EE90)'
    };
    
    model.style.background = modelStyles[terrainType] || modelStyles.mountain;
}

// 旋转视角
function rotateView() {
    const angle = document.getElementById('view-angle').value;
    document.getElementById('angle-value').textContent = angle + '°';
    
    const model = document.getElementById('terrain-model');
    model.style.transform = `rotateY(${angle}deg) rotateX(15deg)`;
}

// 缩放高程
function scaleElevation() {
    const scale = document.getElementById('elevation-scale').value;
    document.getElementById('scale-value').textContent = scale + 'x';
    
    const model = document.getElementById('terrain-model');
    model.style.transform += ` scaleY(${scale})`;
}

// 切换等高线
function toggleContours() {
    const contours = document.getElementById('contour-lines').checked;
    const model = document.getElementById('terrain-model');
    
    if (contours) {
        model.style.backgroundImage += ', repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(0,0,0,0.3) 21px)';
    } else {
        // 移除等高线效果
        updateTerrainModel(document.getElementById('terrain-type').value);
    }
}

// 切换水体显示
function toggleWater() {
    const water = document.getElementById('water-bodies').checked;
    // 实现水体显示切换逻辑
}

// 切换植被显示
function toggleVegetation() {
    const vegetation = document.getElementById('vegetation').checked;
    // 实现植被显示切换逻辑
}

// 开始地形形成演示
function startFormation() {
    const terrainType = document.getElementById('terrain-type').value;
    const terrain = terrainData[terrainType];
    const slider = document.getElementById('time-slider');
    const stagesDiv = document.getElementById('formation-stages');
    
    let currentStage = 0;
    const interval = setInterval(() => {
        if (currentStage >= terrain.processes.length) {
            clearInterval(interval);
            return;
        }
        
        const process = terrain.processes[currentStage];
        slider.value = process.time;
        stagesDiv.innerHTML = `
            <div class="formation-stage active">
                <h5>阶段 ${currentStage + 1}</h5>
                <p>${process.description}</p>
                <div class="time-indicator">时间：${process.time === 0 ? '起始' : process.time + '%'}</div>
            </div>
        `;
        
        currentStage++;
    }, 2000);
}

// 暂停形成演示
function pauseFormation() {
    // 实现暂停逻辑
}

// 重置形成演示
function resetFormation() {
    document.getElementById('time-slider').value = 0;
    document.getElementById('formation-stages').innerHTML = '<p>拖动时间轴查看地形形成的不同阶段</p>';
}

// 更新地形形成
function updateFormation() {
    const time = parseInt(document.getElementById('time-slider').value);
    const terrainType = document.getElementById('terrain-type').value;
    const terrain = terrainData[terrainType];
    const stagesDiv = document.getElementById('formation-stages');
    
    // 找到对应的形成阶段
    let currentProcess = terrain.processes[0];
    for (let i = 0; i < terrain.processes.length; i++) {
        if (time >= terrain.processes[i].time) {
            currentProcess = terrain.processes[i];
        } else {
            break;
        }
    }
    
    stagesDiv.innerHTML = `
        <div class="formation-stage">
            <h5>当前阶段</h5>
            <p>${currentProcess.description}</p>
            <div class="time-indicator">时间进度：${time}%</div>
        </div>
    `;
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化地图
    updateMap();
    
    // 初始化气候模拟
    updateClimate();
    
    // 初始化地形
    loadTerrain();
    
    console.log('地理学科应用已加载');
});