// 数学应用交互功能

// 几何图形绘制器
let currentShape = 'circle';
let shapes = [];

function drawShape(shapeType) {
    currentShape = shapeType;
    const canvas = document.getElementById('geometryCanvas');
    const svg = canvas.querySelector('svg');
    
    // 清除现有图形
    const existingShapes = svg.querySelectorAll('circle, rect, polygon');
    existingShapes.forEach(shape => shape.remove());
    
    // 根据类型绘制新图形
    let newShape;
    const x = Math.random() * 300 + 50;
    const y = Math.random() * 200 + 50;
    
    switch(shapeType) {
        case 'circle':
            newShape = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            newShape.setAttribute('cx', x);
            newShape.setAttribute('cy', y);
            newShape.setAttribute('r', 30 + Math.random() * 20);
            newShape.setAttribute('fill', 'rgba(74, 144, 226, 0.3)');
            newShape.setAttribute('stroke', '#4a90e2');
            newShape.setAttribute('stroke-width', '2');
            break;
            
        case 'rectangle':
            newShape = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            newShape.setAttribute('x', x);
            newShape.setAttribute('y', y);
            newShape.setAttribute('width', 60 + Math.random() * 40);
            newShape.setAttribute('height', 40 + Math.random() * 30);
            newShape.setAttribute('fill', 'rgba(46, 204, 113, 0.3)');
            newShape.setAttribute('stroke', '#2ecc71');
            newShape.setAttribute('stroke-width', '2');
            break;
            
        case 'triangle':
            newShape = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            const size = 30 + Math.random() * 20;
            const points = `${x},${y+size} ${x-size},${y-size} ${x+size},${y-size}`;
            newShape.setAttribute('points', points);
            newShape.setAttribute('fill', 'rgba(231, 76, 60, 0.3)');
            newShape.setAttribute('stroke', '#e74c3c');
            newShape.setAttribute('stroke-width', '2');
            break;
    }
    
    if (newShape) {
        svg.appendChild(newShape);
        
        // 添加点击事件
        newShape.addEventListener('click', function() {
            this.style.fill = this.style.fill.includes('0.3') ? 
                this.style.fill.replace('0.3', '0.6') : 
                this.style.fill.replace('0.6', '0.3');
        });
        
        // 添加动画效果
        newShape.style.opacity = '0';
        setTimeout(() => {
            newShape.style.transition = 'opacity 0.5s ease';
            newShape.style.opacity = '1';
        }, 100);
    }
}

function calculateArea() {
    const svg = document.querySelector('#geometryCanvas svg');
    const shapes = svg.querySelectorAll('circle, rect, polygon');
    let totalArea = 0;
    let details = [];
    
    shapes.forEach(shape => {
        let area = 0;
        let description = '';
        
        if (shape.tagName === 'circle') {
            const r = parseFloat(shape.getAttribute('r'));
            area = Math.PI * r * r;
            description = `圆形 (半径=${r.toFixed(1)}) 面积=${area.toFixed(2)}`;
        } else if (shape.tagName === 'rect') {
            const w = parseFloat(shape.getAttribute('width'));
            const h = parseFloat(shape.getAttribute('height'));
            area = w * h;
            description = `矩形 (${w.toFixed(1)}×${h.toFixed(1)}) 面积=${area.toFixed(2)}`;
        } else if (shape.tagName === 'polygon') {
            // 简化三角形面积计算
            area = 800; // 近似值
            description = `三角形 面积≈${area.toFixed(2)}`;
        }
        
        totalArea += area;
        details.push(description);
    });
    
    alert(`图形面积计算结果：\n\n${details.join('\n')}\n\n总面积: ${totalArea.toFixed(2)} 平方单位`);
}

// 分数计算练习
let currentProblem = {
    fraction1: {num: 2, den: 3},
    fraction2: {num: 1, den: 4},
    operator: '+',
    answer: {num: 11, den: 12}
};

function generateFractionProblem() {
    const operators = ['+', '-'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    const num1 = Math.floor(Math.random() * 9) + 1;
    const den1 = Math.floor(Math.random() * 9) + 2;
    const num2 = Math.floor(Math.random() * 9) + 1;
    const den2 = Math.floor(Math.random() * 9) + 2;
    
    // 计算答案
    const lcm = findLCM(den1, den2);
    const newNum1 = num1 * (lcm / den1);
    const newNum2 = num2 * (lcm / den2);
    
    let resultNum;
    if (operator === '+') {
        resultNum = newNum1 + newNum2;
    } else {
        resultNum = newNum1 - newNum2;
        if (resultNum < 0) {
            resultNum = Math.abs(resultNum);
        }
    }
    
    // 简化分数
    const gcd = findGCD(resultNum, lcm);
    const finalNum = resultNum / gcd;
    const finalDen = lcm / gcd;
    
    currentProblem = {
        fraction1: {num: num1, den: den1},
        fraction2: {num: num2, den: den2},
        operator: operator,
        answer: {num: finalNum, den: finalDen}
    };
    
    return currentProblem;
}

function findGCD(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function findLCM(a, b) {
    return (a * b) / findGCD(a, b);
}

function updateFractionDisplay() {
    const problemDiv = document.querySelector('.fraction-problem');
    if (problemDiv) {
        problemDiv.innerHTML = `
            <span class="fraction">
                <span class="numerator">${currentProblem.fraction1.num}</span>
                <span class="denominator">${currentProblem.fraction1.den}</span>
            </span>
            <span class="operator">${currentProblem.operator}</span>
            <span class="fraction">
                <span class="numerator">${currentProblem.fraction2.num}</span>
                <span class="denominator">${currentProblem.fraction2.den}</span>
            </span>
            <span class="equals">=</span>
            <span class="result">?</span>
        `;
    }
}

function checkFractionAnswer() {
    const answerInput = document.getElementById('fractionAnswer');
    const userAnswer = answerInput.value.trim();
    
    // 解析用户输入的分数
    let userNum, userDen;
    if (userAnswer.includes('/')) {
        const parts = userAnswer.split('/');
        userNum = parseInt(parts[0]);
        userDen = parseInt(parts[1]);
    } else {
        userNum = parseInt(userAnswer);
        userDen = 1;
    }
    
    // 检查答案
    const isCorrect = (userNum === currentProblem.answer.num && userDen === currentProblem.answer.den) ||
                     (userNum / userDen === currentProblem.answer.num / currentProblem.answer.den);
    
    if (isCorrect) {
        alert('🎉 答案正确！做得很好！');
        answerInput.style.borderColor = '#2ecc71';
    } else {
        alert(`❌ 答案不正确。正确答案是 ${currentProblem.answer.num}/${currentProblem.answer.den}`);
        answerInput.style.borderColor = '#e74c3c';
    }
    
    setTimeout(() => {
        answerInput.style.borderColor = '#ddd';
    }, 2000);
}

function showSteps() {
    const stepsDiv = document.getElementById('stepsDisplay');
    const lcm = findLCM(currentProblem.fraction1.den, currentProblem.fraction2.den);
    const newNum1 = currentProblem.fraction1.num * (lcm / currentProblem.fraction1.den);
    const newNum2 = currentProblem.fraction2.num * (lcm / currentProblem.fraction2.den);
    
    let resultNum;
    if (currentProblem.operator === '+') {
        resultNum = newNum1 + newNum2;
    } else {
        resultNum = newNum1 - newNum2;
    }
    
    stepsDiv.innerHTML = `
        <h5>解题步骤：</h5>
        <ol>
            <li>找到最小公倍数：${currentProblem.fraction1.den}和${currentProblem.fraction2.den}的最小公倍数是${lcm}</li>
            <li>通分：${currentProblem.fraction1.num}/${currentProblem.fraction1.den} = ${newNum1}/${lcm}，${currentProblem.fraction2.num}/${currentProblem.fraction2.den} = ${newNum2}/${lcm}</li>
            <li>分子运算：${newNum1} ${currentProblem.operator} ${newNum2} = ${resultNum}</li>
            <li>结果：${currentProblem.answer.num}/${currentProblem.answer.den}</li>
        </ol>
    `;
    stepsDiv.style.display = 'block';
}

function newProblem() {
    generateFractionProblem();
    updateFractionDisplay();
    document.getElementById('fractionAnswer').value = '';
    document.getElementById('stepsDisplay').style.display = 'none';
}

// 函数图像绘制
function initFunctionPlotter() {
    const canvas = document.getElementById('functionCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // 绘制坐标系
    function drawAxes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 设置样式
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        
        // 绘制网格
        for (let i = 0; i <= canvas.width; i += 20) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }
        
        for (let i = 0; i <= canvas.height; i += 20) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }
        
        // 绘制坐标轴
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        
        // X轴
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
        
        // Y轴
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
    }
    
    // 绘制函数图像
    function drawFunction() {
        const functionType = document.getElementById('functionType').value;
        const a = parseFloat(document.getElementById('paramA').value);
        const b = parseFloat(document.getElementById('paramB').value);
        
        // 更新参数显示
        document.getElementById('valueA').textContent = a;
        document.getElementById('valueB').textContent = b;
        
        drawAxes();
        
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const scale = 20; // 缩放比例
        
        let firstPoint = true;
        
        for (let x = -10; x <= 10; x += 0.1) {
            let y;
            
            if (functionType === 'linear') {
                y = a * x + b;
            } else if (functionType === 'quadratic') {
                const c = 0; // 简化为 ax² + bx
                y = a * x * x + b * x + c;
            }
            
            // 转换为画布坐标
            const canvasX = centerX + x * scale;
            const canvasY = centerY - y * scale;
            
            // 检查是否在画布范围内
            if (canvasY >= 0 && canvasY <= canvas.height) {
                if (firstPoint) {
                    ctx.moveTo(canvasX, canvasY);
                    firstPoint = false;
                } else {
                    ctx.lineTo(canvasX, canvasY);
                }
            }
        }
        
        ctx.stroke();
    }
    
    // 初始化
    drawFunction();
    
    // 绑定事件
    window.updateFunction = drawFunction;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化分数练习
    generateFractionProblem();
    updateFractionDisplay();
    
    // 初始化函数绘制器
    initFunctionPlotter();
    
    // 添加键盘事件
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const answerInput = document.getElementById('fractionAnswer');
            if (answerInput && document.activeElement === answerInput) {
                checkFractionAnswer();
            }
        }
    });
    
    console.log('数学应用页面已加载完成');
});