// 模拟数据生成
const developers = [
    '张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十',
    '郑十一', '王十二', '冯十三', '陈十四', '褚十五', '卫十六', '蒋十七', '沈十八',
    '韩十九', '杨二十', '朱二十一', '秦二十二', '尤二十三', '许二十四', '何二十五', '吕二十六',
    '施二十七', '张二十八', '孔二十九', '曹三十', '严三十一', '华三十二', '金三十三', '魏三十四',
    '陶三十五', '姜三十六', '戚三十七', '谢三十八', '邹三十九', '喻四十', '柏四十一', '水四十二',
    '窦四十三', '章四十四', '云四十五', '苏四十六', '潘四十七', '葛四十八', '奚四十九', '范五十'
];

const projects = [
    '用户管理系统', '订单处理模块', '支付网关', '数据分析平台', '消息推送服务',
    '文件存储系统', '权限管理模块', '日志监控系统', '缓存服务', '搜索引擎',
    'API网关', '配置中心', '任务调度器', '报表生成器', '通知中心'
];

const codeIssues = [
    {
        type: 'security',
        title: 'SQL注入风险',
        description: '直接拼接SQL语句可能导致SQL注入攻击',
        suggestion: '使用参数化查询或ORM框架',
        severity: 'critical'
    },
    {
        type: 'performance',
        title: '循环中的数据库查询',
        description: '在循环中执行数据库查询会导致N+1问题',
        suggestion: '使用批量查询或JOIN操作',
        severity: 'major'
    },
    {
        type: 'code_quality',
        title: '方法过长',
        description: '方法超过50行，建议拆分为更小的方法',
        suggestion: '将复杂逻辑拆分为多个小方法',
        severity: 'minor'
    },
    {
        type: 'naming',
        title: '变量命名不规范',
        description: '变量名应该使用驼峰命名法',
        suggestion: '将变量名改为驼峰命名法格式',
        severity: 'minor'
    },
    {
        type: 'documentation',
        title: '缺少注释',
        description: '公共方法缺少必要的文档注释',
        suggestion: '添加方法说明和参数文档',
        severity: 'info'
    },
    {
        type: 'exception',
        title: '异常处理不当',
        description: '捕获异常后没有适当处理',
        suggestion: '添加适当的异常处理逻辑',
        severity: 'major'
    },
    {
        type: 'resource',
        title: '资源未释放',
        description: '文件流或数据库连接未正确关闭',
        suggestion: '使用try-with-resources或finally块',
        severity: 'major'
    },
    {
        type: 'logic',
        title: '逻辑错误',
        description: '条件判断可能存在逻辑错误',
        suggestion: '重新检查条件判断逻辑',
        severity: 'critical'
    }
];

const codeExamples = [
    {
        language: 'java',
        before: `public List<User> getUsersByDepartment(String dept) {
    String sql = "SELECT * FROM users WHERE department = '" + dept + "'";
    return jdbcTemplate.query(sql, new UserRowMapper());
}`,
        after: `public List<User> getUsersByDepartment(String dept) {
    String sql = "SELECT * FROM users WHERE department = ?";
    return jdbcTemplate.query(sql, new UserRowMapper(), dept);
}`
    },
    {
        language: 'javascript',
        before: `function processUsers(users) {
    for(let i = 0; i < users.length; i++) {
        let user = users[i];
        let profile = getUserProfile(user.id); // N+1 查询问题
        user.profile = profile;
    }
    return users;
}`,
        after: `async function processUsers(users) {
    const userIds = users.map(user => user.id);
    const profiles = await getUserProfiles(userIds); // 批量查询
    return users.map(user => ({
        ...user,
        profile: profiles.find(p => p.userId === user.id)
    }));
}`
    },
    {
        language: 'python',
        before: `def calculate_total(items):
    total = 0
    for item in items:
        if item.price > 0:
            if item.discount > 0:
                discounted_price = item.price * (1 - item.discount)
                total += discounted_price
            else:
                total += item.price
    return total`,
        after: `def calculate_total(items):
    """计算商品总价，包含折扣"""
    return sum(self._calculate_item_price(item) for item in items if item.price > 0)

def _calculate_item_price(self, item):
    """计算单个商品价格"""
    if item.discount > 0:
        return item.price * (1 - item.discount)
    return item.price`
    }
];

let currentPage = 0;
const itemsPerPage = 10;
let allReviews = [];
let filteredReviews = [];

// 生成模拟审查数据
function generateMockReviews() {
    const reviews = [];
    const statuses = ['pending', 'reviewing', 'completed'];
    const severities = ['critical', 'major', 'minor', 'info'];
    
    for (let i = 0; i < 50; i++) {
        const developer = developers[i];
        const project = projects[Math.floor(Math.random() * projects.length)];
        const issue = codeIssues[Math.floor(Math.random() * codeIssues.length)];
        const codeExample = codeExamples[Math.floor(Math.random() * codeExamples.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const commitTime = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
        
        reviews.push({
            id: i + 1,
            developer,
            project,
            commitHash: generateCommitHash(),
            commitMessage: generateCommitMessage(),
            commitTime,
            status,
            issue,
            codeExample,
            filesChanged: Math.floor(Math.random() * 10) + 1,
            linesAdded: Math.floor(Math.random() * 200) + 10,
            linesDeleted: Math.floor(Math.random() * 100) + 5,
            reviewTime: Math.floor(Math.random() * 300) + 30, // 秒
            aiConfidence: Math.floor(Math.random() * 30) + 70 // 70-100%
        });
    }
    
    return reviews.sort((a, b) => b.commitTime - a.commitTime);
}

function generateCommitHash() {
    return Math.random().toString(36).substring(2, 10);
}

function generateCommitMessage() {
    const messages = [
        '修复用户登录bug',
        '优化数据库查询性能',
        '添加新的API接口',
        '更新用户界面样式',
        '重构代码结构',
        '修复安全漏洞',
        '添加单元测试',
        '更新文档',
        '优化算法效率',
        '修复内存泄漏问题'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}

// 渲染审查列表
function renderReviews(reviews) {
    const container = $('#review-list');
    
    reviews.forEach(review => {
        const statusClass = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'reviewing': 'bg-blue-100 text-blue-800',
            'completed': 'bg-green-100 text-green-800'
        }[review.status];
        
        const statusText = {
            'pending': '待处理',
            'reviewing': '审查中',
            'completed': '已完成'
        }[review.status];
        
        const severityClass = `severity-${review.issue.severity}`;
        const severityText = {
            'critical': '严重',
            'major': '重要',
            'minor': '轻微',
            'info': '信息'
        }[review.issue.severity];
        
        const severityColor = {
            'critical': 'text-red-600',
            'major': 'text-orange-600',
            'minor': 'text-yellow-600',
            'info': 'text-blue-600'
        }[review.issue.severity];
        
        const reviewItem = $(`
            <div class="review-item bg-white rounded-lg shadow ${severityClass} cursor-pointer" data-review-id="${review.id}">
                <div class="p-6">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center space-x-3 mb-2">
                                <div class="flex items-center space-x-2">
                                    <i class="fas fa-user-circle text-gray-400"></i>
                                    <span class="font-medium text-gray-900">${review.developer}</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <i class="fas fa-folder text-gray-400"></i>
                                    <span class="text-sm text-gray-600">${review.project}</span>
                                </div>
                                <span class="px-2 py-1 rounded-full text-xs ${statusClass}">${statusText}</span>
                            </div>
                            <div class="mb-3">
                                <h3 class="text-lg font-semibold text-gray-900 mb-1">${review.commitMessage}</h3>
                                <p class="text-sm text-gray-600">
                                    <i class="fas fa-code-branch mr-1"></i>
                                    ${review.commitHash} • ${formatTime(review.commitTime)}
                                </p>
                            </div>
                            <div class="bg-gray-50 rounded-lg p-4 mb-4">
                                <div class="flex items-center justify-between mb-2">
                                    <h4 class="font-medium text-gray-900 flex items-center">
                                        <i class="fas fa-robot text-purple-600 mr-2"></i>
                                        AI检测到的问题
                                    </h4>
                                    <span class="px-2 py-1 rounded text-xs font-medium ${severityColor} bg-gray-100">
                                        ${severityText}
                                    </span>
                                </div>
                                <p class="text-sm text-gray-700 mb-2">
                                    <strong>${review.issue.title}:</strong> ${review.issue.description}
                                </p>
                                <p class="text-sm text-green-700">
                                    <i class="fas fa-lightbulb mr-1"></i>
                                    <strong>建议:</strong> ${review.issue.suggestion}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-between text-sm text-gray-500">
                        <div class="flex items-center space-x-4">
                            <span><i class="fas fa-file-alt mr-1"></i>${review.filesChanged} 个文件</span>
                            <span class="text-green-600"><i class="fas fa-plus mr-1"></i>+${review.linesAdded}</span>
                            <span class="text-red-600"><i class="fas fa-minus mr-1"></i>-${review.linesDeleted}</span>
                        </div>
                        <div class="flex items-center space-x-4">
                            <span><i class="fas fa-clock mr-1"></i>审查用时: ${review.reviewTime}s</span>
                            <span><i class="fas fa-brain mr-1"></i>AI置信度: ${review.aiConfidence}%</span>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </div>
                    </div>
                </div>
            </div>
        `);
        
        container.append(reviewItem);
    });
}

// 格式化时间
function formatTime(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 60) {
        return `${minutes}分钟前`;
    } else if (hours < 24) {
        return `${hours}小时前`;
    } else {
        return `${days}天前`;
    }
}

// 过滤审查数据
function filterReviews() {
    const severityFilter = $('#severity-filter').val();
    const statusFilter = $('#status-filter').val();
    const searchTerm = $('#search-input').val().toLowerCase();
    
    filteredReviews = allReviews.filter(review => {
        const matchesSeverity = severityFilter === 'all' || review.issue.severity === severityFilter;
        const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
        const matchesSearch = searchTerm === '' || 
            review.developer.toLowerCase().includes(searchTerm) ||
            review.project.toLowerCase().includes(searchTerm) ||
            review.commitMessage.toLowerCase().includes(searchTerm);
        
        return matchesSeverity && matchesStatus && matchesSearch;
    });
    
    currentPage = 0;
    $('#review-list').empty();
    loadMoreReviews();
}

// 加载更多审查数据
function loadMoreReviews() {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const reviewsToShow = filteredReviews.slice(startIndex, endIndex);
    
    if (reviewsToShow.length > 0) {
        renderReviews(reviewsToShow);
        currentPage++;
    }
    
    // 隐藏加载更多按钮如果没有更多数据
    if (endIndex >= filteredReviews.length) {
        $('#load-more').hide();
    } else {
        $('#load-more').show();
    }
}

// 显示审查详情模态框
function showReviewModal(reviewId) {
    const review = allReviews.find(r => r.id === reviewId);
    if (!review) return;
    
    const modalContent = `
        <div class="space-y-6">
            <div class="border-b pb-4">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h4 class="text-xl font-semibold text-gray-900">${review.commitMessage}</h4>
                        <p class="text-gray-600">${review.developer} • ${review.project}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-sm text-gray-500">提交时间</p>
                        <p class="font-medium">${review.commitTime.toLocaleString()}</p>
                    </div>
                </div>
                <div class="flex items-center space-x-4 text-sm text-gray-600">
                    <span><i class="fas fa-code-branch mr-1"></i>${review.commitHash}</span>
                    <span><i class="fas fa-file-alt mr-1"></i>${review.filesChanged} 个文件</span>
                    <span class="text-green-600"><i class="fas fa-plus mr-1"></i>+${review.linesAdded}</span>
                    <span class="text-red-600"><i class="fas fa-minus mr-1"></i>-${review.linesDeleted}</span>
                </div>
            </div>
            
            <div>
                <h5 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <i class="fas fa-robot text-purple-600 mr-2"></i>
                    AI代码审查结果
                </h5>
                <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <div class="flex items-center justify-between mb-2">
                        <h6 class="font-medium text-red-900">${review.issue.title}</h6>
                        <span class="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">
                            ${{
                                'critical': '严重',
                                'major': '重要', 
                                'minor': '轻微',
                                'info': '信息'
                            }[review.issue.severity]}
                        </span>
                    </div>
                    <p class="text-red-700 mb-3">${review.issue.description}</p>
                    <div class="bg-green-50 border border-green-200 rounded p-3">
                        <p class="text-green-800">
                            <i class="fas fa-lightbulb mr-1"></i>
                            <strong>AI建议:</strong> ${review.issue.suggestion}
                        </p>
                    </div>
                </div>
            </div>
            
            <div>
                <h5 class="text-lg font-semibold text-gray-900 mb-3">代码对比</h5>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <h6 class="text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <i class="fas fa-times-circle text-red-500 mr-1"></i>
                            问题代码
                        </h6>
                        <pre class="code-block p-4 rounded-lg text-sm overflow-x-auto">${review.codeExample.before}</pre>
                    </div>
                    <div>
                        <h6 class="text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <i class="fas fa-check-circle text-green-500 mr-1"></i>
                            建议修改
                        </h6>
                        <pre class="code-block p-4 rounded-lg text-sm overflow-x-auto">${review.codeExample.after}</pre>
                    </div>
                </div>
            </div>
            
            <div class="bg-gray-50 rounded-lg p-4">
                <h5 class="text-lg font-semibold text-gray-900 mb-3">审查统计</h5>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                        <p class="text-2xl font-bold text-blue-600">${review.reviewTime}s</p>
                        <p class="text-sm text-gray-600">审查用时</p>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-purple-600">${review.aiConfidence}%</p>
                        <p class="text-sm text-gray-600">AI置信度</p>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-green-600">${review.linesAdded}</p>
                        <p class="text-sm text-gray-600">新增行数</p>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-red-600">${review.linesDeleted}</p>
                        <p class="text-sm text-gray-600">删除行数</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#modal-content').html(modalContent);
    $('#review-modal').removeClass('hidden');
}

// 初始化页面
$(document).ready(function() {
    // 生成模拟数据
    allReviews = generateMockReviews();
    filteredReviews = [...allReviews];
    
    // 初始加载
    loadMoreReviews();
    
    // 事件监听器
    $('#severity-filter, #status-filter').on('change', filterReviews);
    $('#search-input').on('input', filterReviews);
    $('#refresh-btn').on('click', function() {
        $(this).addClass('loading');
        setTimeout(() => {
            allReviews = generateMockReviews();
            filterReviews();
            $(this).removeClass('loading');
        }, 1000);
    });
    
    $('#load-more').on('click', loadMoreReviews);
    
    // 审查项点击事件
    $(document).on('click', '.review-item', function() {
        const reviewId = parseInt($(this).data('review-id'));
        showReviewModal(reviewId);
    });
    
    // 模态框关闭事件
    $('#close-modal, #review-modal').on('click', function(e) {
        if (e.target === this) {
            $('#review-modal').addClass('hidden');
        }
    });
    
    // 实时更新统计数据
    setInterval(function() {
        const activeDevs = new Set(allReviews.map(r => r.developer)).size;
        const todayCommits = allReviews.filter(r => {
            const today = new Date();
            return r.commitTime.toDateString() === today.toDateString();
        }).length;
        const pendingIssues = allReviews.filter(r => r.status === 'pending').length;
        
        $('#active-developers').text(activeDevs);
        $('#today-commits').text(todayCommits);
        $('#pending-issues').text(pendingIssues);
    }, 5000);
});