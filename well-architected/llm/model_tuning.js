// 预设的示例数据集
const SAMPLE_DATASETS = {
    '情感分析': {
        description: '中文电商评论情感分析数据集，包含正面和负面评论样本',
        samples: [
            { text: '这个产品质量很好，使用很方便，很满意', label: '正面' },
            { text: '收到的商品有破损，客服态度也不好', label: '负面' },
            { text: '价格实惠，物流快，值得推荐', label: '正面' }
        ]
    },
    '文本分类': {
        description: '中文新闻分类数据集，包含多个主题类别',
        samples: [
            { text: '国务院召开经济工作会议，部署下半年经济发展重点', label: '时政' },
            { text: '新型电动汽车续航里程突破800公里', label: '科技' },
            { text: '本赛季CBA总决赛圆满结束', label: '体育' }
        ]
    },
    '命名实体': {
        description: '中文命名实体识别数据集，标注人名、地名、组织机构等',
        samples: [
            { text: '李明在北京大学进行学术讲座', entities: ['人名:李明', '机构:北京大学'] },
            { text: '上海科技馆举办人工智能展览', entities: ['地名:上海', '机构:科技馆'] }
        ]
    }
};

// 训练指标说明
const METRICS_EXPLANATION = {
    '训练损失': '训练损失(Training Loss)反映模型在训练数据上的表现，数值越低表示模型对训练数据的拟合程度越好。但过低的训练损失可能导致过拟合。',
    '验证损失': '验证损失(Validation Loss)反映模型在未见过的验证数据上的表现，是评估模型泛化能力的重要指标。如果验证损失显著高于训练损失，说明模型可能存在过拟合。',
    '准确率': '准确率(Accuracy)表示模型预测正确的样本比例，直观反映模型性能。但在数据不平衡的情况下，需要结合其他指标如F1分数来综合评估。'
};

document.addEventListener('DOMContentLoaded', function() {
    // 初始化图表
    const chartDom = document.getElementById('evaluationResults');
    const myChart = echarts.init(chartDom);
    let option = {
        title: {
            text: '模型评估结果',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['训练损失', '验证损失', '准确率'],
            bottom: 10
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: [
            {
                type: 'value',
                name: '损失',
                position: 'left',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: '准确率',
                position: 'right',
                axisLabel: {
                    formatter: '{value}%'
                },
                max: 100,
                min: 0
            }
        ],
        series: [
            {
                name: '训练损失',
                type: 'line',
                data: []
            },
            {
                name: '验证损失',
                type: 'line',
                data: []
            },
            {
                name: '准确率',
                type: 'line',
                yAxisIndex: 1,
                data: []
            }
        ]
    };
    myChart.setOption(option);

    // 处理表单提交
    const tuningForm = document.getElementById('tuningForm');
    tuningForm.addEventListener('submit', function(e) {
        e.preventDefault();
        startTuning();
    });
    
    // 处理示例数据集选择
    const sampleDatasetSelect = document.getElementById('sampleDataset');
    if (sampleDatasetSelect) {
        sampleDatasetSelect.addEventListener('change', function() {
            const datasetName = this.value;
            const datasetInfoDiv = document.getElementById('datasetInfo');
            const datasetDescriptionEl = document.getElementById('datasetDescription');
            const samplePreviewEl = document.getElementById('samplePreview');
            
            if (datasetName && SAMPLE_DATASETS[datasetName]) {
                // 显示数据集信息
                datasetInfoDiv.classList.remove('d-none');
                datasetDescriptionEl.textContent = SAMPLE_DATASETS[datasetName].description;
                
                // 显示样本预览
                let samplesHtml = '';
                SAMPLE_DATASETS[datasetName].samples.forEach((sample, index) => {
                    samplesHtml += `<div class="mb-2 p-2 border-bottom">`;
                    samplesHtml += `<strong>样本 ${index + 1}:</strong><br>`;
                    samplesHtml += `<span>文本: ${sample.text}</span><br>`;
                    
                    if (sample.label) {
                        samplesHtml += `<span>标签: <span class="badge bg-primary">${sample.label}</span></span>`;
                    } else if (sample.entities) {
                        samplesHtml += `<span>实体: ${sample.entities.map(e => `<span class="badge bg-info">${e}</span>`).join(' ')}</span>`;
                    }
                    
                    samplesHtml += `</div>`;
                });
                samplePreviewEl.innerHTML = samplesHtml;
            } else {
                // 隐藏数据集信息
                datasetInfoDiv.classList.add('d-none');
            }
        });
    }

    // 模拟微调过程
    function startTuning() {
        const baseModel = document.getElementById('baseModel').value;
        const tuningMethod = document.getElementById('tuningMethod').value;
        const trainingData = document.getElementById('trainingData').files[0];
        const sampleDataset = document.getElementById('sampleDataset');
        const selectedDataset = sampleDataset ? sampleDataset.value : '';
        
        if (!trainingData && !selectedDataset) {
            alert('请上传训练数据或选择示例数据集');
            return;
        }

        // 显示微调开始的信息
        const datasetSource = selectedDataset ? `示例数据集「${selectedDataset}」` : '上传的数据集';
        showNotification(`开始使用${tuningMethod}方法微调${baseModel}模型，使用${datasetSource}`);
        
        // 显示训练指标说明
        showMetricsExplanation();
        
        // 模拟训练进度
        simulateTraining();
    }

    // 模拟训练进度
    function simulateTraining() {
        const progressBar = document.getElementById('trainingProgress');
        let progress = 0;
        const epochs = 3;
        const stepsPerEpoch = 10;
        const totalSteps = epochs * stepsPerEpoch;
        let currentStep = 0;
        
        // 训练和验证数据
        const trainLoss = [];
        const valLoss = [];
        const accuracy = [];
        const epochs_data = [];
        
        // 更新进度条和图表的定时器
        const interval = setInterval(() => {
            currentStep++;
            progress = Math.round((currentStep / totalSteps) * 100);
            
            // 更新进度条
            progressBar.style.width = `${progress}%`;
            progressBar.textContent = `${progress}%`;
            
            // 当前epoch
            const currentEpoch = Math.floor(currentStep / stepsPerEpoch) + 1;
            const stepInEpoch = currentStep % stepsPerEpoch || stepsPerEpoch;
            
            // 模拟损失和准确率数据
            if (stepInEpoch === stepsPerEpoch) {
                // 每个epoch结束时更新图表
                const tLoss = (1 - 0.2 * currentEpoch / epochs).toFixed(3);
                const vLoss = (1.1 - 0.18 * currentEpoch / epochs).toFixed(3);
                const acc = (70 + 10 * currentEpoch).toFixed(1);
                
                trainLoss.push(tLoss);
                valLoss.push(vLoss);
                accuracy.push(acc);
                epochs_data.push(`Epoch ${currentEpoch}`);
                
                // 更新图表
                updateChart(epochs_data, trainLoss, valLoss, accuracy);
                
                // 显示每个epoch的结果
                showNotification(`Epoch ${currentEpoch}/${epochs} 完成 - 训练损失: ${tLoss}, 验证损失: ${vLoss}, 准确率: ${acc}%`);
            }
            
            // 训练结束
            if (currentStep >= totalSteps) {
                clearInterval(interval);
                showNotification('模型微调完成！');
                
                // 添加下载按钮
                addDownloadButton();
            }
        }, 500);
    }

    // 更新图表
    function updateChart(epochs, trainLoss, valLoss, accuracy) {
        option.xAxis.data = epochs;
        option.series[0].data = trainLoss;
        option.series[1].data = valLoss;
        option.series[2].data = accuracy;
        myChart.setOption(option);
    }

    // 显示训练指标说明
    function showMetricsExplanation() {
        const explanationDiv = document.createElement('div');
        explanationDiv.className = 'alert alert-info mt-3';
        explanationDiv.innerHTML = `
            <h5>训练指标说明</h5>
            <ul class="list-unstyled">
                ${Object.entries(METRICS_EXPLANATION).map(([metric, explanation]) => 
                    `<li class="mb-2"><strong>${metric}:</strong> ${explanation}</li>`
                ).join('')}
            </ul>
        `;
        
        const cardBody = document.querySelector('.card-body:last-child');
        cardBody.appendChild(explanationDiv);
    }

    // 显示通知
    function showNotification(message) {
        const notificationArea = document.createElement('div');
        notificationArea.className = 'alert alert-info mt-3';
        notificationArea.textContent = message;
        
        const cardBody = document.querySelector('.card-body:last-child');
        cardBody.appendChild(notificationArea);
        
        // 5秒后自动消失
        setTimeout(() => {
            notificationArea.remove();
        }, 5000);
    }

    // 添加下载按钮
    function addDownloadButton() {
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'btn btn-success mt-3 me-2';
        downloadBtn.textContent = '下载微调后的模型';
        downloadBtn.onclick = function() {
            alert('模型下载功能在实际应用中将连接到真实的模型文件');
        };
        
        const testModelBtn = document.createElement('button');
        testModelBtn.className = 'btn btn-primary mt-3';
        testModelBtn.textContent = '测试微调后的模型';
        testModelBtn.onclick = function() {
            showModelTestInterface();
        };
        
        const cardBody = document.querySelector('.card-body:last-child');
        cardBody.appendChild(downloadBtn);
        cardBody.appendChild(testModelBtn);
    }
    
    // 显示模型测试界面
    function showModelTestInterface() {
        const testInterface = document.createElement('div');
        testInterface.className = 'card mt-4';
        testInterface.innerHTML = `
            <div class="card-body">
                <h4 class="card-title">测试微调后的模型</h4>
                <div class="mb-3">
                    <label class="form-label">输入测试文本</label>
                    <textarea class="form-control" id="testInput" rows="3" placeholder="请输入测试文本..."></textarea>
                </div>
                <button class="btn btn-primary" id="runTestBtn">运行测试</button>
                <div class="mt-3 d-none" id="testResults">
                    <h5>测试结果</h5>
                    <div class="p-3 bg-light rounded" id="testResultContent"></div>
                </div>
            </div>
        `;
        
        const cardBody = document.querySelector('.card-body:last-child');
        cardBody.appendChild(testInterface);
        
        // 添加测试按钮事件
        document.getElementById('runTestBtn').addEventListener('click', function() {
            const testInput = document.getElementById('testInput').value.trim();
            if (!testInput) {
                alert('请输入测试文本');
                return;
            }
            
            // 显示加载状态
            this.disabled = true;
            this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 处理中...';
            
            // 模拟处理延迟
            setTimeout(() => {
                // 根据不同的模型和微调方法生成不同的模拟结果
                const baseModel = document.getElementById('baseModel').value;
                const tuningMethod = document.getElementById('tuningMethod').value;
                const sampleDataset = document.getElementById('sampleDataset').value;
                
                let resultHtml = '';
                
                if (sampleDataset === '情感分析') {
                    // 情感分析结果
                    const sentiment = Math.random() > 0.5 ? '正面' : '负面';
                    const confidence = (0.7 + Math.random() * 0.25).toFixed(2);
                    resultHtml = `
                        <div class="mb-3">
                            <strong>情感分析结果:</strong> <span class="badge ${sentiment === '正面' ? 'bg-success' : 'bg-danger'}">${sentiment}</span>
                        </div>
                        <div class="mb-3">
                            <strong>置信度:</strong> ${confidence}
                        </div>
                        <div class="progress">
                            <div class="progress-bar ${sentiment === '正面' ? 'bg-success' : 'bg-danger'}" role="progressbar" style="width: ${confidence * 100}%" aria-valuenow="${confidence * 100}" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    `;
                } else if (sampleDataset === '文本分类') {
                    // 文本分类结果
                    const categories = ['时政', '科技', '体育', '娱乐', '财经'];
                    const predictions = categories.map(cat => ({
                        category: cat,
                        probability: Math.random()
                    })).sort((a, b) => b.probability - a.probability);
                    
                    // 归一化概率
                    const sum = predictions.reduce((acc, p) => acc + p.probability, 0);
                    predictions.forEach(p => p.probability = (p.probability / sum).toFixed(2));
                    
                    resultHtml = `
                        <div class="mb-3">
                            <strong>预测类别:</strong> <span class="badge bg-primary">${predictions[0].category}</span>
                        </div>
                        <div class="mb-3">
                            <strong>各类别概率:</strong>
                            <table class="table table-sm">
                                <thead>
                                    <tr>
                                        <th>类别</th>
                                        <th>概率</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${predictions.map(p => `
                                        <tr>
                                            <td>${p.category}</td>
                                            <td>
                                                <div class="progress">
                                                    <div class="progress-bar" role="progressbar" style="width: ${p.probability * 100}%" aria-valuenow="${p.probability * 100}" aria-valuemin="0" aria-valuemax="100">${p.probability}</div>
                                                </div>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    `;
                } else if (sampleDataset === '命名实体') {
                    // 命名实体识别结果
                    const words = testInput.split(/\s+/);
                    const entities = [];
                    
                    // 模拟一些实体识别结果
                    words.forEach((word, index) => {
                        if (word.length > 3 && Math.random() > 0.7) {
                            const entityTypes = ['人名', '地名', '机构', '组织名', '时间', '地点', '数字'];
                            const entityType = entityTypes[Math.floor(Math.random() * entityTypes.length)];
                            entities.push({
                                word: word,
                                type: entityType
                            });
                        }
                    });

                    resultHtml = `
                        <div class="mb-3">
                            <strong>实体识别结果:</strong>
                            ${entities.length > 0 ? 
                                `<div class="mt-2">
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>实体</th>
                                                <th>类型</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${entities.map(e => `
                                                <tr>
                                                    <td><span class="badge bg-info">${e.word}</span></td>
                                                    <td><span class="badge bg-secondary">${e.type}</span></td>
                                                </tr>
                                            `).join('')}
                                        </tbody>
                                    </table>
                                </div>` : 
                                `<div class="alert alert-warning">未检测到实体</div>`
                            }
                        </div>
                        <div class="mb-3">
                            <strong>标注后文本:</strong>
                            <div class="p-2 border rounded">
                                ${words.map(word => {
                                    const entity = entities.find(e => e.word === word);
                                    return entity ? 
                                        `<span class="badge bg-light text-dark border border-info" title="${entity.type}">${word}</span>` : 
                                        word;
                                }).join(' ')}
                            </div>
                        </div>
                    `;
                }

                // 显示测试结果
                document.getElementById('testResultContent').innerHTML = resultHtml;
                document.getElementById('testResults').classList.remove('d-none');

                // 恢复按钮状态
                this.disabled = false;
                this.innerHTML = '运行测试';
            }, 1000);
        });
    }

    // 添加模型参数可视化功能
    document.getElementById('tuningMethod').addEventListener('change', function() {
        const method = this.value;
        let params;
        
        if (method === 'lora') {
            params = {
                "learning_rate": 1e-4,
                "num_epochs": 3,
                "batch_size": 8,
                "lora_r": 8,
                "lora_alpha": 16,
                "lora_dropout": 0.05
            };
        } else if (method === 'ptuning') {
            params = {
                "learning_rate": 5e-5,
                "num_epochs": 5,
                "batch_size": 4,
                "pre_seq_len": 128,
                "prefix_projection": true
            };
        }
        
        document.querySelector('.code-block pre code').textContent = JSON.stringify(params, null, 4);
    });
});

// 添加领域适应方法的说明

document.addEventListener('DOMContentLoaded', function() {
    // 创建领域适应方法的卡片
    const mainContainer = document.querySelector('main.container');
    const domainAdaptationSection = document.createElement('div');
    domainAdaptationSection.className = 'row mb-5';
    domainAdaptationSection.innerHTML = `
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h2 class="card-title mb-4">领域适应方法</h2>
                    <div class="row">
                        <div class="col-md-6">
                            <h4>数据增强</h4>
                            <p>通过同义词替换、回译等方法扩充领域数据，提高模型在特定领域的泛化能力。</p>
                            <div class="form-check form-switch mb-3">
                                <input class="form-check-input" type="checkbox" id="dataAugSwitch">
                                <label class="form-check-label" for="dataAugSwitch">启用数据增强</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <h4>领域词汇扩展</h4>
                            <p>向模型词汇表中添加领域特定术语，提高模型对专业术语的理解能力。</p>
                            <div class="form-check form-switch mb-3">
                                <input class="form-check-input" type="checkbox" id="vocabSwitch">
                                <label class="form-check-label" for="vocabSwitch">启用词汇扩展</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 在评估部分之前插入
    const evaluationSection = document.querySelector('.row:last-child');
    mainContainer.insertBefore(domainAdaptationSection, evaluationSection);
    
    // 添加评估与优化循环部分
    const optimizationSection = document.createElement('div');
    optimizationSection.className = 'row mb-5';
    optimizationSection.innerHTML = `
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h2 class="card-title mb-4">评估与优化循环</h2>
                    <div class="row mb-4">
                        <div class="col-md-4">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5 class="card-title">1. 基线评估</h5>
                                    <p class="card-text">对基础模型在目标任务上的性能进行评估，建立优化基准。</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5 class="card-title">2. 迭代优化</h5>
                                    <p class="card-text">根据评估结果调整微调策略和超参数，进行多轮优化。</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5 class="card-title">3. 综合评估</h5>
                                    <p class="card-text">使用多维度指标评估模型性能，包括准确率、延迟和资源消耗。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button class="btn btn-outline-primary" type="button">查看评估指标详情</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 在评估部分之前插入
    mainContainer.insertBefore(optimizationSection, evaluationSection);
});