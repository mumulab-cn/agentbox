/**
 * Canvas Data Manager
 * 负责画布数据的序列化和反序列化
 */
class CanvasDataManager {
    /**
     * 将画布数据导出为JSON
     * @param {Array} blocks - 画布中的所有方块
     * @param {Array} connections - 画布中的所有连接
     * @param {Array} textBoxes - 画布中的所有文本框
     * @returns {string} - JSON字符串
     */
    static exportToJSON(blocks, connections, textBoxes) {
        const data = {
            blocks: [],
            connections: [],
            textBoxes: []
        };

        // 处理方块数据
        blocks.each(function() {
            const $block = $(this);
            const blockId = $block.attr('id');
            const blockType = $block.attr('data-block-id');
            const position = {
                left: parseInt($block.css('left')),
                top: parseInt($block.css('top'))
            };
            const properties = $block.data('properties') || {
                good: '',
                bad: '',
                cost: '',
                todo: ''
            };
            const text = $block.text().trim();

            data.blocks.push({
                id: blockId,
                type: blockType,
                position: position,
                properties: properties,
                text: text
            });
        });

        // 处理连接数据
        connections.forEach(conn => {
            data.connections.push({
                id: conn.id,
                startBlockId: conn.startBlockId,
                startPosition: conn.startPosition,
                endBlockId: conn.endBlockId,
                endPosition: conn.endPosition
            });
        });

        // 处理文本框数据
        textBoxes.each(function() {
            const $textBox = $(this);
            const textBoxId = $textBox.attr('id');
            const position = {
                left: parseInt($textBox.css('left')),
                top: parseInt($textBox.css('top'))
            };
            const size = {
                width: $textBox.width(),
                height: $textBox.height()
            };
            const content = $textBox.html();

            data.textBoxes.push({
                id: textBoxId,
                position: position,
                size: size,
                content: content
            });
        });

        return JSON.stringify(data, null, 2);
    }

    /**
     * 从JSON导入画布数据
     * @param {string} jsonData - JSON字符串
     * @param {Function} createBlockCallback - 创建方块的回调函数
     * @param {Function} createTextBoxCallback - 创建文本框的回调函数
     * @param {Function} createConnectionCallback - 创建连接的回调函数
     */
    static importFromJSON(jsonData, createBlockCallback, createTextBoxCallback, createConnectionCallback) {
        try {
            const data = JSON.parse(jsonData);
            
            // 清空画布
            $('#canvas').empty();
            $('#svg-container').empty();
            
            // 重建SVG容器
            const svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svgContainer.setAttribute('class', 'svg-container');
            svgContainer.setAttribute('id', 'svg-container');
            $('#canvas').append(svgContainer);
            
            // 导入方块
            if (data.blocks && Array.isArray(data.blocks)) {
                data.blocks.forEach(block => {
                    console.log(block.type, block.position.left, block.position.top, block.id, block.properties);
                    createBlockCallback(block.type, block.position.left, block.position.top, block.id, block.properties);
                });
            }
            
            // 导入文本框
            if (data.textBoxes && Array.isArray(data.textBoxes)) {
                data.textBoxes.forEach(textBox => {
                    createTextBoxCallback(textBox.position.left, textBox.position.top, textBox.id, textBox.content, textBox.size);
                });
            }
            
            // 导入连接
            if (data.connections && Array.isArray(data.connections)) {
                //alert(data.connections);
                data.connections.forEach(conn => {
                    console.log(conn.startBlockId, conn.startPosition, conn.endBlockId, conn.endPosition, conn.id);
                    createConnectionCallback(conn.startBlockId, conn.startPosition, conn.endBlockId, conn.endPosition, conn.id);
                });
            }
            
            return true;
        } catch (error) {
            console.error('导入JSON数据失败:', error);
            return false;
        }
    }
}

export default CanvasDataManager;