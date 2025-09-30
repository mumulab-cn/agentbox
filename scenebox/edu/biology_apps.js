// 细胞结构3D探索功能
const organelles = {
    nucleus: { name: '细胞核', color: '#8B4513', description: '控制细胞活动，含有遗传物质DNA' },
    mitochondria: { name: '线粒体', color: '#FF6B6B', description: '细胞的动力工厂，进行细胞呼吸产生ATP' },
    ribosome: { name: '核糖体', color: '#4ECDC4', description: '蛋白质合成的场所' },
    er: { name: '内质网', color: '#45B7D1', description: '蛋白质和脂质的合成与运输' },
    golgi: { name: '高尔基体', color: '#96CEB4', description: '蛋白质的加工、包装和运输' },
    chloroplast: { name: '叶绿体', color: '#2ECC71', description: '进行光合作用的场所（植物细胞特有）' }
};

let currentCellType = 'animal';
let visibleOrganelles = new Set(['nucleus', 'mitochondria', 'ribosome', 'er', 'golgi']);

// 切换细胞类型
function switchCellType() {
    currentCellType = document.getElementById('cellType').value;
    
    // 根据细胞类型调整细胞器显示
    const chloroplastCheckbox = document.getElementById('chloroplast');
    if (currentCellType === 'plant') {
        chloroplastCheckbox.disabled = false;
        chloroplastCheckbox.checked = true;
        visibleOrganelles.add('chloroplast');
    } else {
        chloroplastCheckbox.disabled = true;
        chloroplastCheckbox.checked = false;
        visibleOrganelles.delete('chloroplast');
    }
    
    if (currentCellType === 'bacteria') {
        // 细菌细胞没有膜结构细胞器
        ['nucleus', 'mitochondria', 'er', 'golgi', 'chloroplast'].forEach(organelle => {
            document.getElementById(organelle).checked = false;
            document.getElementById(organelle).disabled = true;
            visibleOrganelles.delete(organelle);
        });
        document.getElementById('ribosome').disabled = false;
    } else {
        // 真核细胞恢复所有细胞器
        ['nucleus', 'mitochondria', 'er', 'golgi'].forEach(organelle => {
            document.getElementById(organelle).disabled = false;
            document.getElementById(organelle).checked = true;
            visibleOrganelles.add(organelle);
        });
    }
    
    drawCell();
}

// 切换细胞器显示
function toggleOrganelle(organelleId) {
    const checkbox = document.getElementById(organelleId);
    if (checkbox.checked) {
        visibleOrganelles.add(organelleId);
    } else {
        visibleOrganelles.delete(organelleId);
    }
    drawCell();
}

// 绘制细胞
function drawCell() {
    const svg = document.getElementById('cellSvg');
    svg.innerHTML = '';
    
    // 绘制细胞膜
    const cellMembrane = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    cellMembrane.setAttribute('cx', '200');
    cellMembrane.setAttribute('cy', '150');
    cellMembrane.setAttribute('rx', '180');
    cellMembrane.setAttribute('ry', '130');
    cellMembrane.setAttribute('fill', 'none');
    cellMembrane.setAttribute('stroke', '#333');
    cellMembrane.setAttribute('stroke-width', '3');
    svg.appendChild(cellMembrane);
    
    // 绘制细胞器
    if (visibleOrganelles.has('nucleus')) {
        drawOrganelle(svg, 'nucleus', 200, 150, 40, 35);
    }
    
    if (visibleOrganelles.has('mitochondria')) {
        drawOrganelle(svg, 'mitochondria', 120, 100, 25, 15);
        drawOrganelle(svg, 'mitochondria', 280, 200, 25, 15);
    }
    
    if (visibleOrganelles.has('ribosome')) {
        for (let i = 0; i < 8; i++) {
            const x = 100 + Math.random() * 200;
            const y = 80 + Math.random() * 140;
            drawOrganelle(svg, 'ribosome', x, y, 3, 3);
        }
    }
    
    if (visibleOrganelles.has('er')) {
        drawOrganelle(svg, 'er', 150, 100, 60, 20);
        drawOrganelle(svg, 'er', 250, 180, 50, 15);
    }
    
    if (visibleOrganelles.has('golgi')) {
        drawOrganelle(svg, 'golgi', 300, 120, 30, 20);
    }
    
    if (visibleOrganelles.has('chloroplast') && currentCellType === 'plant') {
        drawOrganelle(svg, 'chloroplast', 130, 180, 35, 25);
        drawOrganelle(svg, 'chloroplast', 270, 100, 35, 25);
    }
}

// 绘制细胞器
function drawOrganelle(svg, type, x, y, rx, ry) {
    const organelle = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    organelle.setAttribute('cx', x);
    organelle.setAttribute('cy', y);
    organelle.setAttribute('rx', rx);
    organelle.setAttribute('ry', ry);
    organelle.setAttribute('fill', organelles[type].color);
    organelle.setAttribute('stroke', '#333');
    organelle.setAttribute('stroke-width', '1');
    organelle.style.cursor = 'pointer';
    
    organelle.addEventListener('click', () => showOrganelleInfo(type));
    svg.appendChild(organelle);
}

// 显示细胞器信息
function showOrganelleInfo(type) {
    const infoDiv = document.getElementById('organelleInfo');
    const organelle = organelles[type];
    
    infoDiv.innerHTML = `
        <h4>${organelle.name}</h4>
        <p>${organelle.description}</p>
        <div class="organelle-details">
            <p><strong>主要功能:</strong></p>
            <ul>
                ${getOrganelleFunctions(type).map(func => `<li>${func}</li>`).join('')}
            </ul>
        </div>
    `;
}

// 获取细胞器功能
function getOrganelleFunctions(type) {
    const functions = {
        nucleus: ['储存遗传信息', '控制基因表达', '调节细胞分裂', 'RNA合成'],
        mitochondria: ['ATP合成', '细胞呼吸', '钙离子储存', '细胞凋亡调节'],
        ribosome: ['蛋白质合成', 'mRNA翻译', '肽键形成'],
        er: ['蛋白质折叠', '脂质合成', '钙离子储存', '蛋白质运输'],
        golgi: ['蛋白质修饰', '糖基化', '蛋白质分拣', '囊泡形成'],
        chloroplast: ['光合作用', '叶绿素合成', '淀粉储存', '氧气产生']
    };
    return functions[type] || [];
}

// DNA序列分析功能
let currentDNASequence = '';
let currentRNASequence = '';

// 生成随机DNA序列
function generateRandomDNA() {
    const bases = ['A', 'T', 'G', 'C'];
    let sequence = '';
    for (let i = 0; i < 30; i++) {
        sequence += bases[Math.floor(Math.random() * 4)];
    }
    document.getElementById('dnaSequence').value = sequence;
    analyzeDNA();
}

// 分析DNA序列
function analyzeDNA() {
    const sequence = document.getElementById('dnaSequence').value.toUpperCase().replace(/[^ATGC]/g, '');
    currentDNASequence = sequence;
    
    if (sequence.length === 0) {
        document.getElementById('dnaAnalysisResult').innerHTML = '<p style="color: red;">请输入有效的DNA序列</p>';
        return;
    }
    
    // 统计碱基
    const baseCounts = { A: 0, T: 0, G: 0, C: 0 };
    for (let base of sequence) {
        baseCounts[base]++;
    }
    
    // 计算GC含量
    const gcContent = ((baseCounts.G + baseCounts.C) / sequence.length * 100).toFixed(1);
    
    // 显示分析结果
    document.getElementById('dnaAnalysisResult').innerHTML = `
        <h4>DNA序列分析结果</h4>
        <p><strong>序列长度:</strong> ${sequence.length} bp</p>
        <p><strong>碱基组成:</strong></p>
        <ul>
            <li>腺嘌呤 (A): ${baseCounts.A} (${(baseCounts.A/sequence.length*100).toFixed(1)}%)</li>
            <li>胸腺嘧啶 (T): ${baseCounts.T} (${(baseCounts.T/sequence.length*100).toFixed(1)}%)</li>
            <li>鸟嘌呤 (G): ${baseCounts.G} (${(baseCounts.G/sequence.length*100).toFixed(1)}%)</li>
            <li>胞嘧啶 (C): ${baseCounts.C} (${(baseCounts.C/sequence.length*100).toFixed(1)}%)</li>
        </ul>
        <p><strong>GC含量:</strong> ${gcContent}%</p>
        <p><strong>Chargaff规律验证:</strong> A≈T: ${Math.abs(baseCounts.A - baseCounts.T) <= 2 ? '✓' : '✗'}, G≈C: ${Math.abs(baseCounts.G - baseCounts.C) <= 2 ? '✓' : '✗'}</p>
    `;
    
    // 绘制DNA双螺旋
    drawDNAHelix(sequence);
}

// 绘制DNA双螺旋
function drawDNAHelix(sequence) {
    const canvas = document.getElementById('dnaCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const baseColors = {
        'A': '#FF6B6B', 'T': '#4ECDC4',
        'G': '#45B7D1', 'C': '#96CEB4'
    };
    
    // 绘制DNA骨架
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 3;
    
    for (let i = 0; i < Math.min(sequence.length, 20); i++) {
        const x = 30 + i * 25;
        const y1 = 50 + Math.sin(i * 0.5) * 20;
        const y2 = 150 - Math.sin(i * 0.5) * 20;
        
        // 绘制骨架
        if (i > 0) {
            ctx.beginPath();
            ctx.moveTo(x - 25, 50 + Math.sin((i-1) * 0.5) * 20);
            ctx.lineTo(x, y1);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(x - 25, 150 - Math.sin((i-1) * 0.5) * 20);
            ctx.lineTo(x, y2);
            ctx.stroke();
        }
        
        // 绘制碱基对
        const base1 = sequence[i];
        const base2 = getComplementaryBase(base1);
        
        ctx.fillStyle = baseColors[base1];
        ctx.fillRect(x - 8, y1 - 8, 16, 16);
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(base1, x, y1 + 4);
        
        ctx.fillStyle = baseColors[base2];
        ctx.fillRect(x - 8, y2 - 8, 16, 16);
        ctx.fillStyle = '#fff';
        ctx.fillText(base2, x, y2 + 4);
        
        // 绘制氢键
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.moveTo(x, y1 + 8);
        ctx.lineTo(x, y2 - 8);
        ctx.stroke();
        ctx.setLineDash([]);
    }
}

// 获取互补碱基
function getComplementaryBase(base) {
    const complements = { 'A': 'T', 'T': 'A', 'G': 'C', 'C': 'G' };
    return complements[base];
}

// 转录DNA为RNA
function transcribeDNA() {
    if (!currentDNASequence) {
        alert('请先输入并分析DNA序列');
        return;
    }
    
    currentRNASequence = currentDNASequence.replace(/T/g, 'U');
    
    document.getElementById('transcriptionResult').innerHTML = `
        <h4>转录结果</h4>
        <p><strong>DNA模板链:</strong> ${currentDNASequence}</p>
        <p><strong>RNA序列:</strong> ${currentRNASequence}</p>
        <p><strong>转录规律:</strong> A→U, T→A, G→C, C→G</p>
    `;
}

// 翻译RNA为蛋白质
function translateRNA() {
    if (!currentRNASequence) {
        alert('请先进行转录');
        return;
    }
    
    const geneticCode = {
        'UUU': 'Phe', 'UUC': 'Phe', 'UUA': 'Leu', 'UUG': 'Leu',
        'UCU': 'Ser', 'UCC': 'Ser', 'UCA': 'Ser', 'UCG': 'Ser',
        'UAU': 'Tyr', 'UAC': 'Tyr', 'UAA': 'Stop', 'UAG': 'Stop',
        'UGU': 'Cys', 'UGC': 'Cys', 'UGA': 'Stop', 'UGG': 'Trp',
        'CUU': 'Leu', 'CUC': 'Leu', 'CUA': 'Leu', 'CUG': 'Leu',
        'CCU': 'Pro', 'CCC': 'Pro', 'CCA': 'Pro', 'CCG': 'Pro',
        'CAU': 'His', 'CAC': 'His', 'CAA': 'Gln', 'CAG': 'Gln',
        'CGU': 'Arg', 'CGC': 'Arg', 'CGA': 'Arg', 'CGG': 'Arg',
        'AUU': 'Ile', 'AUC': 'Ile', 'AUA': 'Ile', 'AUG': 'Met',
        'ACU': 'Thr', 'ACC': 'Thr', 'ACA': 'Thr', 'ACG': 'Thr',
        'AAU': 'Asn', 'AAC': 'Asn', 'AAA': 'Lys', 'AAG': 'Lys',
        'AGU': 'Ser', 'AGC': 'Ser', 'AGA': 'Arg', 'AGG': 'Arg',
        'GUU': 'Val', 'GUC': 'Val', 'GUA': 'Val', 'GUG': 'Val',
        'GCU': 'Ala', 'GCC': 'Ala', 'GCA': 'Ala', 'GCG': 'Ala',
        'GAU': 'Asp', 'GAC': 'Asp', 'GAA': 'Glu', 'GAG': 'Glu',
        'GGU': 'Gly', 'GGC': 'Gly', 'GGA': 'Gly', 'GGG': 'Gly'
    };
    
    let protein = [];
    for (let i = 0; i < currentRNASequence.length - 2; i += 3) {
        const codon = currentRNASequence.substr(i, 3);
        const aminoAcid = geneticCode[codon] || 'X';
        if (aminoAcid === 'Stop') break;
        protein.push(aminoAcid);
    }
    
    const existingResult = document.getElementById('transcriptionResult').innerHTML;
    document.getElementById('transcriptionResult').innerHTML = existingResult + `
        <h4>翻译结果</h4>
        <p><strong>蛋白质序列:</strong> ${protein.join('-')}</p>
        <p><strong>氨基酸数量:</strong> ${protein.length}</p>
    `;
}

// 生态系统模拟器功能
let ecosystemData = {
    producers: 50,
    primaryConsumers: 25,
    secondaryConsumers: 10,
    temperature: 20,
    rainfall: 800
};

let simulationRunning = false;
let simulationInterval;

// 更新生态系统参数
function updateEcosystem() {
    ecosystemData.producers = parseInt(document.getElementById('producers').value);
    ecosystemData.primaryConsumers = parseInt(document.getElementById('primaryConsumers').value);
    ecosystemData.secondaryConsumers = parseInt(document.getElementById('secondaryConsumers').value);
    ecosystemData.temperature = parseInt(document.getElementById('temperature').value);
    ecosystemData.rainfall = parseInt(document.getElementById('rainfall').value);
    
    // 更新显示值
    document.getElementById('producersValue').textContent = ecosystemData.producers;
    document.getElementById('primaryConsumersValue').textContent = ecosystemData.primaryConsumers;
    document.getElementById('secondaryConsumersValue').textContent = ecosystemData.secondaryConsumers;
    document.getElementById('temperatureValue').textContent = ecosystemData.temperature;
    document.getElementById('rainfallValue').textContent = ecosystemData.rainfall;
    
    drawEcosystem();
    analyzeEcosystemBalance();
}

// 绘制生态系统
function drawEcosystem() {
    const canvas = document.getElementById('ecosystemCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制背景环境
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#90EE90');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制生产者（植物）
    ctx.fillStyle = '#2ECC71';
    for (let i = 0; i < ecosystemData.producers; i++) {
        const x = (i % 20) * 30 + 15;
        const y = canvas.height - 30 + Math.random() * 20;
        ctx.fillRect(x - 2, y - 10, 4, 10);
        ctx.beginPath();
        ctx.arc(x, y - 10, 3, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    // 绘制初级消费者（草食动物）
    ctx.fillStyle = '#F39C12';
    for (let i = 0; i < ecosystemData.primaryConsumers; i++) {
        const x = Math.random() * (canvas.width - 20) + 10;
        const y = canvas.height - 50 + Math.random() * 20;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    // 绘制次级消费者（肉食动物）
    ctx.fillStyle = '#E74C3C';
    for (let i = 0; i < ecosystemData.secondaryConsumers; i++) {
        const x = Math.random() * (canvas.width - 20) + 10;
        const y = canvas.height - 80 + Math.random() * 30;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    // 绘制环境信息
    ctx.fillStyle = '#333';
    ctx.font = '14px Arial';
    ctx.fillText(`温度: ${ecosystemData.temperature}°C`, 10, 20);
    ctx.fillText(`降水: ${ecosystemData.rainfall}mm`, 10, 40);
}

// 分析生态系统平衡
function analyzeEcosystemBalance() {
    const statusDiv = document.getElementById('ecosystemStatus');
    
    // 计算生态平衡指数
    const idealRatio1 = ecosystemData.producers / ecosystemData.primaryConsumers;
    const idealRatio2 = ecosystemData.primaryConsumers / ecosystemData.secondaryConsumers;
    
    let balance = 'stable';
    let message = '';
    
    if (idealRatio1 < 1.5) {
        balance = 'unstable';
        message = '生产者数量不足，可能导致草食动物饥饿';
    } else if (idealRatio2 < 2) {
        balance = 'unstable';
        message = '肉食动物过多，可能导致草食动物数量急剧下降';
    } else if (ecosystemData.temperature < 0 || ecosystemData.temperature > 35) {
        balance = 'stressed';
        message = '温度过于极端，影响生物生存';
    } else if (ecosystemData.rainfall < 200) {
        balance = 'stressed';
        message = '降水不足，可能导致干旱';
    } else {
        message = '生态系统处于良好平衡状态';
    }
    
    const balanceColor = balance === 'stable' ? 'green' : balance === 'stressed' ? 'orange' : 'red';
    
    statusDiv.innerHTML = `
        <h4>生态系统状态分析</h4>
        <p><strong>平衡状态:</strong> <span style="color: ${balanceColor};">${balance === 'stable' ? '稳定' : balance === 'stressed' ? '受压' : '不稳定'}</span></p>
        <p><strong>分析结果:</strong> ${message}</p>
        <p><strong>生产者/初级消费者比:</strong> ${idealRatio1.toFixed(2)}</p>
        <p><strong>初级/次级消费者比:</strong> ${idealRatio2.toFixed(2)}</p>
        <div class="energy-pyramid">
            <div class="pyramid-level" style="width: ${ecosystemData.secondaryConsumers * 2}px; background: #E74C3C;">次级消费者</div>
            <div class="pyramid-level" style="width: ${ecosystemData.primaryConsumers * 2}px; background: #F39C12;">初级消费者</div>
            <div class="pyramid-level" style="width: ${ecosystemData.producers * 2}px; background: #2ECC71;">生产者</div>
        </div>
    `;
}

// 开始模拟
function startSimulation() {
    if (simulationRunning) return;
    
    simulationRunning = true;
    simulationInterval = setInterval(() => {
        // 简单的种群动态模拟
        const growthRate = (ecosystemData.temperature + 10) / 40 * (ecosystemData.rainfall / 1000);
        
        // 生产者增长
        ecosystemData.producers += Math.floor(ecosystemData.producers * growthRate * 0.1);
        
        // 消费者变化基于食物可用性
        if (ecosystemData.producers > ecosystemData.primaryConsumers * 2) {
            ecosystemData.primaryConsumers += Math.floor(ecosystemData.primaryConsumers * 0.05);
        } else {
            ecosystemData.primaryConsumers -= Math.floor(ecosystemData.primaryConsumers * 0.02);
        }
        
        if (ecosystemData.primaryConsumers > ecosystemData.secondaryConsumers * 3) {
            ecosystemData.secondaryConsumers += Math.floor(ecosystemData.secondaryConsumers * 0.03);
        } else {
            ecosystemData.secondaryConsumers -= Math.floor(ecosystemData.secondaryConsumers * 0.01);
        }
        
        // 限制最小值
        ecosystemData.producers = Math.max(10, Math.min(100, ecosystemData.producers));
        ecosystemData.primaryConsumers = Math.max(5, Math.min(50, ecosystemData.primaryConsumers));
        ecosystemData.secondaryConsumers = Math.max(1, Math.min(20, ecosystemData.secondaryConsumers));
        
        // 更新滑块值
        document.getElementById('producers').value = ecosystemData.producers;
        document.getElementById('primaryConsumers').value = ecosystemData.primaryConsumers;
        document.getElementById('secondaryConsumers').value = ecosystemData.secondaryConsumers;
        
        updateEcosystem();
    }, 1000);
}

// 暂停模拟
function pauseSimulation() {
    simulationRunning = false;
    if (simulationInterval) {
        clearInterval(simulationInterval);
    }
}

// 重置生态系统
function resetEcosystem() {
    pauseSimulation();
    
    ecosystemData = {
        producers: 50,
        primaryConsumers: 25,
        secondaryConsumers: 10,
        temperature: 20,
        rainfall: 800
    };
    
    document.getElementById('producers').value = 50;
    document.getElementById('primaryConsumers').value = 25;
    document.getElementById('secondaryConsumers').value = 10;
    document.getElementById('temperature').value = 20;
    document.getElementById('rainfall').value = 800;
    
    updateEcosystem();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    drawCell();
    updateEcosystem();
});