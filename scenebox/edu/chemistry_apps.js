// 分子建模功能
let selectedElement = null;
let moleculeAtoms = [];
let moleculeBonds = [];
let atomCounter = 0;

// 元素数据
const elements = {
    'H': { name: '氢', color: '#FFFFFF', radius: 25 },
    'C': { name: '碳', color: '#909090', radius: 35 },
    'N': { name: '氮', color: '#3050F8', radius: 30 },
    'O': { name: '氧', color: '#FF0D0D', radius: 32 },
    'S': { name: '硫', color: '#FFFF30', radius: 40 },
    'P': { name: '磷', color: '#FF8000', radius: 38 }
};

// 选择元素
function selectElement(symbol) {
    selectedElement = symbol;
    document.querySelectorAll('.element-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
    
    // 添加原子到分子
    addAtom(symbol);
}

// 添加原子
function addAtom(symbol) {
    const display = document.getElementById('moleculeDisplay');
    
    if (moleculeAtoms.length === 0) {
        display.innerHTML = '';
    }
    
    const atom = {
        id: atomCounter++,
        symbol: symbol,
        x: 50 + (moleculeAtoms.length % 5) * 80,
        y: 50 + Math.floor(moleculeAtoms.length / 5) * 80
    };
    
    moleculeAtoms.push(atom);
    
    const atomElement = document.createElement('div');
    atomElement.className = 'atom';
    atomElement.id = `atom_${atom.id}`;
    atomElement.style.cssText = `
        position: absolute;
        left: ${atom.x}px;
        top: ${atom.y}px;
        width: ${elements[symbol].radius * 2}px;
        height: ${elements[symbol].radius * 2}px;
        background-color: ${elements[symbol].color};
        border: 2px solid #333;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        cursor: pointer;
        color: ${symbol === 'H' ? '#000' : '#fff'};
    `;
    atomElement.textContent = symbol;
    atomElement.onclick = () => selectAtomForBond(atom.id);
    
    display.appendChild(atomElement);
}

// 选择原子用于成键
let selectedAtoms = [];

function selectAtomForBond(atomId) {
    const atomElement = document.getElementById(`atom_${atomId}`);
    
    if (selectedAtoms.includes(atomId)) {
        selectedAtoms = selectedAtoms.filter(id => id !== atomId);
        atomElement.style.boxShadow = 'none';
    } else {
        selectedAtoms.push(atomId);
        atomElement.style.boxShadow = '0 0 10px #4ECDC4';
    }
}

// 添加化学键
function addBond() {
    if (selectedAtoms.length !== 2) {
        alert('请选择两个原子来形成化学键');
        return;
    }
    
    const [atom1Id, atom2Id] = selectedAtoms;
    const atom1 = moleculeAtoms.find(a => a.id === atom1Id);
    const atom2 = moleculeAtoms.find(a => a.id === atom2Id);
    
    // 检查是否已存在键
    const bondExists = moleculeBonds.some(bond => 
        (bond.atom1 === atom1Id && bond.atom2 === atom2Id) ||
        (bond.atom1 === atom2Id && bond.atom2 === atom1Id)
    );
    
    if (bondExists) {
        alert('这两个原子之间已经存在化学键');
        return;
    }
    
    moleculeBonds.push({ atom1: atom1Id, atom2: atom2Id });
    
    // 绘制化学键
    drawBond(atom1, atom2);
    
    // 清除选择
    selectedAtoms.forEach(id => {
        document.getElementById(`atom_${id}`).style.boxShadow = 'none';
    });
    selectedAtoms = [];
}

// 绘制化学键
function drawBond(atom1, atom2) {
    const display = document.getElementById('moleculeDisplay');
    const bond = document.createElement('div');
    
    const dx = atom2.x - atom1.x;
    const dy = atom2.y - atom1.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    
    bond.className = 'chemical-bond';
    bond.style.cssText = `
        position: absolute;
        left: ${atom1.x + elements[atom1.symbol].radius}px;
        top: ${atom1.y + elements[atom1.symbol].radius - 2}px;
        width: ${length}px;
        height: 4px;
        background-color: #333;
        transform-origin: 0 50%;
        transform: rotate(${angle}deg);
        z-index: -1;
    `;
    
    display.appendChild(bond);
}

// 分析分子
function analyzeMolecule() {
    const infoDiv = document.getElementById('moleculeInfo');
    
    if (moleculeAtoms.length === 0) {
        infoDiv.innerHTML = '<p style="color: red;">请先构建分子</p>';
        return;
    }
    
    // 统计原子数量
    const atomCount = {};
    moleculeAtoms.forEach(atom => {
        atomCount[atom.symbol] = (atomCount[atom.symbol] || 0) + 1;
    });
    
    // 生成分子式
    let formula = '';
    Object.keys(atomCount).sort().forEach(symbol => {
        formula += symbol;
        if (atomCount[symbol] > 1) {
            formula += atomCount[symbol];
        }
    });
    
    // 计算分子量（简化）
    const atomicMass = { 'H': 1, 'C': 12, 'N': 14, 'O': 16, 'S': 32, 'P': 31 };
    let molecularWeight = 0;
    Object.keys(atomCount).forEach(symbol => {
        molecularWeight += atomicMass[symbol] * atomCount[symbol];
    });
    
    infoDiv.innerHTML = `
        <h4>分子分析结果</h4>
        <p><strong>分子式:</strong> ${formula}</p>
        <p><strong>原子总数:</strong> ${moleculeAtoms.length}</p>
        <p><strong>化学键数:</strong> ${moleculeBonds.length}</p>
        <p><strong>分子量:</strong> ${molecularWeight} g/mol</p>
        <p><strong>原子组成:</strong></p>
        <ul>
            ${Object.keys(atomCount).map(symbol => 
                `<li>${elements[symbol].name}(${symbol}): ${atomCount[symbol]}个</li>`
            ).join('')}
        </ul>
    `;
}

// 清空分子
function clearMolecule() {
    moleculeAtoms = [];
    moleculeBonds = [];
    selectedAtoms = [];
    atomCounter = 0;
    document.getElementById('moleculeDisplay').innerHTML = '<p>选择元素开始构建分子</p>';
    document.getElementById('moleculeInfo').innerHTML = '';
}

// 化学反应模拟器
const reactions = {
    'H2+O2': {
        reactants: ['2H₂', 'O₂'],
        products: ['2H₂O'],
        type: '化合反应',
        energy: '放热反应',
        conditions: '点燃'
    },
    'CH4+O2': {
        reactants: ['CH₄', '2O₂'],
        products: ['CO₂', '2H₂O'],
        type: '燃烧反应',
        energy: '放热反应',
        conditions: '点燃'
    },
    'H2+Cl2': {
        reactants: ['H₂', 'Cl₂'],
        products: ['2HCl'],
        type: '化合反应',
        energy: '放热反应',
        conditions: '光照或加热'
    }
};

// 配平方程式
function balanceEquation() {
    const reactant1 = document.getElementById('reactant1').value;
    const reactant2 = document.getElementById('reactant2').value;
    const product1 = document.getElementById('product1').value;
    
    const reactionKey = `${reactant1}+${reactant2}`;
    const reaction = reactions[reactionKey];
    
    const resultDiv = document.getElementById('equationResult');
    
    if (reaction) {
        resultDiv.innerHTML = `
            <h4>配平结果</h4>
            <div class="balanced-equation">
                ${reaction.reactants.join(' + ')} → ${reaction.products.join(' + ')}
            </div>
            <div class="reaction-info">
                <p><strong>反应类型:</strong> ${reaction.type}</p>
                <p><strong>能量变化:</strong> ${reaction.energy}</p>
                <p><strong>反应条件:</strong> ${reaction.conditions}</p>
            </div>
        `;
    } else {
        resultDiv.innerHTML = `
            <p style="color: orange;">暂不支持该反应的自动配平</p>
            <p>请尝试其他反应组合</p>
        `;
    }
}

// 模拟反应
function simulateReaction() {
    const animationDiv = document.getElementById('reactionAnimation');
    
    animationDiv.innerHTML = `
        <h4>反应过程模拟</h4>
        <div class="reaction-steps">
            <div class="step active">1. 反应物分子接近</div>
            <div class="step">2. 活化络合物形成</div>
            <div class="step">3. 化学键断裂重组</div>
            <div class="step">4. 生成物分子形成</div>
        </div>
        <div class="energy-diagram">
            <canvas id="energyCanvas" width="400" height="200"></canvas>
        </div>
    `;
    
    // 绘制能量图
    drawEnergyDiagram();
    
    // 动画显示反应步骤
    animateReactionSteps();
}

// 绘制能量图
function drawEnergyDiagram() {
    const canvas = document.getElementById('energyCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制坐标轴
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 180);
    ctx.lineTo(350, 180);
    ctx.moveTo(50, 20);
    ctx.lineTo(50, 180);
    ctx.stroke();
    
    // 绘制能量曲线
    ctx.strokeStyle = '#4ECDC4';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(70, 120);
    ctx.quadraticCurveTo(200, 60, 330, 140);
    ctx.stroke();
    
    // 标注
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.fillText('反应物', 60, 135);
    ctx.fillText('生成物', 320, 155);
    ctx.fillText('活化能', 180, 50);
    ctx.fillText('反应进程', 200, 195);
    
    // 旋转文字
    ctx.save();
    ctx.translate(30, 100);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('能量', 0, 0);
    ctx.restore();
}

// 动画显示反应步骤
function animateReactionSteps() {
    const steps = document.querySelectorAll('.step');
    let currentStep = 0;
    
    const interval = setInterval(() => {
        if (currentStep > 0) {
            steps[currentStep - 1].classList.remove('active');
        }
        if (currentStep < steps.length) {
            steps[currentStep].classList.add('active');
            currentStep++;
        } else {
            clearInterval(interval);
        }
    }, 1500);
}

// 元素周期表功能
const periodicElements = [
    { symbol: 'H', name: '氢', number: 1, period: 1, group: 1, atomicRadius: 25, electronegativity: 2.2, ionizationEnergy: 1312, metallic: false },
    { symbol: 'He', name: '氦', number: 2, period: 1, group: 18, atomicRadius: 31, electronegativity: null, ionizationEnergy: 2372, metallic: false },
    { symbol: 'Li', name: '锂', number: 3, period: 2, group: 1, atomicRadius: 145, electronegativity: 0.98, ionizationEnergy: 520, metallic: true },
    { symbol: 'Be', name: '铍', number: 4, period: 2, group: 2, atomicRadius: 105, electronegativity: 1.57, ionizationEnergy: 899, metallic: true },
    { symbol: 'B', name: '硼', number: 5, period: 2, group: 13, atomicRadius: 85, electronegativity: 2.04, ionizationEnergy: 801, metallic: false },
    { symbol: 'C', name: '碳', number: 6, period: 2, group: 14, atomicRadius: 70, electronegativity: 2.55, ionizationEnergy: 1086, metallic: false },
    { symbol: 'N', name: '氮', number: 7, period: 2, group: 15, atomicRadius: 65, electronegativity: 3.04, ionizationEnergy: 1402, metallic: false },
    { symbol: 'O', name: '氧', number: 8, period: 2, group: 16, atomicRadius: 60, electronegativity: 3.44, ionizationEnergy: 1314, metallic: false },
    { symbol: 'F', name: '氟', number: 9, period: 2, group: 17, atomicRadius: 50, electronegativity: 3.98, ionizationEnergy: 1681, metallic: false },
    { symbol: 'Ne', name: '氖', number: 10, period: 2, group: 18, atomicRadius: 38, electronegativity: null, ionizationEnergy: 2081, metallic: false }
];

// 生成周期表
function generatePeriodicTable() {
    const grid = document.getElementById('periodicGrid');
    grid.innerHTML = '';
    
    periodicElements.forEach(element => {
        const elementDiv = document.createElement('div');
        elementDiv.className = 'periodic-element';
        elementDiv.innerHTML = `
            <div class="element-number">${element.number}</div>
            <div class="element-symbol">${element.symbol}</div>
            <div class="element-name">${element.name}</div>
        `;
        
        elementDiv.onclick = () => showElementDetails(element);
        grid.appendChild(elementDiv);
    });
}

// 显示元素性质
function showProperty(property) {
    const elements = document.querySelectorAll('.periodic-element');
    
    elements.forEach((elementDiv, index) => {
        const element = periodicElements[index];
        let intensity = 0;
        
        switch(property) {
            case 'atomic-radius':
                intensity = element.atomicRadius / 150;
                break;
            case 'electronegativity':
                intensity = element.electronegativity ? element.electronegativity / 4 : 0;
                break;
            case 'ionization-energy':
                intensity = element.ionizationEnergy / 2500;
                break;
            case 'metallic':
                intensity = element.metallic ? 1 : 0;
                break;
        }
        
        const color = `rgba(78, 205, 196, ${intensity})`;
        elementDiv.style.backgroundColor = color;
    });
}

// 显示元素详情
function showElementDetails(element) {
    const detailsDiv = document.getElementById('elementDetails');
    
    detailsDiv.innerHTML = `
        <h4>${element.name} (${element.symbol})</h4>
        <div class="element-properties">
            <p><strong>原子序数:</strong> ${element.number}</p>
            <p><strong>周期:</strong> ${element.period}</p>
            <p><strong>族:</strong> ${element.group}</p>
            <p><strong>原子半径:</strong> ${element.atomicRadius} pm</p>
            <p><strong>电负性:</strong> ${element.electronegativity || '未定义'}</p>
            <p><strong>电离能:</strong> ${element.ionizationEnergy} kJ/mol</p>
            <p><strong>金属性:</strong> ${element.metallic ? '金属' : '非金属'}</p>
        </div>
    `;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    generatePeriodicTable();
});