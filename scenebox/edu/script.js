// Mock数据 - 各学科的创新应用
const subjectApps = {
    chinese: {
        name: '语文',
        apps: [
            {
                name: '古诗词学习助手',
                description: '通过互动方式学习古诗词，包含注释、朗读、背景故事',
                tag: '诗词'
            },
            {
                name: '作文智能批改',
                description: 'AI辅助作文批改，提供写作建议和语法检查',
                tag: '写作'
            },
            {
                name: '汉字演变历程',
                description: '展示汉字从甲骨文到现代的演变过程',
                tag: '汉字'
            },
            {
                name: '课文朗读练习',
                description: '标准普通话朗读示范，支持跟读练习和发音纠正',
                tag: '朗读'
            },
            {
                name: '文言文翻译器',
                description: '文言文现代文互译，帮助理解古文含义',
                tag: '文言文'
            }
        ]
    },
    math: {
        name: '数学',
        apps: [
            {
                name: '几何图形绘制器',
                description: '交互式几何图形绘制和计算工具',
                tag: '几何'
            },
            {
                name: '数学公式编辑器',
                description: '可视化数学公式编辑和计算验证',
                tag: '公式'
            },
            {
                name: '分数计算练习',
                description: '分数四则运算练习，包含步骤解析',
                tag: '计算'
            },
            {
                name: '函数图像绘制',
                description: '一次函数、二次函数图像绘制和性质分析',
                tag: '函数'
            },
            {
                name: '数学思维训练',
                description: '逻辑推理和数学思维能力训练题库',
                tag: '思维'
            }
        ]
    },
    english: {
        name: '英语',
        apps: [
            {
                name: '单词记忆卡片',
                description: '智能单词记忆系统，根据遗忘曲线安排复习',
                tag: '词汇'
            },
            {
                name: '英语口语练习',
                description: 'AI对话练习，提供发音评分和纠正',
                tag: '口语'
            },
            {
                name: '语法检查器',
                description: '英语语法错误检测和修正建议',
                tag: '语法'
            },
            {
                name: '英语阅读理解',
                description: '分级阅读材料和理解能力测试',
                tag: '阅读'
            },
            {
                name: '英语作文助手',
                description: '英语写作指导和范文参考',
                tag: '写作'
            }
        ]
    },
    science: {
        name: '科学',
        apps: [
            {
                name: '虚拟实验室',
                description: '物理化学实验模拟，安全进行各种实验',
                tag: '实验'
            },
            {
                name: '元素周期表',
                description: '交互式元素周期表，详细元素信息查询',
                tag: '化学'
            },
            {
                name: '天体运动模拟',
                description: '太阳系行星运动和天体现象模拟',
                tag: '天文'
            },
            {
                name: '生物结构3D',
                description: '人体器官和细胞结构3D展示',
                tag: '生物'
            },
            {
                name: '科学计算器',
                description: '高级科学计算功能，支持复杂运算',
                tag: '计算'
            }
        ]
    },
    history: {
        name: '历史',
        apps: [
            {
                name: '历史时间轴',
                description: '中外历史事件时间轴展示和查询',
                tag: '时间轴'
            },
            {
                name: '古代地图浏览',
                description: '历朝历代疆域变迁和古代地图查看',
                tag: '地图'
            },
            {
                name: '历史人物传记',
                description: '重要历史人物生平事迹和贡献介绍',
                tag: '人物'
            },
            {
                name: '文物3D展示',
                description: '珍贵文物3D模型和历史背景介绍',
                tag: '文物'
            },
            {
                name: '历史知识问答',
                description: '历史知识竞赛和趣味问答游戏',
                tag: '问答'
            }
        ]
    },
    geography: {
        name: '地理',
        apps: [
            {
                name: '世界地图探索',
                description: '交互式世界地图，国家信息和地理知识',
                tag: '地图'
            },
            {
                name: '气候变化模拟',
                description: '全球气候变化趋势和影响因素分析',
                tag: '气候'
            },
            {
                name: '地形地貌3D',
                description: '山川河流地形地貌3D展示',
                tag: '地形'
            },
            {
                name: '城市规划游戏',
                description: '模拟城市规划，学习地理和环境知识',
                tag: '规划'
            },
            {
                name: '地理坐标定位',
                description: '经纬度坐标学习和地理位置查询',
                tag: '坐标'
            }
        ]
    },
    art: {
        name: '美术',
        apps: [
            {
                name: '数字绘画板',
                description: '在线绘画工具，支持多种画笔和颜色',
                tag: '绘画'
            },
            {
                name: '色彩搭配助手',
                description: '色彩理论学习和搭配方案推荐',
                tag: '色彩'
            },
            {
                name: '名画欣赏馆',
                description: '世界名画高清展示和艺术背景介绍',
                tag: '名画'
            },
            {
                name: '手工制作指南',
                description: '各种手工艺品制作教程和步骤指导',
                tag: '手工'
            },
            {
                name: '艺术风格识别',
                description: 'AI识别艺术作品风格和流派',
                tag: '识别'
            }
        ]
    },
    music: {
        name: '音乐',
        apps: [
            {
                name: '虚拟钢琴',
                description: '在线钢琴演奏和音乐创作工具',
                tag: '钢琴'
            },
            {
                name: '音乐理论学习',
                description: '乐理知识学习和音阶练习',
                tag: '乐理'
            },
            {
                name: '节拍器训练',
                description: '节拍感训练和音乐节奏练习',
                tag: '节拍'
            },
            {
                name: '音乐欣赏课堂',
                description: '经典音乐作品欣赏和背景介绍',
                tag: '欣赏'
            },
            {
                name: '合唱指挥模拟',
                description: '合唱指挥手势学习和练习',
                tag: '指挥'
            }
        ]
    }
};

// 显示学科应用列表
function showApps(subjectId) {
    // 如果是已开发的学科，直接跳转到专门页面
    if (subjectId === 'math') {
        window.location.href = 'math_apps.php';
        return;
    }
    
    if (subjectId === 'english') {
        window.location.href = 'english_apps.php';
        return;
    }
    
    if (subjectId === 'physics') {
        window.location.href = 'physics_apps.php';
        return;
    }
    
    if (subjectId === 'chemistry') {
        window.location.href = 'chemistry_apps.php';
        return;
    }
    
    if (subjectId === 'biology') {
        window.location.href = 'biology_apps.php';
        return;
    }
    
    if (subjectId === 'history') {
        window.location.href = 'history_apps.php';
        return;
    }
    
    if (subjectId === 'geography') {
        window.location.href = 'geography_apps.php';
        return;
    }
    
    const subject = subjectApps[subjectId];
    if (!subject) return;
    
    const modal = document.getElementById('appsModal');
    const modalTitle = document.getElementById('modalTitle');
    const appsList = document.getElementById('appsList');
    
    modalTitle.textContent = subject.name + ' - 创新应用';
    
    // 清空应用列表
    appsList.innerHTML = '';
    
    // 添加应用项目
    subject.apps.forEach((app, index) => {
        const appItem = document.createElement('div');
        appItem.className = 'app-item';
        appItem.style.animationDelay = (index * 0.1) + 's';
        
        appItem.innerHTML = `
            <h4>${app.name}</h4>
            <p>${app.description}</p>
            <span class="app-tag">${app.tag}</span>
        `;
        
        // 添加点击事件
        appItem.addEventListener('click', () => {
            alert(`即将打开：${app.name}\n\n${app.description}\n\n这是一个演示版本，实际应用正在开发中...`);
        });
        
        appsList.appendChild(appItem);
    });
    
    // 显示模态框
    modal.style.display = 'block';
    
    // 添加淡入动画
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('appsModal');
    modal.style.display = 'none';
}

// 点击模态框外部关闭
window.addEventListener('click', (event) => {
    const modal = document.getElementById('appsModal');
    if (event.target === modal) {
        closeModal();
    }
});

// 键盘ESC键关闭模态框
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('K12学科创新应用平台已加载完成');
    
    // 添加学科卡片的悬停效果
    const subjectCards = document.querySelectorAll('.subject-card');
    subjectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});