$(document).ready(function() {
    let currentPlatform = null;
    let currentConversation = null;
    let conversations = {};
    let useRealAPI = false; // 是否使用真实API
    
    // 初始化
    init();
    
    function init() {
        bindEvents();
        loadAllConversations();
    }
    
    function bindEvents() {
        // 平台切换
        $('.sidebar-item[data-platform]').click(function(e) {
            e.preventDefault();
            const platform = $(this).data('platform');
            switchPlatform(platform);
        });
        
        // 刷新按钮
        $('#refresh-btn').click(function() {
            if (currentPlatform) {
                loadConversations(currentPlatform);
            }
        });
        
        // API模式切换
        $(document).on('click', '#api-mode-toggle', function() {
            useRealAPI = !useRealAPI;
            updateAPIToggleButton();
            if (currentPlatform) {
                loadConversations(currentPlatform);
            }
        });
        
        // 发送消息
        $('#send-btn').click(sendMessage);
        $('#message-input').keypress(function(e) {
            if (e.which === 13) {
                sendMessage();
            }
        });
        
        // 对话选择
        $(document).on('click', '.conversation-item', function() {
            const conversationId = $(this).data('id');
            selectConversation(conversationId);
        });
    }
    
    function loadAllConversations() {
        const platforms = ['feishu', 'wechat', 'dingtalk'];
        platforms.forEach(platform => {
            loadConversations(platform);
        });
    }
    
    function loadConversations(platform) {
        // 显示加载状态
        if (currentPlatform === platform) {
            $('#conversation-list').html('<div class="p-4 text-center text-slate-400"><i class="fas fa-spinner fa-spin text-2xl mb-2"></i><p>加载中...</p></div>');
        }
        
        const requestData = { platform: platform };
        
        // 如果是飞书平台且启用了真实API
        if (platform === 'feishu' && useRealAPI) {
            requestData.real_api = 'true';
        }
        
        $.ajax({
            url: 'api/conversations.php',
            method: 'GET',
            data: requestData,
            dataType: 'json',
            success: function(data) {
                conversations[platform] = data.conversations || [];
                updateConversationCount(platform, conversations[platform].length);
                
                if (currentPlatform === platform) {
                    displayConversations(conversations[platform]);
                }
                
                // 显示数据源信息
                if (data.data_source) {
                    const sourceText = data.data_source === 'real_api' ? '真实API' : 'Mock数据';
                    showNotification(`已加载${sourceText}`, 'info');
                }
            },
            error: function(xhr, status, error) {
                console.error('加载对话失败:', error);
                let errorMsg = '加载对话失败';
                
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    errorMsg = xhr.responseJSON.message;
                }
                
                showNotification(errorMsg, 'error');
                
                // 显示错误状态
                if (currentPlatform === platform) {
                    $('#conversation-list').html(`
                        <div class="p-4 text-center text-red-400">
                            <i class="fas fa-exclamation-triangle text-2xl mb-2"></i>
                            <p>加载失败</p>
                            <button class="mt-2 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm" onclick="loadConversations('${platform}')">重试</button>
                        </div>
                    `);
                }
            }
        });
    }
    
    function switchPlatform(platform) {
        currentPlatform = platform;
        currentConversation = null;
        
        // 更新UI状态
        $('.sidebar-item[data-platform]').removeClass('bg-slate-700');
        $(`.sidebar-item[data-platform="${platform}"]`).addClass('bg-slate-700');
        
        // 更新标题
        const platformNames = {
            'feishu': '飞书',
            'wechat': '企业微信',
            'dingtalk': '钉钉'
        };
        
        $('#platform-title').text(platformNames[platform]);
        $('#platform-subtitle').text(`管理${platformNames[platform]}对话`);
        
        // 更新API切换按钮显示
        updateAPIToggleButton();
        
        // 显示聊天区域
        $('#welcome-area').hide();
        $('#chat-area').show();
        
        // 显示对话列表
        displayConversations(conversations[platform] || []);
        
        // 清空消息区域
        $('#message-list').empty();
    }
    
    function displayConversations(conversationList) {
        const $list = $('#conversation-list');
        $list.empty();
        
        if (conversationList.length === 0) {
            $list.append(`
                <div class="p-4 text-center text-slate-400">
                    <i class="fas fa-inbox text-2xl mb-2"></i>
                    <p>暂无对话</p>
                </div>
            `);
            return;
        }
        
        conversationList.forEach(conversation => {
            const lastMessage = conversation.messages && conversation.messages.length > 0 
                ? conversation.messages[conversation.messages.length - 1] 
                : null;
            
            const $item = $(`
                <div class="conversation-item p-4 border-b border-slate-700 cursor-pointer hover:bg-slate-800 transition-colors duration-200" data-id="${conversation.id}">
                    <div class="flex items-start space-x-3">
                        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            ${conversation.name.charAt(0).toUpperCase()}
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between">
                                <h4 class="font-medium text-slate-200 truncate">${conversation.name}</h4>
                                <span class="text-xs text-slate-400">${lastMessage ? formatTime(lastMessage.timestamp) : ''}</span>
                            </div>
                            <p class="text-sm text-slate-400 truncate mt-1">
                                ${lastMessage ? lastMessage.content : '暂无消息'}
                            </p>
                            ${conversation.unread_count > 0 ? `<span class="inline-block bg-red-500 text-xs px-2 py-1 rounded-full mt-1">${conversation.unread_count}</span>` : ''}
                        </div>
                    </div>
                </div>
            `);
            
            $list.append($item);
        });
    }
    
    function selectConversation(conversationId) {
        const conversation = findConversation(conversationId);
        if (!conversation) return;
        
        currentConversation = conversation;
        
        // 更新选中状态
        $('.conversation-item').removeClass('bg-slate-800');
        $(`.conversation-item[data-id="${conversationId}"]`).addClass('bg-slate-800');
        
        // 更新聊天标题显示群名称
        $('#platform-title').text(conversation.name);
        $('#platform-subtitle').text(`${conversation.type === 'group' ? '群聊' : '私聊'} · ${currentPlatform === 'feishu' ? '飞书' : currentPlatform === 'wechat' ? '企业微信' : '钉钉'}`);
        
        // 显示消息
        displayMessages(conversation.messages || []);
        
        // 标记为已读
        markAsRead(conversationId);
    }
    
    function findConversation(conversationId) {
        if (!currentPlatform || !conversations[currentPlatform]) return null;
        return conversations[currentPlatform].find(conv => conv.id === conversationId);
    }
    
    function displayMessages(messages) {
        const $messageList = $('#message-list');
        $messageList.empty();
        
        if (messages.length === 0) {
            $messageList.append(`
                <div class="text-center text-slate-400">
                    <i class="fas fa-comment-slash text-2xl mb-2"></i>
                    <p>暂无消息</p>
                </div>
            `);
            return;
        }
        
        messages.forEach(message => {
            // 判断是否为自己或应用发送的消息（显示在右侧）
            // 包括: sender_type为'self'或'app'，或者sender_name包含'应用'、'机器人'、'bot'等关键词
            const isOwn = message.sender_type === 'self' || 
                         message.sender_type === 'app' || 
                         message.sender_name === '应用' ||
                         message.sender_name === '我' ||
                         (message.sender_name && (message.sender_name.includes('应用') || 
                                                 message.sender_name.includes('机器人') || 
                                                 message.sender_name.toLowerCase().includes('bot')));
            
            // 检查是否为cli开头的消息（特殊样式）
            const isCliMessage = message.sender_name && message.sender_name.toLowerCase().startsWith('cli');
            
            // 确定消息对齐方式和背景色
            let alignment, bgColor, textColor;
            if (isCliMessage) {
                alignment = 'justify-end';
                bgColor = 'cli-message-bg';
                textColor = 'text-white';
            } else if (isOwn) {
                alignment = 'justify-end';
                bgColor = 'bg-blue-600';
                textColor = 'text-white';
            } else {
                alignment = 'justify-start';
                bgColor = 'bg-slate-700';
                textColor = 'text-white';
            }
            
            const $message = $(`
                <div class="flex ${alignment} mb-4">
                    <div class="message-bubble ${bgColor} rounded-lg p-3">
                        ${!isOwn && !isCliMessage ? `<div class="text-xs text-slate-300 mb-1">${message.sender_name}</div>` : ''}
                        ${isCliMessage ? `<div class="text-xs cli-message-text mb-1">${message.sender_name}</div>` : ''}
                        <div class="${textColor}">${escapeHtml(message.content)}</div>
                        <div class="text-xs ${isCliMessage ? 'cli-message-text' : (isOwn ? 'text-blue-200' : 'text-slate-400')} mt-1">
                            ${formatTime(message.timestamp)}
                        </div>
                    </div>
                </div>
            `);
            
            $messageList.append($message);
        });
        
        // 滚动到底部
        $messageList.scrollTop($messageList[0].scrollHeight);
    }
    
    function sendMessage() {
        const content = $('#message-input').val().trim();
        if (!content || !currentConversation) return;
        
        const messageData = {
            platform: currentPlatform,
            conversation_id: currentConversation.id,
            content: content
        };
        
        // 如果是飞书平台且启用了真实API
        if (currentPlatform === 'feishu' && useRealAPI) {
            messageData.use_real_api = 'true';
        }
        
        // 禁用输入
        $('#message-input, #send-btn').prop('disabled', true);
        
        $.ajax({
            url: 'api/send_message.php',
            method: 'POST',
            data: messageData,
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    // 添加消息到当前对话
                    const newMessage = {
                        id: Date.now(),
                        content: content,
                        sender_type: 'self',
                        sender_name: '我',
                        timestamp: new Date().toISOString()
                    };
                    
                    currentConversation.messages.push(newMessage);
                    displayMessages(currentConversation.messages);
                    
                    $('#message-input').val('');
                    
                    // 显示发送成功信息
                    const sourceText = response.data && response.data.data_source === 'real_api' ? '(真实API)' : '(Mock)';
                    showNotification(`消息发送成功 ${sourceText}`, 'success');
                } else {
                    showNotification(response.message || '发送失败', 'error');
                }
            },
            error: function(xhr, status, error) {
                console.error('发送消息失败:', error);
                showNotification('发送消息失败', 'error');
            },
            complete: function() {
                // 重新启用输入
                $('#message-input, #send-btn').prop('disabled', false);
                $('#message-input').focus();
            }
        });
    }
    
    function markAsRead(conversationId) {
        $.ajax({
            url: 'api/mark_read.php',
            method: 'POST',
            data: {
                platform: currentPlatform,
                conversation_id: conversationId
            },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    // 更新未读计数
                    const conversation = findConversation(conversationId);
                    if (conversation) {
                        conversation.unread_count = 0;
                        updateConversationCount(currentPlatform, conversations[currentPlatform].length);
                    }
                }
            }
        });
    }
    
    function updateConversationCount(platform, count) {
        $(`#${platform}-count`).text(count);
    }
    
    function formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) { // 1分钟内
            return '刚刚';
        } else if (diff < 3600000) { // 1小时内
            return Math.floor(diff / 60000) + '分钟前';
        } else if (diff < 86400000) { // 24小时内
            return Math.floor(diff / 3600000) + '小时前';
        } else {
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString().slice(0, 5);
        }
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function showNotification(message, type = 'info') {
        const bgColor = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600';
        
        const $notification = $(`
            <div class="fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300">
                <div class="flex items-center">
                    <i class="fas ${type === 'success' ? 'fa-check' : type === 'error' ? 'fa-exclamation-triangle' : 'fa-info'} mr-2"></i>
                    <span>${message}</span>
                </div>
            </div>
        `);
        
        $('body').append($notification);
        
        // 显示动画
        setTimeout(() => {
            $notification.removeClass('translate-x-full');
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            $notification.addClass('translate-x-full');
            setTimeout(() => {
                $notification.remove();
            }, 300);
        }, 3000);
    }
    
    // API模式切换按钮更新
    function updateAPIToggleButton() {
        const $toggleBtn = $('#api-mode-toggle');
        if ($toggleBtn.length === 0) {
            // 如果按钮不存在，创建它
            const toggleButton = `
                <button class="bg-slate-600 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors duration-200 ml-2" id="api-mode-toggle">
                    <i class="fas fa-toggle-off mr-2"></i>
                    <span>Mock数据</span>
                </button>
            `;
            $('#refresh-btn').after(toggleButton);
        }
        
        const $btn = $('#api-mode-toggle');
        const $icon = $btn.find('i');
        const $text = $btn.find('span');
        
        if (currentPlatform === 'feishu') {
            $btn.show();
            if (useRealAPI) {
                $icon.removeClass('fa-toggle-off').addClass('fa-toggle-on');
                $text.text('真实API');
                $btn.removeClass('bg-slate-600 hover:bg-slate-700').addClass('bg-green-600 hover:bg-green-700');
            } else {
                $icon.removeClass('fa-toggle-on').addClass('fa-toggle-off');
                $text.text('Mock数据');
                $btn.removeClass('bg-green-600 hover:bg-green-700').addClass('bg-slate-600 hover:bg-slate-700');
            }
        } else {
            $btn.hide();
        }
    }
    
    // 定期刷新消息
    setInterval(() => {
        if (currentPlatform) {
            loadConversations(currentPlatform);
        }
    }, 30000); // 每30秒刷新一次
});