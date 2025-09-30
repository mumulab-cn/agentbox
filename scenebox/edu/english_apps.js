// 英语应用交互功能

// 单词记忆卡片功能
const wordDatabase = [
    {
        word: 'beautiful',
        phonetic: '/ˈbjuːtɪfl/',
        meaning: 'adj. 美丽的，漂亮的',
        example: 'She has a beautiful voice.',
        translation: '她有一副美妙的嗓音。',
        difficulty: 1
    },
    {
        word: 'adventure',
        phonetic: '/ədˈventʃər/',
        meaning: 'n. 冒险，奇遇',
        example: 'Life is an adventure.',
        translation: '生活就是一场冒险。',
        difficulty: 2
    },
    {
        word: 'magnificent',
        phonetic: '/mæɡˈnɪfɪsnt/',
        meaning: 'adj. 壮丽的，宏伟的',
        example: 'The view from the mountain was magnificent.',
        translation: '从山上看到的景色非常壮丽。',
        difficulty: 3
    },
    {
        word: 'opportunity',
        phonetic: '/ˌɑːpərˈtuːnəti/',
        meaning: 'n. 机会，时机',
        example: 'This is a great opportunity for you.',
        translation: '这对你来说是个很好的机会。',
        difficulty: 2
    },
    {
        word: 'environment',
        phonetic: '/ɪnˈvaɪrənmənt/',
        meaning: 'n. 环境，周围状况',
        example: 'We must protect our environment.',
        translation: '我们必须保护我们的环境。',
        difficulty: 2
    }
];

let currentWordIndex = 0;
let studyProgress = {
    total: 20,
    completed: 13,
    correct: 8,
    unsure: 3,
    wrong: 2
};

function updateWordCard() {
    const word = wordDatabase[currentWordIndex];
    const cardFront = document.querySelector('.card-front');
    const cardBack = document.querySelector('.card-back');
    
    // 更新正面
    cardFront.querySelector('.word-text').textContent = word.word;
    cardFront.querySelector('.phonetic').textContent = word.phonetic;
    
    // 更新背面
    cardBack.querySelector('.word-meaning p').innerHTML = `<strong>${word.meaning.split('.')[0]}.</strong> ${word.meaning.split('.')[1]}`;
    cardBack.querySelector('.word-meaning p:nth-of-type(2)').innerHTML = `${word.example}`;
    cardBack.querySelector('.word-meaning p:nth-of-type(3)').textContent = word.translation;
    
    // 重置卡片状态
    cardFront.style.display = 'block';
    cardBack.style.display = 'none';
}

function flipCard() {
    const cardFront = document.querySelector('.card-front');
    const cardBack = document.querySelector('.card-back');
    
    cardFront.style.display = 'none';
    cardBack.style.display = 'block';
}

function markKnown() {
    studyProgress.correct++;
    nextWord();
    showFeedback('太棒了！继续保持！', 'success');
}

function markUnsure() {
    studyProgress.unsure++;
    nextWord();
    showFeedback('没关系，多练习几次就会了！', 'warning');
}

function markUnknown() {
    studyProgress.wrong++;
    nextWord();
    showFeedback('不要气馁，学习新单词很正常！', 'info');
}

function nextWord() {
    studyProgress.completed++;
    currentWordIndex = (currentWordIndex + 1) % wordDatabase.length;
    updateWordCard();
    updateProgress();
}

function updateProgress() {
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.word-progress p');
    
    const percentage = (studyProgress.completed / studyProgress.total) * 100;
    progressFill.style.width = percentage + '%';
    progressText.textContent = `今日进度: ${studyProgress.completed}/${studyProgress.total} 个单词`;
}

function showFeedback(message, type) {
    // 创建反馈提示
    const feedback = document.createElement('div');
    feedback.className = `feedback-message ${type}`;
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    if (type === 'success') feedback.style.background = '#2ecc71';
    else if (type === 'warning') feedback.style.background = '#f39c12';
    else if (type === 'info') feedback.style.background = '#3498db';
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 2000);
}

// 口语练习功能
let isRecording = false;
let mediaRecorder;
let audioChunks = [];

function playAudio() {
    // 模拟播放AI语音
    const button = event.target;
    button.textContent = '🔊 播放中...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = '🔊 播放';
        button.disabled = false;
    }, 3000);
    
    showFeedback('AI语音播放完成，请开始录音回答', 'info');
}

function startRecording() {
    const recordBtn = document.getElementById('recordBtn');
    const recordingStatus = document.getElementById('recordingStatus');
    
    if (!isRecording) {
        // 开始录音
        isRecording = true;
        recordBtn.textContent = '⏹️ 停止录音';
        recordBtn.className = 'btn btn-success record-btn';
        recordingStatus.innerHTML = '<span style="color: #e74c3c;">🔴 正在录音...</span>';
        
        // 模拟录音过程
        setTimeout(() => {
            if (isRecording) {
                stopRecording();
            }
        }, 5000); // 5秒后自动停止
        
    } else {
        // 停止录音
        stopRecording();
    }
}

function stopRecording() {
    isRecording = false;
    const recordBtn = document.getElementById('recordBtn');
    const recordingStatus = document.getElementById('recordingStatus');
    const feedbackDiv = document.getElementById('pronunciationFeedback');
    
    recordBtn.textContent = '🎤 开始录音';
    recordBtn.className = 'btn btn-danger record-btn';
    recordingStatus.innerHTML = '<span style="color: #27ae60;">✅ 录音完成，正在分析...</span>';
    
    // 模拟AI分析过程
    setTimeout(() => {
        recordingStatus.innerHTML = '<span style="color: #3498db;">📊 分析完成！</span>';
        feedbackDiv.style.display = 'block';
        
        // 随机生成评分
        const scores = {
            fluency: Math.floor(Math.random() * 20) + 75,
            accuracy: Math.floor(Math.random() * 15) + 80,
            intonation: Math.floor(Math.random() * 25) + 70
        };
        
        const overall = Math.floor((scores.fluency + scores.accuracy + scores.intonation) / 3);
        
        // 更新评分显示
        document.querySelector('.score-number').textContent = overall;
        document.querySelectorAll('.score-fill')[0].style.width = scores.fluency + '%';
        document.querySelectorAll('.score-fill')[1].style.width = scores.accuracy + '%';
        document.querySelectorAll('.score-fill')[2].style.width = scores.intonation + '%';
        document.querySelectorAll('.score-value')[0].textContent = scores.fluency + '%';
        document.querySelectorAll('.score-value')[1].textContent = scores.accuracy + '%';
        document.querySelectorAll('.score-value')[2].textContent = scores.intonation + '%';
        
        showFeedback('发音评估完成！', 'success');
    }, 2000);
}

// 阅读理解功能
const wordDefinitions = {
    'discover': {
        meaning: 'v. 发现，找到',
        example: 'Scientists discover new species every year.'
    },
    'essential': {
        meaning: 'adj. 必要的，重要的',
        example: 'Water is essential for life.'
    }
};

let translationVisible = false;
let keyWordsHighlighted = false;

function showWordInfo(word) {
    const info = wordDefinitions[word];
    if (info) {
        alert(`📖 单词解释\n\n${word}: ${info.meaning}\n\n例句: ${info.example}`);
    }
}

function toggleTranslation() {
    const passages = document.querySelectorAll('.passage-text p');
    const button = event.target;
    
    if (!translationVisible) {
        // 显示翻译
        passages[0].innerHTML += '<br><small style="color: #7f8c8d; font-style: italic;">书籍对我来说一直是神奇的。当我年轻的时候，我会在图书馆里待上几个小时，发现新的世界和冒险。阅读让我接触到不同的文化、思想和可能性。</small>';
        passages[1].innerHTML += '<br><small style="color: #7f8c8d; font-style: italic;">今天，即使我们周围有这么多技术，书籍仍然是必不可少的。它们帮助我们发展想象力，提高词汇量，增强批判性思维能力。</small>';
        button.textContent = '🌐 隐藏翻译';
        translationVisible = true;
    } else {
        // 隐藏翻译
        passages.forEach(p => {
            const small = p.querySelector('small');
            if (small) small.remove();
        });
        button.textContent = '🌐 显示翻译';
        translationVisible = false;
    }
}

function highlightKeyWords() {
    const button = event.target;
    const keyWords = ['magical', 'discovering', 'essential', 'imagination', 'vocabulary', 'critical thinking'];
    
    if (!keyWordsHighlighted) {
        // 高亮关键词
        const passageText = document.querySelector('.passage-text');
        let html = passageText.innerHTML;
        
        keyWords.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            html = html.replace(regex, `<mark style="background: #fff3cd; padding: 2px 4px; border-radius: 3px;">${word}</mark>`);
        });
        
        passageText.innerHTML = html;
        button.textContent = '✨ 取消标记';
        keyWordsHighlighted = true;
    } else {
        // 取消高亮
        const marks = document.querySelectorAll('.passage-text mark');
        marks.forEach(mark => {
            mark.outerHTML = mark.innerHTML;
        });
        button.textContent = '✨ 标记重点';
        keyWordsHighlighted = false;
    }
}

function playReading() {
    const button = event.target;
    button.textContent = '🔊 朗读中...';
    button.disabled = true;
    
    // 模拟朗读过程
    setTimeout(() => {
        button.textContent = '🔊 朗读';
        button.disabled = false;
        showFeedback('朗读完成！', 'success');
    }, 8000);
}

function checkAnswers() {
    const q1Answer = document.querySelector('input[name="q1"]:checked');
    const q2Answers = document.querySelectorAll('input[name="q2"]:checked');
    
    let score = 0;
    let feedback = '📊 答题结果：\n\n';
    
    // 检查第一题
    if (q1Answer && q1Answer.value === 'b') {
        score += 50;
        feedback += '✅ 第1题：正确！\n';
    } else {
        feedback += '❌ 第1题：错误。正确答案是B) Discover new worlds and adventures\n';
    }
    
    // 检查第二题
    const correctQ2 = ['imagination', 'vocabulary', 'thinking'];
    const selectedQ2 = Array.from(q2Answers).map(input => input.value);
    
    if (correctQ2.every(answer => selectedQ2.includes(answer)) && selectedQ2.length === 3) {
        score += 50;
        feedback += '✅ 第2题：正确！\n';
    } else {
        feedback += '❌ 第2题：错误。正确答案包括：发展想象力、提高词汇量、增强批判性思维\n';
    }
    
    feedback += `\n总分：${score}/100分`;
    
    if (score >= 80) {
        feedback += '\n🎉 优秀！你的阅读理解能力很强！';
    } else if (score >= 60) {
        feedback += '\n👍 不错！继续努力提升阅读理解能力！';
    } else {
        feedback += '\n💪 加油！多练习阅读理解会有进步的！';
    }
    
    alert(feedback);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化单词卡片
    updateWordCard();
    updateProgress();
    
    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        .word-card {
            transition: transform 0.3s ease;
        }
        
        .word-card:hover {
            transform: scale(1.02);
        }
        
        .highlight-word {
            color: #3498db;
            cursor: pointer;
            text-decoration: underline;
            transition: color 0.3s ease;
        }
        
        .highlight-word:hover {
            color: #2980b9;
            background: rgba(52, 152, 219, 0.1);
            padding: 2px 4px;
            border-radius: 3px;
        }
        
        .score-circle {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            margin-right: 1rem;
        }
        
        .score-number {
            font-size: 1.5rem;
            font-weight: bold;
        }
        
        .score-label {
            font-size: 0.8rem;
        }
        
        .score-display {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
        }
        
        .score-item {
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem;
            gap: 0.5rem;
        }
        
        .score-bar {
            flex: 1;
            height: 8px;
            background: #ecf0f1;
            border-radius: 4px;
            overflow: hidden;
        }
        
        .score-fill {
            height: 100%;
            background: linear-gradient(90deg, #2ecc71, #27ae60);
            transition: width 0.5s ease;
        }
        
        .answer-options {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin: 0.5rem 0;
        }
        
        .answer-options label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            padding: 0.3rem;
            border-radius: 3px;
            transition: background 0.3s ease;
        }
        
        .answer-options label:hover {
            background: rgba(52, 152, 219, 0.1);
        }
    `;
    document.head.appendChild(style);
    
    console.log('英语应用页面已加载完成');
});