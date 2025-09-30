$(document).ready(function() {
    // 模拟食品数据库
    const foodDatabase = {
        '001': {
            name: '康师傅方便面',
            manufacturer: '康师傅控股有限公司',
            productionDate: '2024-01-15',
            expiryDate: '2024-07-15',
            ingredients: ['小麦粉', '棕榈油', '食盐', '味精', '香辛料'],
            safetyRating: 'A',
            ratingColor: '#27ae60',
            certificate: '有效',
            description: '符合国家食品安全标准，包装完整，标识清晰'
        },
        '002': {
            name: '无牌辣条',
            manufacturer: '未知厂家',
            productionDate: '未标注',
            expiryDate: '未标注',
            ingredients: ['面粉', '添加剂', '色素', '防腐剂'],
            safetyRating: 'D',
            ratingColor: '#e74c3c',
            certificate: '无证',
            description: '三无产品，无生产许可证，存在食品安全风险'
        },
        '003': {
            name: '统一绿茶',
            manufacturer: '统一企业股份有限公司',
            productionDate: '2024-02-10',
            expiryDate: '2024-08-10',
            ingredients: ['水', '绿茶', '白砂糖', '维生素C'],
            safetyRating: 'A',
            ratingColor: '#27ae60',
            certificate: '有效',
            description: '正规厂家生产，符合饮品安全标准'
        },
        '004': {
            name: '路边烤肠',
            manufacturer: '个体摊贩',
            productionDate: '当日制作',
            expiryDate: '当日食用',
            ingredients: ['肉类', '淀粉', '添加剂', '香料'],
            safetyRating: 'C',
            ratingColor: '#f39c12',
            certificate: '待验证',
            description: '流动摊贩制作，建议谨慎食用'
        }
    };

    // 商户数据
    const merchantData = {
        '1': {
            name: '安全小卖部',
            address: '学校东门50米',
            rating: 'A',
            certificate: '有效营业执照',
            violations: 0,
            lastInspection: '2024-01-20',
            description: '证照齐全，食品安全记录良好'
        },
        '2': {
            name: '警告餐厅',
            address: '学校南门100米',
            rating: 'B',
            certificate: '营业执照即将到期',
            violations: 1,
            lastInspection: '2024-01-15',
            description: '曾有一次轻微违规，已整改'
        },
        '3': {
            name: '危险摊位',
            address: '学校西门路边',
            rating: 'D',
            certificate: '无证经营',
            violations: 3,
            lastInspection: '2024-01-10',
            description: '多次违规，无证经营，存在食品安全隐患'
        },
        '4': {
            name: '安全面包店',
            address: '学校北门200米',
            rating: 'A',
            certificate: '有效营业执照及食品经营许可证',
            violations: 0,
            lastInspection: '2024-01-25',
            description: '正规连锁店，食品安全管理规范'
        }
    };

    // 页面导航功能
    $('.nav-btn').click(function() {
        const targetSection = $(this).data('section');
        const sectionNames = {
            'home': '概览',
            'scan': '扫码查询',
            'map': '安全地图',
            'monitor': '监管报警'
        };
        
        // 更新导航按钮状态
        $('.nav-btn').removeClass('active');
        $(this).addClass('active');
        
        // 切换页面内容
        $('.section').removeClass('active');
        $(`#${targetSection}`).addClass('active');
        
        // 更新面包屑导航
        $('#currentPage').text(sectionNames[targetSection]);
        
        // 特殊页面初始化
        if (targetSection === 'monitor') {
            initMonitorSystem();
        }
    });
    
    // 顶部工具栏按钮功能
    $('#refreshBtn').click(function() {
        const currentSection = $('.section.active').attr('id');
        $(this).find('.btn-icon').text('⟳');
        $(this).prop('disabled', true);
        
        setTimeout(() => {
            $(this).find('.btn-icon').text('🔄');
            $(this).prop('disabled', false);
            
            // 根据当前页面执行相应的刷新操作
            if (currentSection === 'map') {
                updateMapData();
            } else if (currentSection === 'monitor') {
                updateStats();
            }
        }, 1000);
    });
    
    $('#settingsBtn').click(function() {
        alert('系统设置功能\n\n• 语言设置\n• 通知设置\n• 数据同步设置\n• 用户权限管理\n\n此功能正在开发中...');
    });

    // 扫码查询功能
    $('#startScan').click(function() {
        $(this).text('扫描中...');
        $(this).prop('disabled', true);
        
        // 模拟扫码过程
        setTimeout(() => {
            const randomCodes = ['001', '002', '003', '004'];
            const randomCode = randomCodes[Math.floor(Math.random() * randomCodes.length)];
            $('#manualInput').val(randomCode);
            queryFoodInfo(randomCode);
            
            $(this).text('开始扫描');
            $(this).prop('disabled', false);
        }, 2000);
    });

    // 手动查询功能
    $('#queryBtn').click(function() {
        const code = $('#manualInput').val().trim();
        if (code) {
            queryFoodInfo(code);
        } else {
            alert('请输入商品编号');
        }
    });

    // 查询食品信息
    function queryFoodInfo(code) {
        const food = foodDatabase[code];
        const resultPanel = $('#scanResult .result-content');
        
        if (food) {
            resultPanel.html(`
                <div class="food-info">
                    <h4 style="color: ${food.ratingColor}; margin-bottom: 15px;">
                        ${food.name} 
                        <span class="safety-badge" style="background: ${food.ratingColor}; color: white; padding: 3px 8px; border-radius: 10px; font-size: 0.8em;">
                            安全等级: ${food.safetyRating}
                        </span>
                    </h4>
                    <div class="info-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
                        <div><strong>生产厂家:</strong> ${food.manufacturer}</div>
                        <div><strong>生产日期:</strong> ${food.productionDate}</div>
                        <div><strong>保质期至:</strong> ${food.expiryDate}</div>
                        <div><strong>证照状态:</strong> ${food.certificate}</div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <strong>主要成分:</strong> ${food.ingredients.join(', ')}
                    </div>
                    <div class="safety-description" style="background: #f8f9fa; padding: 15px; border-radius: 10px; border-left: 4px solid ${food.ratingColor};">
                        <strong>安全评估:</strong> ${food.description}
                    </div>
                    <div class="voice-assistant" style="margin-top: 15px; text-align: center;">
                        <button class="voice-btn" onclick="speakFoodInfo('${code}')" style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer;">
                            🔊 语音播报
                        </button>
                    </div>
                </div>
            `);
        } else {
            resultPanel.html(`
                <div class="no-result" style="text-align: center; color: #e74c3c;">
                    <h4>未找到商品信息</h4>
                    <p>商品编号: ${code}</p>
                    <p>该商品可能为未注册产品，建议谨慎购买</p>
                    <div style="background: #ffeaa7; padding: 15px; border-radius: 10px; margin-top: 15px;">
                        <strong>⚠️ 安全提醒:</strong> 无法识别的商品可能存在安全风险，建议选择有明确标识的正规产品。
                    </div>
                </div>
            `);
        }
    }

    // 语音播报功能
    window.speakFoodInfo = function(code) {
        const food = foodDatabase[code];
        if (food && 'speechSynthesis' in window) {
            const text = `${food.name}，安全等级${food.safetyRating}级，生产厂家${food.manufacturer}，${food.description}`;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'zh-CN';
            speechSynthesis.speak(utterance);
        } else {
            alert('您的浏览器不支持语音播报功能');
        }
    };

    // 地图筛选功能
    $('#filterSelect').change(function() {
        const filter = $(this).val();
        currentFilter = filter;
        filterMerchants(filter);
    });
    
    $('.filter-btn').click(function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        currentFilter = $(this).data('filter');
        filterMerchants(currentFilter);
    });
    
    function filterMerchants(filter) {
        if (map && markers.length > 0) {
            // 高德地图模式：显示/隐藏标记
            markers.forEach(marker => {
                if (filter === 'all' || marker.merchantData.type === filter) {
                    marker.show();
                } else {
                    marker.hide();
                }
            });
        } else {
            // 模拟地图模式
            $('.merchant-marker').each(function() {
                const marker = $(this);
                if (filter === 'all') {
                    marker.show();
                } else {
                    if (marker.hasClass(filter)) {
                        marker.show();
                    } else {
                        marker.hide();
                    }
                }
            });
        }
    }

    // 商户标记点击事件
    $('.merchant-marker').click(function() {
        const merchantId = $(this).data('id');
        const merchant = merchantData[merchantId];
        
        if (merchant) {
            const ratingColors = {
                'A': '#27ae60',
                'B': '#f39c12', 
                'C': '#e67e22',
                'D': '#e74c3c'
            };
            
            $('#merchantInfo').html(`
                <h3 style="color: ${ratingColors[merchant.rating]}; margin-bottom: 15px;">
                    ${merchant.name}
                    <span class="rating-badge" style="background: ${ratingColors[merchant.rating]}; color: white; padding: 3px 8px; border-radius: 10px; font-size: 0.8em; margin-left: 10px;">
                        ${merchant.rating}级
                    </span>
                </h3>
                <div class="merchant-details">
                    <p><strong>📍 地址:</strong> ${merchant.address}</p>
                    <p><strong>📋 证照:</strong> ${merchant.certificate}</p>
                    <p><strong>⚠️ 违规次数:</strong> ${merchant.violations}次</p>
                    <p><strong>🔍 最近检查:</strong> ${merchant.lastInspection}</p>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin-top: 15px; border-left: 4px solid ${ratingColors[merchant.rating]};">
                        <strong>详细说明:</strong> ${merchant.description}
                    </div>
                </div>
            `);
        }
    });

    // 刷新地图
    $('#refreshMap').click(function() {
        $(this).text('刷新中...');
        setTimeout(() => {
            $(this).text('刷新地图');
            // 模拟数据更新
            updateMapData();
        }, 1000);
    });

    // 安全地图功能 - 高德地图集成
    let map;
    let currentFilter = 'all';
    let markers = [];
    
    // 示例学校坐标（玉林市第十中学附近）
    const schoolLocation = [110.154, 22.63]; // 玉林市坐标
    
    function initAMap() {
        // 检查高德地图API是否加载
        if (typeof AMap === 'undefined') {
            console.warn('高德地图API未加载，使用模拟地图');
            initMockMap();
            return;
        }
        
        try {
            // 初始化地图
            map = new AMap.Map('mapContainer', {
                zoom: 16,
                center: schoolLocation,
                mapStyle: 'amap://styles/light'
            });
            
            // 添加控件
            map.addControl(new AMap.Scale());
            map.addControl(new AMap.ToolBar());
            
            // 添加学校标记
            const schoolMarker = new AMap.Marker({
                position: schoolLocation,
                title: '玉林市第十中学',
                icon: new AMap.Icon({
                    size: new AMap.Size(32, 32),
                    image: 'data:image/svg+xml;base64,' + btoa(`
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                            <circle cx="16" cy="16" r="14" fill="#1a73e8" stroke="white" stroke-width="2"/>
                            <text x="16" y="20" text-anchor="middle" fill="white" font-size="16">🏫</text>
                        </svg>
                    `)
                })
            });
            map.add(schoolMarker);
            
            // 添加商户标记
            addMerchantMarkers();
            
        } catch (error) {
            console.error('高德地图初始化失败:', error);
            initMockMap();
        }
    }
    
    function initMockMap() {
        // 备用方案：显示模拟地图
        $('#mapContainer').html(`
            <div style="background: #f0f0f0; height: 100%; display: flex; align-items: center; justify-content: center; position: relative; border-radius: 8px;">
                <div style="text-align: center; color: #666;">
                    <div style="font-size: 48px; margin-bottom: 16px;">🗺️</div>
                    <div>玉林市第十中学周边安全地图</div>
                    <div style="font-size: 12px; margin-top: 8px;">（演示模式）</div>
                </div>
                <div class="school-marker" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #1a73e8; color: white; padding: 8px 12px; border-radius: 4px; font-size: 14px;">🏫 玉林市第十中学</div>
                <div class="merchant-marker safe" data-id="1" style="position: absolute; top: 30%; left: 25%; background: #34a853; color: white; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">🏪 安全小卖部</div>
                <div class="merchant-marker warning" data-id="2" style="position: absolute; top: 40%; left: 70%; background: #fbbc04; color: white; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">🍜 警告餐厅</div>
                <div class="merchant-marker danger" data-id="3" style="position: absolute; top: 70%; left: 30%; background: #ea4335; color: white; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">🥘 危险摊位</div>
                <div class="merchant-marker safe" data-id="4" style="position: absolute; top: 60%; left: 75%; background: #34a853; color: white; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">🍞 安全面包店</div>
            </div>
        `);
        
        // 绑定点击事件
        bindMockMarkerEvents();
    }
    
    function addMerchantMarkers() {
        if (!map) return;
        
        // 清除现有标记
        markers.forEach(marker => map.remove(marker));
        markers = [];
        
        // 模拟商户数据（相对学校的位置偏移）
        const merchantsData = [
            { id: 1, name: '安全小卖部', grade: 'A', type: 'safe', offset: [-0.002, 0.001] },
            { id: 2, name: '警告餐厅', grade: 'B', type: 'warning', offset: [0.003, 0.001] },
            { id: 3, name: '危险摊位', grade: 'D', type: 'danger', offset: [-0.001, -0.003] },
            { id: 4, name: '安全面包店', grade: 'A', type: 'safe', offset: [0.002, -0.002] }
        ];
        
        merchantsData.forEach(merchant => {
            const position = [
                schoolLocation[0] + merchant.offset[0],
                schoolLocation[1] + merchant.offset[1]
            ];
            
            const color = {
                'safe': '#34a853',
                'warning': '#fbbc04', 
                'danger': '#ea4335'
            }[merchant.type];
            
            const marker = new AMap.Marker({
                position: position,
                title: merchant.name,
                icon: new AMap.Icon({
                    size: new AMap.Size(24, 24),
                    image: 'data:image/svg+xml;base64,' + btoa(`
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" fill="${color}" stroke="white" stroke-width="2"/>
                            <text x="12" y="16" text-anchor="middle" fill="white" font-size="10" font-weight="bold">${merchant.grade}</text>
                        </svg>
                    `)
                })
            });
            
            // 添加点击事件
            marker.on('click', () => {
                showMerchantInfo(merchant.id);
            });
            
            marker.merchantData = merchant;
            markers.push(marker);
            map.add(marker);
        });
    }
    
    function bindMockMarkerEvents() {
        $(document).off('click', '.merchant-marker').on('click', '.merchant-marker', function() {
            const merchantId = parseInt($(this).data('id'));
            showMerchantInfo(merchantId);
        });
    }
    
    // 模拟商家数据
    const mockMerchants = [
        {
            id: 1,
            name: '学校食堂',
            grade: 'A',
            address: '校内主楼一层',
            lastInspection: '2024-01-15',
            violations: 0,
            phone: '0775-2823456',
            specialties: ['营养套餐', '素食专区', '清真窗口'],
            avgPrice: '8-15元',
            openTime: '06:30-20:00'
        },
        {
            id: 2,
            name: '阳光快餐',
            grade: 'B',
            address: '学校东门50米',
            lastInspection: '2024-01-10',
            violations: 1,
            phone: '0775-2834567',
            specialties: ['盖浇饭', '炒面', '汤粉'],
            avgPrice: '6-12元',
            openTime: '07:00-21:00'
        },
        {
            id: 3,
            name: '美味小吃店',
            grade: 'C',
            address: '学校南门100米',
            lastInspection: '2024-01-08',
            violations: 3,
            phone: '0775-2845678',
            specialties: ['烧烤', '炸串', '奶茶'],
            avgPrice: '5-20元',
            openTime: '16:00-23:00'
        },
        {
            id: 4,
            name: '便民超市',
            grade: 'A',
            address: '学校西门20米',
            lastInspection: '2024-01-12',
            violations: 0,
            phone: '0775-2856789',
            specialties: ['零食', '饮料', '日用品'],
            avgPrice: '2-50元',
            openTime: '06:00-22:30'
        },
        {
            id: 5,
            name: '健康轻食',
            grade: 'A',
            address: '学校北门30米',
            lastInspection: '2024-01-14',
            violations: 0,
            phone: '0775-2867890',
            specialties: ['沙拉', '三明治', '鲜榨果汁'],
            avgPrice: '12-25元',
            openTime: '07:30-19:00'
        },
        {
            id: 6,
            name: '传统面馆',
            grade: 'B',
            address: '学校东门200米',
            lastInspection: '2024-01-09',
            violations: 2,
            phone: '0775-2878901',
            specialties: ['牛肉面', '酸辣粉', '馄饨'],
            avgPrice: '8-18元',
            openTime: '06:00-14:00, 17:00-21:00'
        }
    ];

    // 食品安全知识库
    const foodSafetyKnowledge = {
        basics: [
            {
                title: '什么是"三无"食品？',
                content: '"三无"食品是指无生产厂家、无生产日期、无保质期的食品。这类食品存在严重的食品安全隐患，同学们一定要避免购买。',
                tips: ['购买前检查包装标签', '选择正规商店', '注意生产日期和保质期']
            },
            {
                title: '如何识别变质食品？',
                content: '变质食品通常有异味、变色、发霉等特征。特别要注意肉类、奶制品、面包等易变质食品。',
                tips: ['闻气味', '看外观', '检查质地', '注意保存条件']
            },
            {
                title: '校园饮食安全注意事项',
                content: '在学校用餐时，要选择卫生条件好的食堂，避免在路边摊购买食品，注意个人卫生。',
                tips: ['饭前洗手', '选择热食', '避免生冷食品', '不暴饮暴食']
            }
        ],
        identification: [
            {
                category: '合格食品标识',
                items: ['QS标志', '生产许可证号', '营养成分表', '配料表'],
                description: '正规食品应该具备完整的标识信息'
            },
            {
                category: '危险食品特征',
                items: ['包装破损', '超过保质期', '颜色异常', '有异味'],
                description: '发现这些特征的食品绝对不能食用'
            }
        ],
        nutrition: [
            {
                title: '中学生营养需求',
                content: '中学生正处于生长发育期，需要充足的蛋白质、维生素和矿物质。',
                recommendations: ['每天喝牛奶', '多吃蔬菜水果', '适量摄入肉类', '少吃零食']
            },
            {
                title: '健康饮食搭配',
                content: '合理搭配主食、蛋白质和蔬菜，保证营养均衡。',
                recommendations: ['早餐要丰富', '午餐要营养', '晚餐要清淡', '零食要适量']
            }
        ]
    };

    // 积分任务数据
    const pointsTasks = [
        { id: 1, title: '完成食品安全知识问答', points: 30, completed: false, type: 'quiz' },
        { id: 2, title: '举报不安全食品', points: 50, completed: false, type: 'report' },
        { id: 3, title: '分享健康饮食心得', points: 20, completed: false, type: 'share' },
        { id: 4, title: '参与社区讨论', points: 15, completed: false, type: 'discuss' },
        { id: 5, title: '记录每日饮食', points: 10, completed: false, type: 'diary' },
        { id: 6, title: '邀请同学加入系统', points: 100, completed: false, type: 'invite' }
    ];

    // 奖励商品数据
    const rewardsStore = [
        { id: 1, name: '学习用品套装', price: '200积分', description: '包含笔记本、笔等', stock: 10 },
        { id: 2, name: '健康零食礼包', price: '150积分', description: '精选健康小食品', stock: 15 },
        { id: 3, name: '体育用品', price: '300积分', description: '篮球、羽毛球拍等', stock: 5 },
        { id: 4, name: '图书券', price: '100积分', description: '可在学校书店使用', stock: 20 },
        { id: 5, name: '食堂优惠券', price: '50积分', description: '8折优惠券', stock: 50 }
    ];

    // 社区动态数据
const communityPosts = [
    {
        id: 1,
        username: '健康小达人',
        avatar: '🌟',
        time: '2小时前',
        content: '今天在学校食堂吃到了超级好吃的营养套餐！蛋白质、维生素都很丰富，推荐给大家～ #健康饮食 #学校食堂',
        likes: 15,
        comments: 3,
        images: ['🍱']
    },
    {
        id: 2,
        username: '食安监督员',
        avatar: '🔍',
        time: '5小时前',
        content: '提醒大家：最近天气热，购买食品时一定要注意保质期，特别是奶制品和肉类！发现过期食品记得举报哦～',
        likes: 28,
        comments: 7,
        type: 'warning'
    },
    {
        id: 3,
        username: '营养师小王',
        avatar: '👩‍⚕️',
        time: '1天前',
        content: '分享一个小贴士：饭前洗手很重要，可以有效预防肠胃疾病。大家要养成好习惯哦！',
        likes: 42,
        comments: 12,
        type: 'tip'
    },
    {
        id: 4,
        username: '班长小李',
        avatar: '👨‍🎓',
        time: '3小时前',
        content: '我们班今天组织了食品安全知识竞赛，大家都学到了很多！谁说学习不能很有趣？ 💪',
        likes: 23,
        comments: 8,
        type: 'activity'
    },
    {
        id: 5,
        username: '美食探索家',
        avatar: '🍽️',
        time: '6小时前',
        content: '发现学校北门的健康轻食店新推出了低糖酸奶杯，味道不错而且很健康！推荐给正在控制体重的同学们～',
        likes: 19,
        comments: 5,
        images: ['🥛', '🥗']
    },
    {
        id: 6,
        username: '体育委员',
        avatar: '⚽',
        time: '8小时前',
        content: '运动后补充营养很重要！建议大家选择香蕉、牛奶这些天然食品，避免高糖饮料。',
        likes: 31,
        comments: 9,
        type: 'sports'
    },
    {
        id: 7,
        username: '化学课代表',
        avatar: '🧪',
        time: '12小时前',
        content: '今天化学课学了食品添加剂，原来很多我们担心的添加剂其实是安全的！科学认知很重要 📚',
        likes: 26,
        comments: 11,
        type: 'education'
    },
    {
        id: 8,
        username: '校医阿姨',
        avatar: '👩‍⚕️',
        time: '1天前',
        content: '最近肠胃不适的同学增多，提醒大家：1️⃣少吃生冷食物 2️⃣注意饮食卫生 3️⃣规律作息。身体是革命的本钱！',
        likes: 67,
        comments: 15,
        type: 'health'
    }
];

// 健康挑战活动数据
const healthChallenges = [
    {
        id: 1,
        title: '21天健康饮食打卡',
        description: '连续21天记录健康饮食，养成良好习惯',
        participants: 156,
        duration: '21天',
        reward: '300积分 + 健康达人徽章',
        status: 'active',
        progress: 65
    },
    {
        id: 2,
        title: '零食戒断挑战',
        description: '7天内不吃垃圾零食，选择健康替代品',
        participants: 89,
        duration: '7天',
        reward: '150积分 + 自律之星称号',
        status: 'active',
        progress: 23
    },
    {
        id: 3,
        title: '营养知识竞赛',
        description: '每周营养知识问答，学习健康饮食科学',
        participants: 234,
        duration: '每周',
        reward: '50积分/周 + 知识达人徽章',
        status: 'weekly',
        progress: 78
    },
    {
        id: 4,
        title: '水果达人挑战',
        description: '每天吃3种不同颜色的水果，补充维生素',
        participants: 178,
        duration: '14天',
        reward: '200积分 + 维C达人称号',
        status: 'active',
        progress: 42
    },
    {
        id: 5,
        title: '早餐不缺席',
        description: '坚持每天吃营养早餐，开启活力一天',
        participants: 312,
        duration: '30天',
        reward: '400积分 + 早起鸟徽章',
        status: 'active',
        progress: 18
    }
];

// 智能推荐数据
const smartRecommendations = {
    breakfast: [
        { name: '燕麦粥配水果', nutrition: '高纤维、维生素丰富', calories: '280卡', price: '8元', merchant: '健康轻食', rating: 4.8 },
        { name: '全麦面包三明治', nutrition: '蛋白质、碳水化合物均衡', calories: '320卡', price: '12元', merchant: '校园面包房', rating: 4.6 },
        { name: '豆浆配包子', nutrition: '植物蛋白、B族维生素', calories: '350卡', price: '6元', merchant: '传统早餐店', rating: 4.5 },
        { name: '酸奶杯配坚果', nutrition: '益生菌、优质脂肪', calories: '260卡', price: '15元', merchant: '健康轻食', rating: 4.9 }
    ],
    lunch: [
        { name: '蒸蛋羹配青菜', nutrition: '优质蛋白、叶酸丰富', calories: '420卡', price: '15元', merchant: '健康轻食', rating: 4.7 },
        { name: '番茄鸡蛋面', nutrition: '维生素C、蛋白质', calories: '480卡', price: '18元', merchant: '传统面馆', rating: 4.4 },
        { name: '紫菜蛋花汤配米饭', nutrition: '碘元素、蛋白质', calories: '380卡', price: '12元', merchant: '学生餐厅', rating: 4.2 },
        { name: '鸡胸肉沙拉', nutrition: '高蛋白、低脂肪', calories: '340卡', price: '22元', merchant: '轻食沙拉', rating: 4.8 }
    ],
    dinner: [
        { name: '清蒸鱼配蔬菜', nutrition: 'Omega-3、维生素', calories: '360卡', price: '25元', merchant: '健康轻食', rating: 4.9 },
        { name: '小米粥配咸菜', nutrition: '易消化、B族维生素', calories: '220卡', price: '8元', merchant: '传统粥店', rating: 4.3 },
        { name: '蔬菜沙拉', nutrition: '膳食纤维、维生素', calories: '180卡', price: '16元', merchant: '轻食沙拉', rating: 4.6 },
        { name: '蒸蛋配青菜汤', nutrition: '蛋白质、维生素', calories: '280卡', price: '14元', merchant: '健康轻食', rating: 4.5 }
    ],
    snacks: [
        { name: '混合坚果', nutrition: '健康脂肪、蛋白质', calories: '160卡', price: '12元', merchant: '零食小铺', rating: 4.7 },
        { name: '酸奶', nutrition: '益生菌、钙质', calories: '120卡', price: '6元', merchant: '便利店', rating: 4.5 },
        { name: '苹果片', nutrition: '维生素C、纤维', calories: '80卡', price: '5元', merchant: '水果店', rating: 4.8 },
        { name: '全麦饼干', nutrition: '复合碳水化合物', calories: '140卡', price: '8元', merchant: '健康零食', rating: 4.4 }
    ]
};

// 每日健康任务
const dailyHealthTasks = [
    { id: 1, title: '🥛 喝够8杯水', description: '保持充足水分摄入', progress: 5, target: 8, unit: '杯', points: 10, completed: false },
    { id: 2, title: '🥗 吃5种颜色蔬果', description: '摄入多样化营养素', progress: 3, target: 5, unit: '种', points: 15, completed: false },
    { id: 3, title: '🚶 步行8000步', description: '保持适量运动', progress: 6200, target: 8000, unit: '步', points: 20, completed: false },
    { id: 4, title: '😴 睡眠8小时', description: '保证充足睡眠', progress: 7, target: 8, unit: '小时', points: 15, completed: false },
    { id: 5, title: '📚 学习营养知识', description: '每日学习健康知识', progress: 1, target: 1, unit: '篇', points: 10, completed: true }
];

// 食品安全小贴士
const safetyTips = [
    { icon: '🧼', title: '饭前洗手', content: '用肥皂和流动水洗手至少20秒，预防细菌感染', category: 'hygiene' },
    { icon: '🌡️', title: '注意温度', content: '热食要趁热吃，冷食要保持低温，避免细菌繁殖', category: 'storage' },
    { icon: '📅', title: '查看日期', content: '购买食品时检查生产日期和保质期，不吃过期食品', category: 'purchase' },
    { icon: '🥬', title: '清洗蔬果', content: '蔬菜水果要彻底清洗，去除农药残留和细菌', category: 'preparation' },
    { icon: '🍖', title: '充分加热', content: '肉类、蛋类要充分加热煮熟，杀死有害细菌', category: 'cooking' },
    { icon: '🧊', title: '正确储存', content: '易腐食品要及时冷藏，生熟食品分开存放', category: 'storage' },
    { icon: '🥤', title: '选择饮品', content: '多喝白开水，少喝含糖饮料，避免添加剂过多', category: 'beverage' },
    { icon: '🍎', title: '新鲜优先', content: '选择新鲜食材，避免加工食品，营养价值更高', category: 'selection' }
];

// 营养成分数据库
const nutritionDatabase = {
    '米饭': { calories: 116, protein: 2.6, carbs: 25.9, fat: 0.3, fiber: 0.3, vitamin: 'B1' },
    '面条': { calories: 109, protein: 4.0, carbs: 21.6, fat: 0.7, fiber: 1.2, vitamin: 'B2' },
    '鸡蛋': { calories: 155, protein: 13.3, carbs: 1.1, fat: 11.1, fiber: 0, vitamin: 'A,D' },
    '牛奶': { calories: 54, protein: 3.0, carbs: 3.4, fat: 3.2, fiber: 0, vitamin: 'B12,D' },
    '苹果': { calories: 52, protein: 0.3, carbs: 13.8, fat: 0.2, fiber: 2.4, vitamin: 'C' },
    '香蕉': { calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fiber: 2.6, vitamin: 'B6,C' },
    '西红柿': { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, vitamin: 'C,K' },
    '胡萝卜': { calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2, fiber: 2.8, vitamin: 'A' },
    '菠菜': { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, vitamin: 'K,A' },
    '鸡胸肉': { calories: 165, protein: 31.0, carbs: 0, fat: 3.6, fiber: 0, vitamin: 'B6' }
};

// 学生健康档案模板
const healthProfileTemplate = {
    basicInfo: {
        height: 165,
        weight: 55,
        age: 15,
        gender: '女',
        bmi: 20.2,
        bmiStatus: '正常',
        bloodType: 'A型'
    },
    preferences: {
        likes: ['水果', '蔬菜', '酸奶', '坚果', '鱼类'],
        dislikes: ['辣食', '油腻食物', '内脏'],
        allergies: ['花生', '海鲜', '牛奶']
    },
    goals: {
        targetWeight: 52,
        dailyCalories: 1800,
        exerciseMinutes: 60,
        waterIntake: 8
    },
    healthStatus: {
        bloodPressure: '正常',
        bloodSugar: '正常',
        cholesterol: '正常',
        lastCheckup: '2024-01-15'
    }
};

// 安全等级定义
const safetyGrades = {
    'A': { name: 'A级 - 优秀', color: '#34a853', description: '食品安全管理优秀，可放心消费' },
    'B': { name: 'B级 - 良好', color: '#1a73e8', description: '食品安全管理良好，建议消费' },
    'C': { name: 'C级 - 一般', color: '#fbbc04', description: '食品安全管理一般，谨慎消费' },
    'D': { name: 'D级 - 较差', color: '#ea4335', description: '食品安全管理较差，不建议消费' }
};

// 食品分类数据
const foodCategories = {
    staple: { name: '主食类', icon: '🍚', items: ['米饭', '面条', '面包', '馒头'] },
    protein: { name: '蛋白质', icon: '🥩', items: ['鸡蛋', '牛奶', '鸡胸肉', '豆腐'] },
    vegetables: { name: '蔬菜类', icon: '🥬', items: ['菠菜', '胡萝卜', '西红柿', '白菜'] },
    fruits: { name: '水果类', icon: '🍎', items: ['苹果', '香蕉', '橙子', '葡萄'] },
    snacks: { name: '零食类', icon: '🍪', items: ['坚果', '酸奶', '全麦饼干', '水果干'] }
};

// 季节性推荐
const seasonalRecommendations = {
    spring: {
        name: '春季养生',
        foods: ['春笋', '韭菜', '菠菜', '草莓'],
        tips: '春季宜清淡饮食，多吃绿色蔬菜，有助于肝脏排毒'
    },
    summer: {
        name: '夏季清热',
        foods: ['西瓜', '黄瓜', '绿豆', '苦瓜'],
        tips: '夏季要多补水，选择清热解暑的食物，避免过于油腻'
    },
    autumn: {
        name: '秋季润燥',
        foods: ['梨子', '银耳', '百合', '蜂蜜'],
        tips: '秋季干燥，要多吃润肺的食物，补充维生素'
    },
    winter: {
        name: '冬季温补',
        foods: ['萝卜', '山药', '红枣', '核桃'],
        tips: '冬季要适当温补，多吃温性食物，增强体质'
    }
};

// 为健康挑战添加状态文本
healthChallenges.forEach(challenge => {
    if (challenge.status === 'active') {
        challenge.statusText = '进行中';
        challenge.joined = Math.random() > 0.7; // 随机设置参与状态
    } else if (challenge.status === 'weekly') {
        challenge.statusText = '每周';
        challenge.joined = Math.random() > 0.5;
    }
});

// 食品安全事件模拟数据
const safetyIncidents = [
    {
        id: 1,
        title: '学校周边发现过期面包',
        location: '东门便利店',
        reportTime: '2024-01-16 14:30',
        status: '已处理',
        severity: 'medium',
        description: '发现部分面包超过保质期仍在销售',
        action: '已要求商家下架并整改'
    },
    {
        id: 2,
        title: '食堂新增过敏原标识',
        location: '学校食堂',
        reportTime: '2024-01-15 09:00',
        status: '已完成',
        severity: 'low',
        description: '为保护过敏体质学生，食堂增加过敏原提示',
        action: '所有窗口已添加过敏原标识牌'
    },
    {
        id: 3,
        title: '不明来源零食举报',
        location: '南门小摊',
        reportTime: '2024-01-14 16:45',
        status: '调查中',
        severity: 'high',
        description: '发现销售无标签自制零食',
        action: '相关部门正在调查处理'
    }
];

// 营养师建议数据
const nutritionTips = [
    {
        category: '早餐建议',
        tips: [
            '早餐要包含蛋白质、碳水化合物和维生素',
            '牛奶+全麦面包+水果是经典搭配',
            '避免空腹喝咖啡或浓茶',
            '早餐时间最好在7-9点之间'
        ],
        icon: '🌅'
    },
    {
        category: '午餐指南',
        tips: [
            '午餐应占全天热量的40%',
            '荤素搭配，营养均衡',
            '饭后不要立即剧烈运动',
            '细嚼慢咽有助消化'
        ],
        icon: '🍽️'
    },
    {
        category: '晚餐原则',
        tips: [
            '晚餐要清淡，避免油腻',
            '睡前3小时内尽量不进食',
            '可以适量吃些水果',
            '避免暴饮暴食'
        ],
        icon: '🌙'
    },
    {
        category: '零食选择',
        tips: [
            '优选坚果、水果、酸奶',
            '控制糖分和盐分摄入',
            '避免反式脂肪酸食品',
            '注意零食的食用时间'
        ],
        icon: '🥜'
    }
];



    function showMerchantInfo(merchantId) {
         const merchant = mockMerchants.find(m => m.id === merchantId);
         if (merchant) {
             $('#merchantInfo').html(`
                 <h3>${merchant.name}</h3>
                 <p><strong>安全等级:</strong> ${merchant.grade}</p>
                 <p><strong>地址:</strong> ${merchant.address}</p>
                 <p><strong>最近检查:</strong> ${merchant.lastInspection}</p>
                 <p><strong>违规记录:</strong> ${merchant.violations}次</p>
                 <p><strong>联系电话:</strong> ${merchant.phone}</p>
                 <p><strong>特色菜品:</strong> ${merchant.specialties ? merchant.specialties.join(', ') : '暂无'}</p>
                 <p><strong>人均消费:</strong> ${merchant.avgPrice || '暂无'}</p>
                 <p><strong>营业时间:</strong> ${merchant.openTime || '暂无'}</p>
             `).show();
         }
     }
    
    // 更新地图数据
    function updateMapData() {
        if (map && markers.length > 0) {
            // 高德地图模式：重新添加标记
            addMerchantMarkers();
        } else {
            // 模拟地图模式：随机移动标记
            const mockMarkers = $('.merchant-marker');
            mockMarkers.each(function() {
                const marker = $(this);
                const randomX = Math.random() * 60 + 20;
                const randomY = Math.random() * 60 + 20;
                marker.css({
                    'left': randomX + '%',
                    'top': randomY + '%'
                });
            });
        }
    }
    
    // 当切换到地图页面时初始化地图
    $(document).on('click', '[data-section="map"]', function() {
        setTimeout(() => {
            if (!map) {
                initAMap();
            }
        }, 100);
    });

    // 监管系统初始化
    function initMonitorSystem() {
        // 更新统计数据
        updateStats();
        
        // 模拟实时报警
        setInterval(generateRandomAlert, 10000);
        
        // 模拟摄像头检测
        simulateCameraDetection();
    }

    // 更新统计数据
    function updateStats() {
        // 模拟数据更新
        setInterval(() => {
            const scanCount = Math.floor(Math.random() * 50) + 150;
            const violationCount = Math.floor(Math.random() * 5) + 1;
            const handledCount = Math.floor(Math.random() * 3) + 2;
            
            $('.stat-card:eq(0) .stat-number').text(scanCount);
            $('.stat-card:eq(1) .stat-number').text(violationCount);
            $('.stat-card:eq(2) .stat-number').text(handledCount);
        }, 5000);
    }

    // 生成随机报警
    function generateRandomAlert() {
        const alerts = [
            { level: 'high', content: '发现无包装食品摊位 - 学校东门' },
            { level: 'medium', content: '检测到无标识商品 - 学校南门小卖部' },
            { level: 'low', content: '商户证照即将过期提醒' },
            { level: 'high', content: '发现三无产品销售 - 学校西门摊位' },
            { level: 'medium', content: '食品储存温度异常 - 北门便利店' }
        ];
        
        const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
        const currentTime = new Date().toLocaleTimeString('zh-CN', { hour12: false, hour: '2-digit', minute: '2-digit' });
        
        const alertHtml = `
            <div class="alert-item ${randomAlert.level}">
                <span class="alert-time">${currentTime}</span>
                <span class="alert-content">${randomAlert.content}</span>
                <button class="handle-btn" onclick="handleAlert(this)">处理</button>
            </div>
        `;
        
        $('#alertList').prepend(alertHtml);
        
        // 限制显示的报警数量
        const alertItems = $('#alertList .alert-item');
        if (alertItems.length > 5) {
            alertItems.last().remove();
        }
    }

    // 处理报警
    window.handleAlert = function(button) {
        const alertItem = $(button).closest('.alert-item');
        $(button).text('已处理').prop('disabled', true).css('background', '#95a5a6');
        alertItem.css('opacity', '0.6');
        
        setTimeout(() => {
            alertItem.fadeOut(500, function() {
                $(this).remove();
            });
        }, 2000);
    };

    // 模拟摄像头检测
    function simulateCameraDetection() {
        const cameras = $('.camera-view .detection-overlay');
        
        setInterval(() => {
            cameras.each(function() {
                const statuses = ['正常', '检测中...', '发现异常'];
                const colors = ['#27ae60', '#3498db', '#e74c3c'];
                const randomIndex = Math.floor(Math.random() * statuses.length);
                
                $(this).text(statuses[randomIndex]).css('background', colors[randomIndex]);
            });
        }, 3000);
    }

    // 标签页切换功能
    $(document).on('click', '.tab-btn', function() {
        const tabContainer = $(this).closest('.knowledge-container, .points-container, .community-container, .health-container');
        const targetTab = $(this).data('tab');
        
        // 更新标签按钮状态
        tabContainer.find('.tab-btn').removeClass('active');
        $(this).addClass('active');
        
        // 显示对应内容
        tabContainer.find('.tab-content').removeClass('active');
        tabContainer.find('#' + targetTab).addClass('active');
    });
    
    // 知识问答功能
    $(document).on('click', '.quiz-submit', function() {
        const selectedAnswer = $('input[name="q1"]:checked').val();
        const resultDiv = $('.quiz-result');
        
        if (!selectedAnswer) {
            alert('请选择一个答案！');
            return;
        }
        
        let resultText = '';
        let resultClass = '';
        
        if (selectedAnswer === 'b') {
            resultText = '✅ 回答正确！散装无标签的糖果确实属于"三无"食品，缺少必要的生产信息。+30积分！';
            resultClass = 'correct';
        } else {
            resultText = '❌ 回答错误。正确答案是B。"三无"食品是指无生产厂家、无生产日期、无保质期的食品。';
            resultClass = 'incorrect';
        }
        
        resultDiv.html(`<div class="quiz-answer ${resultClass}">${resultText}</div>`).show();
    });
    
    // 举报表单提交
    $(document).on('submit', '#reportForm', function(e) {
        e.preventDefault();
        
        const reportType = $('#reportType').val();
        const merchantName = $('#merchantName').val();
        const merchantAddress = $('#merchantAddress').val();
        const description = $('#reportDescription').val();
        
        if (!reportType || !merchantName || !merchantAddress || !description) {
            alert('请填写完整的举报信息！');
            return;
        }
        
        // 模拟提交成功
        alert('举报提交成功！我们会在24小时内处理您的举报。感谢您对食品安全的关注！+50积分');
        
        // 清空表单
        this.reset();
        
        // 添加到举报记录（模拟）
        const newReport = `
            <div class="report-item">
                <div class="report-info">
                    <h4>${merchantName} - ${reportType}</h4>
                    <p>举报时间：${new Date().toLocaleString()}</p>
                    <p>处理状态：<span class="status processing">处理中</span></p>
                </div>
            </div>
        `;
        $('.report-list').prepend(newReport);
    });
    
    // 上传区域点击事件
    $(document).on('click', '.upload-area', function() {
        $(this).find('input[type="file"]').click();
    });
    
    // 文件上传处理
    $(document).on('change', '#reportImage', function() {
        const fileName = this.files[0] ? this.files[0].name : '';
        if (fileName) {
            $(this).siblings('.upload-placeholder').text(`已选择文件: ${fileName}`);
        }
    });
    
    // 积分兑换功能
    $(document).on('click', '.exchange-btn:not(.disabled)', function() {
        const rewardName = $(this).siblings('h4').text();
        const rewardPrice = $(this).siblings('.reward-price').text();
        
        if (confirm(`确定要兑换 ${rewardName} 吗？需要消耗 ${rewardPrice}。`)) {
            alert('兑换成功！奖品将在3-5个工作日内发放到您的班级。');
            $(this).addClass('disabled').text('已兑换');
        }
    });
    
    // 餐次标签切换
    $(document).on('click', '.meal-btn', function() {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });
    
    // 添加食物功能
    $(document).on('click', '.add-food', function() {
        const foodInput = $(this).siblings('input');
        const foodName = foodInput.val().trim();
        
        if (!foodName) {
            alert('请输入食物名称！');
            return;
        }
        
        const activeMeal = $('.meal-btn.active').text();
        alert(`已添加 "${foodName}" 到${activeMeal}记录中！`);
        foodInput.val('');
    });
    
    // 社区发布动态
    $(document).on('click', '.publish-btn', function() {
        const content = $(this).closest('.post-form').find('textarea').val().trim();
        
        if (!content) {
            alert('请输入动态内容！');
            return;
        }
        
        const newPost = `
            <div class="post-item">
                <div class="post-header">
                    <div class="user-avatar">👤</div>
                    <div class="post-info">
                        <div class="username">我</div>
                        <div class="post-time">刚刚</div>
                    </div>
                </div>
                <div class="post-content">
                    <p>${content}</p>
                </div>
                <div class="post-actions">
                    <button class="like-btn">👍 0</button>
                    <button class="comment-btn">💬 0</button>
                    <button class="share-btn">🔗 分享</button>
                </div>
            </div>
        `;
        
        $('.posts-list').prepend(newPost);
        $(this).closest('.post-form').find('textarea').val('');
        alert('动态发布成功！+20积分');
    });
    
    // 点赞功能
    $(document).on('click', '.like-btn', function() {
        const currentText = $(this).text();
        const currentCount = parseInt(currentText.match(/\d+/)[0]);
        const newCount = currentCount + 1;
        $(this).text(`👍 ${newCount}`);
        $(this).css('color', '#1a73e8');
    });
    
    // 讨论区点击
    $(document).on('click', '.discussion-item', function() {
        const title = $(this).find('h4').text();
        alert(`即将进入讨论：${title}`);
    });
    
    // 动态加载知识内容
    function loadKnowledgeContent() {
        // 加载基础知识
        const basicsContainer = $('#basics .knowledge-grid');
        foodSafetyKnowledge.basics.forEach(item => {
            const card = `
                <div class="knowledge-card">
                    <h4>${item.title}</h4>
                    <p>${item.content}</p>
                    <div class="tips-list">
                        <strong>小贴士：</strong>
                        <ul>
                            ${item.tips.map(tip => `<li>${tip}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            basicsContainer.append(card);
        });
        
        // 加载识别指南
        const identificationContainer = $('#identification .identification-grid');
        foodSafetyKnowledge.identification.forEach(item => {
            const card = `
                <div class="identification-card">
                    <h4>${item.category}</h4>
                    <p>${item.description}</p>
                    <div class="items-list">
                        ${item.items.map(i => `<span class="item-tag">${i}</span>`).join('')}
                    </div>
                </div>
            `;
            identificationContainer.append(card);
        });
        
        // 加载营养建议
        const nutritionContainer = $('#nutrition .nutrition-grid');
        foodSafetyKnowledge.nutrition.forEach(item => {
            const card = `
                <div class="nutrition-card">
                    <h4>${item.title}</h4>
                    <p>${item.content}</p>
                    <div class="recommendations">
                        <strong>建议：</strong>
                        <ul>
                            ${item.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            nutritionContainer.append(card);
        });
    }
    
    // 动态加载积分任务
    function loadPointsTasks() {
        const tasksContainer = $('.tasks-list');
        pointsTasks.forEach(task => {
            const taskItem = `
                <div class="task-item ${task.completed ? 'completed' : ''}">
                    <div class="task-info">
                        <h4>${task.title}</h4>
                        <div class="task-points">+${task.points}积分</div>
                    </div>
                    <button class="task-btn ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
                        ${task.completed ? '已完成' : '去完成'}
                    </button>
                </div>
            `;
            tasksContainer.append(taskItem);
        });
    }
    
    // 动态加载奖励商品
    function loadRewardsStore() {
        const storeContainer = $('.rewards-grid');
        rewardsStore.forEach(reward => {
            const rewardCard = `
                <div class="reward-card">
                    <div class="reward-icon">🎁</div>
                    <h4>${reward.name}</h4>
                    <p>${reward.description}</p>
                    <div class="reward-price">${reward.price}</div>
                    <div class="reward-stock">库存：${reward.stock}</div>
                    <button class="exchange-btn ${reward.stock === 0 ? 'disabled' : ''}">
                        ${reward.stock === 0 ? '缺货' : '兑换'}
                    </button>
                </div>
            `;
            storeContainer.append(rewardCard);
        });
    }
    
    // 动态加载社区动态
    function loadCommunityPosts() {
        const postsContainer = $('.posts-list');
        communityPosts.forEach(post => {
            const postItem = `
                <div class="post-item">
                    <div class="post-header">
                        <div class="user-avatar">${post.avatar}</div>
                        <div class="post-info">
                            <div class="username">${post.username}</div>
                            <div class="post-time">${post.time}</div>
                        </div>
                    </div>
                    <div class="post-content">
                        <p>${post.content}</p>
                    </div>
                    <div class="post-actions">
                        <button class="like-btn">👍 ${post.likes}</button>
                        <button class="comment-btn">💬 ${post.comments}</button>
                        <button class="share-btn">🔗 分享</button>
                    </div>
                </div>
            `;
            postsContainer.append(postItem);
        });
    }
    
    // 任务完成处理
    $(document).on('click', '.task-btn:not(.completed)', function() {
        const taskId = parseInt($(this).data('task-id'));
        const task = pointsTasks.find(t => t.id === taskId);
        
        if (task) {
            let canComplete = false;
            let message = '';
            
            switch(task.type) {
                case 'quiz':
                    message = '请先完成知识问答！';
                    // 检查是否已完成问答
                    if ($('.quiz-result .correct').length > 0) {
                        canComplete = true;
                        message = `恭喜完成任务：${task.title}！获得${task.points}积分！`;
                    }
                    break;
                case 'report':
                    message = '请先提交举报信息！';
                    // 检查是否有举报记录
                    if ($('.report-list .report-item').length > 0) {
                        canComplete = true;
                        message = `恭喜完成任务：${task.title}！获得${task.points}积分！`;
                    }
                    break;
                case 'share':
                case 'discuss':
                    canComplete = true;
                    message = `恭喜完成任务：${task.title}！获得${task.points}积分！`;
                    break;
                case 'diary':
                    message = '请先记录今日饮食！';
                    break;
                case 'invite':
                    message = '邀请功能开发中，敬请期待！';
                    break;
            }
            
            if (canComplete) {
                task.completed = true;
                $(this).addClass('completed').text('已完成');
                $(this).closest('.task-item').addClass('completed');
                
                // 更新积分显示
                const currentPoints = parseInt($('.points-display .current-points').text()) || 0;
                $('.points-display .current-points').text(currentPoints + task.points);
            }
            
            alert(message);
        }
    });
    
    // 加载健康挑战内容
    function loadHealthChallenges() {
        const challengesContainer = $('.challenges-grid');
        if (challengesContainer.length === 0) return;
        
        challengesContainer.empty();
        
        healthChallenges.forEach(challenge => {
            const challengeCard = `
                <div class="challenge-card">
                    <div class="challenge-header">
                        <div>
                            <div class="challenge-title">${challenge.title}</div>
                            <div class="challenge-status ${challenge.status}">${challenge.statusText}</div>
                        </div>
                    </div>
                    <div class="challenge-description">${challenge.description}</div>
                    <div class="challenge-meta">
                        <span>⏰ ${challenge.duration}</span>
                        <span>👥 ${challenge.participants}人参与</span>
                    </div>
                    <div class="challenge-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${challenge.progress}%"></div>
                        </div>
                        <small>${challenge.progress}% 完成</small>
                    </div>
                    <div class="challenge-reward">🏆 奖励：${challenge.reward}</div>
                    <button class="join-challenge-btn ${challenge.joined ? 'joined' : ''}" data-challenge-id="${challenge.id}">
                        ${challenge.joined ? '已参加' : '参加挑战'}
                    </button>
                </div>
            `;
            challengesContainer.append(challengeCard);
        });
    }
    
    // 加载安全通报内容
    function loadSafetyAlerts() {
        const alertsContainer = $('.alerts-list');
        if (alertsContainer.length === 0) return;
        
        alertsContainer.empty();
        
        safetyIncidents.forEach(incident => {
            const alertItem = `
                <div class="alert-item ${incident.level}">
                    <div class="alert-header">
                        <h4 class="alert-title">${incident.title}</h4>
                        <span class="alert-status ${incident.status}">${incident.statusText}</span>
                    </div>
                    <div class="alert-meta">
                        <span>📍 ${incident.location}</span>
                        <span>📅 ${incident.date}</span>
                        <span>⚠️ ${incident.levelText}</span>
                    </div>
                    <div class="alert-description">${incident.description}</div>
                    <div class="alert-action">${incident.action}</div>
                </div>
            `;
            alertsContainer.append(alertItem);
        });
    }
    
    // 加载营养师建议内容
    function loadNutritionAdvice() {
        const tipsContainer = $('.tips-timeline');
        if (tipsContainer.length === 0) return;
        
        tipsContainer.empty();
        
        nutritionTips.forEach((tip, index) => {
            const tipItem = `
                <div class="tip-item" style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #1a73e8;">
                    <h4 style="margin: 0 0 10px 0; color: #202124;">${tip.title}</h4>
                    <p style="margin: 0 0 10px 0; color: #5f6368; line-height: 1.5;">${tip.content}</p>
                    <div style="font-size: 0.9rem; color: #5f6368;">
                        <span>📅 ${tip.date}</span>
                        <span style="margin-left: 20px;">👍 ${tip.likes}</span>
                    </div>
                </div>
            `;
            tipsContainer.append(tipItem);
        });
    }
    
    // 加载智能推荐内容
    function loadSmartRecommendations() {
        const currentHour = new Date().getHours();
        let mealType = 'snacks';
        
        if (currentHour >= 6 && currentHour < 10) {
            mealType = 'breakfast';
        } else if (currentHour >= 11 && currentHour < 14) {
            mealType = 'lunch';
        } else if (currentHour >= 17 && currentHour < 20) {
            mealType = 'dinner';
        }
        
        const recommendations = smartRecommendations[mealType];
        const recommendContainer = $('.smart-recommendations');
        
        if (recommendContainer.length > 0) {
            recommendContainer.empty();
            
            const mealNames = {
                breakfast: '早餐推荐',
                lunch: '午餐推荐', 
                dinner: '晚餐推荐',
                snacks: '健康零食'
            };
            
            recommendContainer.append(`<h3 style="margin-bottom: 20px; color: #202124;">🤖 ${mealNames[mealType]}</h3>`);
            
            recommendations.slice(0, 3).forEach(item => {
                const recommendCard = `
                    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                            <h4 style="margin: 0; color: #202124;">${item.name}</h4>
                            <div style="display: flex; align-items: center; gap: 5px;">
                                <span style="color: #fbbc04;">⭐</span>
                                <span style="color: #5f6368; font-size: 0.9rem;">${item.rating}</span>
                            </div>
                        </div>
                        <p style="margin: 0 0 10px 0; color: #5f6368; font-size: 0.9rem;">${item.nutrition}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; color: #5f6368;">
                            <span>📍 ${item.merchant}</span>
                            <span>🔥 ${item.calories}</span>
                            <span style="color: #1a73e8; font-weight: 500;">💰 ${item.price}</span>
                        </div>
                    </div>
                `;
                recommendContainer.append(recommendCard);
            });
        }
    }
    
    // 加载每日健康任务
    function loadDailyTasks() {
        const tasksContainer = $('.daily-tasks');
        if (tasksContainer.length === 0) return;
        
        tasksContainer.empty();
        tasksContainer.append('<h3 style="margin-bottom: 20px; color: #202124;">📋 今日健康任务</h3>');
        
        dailyHealthTasks.forEach(task => {
            const progressPercent = Math.min((task.progress / task.target) * 100, 100);
            const isCompleted = task.completed || progressPercent >= 100;
            
            const taskCard = `
                <div class="task-card" style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 15px; ${isCompleted ? 'opacity: 0.8;' : ''}">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                        <h4 style="margin: 0; color: #202124;">${task.title}</h4>
                        <span style="background: ${isCompleted ? '#34a853' : '#1a73e8'}; color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem;">
                            ${isCompleted ? '已完成' : '+' + task.points + '积分'}
                        </span>
                    </div>
                    <p style="margin: 0 0 15px 0; color: #5f6368; font-size: 0.9rem;">${task.description}</p>
                    <div style="margin-bottom: 10px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.9rem; color: #5f6368;">
                            <span>进度: ${task.progress}/${task.target} ${task.unit}</span>
                            <span>${Math.round(progressPercent)}%</span>
                        </div>
                        <div style="width: 100%; height: 6px; background: #f1f3f4; border-radius: 3px; overflow: hidden;">
                            <div style="height: 100%; background: ${isCompleted ? '#34a853' : '#1a73e8'}; width: ${progressPercent}%; transition: width 0.3s ease;"></div>
                        </div>
                    </div>
                    ${!isCompleted ? `<button class="update-task-btn" data-task-id="${task.id}" style="width: 100%; padding: 8px; background: #1a73e8; color: white; border: none; border-radius: 4px; cursor: pointer;">更新进度</button>` : ''}
                </div>
            `;
            tasksContainer.append(taskCard);
        });
    }
    
    // 加载安全小贴士
    function loadSafetyTipsGrid() {
        const tipsGrid = $('.tips-grid');
        if (tipsGrid.length === 0) return;
        
        tipsGrid.empty();
        
        safetyTips.forEach(tip => {
            const tipCard = `
                <div class="tip-card">
                    <div class="tip-icon">${tip.icon}</div>
                    <h4>${tip.title}</h4>
                    <p>${tip.content}</p>
                </div>
            `;
            tipsGrid.append(tipCard);
        });
    }
    
    // 初始化所有动态内容
    function initializeDynamicContent() {
        loadKnowledgeContent();
        loadPointsTasks();
        loadRewardsStore();
        loadCommunityPosts();
        loadHealthChallenges();
        loadSafetyAlerts();
        loadNutritionAdvice();
        loadSmartRecommendations();
        loadDailyTasks();
        loadSafetyTipsGrid();
    }
    
    // 健康挑战参与处理
    $(document).on('click', '.join-challenge-btn:not(.joined)', function() {
        const challengeId = parseInt($(this).data('challenge-id'));
        const challenge = healthChallenges.find(c => c.id === challengeId);
        
        if (challenge) {
            challenge.joined = true;
            challenge.participants += 1;
            $(this).addClass('joined').text('已参加');
            
            // 更新参与人数显示
            $(this).closest('.challenge-card').find('.challenge-meta span:last-child').text(`👥 ${challenge.participants}人参与`);
            
            alert(`成功参加挑战：${challenge.title}！\n\n开始时间：现在\n持续时间：${challenge.duration}\n奖励：${challenge.reward}\n\n加油完成挑战吧！`);
        }
    });
    
    // 安全通报筛选处理
    $(document).on('click', '.filter-btn', function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        const filterType = $(this).text();
        const alertItems = $('.alert-item');
        
        if (filterType === '全部') {
            alertItems.show();
        } else {
            alertItems.hide();
            if (filterType === '高风险') {
                $('.alert-item.high').show();
            } else if (filterType === '中风险') {
                $('.alert-item.medium').show();
            } else if (filterType === '低风险') {
                $('.alert-item.low').show();
            } else if (filterType === '已处理') {
                $('.alert-item').filter(function() {
                    return $(this).find('.alert-status.completed').length > 0;
                }).show();
            }
        }
    });
    
    // 营养师咨询处理
    $(document).on('click', '.consult-btn', function() {
        const consultForm = `
            <div style="background: white; padding: 20px; border-radius: 8px; max-width: 500px; margin: 20px auto;">
                <h3 style="margin: 0 0 15px 0; color: #202124;">💬 营养师在线咨询</h3>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; color: #5f6368;">咨询类型：</label>
                    <select style="width: 100%; padding: 8px; border: 1px solid #dadce0; border-radius: 4px;">
                        <option>营养搭配建议</option>
                        <option>减肥饮食方案</option>
                        <option>增重营养计划</option>
                        <option>特殊饮食需求</option>
                        <option>食物过敏咨询</option>
                    </select>
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; color: #5f6368;">详细描述：</label>
                    <textarea style="width: 100%; height: 100px; padding: 8px; border: 1px solid #dadce0; border-radius: 4px; resize: vertical;" placeholder="请详细描述您的问题或需求..."></textarea>
                </div>
                <div style="text-align: right;">
                    <button onclick="$(this).closest('div').remove()" style="padding: 8px 16px; margin-right: 10px; border: 1px solid #dadce0; background: white; border-radius: 4px; cursor: pointer;">取消</button>
                    <button onclick="alert('咨询已提交！营养师将在24小时内回复您。'); $(this).closest('div').remove();" style="padding: 8px 16px; background: #1a73e8; color: white; border: none; border-radius: 4px; cursor: pointer;">提交咨询</button>
                </div>
            </div>
        `;
        
        $('body').append(`<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;">${consultForm}</div>`);
    });
    
    // Q&A展开收起处理
    $(document).on('click', '.question', function() {
        const answer = $(this).next('.answer');
        answer.slideToggle(200);
    });
    
    // 每日任务更新处理
    $(document).on('click', '.update-task-btn', function() {
        const taskId = parseInt($(this).data('task-id'));
        const task = dailyHealthTasks.find(t => t.id === taskId);
        
        if (task) {
            let updateAmount = 1;
            
            // 根据任务类型设置不同的更新量
            switch(taskId) {
                case 1: // 喝水
                    updateAmount = 1;
                    break;
                case 2: // 蔬果
                    updateAmount = 1;
                    break;
                case 3: // 步数
                    updateAmount = Math.floor(Math.random() * 1000) + 500;
                    break;
                case 4: // 睡眠
                    updateAmount = 0.5;
                    break;
                case 5: // 学习
                    updateAmount = 1;
                    break;
            }
            
            task.progress = Math.min(task.progress + updateAmount, task.target);
            
            if (task.progress >= task.target) {
                task.completed = true;
                // 更新积分
                const currentPoints = parseInt($('.points-display .current-points').text()) || 0;
                $('.points-display .current-points').text(currentPoints + task.points);
                
                alert(`🎉 恭喜完成任务：${task.title}！\n获得 ${task.points} 积分奖励！`);
            } else {
                alert(`✅ 任务进度已更新！\n当前进度：${task.progress}/${task.target} ${task.unit}`);
            }
            
            // 重新加载任务显示
            loadDailyTasks();
        }
    });
    
    // 智能推荐个性化设置
    $(document).on('click', '.personalize-btn', function() {
        const settingsForm = `
            <div style="background: white; padding: 25px; border-radius: 8px; max-width: 600px; margin: 20px auto;">
                <h3 style="margin: 0 0 20px 0; color: #202124;">🎯 个性化推荐设置</h3>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 10px; color: #5f6368; font-weight: 500;">饮食偏好：</label>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                        <label style="display: flex; align-items: center; gap: 5px;"><input type="checkbox" checked> 清淡口味</label>
                        <label style="display: flex; align-items: center; gap: 5px;"><input type="checkbox"> 重口味</label>
                        <label style="display: flex; align-items: center; gap: 5px;"><input type="checkbox" checked> 低糖</label>
                        <label style="display: flex; align-items: center; gap: 5px;"><input type="checkbox" checked> 高蛋白</label>
                        <label style="display: flex; align-items: center; gap: 5px;"><input type="checkbox"> 素食</label>
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 10px; color: #5f6368; font-weight: 500;">过敏信息：</label>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                        <label style="display: flex; align-items: center; gap: 5px;"><input type="checkbox"> 花生</label>
                        <label style="display: flex; align-items: center; gap: 5px;"><input type="checkbox"> 海鲜</label>
                        <label style="display: flex; align-items: center; gap: 5px;"><input type="checkbox"> 牛奶</label>
                        <label style="display: flex; align-items: center; gap: 5px;"><input type="checkbox"> 鸡蛋</label>
                        <label style="display: flex; align-items: center; gap: 5px;"><input type="checkbox"> 麸质</label>
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 10px; color: #5f6368; font-weight: 500;">每日热量目标：</label>
                    <input type="range" min="1200" max="2500" value="1800" style="width: 100%; margin-bottom: 5px;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: #5f6368;">
                        <span>1200卡</span>
                        <span id="calorie-value">1800卡</span>
                        <span>2500卡</span>
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 10px; color: #5f6368; font-weight: 500;">预算范围：</label>
                    <select style="width: 100%; padding: 8px; border: 1px solid #dadce0; border-radius: 4px;">
                        <option>不限制</option>
                        <option>10元以下</option>
                        <option selected>10-20元</option>
                        <option>20-30元</option>
                        <option>30元以上</option>
                    </select>
                </div>
                
                <div style="text-align: right;">
                    <button onclick="$(this).closest('div').parent().remove()" style="padding: 10px 20px; margin-right: 10px; border: 1px solid #dadce0; background: white; border-radius: 4px; cursor: pointer;">取消</button>
                    <button onclick="alert('个性化设置已保存！推荐内容将根据您的偏好调整。'); $(this).closest('div').parent().remove(); loadSmartRecommendations();" style="padding: 10px 20px; background: #1a73e8; color: white; border: none; border-radius: 4px; cursor: pointer;">保存设置</button>
                </div>
            </div>
        `;
        
        $('body').append(`<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center; overflow-y: auto;">${settingsForm}</div>`);
    });
    
    // 营养成分查询
    $(document).on('click', '.nutrition-query-btn', function() {
        const foodName = prompt('请输入要查询的食物名称：');
        if (foodName && nutritionDatabase[foodName]) {
            const nutrition = nutritionDatabase[foodName];
            alert(`📊 ${foodName} 营养成分（每100g）：\n\n🔥 热量：${nutrition.calories}卡\n🥩 蛋白质：${nutrition.protein}g\n🍞 碳水化合物：${nutrition.carbs}g\n🧈 脂肪：${nutrition.fat}g\n🌾 纤维：${nutrition.fiber}g\n💊 主要维生素：${nutrition.vitamin}`);
        } else if (foodName) {
            alert('抱歉，暂未收录该食物的营养信息。我们会持续更新数据库！');
        }
    });
    
    // 季节性推荐显示
    function showSeasonalRecommendations() {
        const currentMonth = new Date().getMonth() + 1;
        let season = 'spring';
        
        if (currentMonth >= 3 && currentMonth <= 5) season = 'spring';
        else if (currentMonth >= 6 && currentMonth <= 8) season = 'summer';
        else if (currentMonth >= 9 && currentMonth <= 11) season = 'autumn';
        else season = 'winter';
        
        const seasonData = seasonalRecommendations[season];
        
        const seasonalCard = `
            <div style="background: linear-gradient(135deg, #1a73e8, #4285f4); color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin: 0 0 10px 0;">🌱 ${seasonData.name}</h3>
                <p style="margin: 0 0 15px 0; opacity: 0.9;">${seasonData.tips}</p>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    ${seasonData.foods.map(food => `<span style="background: rgba(255,255,255,0.2); padding: 5px 10px; border-radius: 15px; font-size: 0.9rem;">${food}</span>`).join('')}
                </div>
            </div>
        `;
        
        $('.seasonal-recommendations').html(seasonalCard);
    }
    
    // 显示季节性推荐
    setTimeout(showSeasonalRecommendations, 2000);
    
    // 食品安全知识竞赛
    $(document).on('click', '.quiz-btn', function() {
        const quizQuestions = [
            {
                question: "以下哪种食品属于'三无'产品？",
                options: ["有生产日期但无厂名", "有厂名但无生产日期", "无厂名、无厂址、无生产日期", "有厂址但无厂名"],
                correct: 2,
                explanation: "'三无'产品是指无厂名、无厂址、无生产日期的产品，这类产品质量无法保证，存在安全隐患。"
            },
            {
                question: "购买食品时，以下哪个做法是正确的？",
                options: ["只看价格便宜", "查看生产日期和保质期", "选择包装好看的", "跟风购买网红食品"],
                correct: 1,
                explanation: "购买食品时应该仔细查看生产日期和保质期，确保食品在安全期内食用。"
            },
            {
                question: "以下哪种饮食习惯最健康？",
                options: ["每天只吃肉类", "每天只吃蔬菜", "荤素搭配，营养均衡", "每天只吃零食"],
                correct: 2,
                explanation: "健康的饮食应该荤素搭配，营养均衡，包含蛋白质、维生素、矿物质等多种营养成分。"
            }
        ];
        
        let currentQuestion = 0;
        let score = 0;
        
        function showQuestion() {
            const q = quizQuestions[currentQuestion];
            const quizModal = `
                <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;">
                    <div style="background: white; padding: 30px; border-radius: 12px; max-width: 600px; width: 90%;">
                        <div style="text-align: center; margin-bottom: 20px;">
                            <h3 style="margin: 0; color: #202124;">🧠 食品安全知识竞赛</h3>
                            <p style="margin: 10px 0 0 0; color: #5f6368;">第 ${currentQuestion + 1} 题 / 共 ${quizQuestions.length} 题</p>
                        </div>
                        
                        <div style="margin-bottom: 25px;">
                            <h4 style="margin: 0 0 15px 0; color: #202124; line-height: 1.5;">${q.question}</h4>
                            <div class="quiz-options">
                                ${q.options.map((option, index) => `
                                    <button class="quiz-option" data-index="${index}" style="
                                        display: block; width: 100%; padding: 12px 15px; margin: 8px 0;
                                        border: 2px solid #dadce0; background: white; border-radius: 6px;
                                        text-align: left; cursor: pointer; transition: all 0.2s;
                                    ">${String.fromCharCode(65 + index)}. ${option}</button>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div style="text-align: center;">
                            <button onclick="$(this).closest('div').parent().remove()" style="padding: 10px 20px; border: 1px solid #dadce0; background: white; border-radius: 4px; cursor: pointer; margin-right: 10px;">退出竞赛</button>
                        </div>
                    </div>
                </div>
            `;
            
            $('body').append(quizModal);
            
            $('.quiz-option').on('click', function() {
                const selectedIndex = parseInt($(this).data('index'));
                const isCorrect = selectedIndex === q.correct;
                
                $('.quiz-option').off('click').css('pointer-events', 'none');
                
                if (isCorrect) {
                    $(this).css({'background': '#e8f5e8', 'border-color': '#34a853', 'color': '#137333'});
                    score += 10;
                } else {
                    $(this).css({'background': '#fce8e6', 'border-color': '#ea4335', 'color': '#d93025'});
                    $(`.quiz-option[data-index="${q.correct}"]`).css({'background': '#e8f5e8', 'border-color': '#34a853', 'color': '#137333'});
                }
                
                setTimeout(() => {
                    $(this).closest('div').parent().remove();
                    currentQuestion++;
                    
                    if (currentQuestion < quizQuestions.length) {
                        setTimeout(showQuestion, 500);
                    } else {
                        showResult();
                    }
                }, 2000);
            });
        }
        
        function showResult() {
            const percentage = Math.round((score / (quizQuestions.length * 10)) * 100);
            let level = '初学者';
            let emoji = '📚';
            
            if (percentage >= 90) {
                level = '食品安全专家';
                emoji = '🏆';
            } else if (percentage >= 70) {
                level = '食品安全达人';
                emoji = '🌟';
            } else if (percentage >= 50) {
                level = '食品安全小能手';
                emoji = '👍';
            }
            
            const resultModal = `
                <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;">
                    <div style="background: white; padding: 40px; border-radius: 12px; max-width: 500px; width: 90%; text-align: center;">
                        <div style="font-size: 4rem; margin-bottom: 20px;">${emoji}</div>
                        <h3 style="margin: 0 0 10px 0; color: #202124;">竞赛完成！</h3>
                        <p style="margin: 0 0 20px 0; color: #5f6368;">您的等级：${level}</p>
                        
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <div style="font-size: 2rem; color: #1a73e8; font-weight: bold; margin-bottom: 5px;">${score}分</div>
                            <div style="color: #5f6368;">正确率：${percentage}%</div>
                        </div>
                        
                        <div style="margin: 20px 0;">
                            <p style="color: #5f6368; font-size: 0.9rem;">🎁 获得 ${score} 积分奖励</p>
                        </div>
                        
                        <button onclick="$(this).closest('div').parent().remove(); const currentPoints = parseInt($('.current-points').text()) || 0; $('.current-points').text(currentPoints + ${score});" style="padding: 12px 24px; background: #1a73e8; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem;">领取奖励</button>
                    </div>
                </div>
            `;
            
            $('body').append(resultModal);
        }
        
        showQuestion();
    });
    
    // 健康打卡系统
    $(document).on('click', '.checkin-btn', function() {
        const today = new Date().toDateString();
        const lastCheckin = localStorage.getItem('lastCheckin');
        
        if (lastCheckin === today) {
            alert('今天已经打卡过了！明天再来吧 😊');
            return;
        }
        
        const checkinDays = parseInt(localStorage.getItem('checkinDays') || '0');
        const newCheckinDays = lastCheckin === new Date(Date.now() - 86400000).toDateString() ? checkinDays + 1 : 1;
        
        localStorage.setItem('lastCheckin', today);
        localStorage.setItem('checkinDays', newCheckinDays.toString());
        
        const bonusPoints = newCheckinDays >= 7 ? 20 : 10;
        const currentPoints = parseInt($('.current-points').text()) || 0;
        $('.current-points').text(currentPoints + bonusPoints);
        
        const checkinModal = `
            <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;">
                <div style="background: white; padding: 30px; border-radius: 12px; max-width: 400px; width: 90%; text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 15px;">✅</div>
                    <h3 style="margin: 0 0 10px 0; color: #202124;">打卡成功！</h3>
                    <p style="margin: 0 0 20px 0; color: #5f6368;">连续打卡 ${newCheckinDays} 天</p>
                    
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
                        <div style="color: #1a73e8; font-weight: bold;">+${bonusPoints} 积分</div>
                        ${newCheckinDays >= 7 ? '<div style="color: #34a853; font-size: 0.9rem; margin-top: 5px;">🎉 连续7天奖励翻倍！</div>' : ''}
                    </div>
                    
                    <button onclick="$(this).closest('div').parent().remove()" style="padding: 10px 20px; background: #1a73e8; color: white; border: none; border-radius: 6px; cursor: pointer;">确定</button>
                </div>
            </div>
        `;
        
        $('body').append(checkinModal);
    });
    
    // 食品安全举报功能增强
    $(document).on('click', '.report-food-btn', function() {
        const reportForm = `
            <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center; overflow-y: auto;">
                <div style="background: white; padding: 30px; border-radius: 12px; max-width: 600px; width: 90%; margin: 20px;">
                    <h3 style="margin: 0 0 20px 0; color: #202124;">🚨 食品安全举报</h3>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; color: #5f6368; font-weight: 500;">举报类型：</label>
                        <select class="report-type" style="width: 100%; padding: 10px; border: 1px solid #dadce0; border-radius: 4px;">
                            <option value="">请选择举报类型</option>
                            <option value="expired">过期食品</option>
                            <option value="fake">三无产品</option>
                            <option value="quality">质量问题</option>
                            <option value="hygiene">卫生问题</option>
                            <option value="price">价格欺诈</option>
                            <option value="other">其他问题</option>
                        </select>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; color: #5f6368; font-weight: 500;">商家名称：</label>
                        <input type="text" class="merchant-name" placeholder="请输入商家名称" style="width: 100%; padding: 10px; border: 1px solid #dadce0; border-radius: 4px; box-sizing: border-box;">
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; color: #5f6368; font-weight: 500;">问题描述：</label>
                        <textarea class="problem-desc" placeholder="请详细描述发现的问题..." style="width: 100%; height: 100px; padding: 10px; border: 1px solid #dadce0; border-radius: 4px; resize: vertical; box-sizing: border-box;"></textarea>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; color: #5f6368; font-weight: 500;">联系方式（可选）：</label>
                        <input type="text" class="contact-info" placeholder="手机号或微信号" style="width: 100%; padding: 10px; border: 1px solid #dadce0; border-radius: 4px; box-sizing: border-box;">
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: flex; align-items: center; gap: 8px; color: #5f6368;">
                            <input type="checkbox" class="anonymous-report">
                            <span>匿名举报</span>
                        </label>
                    </div>
                    
                    <div style="text-align: right;">
                        <button onclick="$(this).closest('div').parent().remove()" style="padding: 10px 20px; margin-right: 10px; border: 1px solid #dadce0; background: white; border-radius: 4px; cursor: pointer;">取消</button>
                        <button class="submit-report" style="padding: 10px 20px; background: #ea4335; color: white; border: none; border-radius: 4px; cursor: pointer;">提交举报</button>
                    </div>
                </div>
            </div>
        `;
        
        $('body').append(reportForm);
        
        $('.submit-report').on('click', function() {
            const reportType = $('.report-type').val();
            const merchantName = $('.merchant-name').val();
            const problemDesc = $('.problem-desc').val();
            
            if (!reportType || !merchantName || !problemDesc) {
                alert('请填写完整的举报信息！');
                return;
            }
            
            // 模拟提交举报
            $(this).closest('div').parent().remove();
            
            const successModal = `
                <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;">
                    <div style="background: white; padding: 30px; border-radius: 12px; max-width: 400px; width: 90%; text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 15px;">✅</div>
                        <h3 style="margin: 0 0 10px 0; color: #202124;">举报提交成功！</h3>
                        <p style="margin: 0 0 15px 0; color: #5f6368;">举报编号：${Date.now().toString().slice(-6)}</p>
                        <p style="margin: 0 0 20px 0; color: #5f6368; font-size: 0.9rem;">我们会在24小时内处理您的举报，感谢您对食品安全的关注！</p>
                        
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
                            <div style="color: #1a73e8; font-weight: bold;">+50 积分奖励</div>
                            <div style="color: #5f6368; font-size: 0.9rem; margin-top: 5px;">感谢您维护校园食品安全</div>
                        </div>
                        
                        <button onclick="$(this).closest('div').parent().remove(); const currentPoints = parseInt($('.current-points').text()) || 0; $('.current-points').text(currentPoints + 50);" style="padding: 10px 20px; background: #1a73e8; color: white; border: none; border-radius: 6px; cursor: pointer;">确定</button>
                    </div>
                </div>
            `;
            
            $('body').append(successModal);
        });
    });
    
    // 页面加载完成后初始化
    setTimeout(initializeDynamicContent, 100);
    
    // 初始化系统
    console.log('校园食品安全监管系统已启动');
    console.log('系统功能: AI图像识别、语音交互助手、安全地图');
    
    // 显示欢迎信息
    setTimeout(() => {
        if (confirm('欢迎使用校园食品安全监管系统！\n\n是否需要查看系统使用说明？')) {
            alert('系统使用说明：\n\n1. 扫码查询：扫描或输入商品编号查看食品安全信息\n2. 安全地图：查看校园周边商户安全评级\n3. 监管报警：实时监控和处理食品安全问题\n\n祝您使用愉快！');
        }
    }, 1000);
});

// 页面加载完成后的额外初始化
window.addEventListener('load', function() {
    // 检查浏览器兼容性
    if (!window.jQuery) {
        alert('系统需要jQuery支持，请检查网络连接');
    }
    
    // 检查语音合成支持
    if (!('speechSynthesis' in window)) {
        console.warn('当前浏览器不支持语音合成功能');
    }
});

// 健康档案编辑功能
$(document).on('click', '.edit-profile-btn', function() {
    showHealthProfileEditModal();
});

function showHealthProfileEditModal() {
    const currentProfile = {
        name: $('#profile-name').text(),
        age: $('#profile-age').text().replace('岁', ''),
        height: $('#profile-height').text().replace('cm', ''),
        weight: $('#profile-weight').text().replace('kg', '')
    };
    
    const modal = $(`
        <div class="modal-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;">
            <div class="modal-content" style="background: white; padding: 30px; border-radius: 12px; width: 90%; max-width: 600px; max-height: 80vh; overflow-y: auto;">
                <h3 style="color: #202124; margin-bottom: 20px; display: flex; align-items: center;">
                    <span style="margin-right: 10px;">✏️</span>编辑健康档案
                </h3>
                
                <form class="profile-form">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                        <div>
                            <label style="display: block; margin-bottom: 8px; color: #5f6368; font-weight: bold;">姓名</label>
                            <input type="text" class="profile-name" value="${currentProfile.name}" style="width: 100%; padding: 10px; border: 1px solid #dadce0; border-radius: 4px;">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 8px; color: #5f6368; font-weight: bold;">年龄</label>
                            <input type="number" class="profile-age" value="${currentProfile.age}" min="10" max="25" style="width: 100%; padding: 10px; border: 1px solid #dadce0; border-radius: 4px;">
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                        <div>
                            <label style="display: block; margin-bottom: 8px; color: #5f6368; font-weight: bold;">身高 (cm)</label>
                            <input type="number" class="profile-height" value="${currentProfile.height}" min="140" max="200" style="width: 100%; padding: 10px; border: 1px solid #dadce0; border-radius: 4px;">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 8px; color: #5f6368; font-weight: bold;">体重 (kg)</label>
                            <input type="number" class="profile-weight" value="${currentProfile.weight}" min="30" max="120" style="width: 100%; padding: 10px; border: 1px solid #dadce0; border-radius: 4px;">
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; color: #5f6368; font-weight: bold;">过敏信息</label>
                        <div class="allergy-options" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                            <label style="display: flex; align-items: center;"><input type="checkbox" value="nuts" style="margin-right: 8px;">坚果类</label>
                            <label style="display: flex; align-items: center;"><input type="checkbox" value="seafood" style="margin-right: 8px;">海鲜类</label>
                            <label style="display: flex; align-items: center;"><input type="checkbox" value="dairy" style="margin-right: 8px;">乳制品</label>
                            <label style="display: flex; align-items: center;"><input type="checkbox" value="eggs" style="margin-right: 8px;">蛋类</label>
                            <label style="display: flex; align-items: center;"><input type="checkbox" value="gluten" style="margin-right: 8px;">麸质</label>
                            <label style="display: flex; align-items: center;"><input type="checkbox" value="soy" style="margin-right: 8px;">豆类</label>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; color: #5f6368; font-weight: bold;">饮食偏好</label>
                        <div class="diet-options" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                            <label style="display: flex; align-items: center;"><input type="checkbox" value="light" style="margin-right: 8px;">清淡饮食</label>
                            <label style="display: flex; align-items: center;"><input type="checkbox" value="fruits" style="margin-right: 8px;">多吃水果</label>
                            <label style="display: flex; align-items: center;"><input type="checkbox" value="lowfat" style="margin-right: 8px;">低脂饮食</label>
                            <label style="display: flex; align-items: center;"><input type="checkbox" value="vegetarian" style="margin-right: 8px;">素食主义</label>
                            <label style="display: flex; align-items: center;"><input type="checkbox" value="protein" style="margin-right: 8px;">高蛋白</label>
                            <label style="display: flex; align-items: center;"><input type="checkbox" value="organic" style="margin-right: 8px;">有机食品</label>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 10px; justify-content: flex-end;">
                        <button type="button" class="cancel-edit" style="padding: 10px 20px; background: #f8f9fa; color: #5f6368; border: 1px solid #dadce0; border-radius: 4px; cursor: pointer;">取消</button>
                        <button type="submit" class="save-profile" style="padding: 10px 20px; background: #1a73e8; color: white; border: none; border-radius: 4px; cursor: pointer;">保存档案</button>
                    </div>
                </form>
            </div>
        </div>
    `);
    
    $('body').append(modal);
    
    // 设置当前过敏信息
    const currentAllergies = ['nuts', 'seafood']; // 示例数据
    currentAllergies.forEach(allergy => {
        modal.find(`input[value="${allergy}"]`).prop('checked', true);
    });
    
    // 设置当前饮食偏好
    const currentPreferences = ['light', 'fruits', 'lowfat']; // 示例数据
    currentPreferences.forEach(pref => {
        modal.find(`input[value="${pref}"]`).prop('checked', true);
    });
    
    // 取消编辑
    modal.find('.cancel-edit').click(function() {
        modal.remove();
    });
    
    // 点击遮罩关闭
    modal.click(function(e) {
        if (e.target === this) {
            modal.remove();
        }
    });
    
    // 保存档案
    modal.find('.profile-form').submit(function(e) {
        e.preventDefault();
        
        const newProfile = {
            name: modal.find('.profile-name').val(),
            age: parseInt(modal.find('.profile-age').val()),
            height: parseInt(modal.find('.profile-height').val()),
            weight: parseInt(modal.find('.profile-weight').val())
        };
        
        // 计算BMI
        const bmi = (newProfile.weight / ((newProfile.height / 100) ** 2)).toFixed(1);
        let bmiStatus = '正常';
        let bmiColor = '#34a853';
        
        if (bmi < 18.5) {
            bmiStatus = '偏瘦';
            bmiColor = '#ff9800';
        } else if (bmi >= 25) {
            bmiStatus = '偏胖';
            bmiColor = '#ea4335';
        }
        
        // 更新页面显示
        $('#profile-name').text(newProfile.name);
        $('#profile-age').text(newProfile.age + '岁');
        $('#profile-height').text(newProfile.height + 'cm');
        $('#profile-weight').text(newProfile.weight + 'kg');
        $('#profile-bmi').text(`${bmi} (${bmiStatus})`).css('color', bmiColor);
        
        // 更新过敏信息显示
        const selectedAllergies = [];
        modal.find('.allergy-options input:checked').each(function() {
            selectedAllergies.push($(this).val());
        });
        
        const allergyNames = {
            'nuts': '🥜 坚果类',
            'seafood': '🦐 海鲜类',
            'dairy': '🥛 乳制品',
            'eggs': '🥚 蛋类',
            'gluten': '🌾 麸质',
            'soy': '🫘 豆类'
        };
        
        $('.allergy-list').empty();
        if (selectedAllergies.length > 0) {
            selectedAllergies.forEach(allergy => {
                $('.allergy-list').append(`
                    <div class="allergy-item" style="display: inline-block; background: #fef7e0; color: #f57c00; padding: 8px 12px; border-radius: 20px; margin: 5px; font-size: 0.9rem;">
                        ${allergyNames[allergy]}
                    </div>
                `);
            });
            $('.no-allergy').hide();
        } else {
            $('.no-allergy').show();
        }
        
        // 更新饮食偏好显示
        const selectedPreferences = [];
        modal.find('.diet-options input:checked').each(function() {
            selectedPreferences.push($(this).val());
        });
        
        const preferenceNames = {
            'light': '🥗 清淡饮食',
            'fruits': '🍎 多吃水果',
            'lowfat': '🥛 低脂饮食',
            'vegetarian': '🥬 素食主义',
            'protein': '🥩 高蛋白',
            'organic': '🌱 有机食品'
        };
        
        $('.preference-list').empty();
        selectedPreferences.forEach(pref => {
            $('.preference-list').append(`
                <div class="preference-item" style="display: inline-block; background: #e8f5e8; color: #2e7d32; padding: 8px 12px; border-radius: 20px; margin: 5px; font-size: 0.9rem;">
                    ${preferenceNames[pref]}
                </div>
            `);
        });
        
        modal.remove();
        alert('健康档案更新成功！');
    });
}