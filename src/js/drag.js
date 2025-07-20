/**
 * drag.js - 处理组件拖拽功能
 * 负责组件的拖拽、放置和位置调整等交互
 */

import { updateComponentInfo, updateCumulativeEffects } from './component-info.js';

// 初始化拖拽功能
function initializeDraggableItems() {alert("drag");
    // 初始化已存在的可拖拽元素
    $('.dropped-item').draggable({
        containment: 'parent',
        stack: '.dropped-item',
        cursor: 'move',
        start: function() {
            $(this).css('transform', 'scale(1.05)');
        },
        stop: function() {
            $(this).css('transform', 'scale(1)');
        }
    });

    // 初始化组件拖拽功能
    $('.component-item').draggable({
        helper: 'clone',
        appendTo: 'body',
        zIndex: 1000,
        opacity: 0.8,
        cursor: 'move',
        start: function(event, ui) {
            $(ui.helper).addClass('dragging').css({
                'transform': 'scale(1.05)',
                'box-shadow': '0 4px 8px rgba(0,0,0,0.1)',
                'z-index': 100
            });
            // 更新组件信息
            const componentName = $(this).find('h3').text();
            updateComponentInfo(componentName);
        }
    }).click(function() {
        // 添加点击事件处理
        const componentName = $(this).find('h3').text();
        updateComponentInfo(componentName);
    });

    // 组件编辑相关功能
    let currentEditItem = null;

    function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('collapsed');
    }

    function showEditDialog(item) {
        currentEditItem = item;
        const title = $(item).find('h3').text();
        const description = $(item).find('ul').text();
        
        $('#editTitle').val(title);
        $('#editDescription').val(description);
        $('#editDialog').removeClass('hidden');
    }

    function closeEditDialog() {
        $('#editDialog').addClass('hidden');
        currentEditItem = null;
    }

    function saveEdit() {
        if (currentEditItem) {
            const title = $('#editTitle').val();
            const description = $('#editDescription').val();
            
            $(currentEditItem).find('h3').text(title);
            
            // 将描述文本转换为列表项
            const descriptionItems = description.split('\n').filter(item => item.trim());
            const ul = $(currentEditItem).find('ul').empty();
            descriptionItems.forEach(item => {
                ul.append(`<li>${item.trim()}</li>`);
            });
        }
        closeEditDialog();
    }

    // 导出函数
    return {
        initializeDraggableItems,
        toggleSidebar,
        showEditDialog,
        closeEditDialog,
        saveEdit
    };
}

// 页面加载时初始化拖拽功能
$(document).ready(function() {
    const dragManager = initializeDraggableItems();
    
    // 绑定编辑相关事件
    $('#editDialog .close-btn').click(dragManager.closeEditDialog);
    $('#editDialog .save-btn').click(dragManager.saveEdit);
    $('#sidebar .collapse-btn').click(dragManager.toggleSidebar);
});

    // 初始化放置区域
    $('.sandbox-area').droppable({
        accept: '.component-item',
        tolerance: 'pointer',
        hoverClass: 'bg-gray-100',
        drop: function(event, ui) {
            const droppedItem = $(ui.helper).clone();
            droppedItem.removeClass('component-item').addClass('dropped-item');
            
            // 获取组件标题
            const title = droppedItem.find('h3').text();
            
            // 获取组件特性
            const features = droppedItem.find('li').map(function() {
                return $(this).text();
            }).get();
            
            // 使放置的组件可拖动
            droppedItem.draggable({
                containment: 'parent',
                stack: '.dropped-item',
                cursor: 'move',
                start: function(event, ui) {
                    $(this).css({
                        'transform': 'scale(1.05)',
                        'box-shadow': '0 4px 8px rgba(0,0,0,0.1)',
                        'z-index': 100
                    });
                    // 更新组件信息
                    const componentName = $(this).find('h3').text();
                    updateComponentInfo(componentName);
                },
                stop: function(event, ui) {
                    $(this).css({
                        'transform': 'scale(1)',
                        'box-shadow': 'none',
                        'z-index': 10
                    });
                }
            });
            
            $(this).append(droppedItem);
            
            // 更新组件信息
            updateComponentInfo(title);

            // 更新累计影响
            updateCumulativeEffects();
            
            // 通知连线管理器处理新添加的组件
            if (window.canvasConnectionManager) {
                window.canvasConnectionManager.handleDragEnd({
                    target: droppedItem[0]
                });
            }
            
            // 如果是拖放到沙盘区域，还需要通知沙盘连线管理器
            if ($(this).hasClass('sandbox-area') && window.sandboxConnectionManager) {
                window.sandboxConnectionManager.handleDragEnd({
                    target: droppedItem[0]
                });
            }
        }
    });

    // 初始化相位内容区域为可放置区域
    $('.phase-content').droppable({
        accept: '.component-item',
        tolerance: 'pointer',
        hoverClass: 'bg-gray-100',
        drop: function(event, ui) {
            const droppedItem = $(ui.helper).clone();
            droppedItem.removeClass('component-item').addClass('dropped-item');
            
            // 获取组件标题
            const title = droppedItem.find('h3').text();
            
            $(this).append(droppedItem);
            
            // 更新组件信息
            updateComponentInfo(title);

            // 更新累计影响
            updateCumulativeEffects();
            
            // 使放置的组件可拖动
            droppedItem.draggable({
                containment: 'parent',
                cursor: 'move',
                zIndex: 1000
            });
            
            // 通知连线管理器处理新添加的组件
            if (window.canvasConnectionManager) {
                window.canvasConnectionManager.handleDragEnd({
                    target: droppedItem[0]
                });
            }
            
            // 如果是拖放到沙盘区域，还需要通知沙盘连线管理器
            if ($(this).hasClass('sandbox-area') && window.sandboxConnectionManager) {
                window.sandboxConnectionManager.handleDragEnd({
                    target: droppedItem[0]
                });
            }
        }
    });

    // 组件编辑相关功能
    let currentEditItem = null;

    function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('collapsed');
    }

    function showEditDialog(item) {
        currentEditItem = item;
        const title = $(item).find('h3').text();
        const description = $(item).find('ul').text();
        
        $('#editTitle').val(title);
        $('#editDescription').val(description);
        $('#editDialog').removeClass('hidden');
    }

    function closeEditDialog() {
        $('#editDialog').addClass('hidden');
        currentEditItem = null;
    }

    function saveEdit() {
        if (currentEditItem) {
            const title = $('#editTitle').val();
            const description = $('#editDescription').val();
            
            $(currentEditItem).find('h3').text(title);
            
            // 将描述文本转换为列表项
            const descriptionItems = description.split('\n').filter(item => item.trim());
            const ul = $(currentEditItem).find('ul').empty();
            descriptionItems.forEach(item => {
                ul.append(`<li>${item.trim()}</li>`);
            });
        }
        closeEditDialog();
    }

    // 导出函数
    return {
        initializeDraggableItems,
        toggleSidebar,
        showEditDialog,
        closeEditDialog,
        saveEdit
    };