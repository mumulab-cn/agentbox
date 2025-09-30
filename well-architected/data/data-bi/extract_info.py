#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
文件信息提取工具
从a.txt文件中提取论文标题和作者信息，并更新到Flask应用中
"""

import os
import re

def read_txt_file(file_path):
    """
    读取txt文件内容
    
    Args:
        file_path (str): 文件路径
        
    Returns:
        str: 文件内容
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        return content
    except FileNotFoundError:
        print(f"错误：文件 {file_path} 不存在")
        return None
    except Exception as e:
        print(f"读取文件时发生错误：{e}")
        return None

def extract_info(content):
    """
    从文件内容中提取论文标题和作者信息
    
    Args:
        content (str): 文件内容
        
    Returns:
        dict: 包含提取信息的字典
    """
    info = {
        'title': None,
        'author': None,
        'time': None
    }
    
    if not content:
        return info
    
    lines = content.strip().split('\n')
    
    for line in lines:
        line = line.strip()
        
        # 提取标题
        if line.startswith('标题：') or line.startswith('题目：') or line.startswith('论文标题：') or line.startswith('论文题目：'):
            info['title'] = line.split('：', 1)[1].strip()
        
        # 提取作者
        elif line.startswith('作者：'):
            info['author'] = line.split('：', 1)[1].strip()
        
        # 提取时间
        elif line.startswith('时间：') or line.startswith('年份：'):
            info['time'] = line.split('：', 1)[1].strip()
    
    return info

def update_app_py(info, app_file_path):
    """
    更新app.py文件，添加提取的信息
    
    Args:
        info (dict): 提取的信息
        app_file_path (str): app.py文件路径
    """
    try:
        # 读取现有的app.py文件
        with open(app_file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # 准备要添加的信息
        paper_info = f"""
# 论文信息（从a.txt提取）
PAPER_INFO = {{
    'title': '{info.get('title', '未找到标题')}',
    'author': '{info.get('author', '未知作者')}',
    'time': '{info.get('time', '未知时间')}'
}}
"""
        
        # 在Flask应用实例创建之前插入论文信息
        if '# 创建Flask应用实例' in content:
            content = content.replace(
                '# 创建Flask应用实例',
                paper_info + '\n# 创建Flask应用实例'
            )
        else:
            # 如果没有找到特定标记，在文件开头添加
            content = paper_info + '\n' + content
        
        # 添加一个新的路由来显示论文信息
        paper_route = """
# 论文信息路由
@app.route('/paper-info')
def paper_info():
    \"\"\"显示论文信息页面\"\"\"
    return jsonify({
        'status': 'success',
        'data': PAPER_INFO,
        'message': '论文信息获取成功'
    })
"""
        
        # 在关于页面路由之前添加论文信息路由
        if '# 关于页面' in content:
            content = content.replace(
                '# 关于页面',
                paper_route + '\n\n# 关于页面'
            )
        else:
            # 如果没有找到关于页面，在错误处理之前添加
            if '# 错误处理' in content:
                content = content.replace(
                    '# 错误处理',
                    paper_route + '\n\n# 错误处理'
                )
        
        # 写回文件
        with open(app_file_path, 'w', encoding='utf-8') as file:
            file.write(content)
        
        print(f"成功更新 {app_file_path}")
        print(f"添加的论文信息：")
        print(f"  标题: {info.get('title', '未找到标题')}")
        print(f"  作者: {info.get('author', '未知作者')}")
        print(f"  时间: {info.get('time', '未知时间')}")
        
    except Exception as e:
        print(f"更新app.py文件时发生错误：{e}")

def main():
    """
    主函数
    """
    # 文件路径
    txt_file_path = 'a.txt'
    app_file_path = 'app.py'
    
    print("开始提取论文信息...")
    
    # 读取txt文件
    content = read_txt_file(txt_file_path)
    if content is None:
        return
    
    print(f"文件内容：\n{content}")
    
    # 提取信息
    info = extract_info(content)
    print(f"\n提取的信息：")
    print(f"  标题: {info.get('title', '未找到标题')}")
    print(f"  作者: {info.get('author', '未知作者')}")
    print(f"  时间: {info.get('time', '未知时间')}")
    
    # 更新app.py文件
    if os.path.exists(app_file_path):
        update_app_py(info, app_file_path)
        print(f"\n论文信息已添加到Flask应用中")
        print(f"可以通过访问 /paper-info 路由查看论文信息")
    else:
        print(f"错误：{app_file_path} 文件不存在")

if __name__ == '__main__':
    main()