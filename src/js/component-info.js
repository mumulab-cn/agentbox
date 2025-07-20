/**
 * component-info.js - 处理组件信息显示功能
 * 负责显示组件的积极作用和消极作用，以及累计影响等信息
 */

// 更新组件信息显示
function updateComponentInfo(componentName) {
    $('#component-name').text(componentName);
    alert("componet-info");
    
    // 从LocalStorage获取组件配置
    const sections = ['工具箱', '数据箱', '资源箱', '应用组件'];
    let componentConfig = null;
    
    for (const section of sections) {
        const config = JSON.parse(localStorage.getItem(`${section}Config`) || '[]');
        const component = config.find(c => c.title === componentName);
        if (component) {
            componentConfig = component;
            break;
        }
    }
    
    // 更新积极作用和消极作用
    const positiveEffects = $('#positive-effects');
    const negativeEffects = $('#negative-effects');
    if (componentConfig) {
        positiveEffects.html(
            (Array.isArray(componentConfig.positiveEffects) ? componentConfig.positiveEffects : [componentConfig.positiveEffects]).filter(Boolean).map(effect => 
                `<li>${effect}</li>`
            ).join('') || '<li class="text-gray-400">暂无信息</li>'
        );
        
        negativeEffects.html(
            (Array.isArray(componentConfig.negativeEffects) ? componentConfig.negativeEffects : [componentConfig.negativeEffects]).filter(Boolean).map(effect => 
                `<li>${effect}</li>`
            ).join('') || '<li class="text-gray-400">暂无信息</li>'
        );
    } else {
        positiveEffects.html('<li class="text-gray-400">暂无信息</li>');
        negativeEffects.html('<li class="text-gray-400">暂无信息</li>');
    }
}

// 更新累计影响
function updateCumulativeEffects() {
    const cumulativePositive = $('#cumulative-positive-effects');
    const cumulativeNegative = $('#cumulative-negative-effects');
    
    // 从LocalStorage获取组件配置
    const sections = ['工具箱', '数据箱', '资源箱', '应用组件'];
    let allPositiveEffects = [];
    let allNegativeEffects = [];
    
    // 获取沙盘区域中所有组件的影响
    $('.dropped-item').each(function() {
        const componentName = $(this).find('h3').text();
        for (const section of sections) {
            const config = JSON.parse(localStorage.getItem(`${section}Config`) || '[]');
            const component = config.find(c => c.title === componentName);
            if (component) {
                if (component.positiveEffects) {
                    allPositiveEffects = allPositiveEffects.concat(component.positiveEffects);
                }
                if (component.negativeEffects) {
                    allNegativeEffects = allNegativeEffects.concat(component.negativeEffects);
                }
                break;
            }
        }
    });

    // 更新显示
    cumulativePositive.html(
        allPositiveEffects.length > 0 ?
        allPositiveEffects.map(effect => `<li>${effect}</li>`).join('') :
        '<li class="text-gray-400">暂无信息</li>'
    );
    
    cumulativeNegative.html(
        allNegativeEffects.length > 0 ?
        allNegativeEffects.map(effect => `<li>${effect}</li>`).join('') :
        '<li class="text-gray-400">暂无信息</li>'
    );
}

// 根据组件类型生成影响
function generateComponentEffects(title, features) {
    // 根据组件类型和特性生成积极和消极作用
    let positiveEffects = [];
    let negativeEffects = [];

    // 根据组件类型添加对应的影响
    switch(title) {
        case '开发工具':
            positiveEffects.push('提高开发效率', '规范代码质量');
            negativeEffects.push('需要团队学习成本');
            break;
        case '监控工具':
            positiveEffects.push('及时发现问题', '提高系统稳定性');
            negativeEffects.push('增加系统开销');
            break;
        case '结构化数据':
            positiveEffects.push('数据组织清晰', '查询效率高');
            negativeEffects.push('存储成本较高');
            break;
        case '非结构化数据':
            positiveEffects.push('数据格式灵活', '存储成本低');
            negativeEffects.push('处理复杂度高');
            break;
        case '计算资源':
            positiveEffects.push('提供计算能力', '支持高并发');
            negativeEffects.push('维护成本高');
            break;
        case '存储资源':
            positiveEffects.push('数据持久化', '支持备份恢复');
            negativeEffects.push('需要定期扩容');
            break;
        case 'API网关':
            positiveEffects.push('统一接口管理', '提高安全性');
            negativeEffects.push('增加请求延迟');
            break;
        case '微服务组件':
            positiveEffects.push('服务解耦', '独立部署');
            negativeEffects.push('系统复杂度增加');
            break;
    }

    return { positiveEffects, negativeEffects };
}

// 导出函数到全局作用域
window.updateComponentInfo = updateComponentInfo;
window.updateCumulativeEffects = updateCumulativeEffects;
window.generateComponentEffects = generateComponentEffects;