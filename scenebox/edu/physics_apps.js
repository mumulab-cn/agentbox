// 物理实验室功能
let experimentRunning = false;
let animationId;

// 更新实验参数显示
document.getElementById('mass').addEventListener('input', function() {
    document.getElementById('massValue').textContent = this.value;
});

document.getElementById('gravity').addEventListener('input', function() {
    document.getElementById('gravityValue').textContent = this.value;
});

// 运行力学实验
function runExperiment() {
    const mass = parseFloat(document.getElementById('mass').value);
    const gravity = parseFloat(document.getElementById('gravity').value);
    const force = mass * gravity;
    
    const resultDiv = document.getElementById('experimentResult');
    resultDiv.innerHTML = `
        <h4>实验结果</h4>
        <p>质量: ${mass} kg</p>
        <p>重力加速度: ${gravity} m/s²</p>
        <p>重力: ${force.toFixed(2)} N</p>
        <p>实验结论: 重力 = 质量 × 重力加速度</p>
    `;
    
    // 绘制实验动画
    drawFallingObject(mass, gravity);
}

// 绘制下落物体动画
function drawFallingObject(mass, gravity) {
    const canvas = document.getElementById('physicsCanvas');
    const ctx = canvas.getContext('2d');
    
    let y = 50;
    let velocity = 0;
    const dt = 0.1;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制地面
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
        
        // 绘制物体
        ctx.fillStyle = '#FF6B6B';
        ctx.fillRect(canvas.width/2 - 15, y, 30, 30);
        
        // 物理计算
        velocity += gravity * dt;
        y += velocity * dt;
        
        // 碰撞检测
        if (y >= canvas.height - 50) {
            y = canvas.height - 50;
            velocity = -velocity * 0.7; // 弹性碰撞
        }
        
        // 显示速度信息
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.fillText(`速度: ${velocity.toFixed(2)} m/s`, 10, 30);
        ctx.fillText(`高度: ${(canvas.height - 50 - y).toFixed(2)} px`, 10, 50);
        
        if (Math.abs(velocity) > 0.1) {
            animationId = requestAnimationFrame(animate);
        }
    }
    
    animate();
}

// 电路设计工具
let circuitComponents = [];
let componentCounter = 0;

function addComponent(type) {
    const workspace = document.getElementById('circuitWorkspace');
    const component = document.createElement('div');
    component.className = 'circuit-component';
    component.id = `component_${componentCounter++}`;
    
    let symbol, name;
    switch(type) {
        case 'battery':
            symbol = '🔋';
            name = '电池';
            break;
        case 'resistor':
            symbol = '⚡';
            name = '电阻';
            break;
        case 'led':
            symbol = '💡';
            name = 'LED';
            break;
        case 'switch':
            symbol = '🔘';
            name = '开关';
            break;
    }
    
    component.innerHTML = `
        <span class="component-symbol">${symbol}</span>
        <span class="component-name">${name}</span>
        <button onclick="removeComponent('${component.id}')">×</button>
    `;
    
    workspace.appendChild(component);
    circuitComponents.push({id: component.id, type: type, name: name});
    
    if (circuitComponents.length === 1) {
        workspace.querySelector('p').style.display = 'none';
    }
}

function removeComponent(componentId) {
    const component = document.getElementById(componentId);
    component.remove();
    circuitComponents = circuitComponents.filter(c => c.id !== componentId);
    
    if (circuitComponents.length === 0) {
        document.getElementById('circuitWorkspace').querySelector('p').style.display = 'block';
    }
}

function simulateCircuit() {
    const analysisDiv = document.getElementById('circuitAnalysis');
    
    if (circuitComponents.length === 0) {
        analysisDiv.innerHTML = '<p style="color: red;">请先添加电路元件</p>';
        return;
    }
    
    const hasBattery = circuitComponents.some(c => c.type === 'battery');
    const hasResistor = circuitComponents.some(c => c.type === 'resistor');
    const hasLed = circuitComponents.some(c => c.type === 'led');
    
    let analysis = '<h4>电路分析结果</h4>';
    
    if (!hasBattery) {
        analysis += '<p style="color: red;">⚠️ 电路缺少电源</p>';
    } else {
        analysis += '<p style="color: green;">✓ 电路有电源</p>';
        
        if (hasLed && hasResistor) {
            analysis += '<p style="color: green;">✓ LED有限流电阻保护</p>';
            analysis += '<p>💡 LED将正常发光</p>';
        } else if (hasLed && !hasResistor) {
            analysis += '<p style="color: orange;">⚠️ LED缺少限流电阻，可能烧毁</p>';
        }
        
        // 简单的欧姆定律计算
        if (hasResistor) {
            const voltage = 5; // 假设电池电压5V
            const resistance = 100; // 假设电阻100Ω
            const current = voltage / resistance;
            analysis += `<p>根据欧姆定律 I = U/R:</p>`;
            analysis += `<p>电流 = ${voltage}V / ${resistance}Ω = ${current.toFixed(3)}A</p>`;
        }
    }
    
    analysisDiv.innerHTML = analysis;
}

function clearCircuit() {
    const workspace = document.getElementById('circuitWorkspace');
    workspace.innerHTML = '<p>点击上方按钮添加电路元件</p>';
    circuitComponents = [];
    document.getElementById('circuitAnalysis').innerHTML = '';
}

// 波动现象模拟器
let waveAnimation;
let waveStartTime = Date.now();

// 更新波动参数显示
document.getElementById('frequency').addEventListener('input', function() {
    document.getElementById('frequencyValue').textContent = this.value;
    updateWaveInfo();
});

document.getElementById('amplitude').addEventListener('input', function() {
    document.getElementById('amplitudeValue').textContent = this.value;
    updateWaveInfo();
});

document.getElementById('waveType').addEventListener('change', updateWaveInfo);

function updateWaveInfo() {
    const frequency = parseFloat(document.getElementById('frequency').value);
    const amplitude = parseFloat(document.getElementById('amplitude').value);
    const waveType = document.getElementById('waveType').value;
    
    const wavelength = 300 / frequency; // 简化计算
    const period = 1 / frequency;
    
    document.getElementById('waveInfo').innerHTML = `
        <h4>波动参数</h4>
        <p>频率: ${frequency} Hz</p>
        <p>周期: ${period.toFixed(2)} s</p>
        <p>振幅: ${amplitude} 像素</p>
        <p>波长: ${wavelength.toFixed(2)} 像素</p>
        <p>波形: ${waveType === 'sine' ? '正弦波' : waveType === 'square' ? '方波' : '三角波'}</p>
    `;
}

// 绘制波形
function drawWave() {
    const canvas = document.getElementById('waveCanvas');
    const ctx = canvas.getContext('2d');
    const frequency = parseFloat(document.getElementById('frequency').value);
    const amplitude = parseFloat(document.getElementById('amplitude').value);
    const waveType = document.getElementById('waveType').value;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制坐标轴
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    
    // 绘制波形
    ctx.strokeStyle = '#4ECDC4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    const time = (Date.now() - waveStartTime) / 1000;
    
    for (let x = 0; x < canvas.width; x++) {
        let y;
        const phase = (x / canvas.width) * 4 * Math.PI + time * frequency * 2 * Math.PI;
        
        switch(waveType) {
            case 'sine':
                y = Math.sin(phase);
                break;
            case 'square':
                y = Math.sin(phase) > 0 ? 1 : -1;
                break;
            case 'triangle':
                y = (2 / Math.PI) * Math.asin(Math.sin(phase));
                break;
        }
        
        y = canvas.height / 2 - y * amplitude;
        
        if (x === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.stroke();
    
    waveAnimation = requestAnimationFrame(drawWave);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    updateWaveInfo();
    drawWave();
});

// 页面卸载时清理动画
window.addEventListener('beforeunload', function() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    if (waveAnimation) {
        cancelAnimationFrame(waveAnimation);
    }
});