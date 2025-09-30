from flask import Flask, render_template, request, jsonify, redirect, url_for, flash
import json
import os
from datetime import datetime


# 论文信息（从a.txt提取）
PAPER_INFO = {
    'title': '叶绿素分析',
    'author': '张三',
    'time': '2025年'
}

# 创建Flask应用实例
app = Flask(__name__)
app.secret_key = 'your-secret-key-here'  # 用于session和flash消息

# 模拟数据存储
users = [
    {'id': 1, 'name': '张三', 'email': 'zhangsan@example.com', 'age': 25},
    {'id': 2, 'name': '李四', 'email': 'lisi@example.com', 'age': 30},
    {'id': 3, 'name': '王五', 'email': 'wangwu@example.com', 'age': 28}
]

posts = [
    {'id': 1, 'title': 'Flask入门教程', 'content': '这是一个Flask入门教程的内容...', 'author': '张三', 'date': '2024-01-15'},
    {'id': 2, 'title': 'Python Web开发', 'content': '学习Python Web开发的最佳实践...', 'author': '李四', 'date': '2024-01-14'},
    {'id': 3, 'title': '数据可视化技巧', 'content': '使用Python进行数据可视化的技巧...', 'author': '王五', 'date': '2024-01-13'}
]

# 首页路由
@app.route('/')
def index():
    """首页 - 显示欢迎信息和导航"""
    return render_template('index.html', 
                         title='Flask示例应用',
                         users_count=len(users),
                         posts_count=len(posts))

# 用户管理路由
@app.route('/users')
def users_list():
    """用户列表页面"""
    return render_template('users.html', users=users, title='用户管理')

@app.route('/users/<int:user_id>')
def user_detail(user_id):
    """用户详情页面"""
    user = next((u for u in users if u['id'] == user_id), None)
    if user:
        return render_template('user_detail.html', user=user, title=f'用户详情 - {user["name"]}')
    else:
        flash('用户不存在', 'error')
        return redirect(url_for('users_list'))

@app.route('/users/add', methods=['GET', 'POST'])
def add_user():
    """添加用户"""
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        age = request.form.get('age')
        
        if name and email and age:
            new_user = {
                'id': len(users) + 1,
                'name': name,
                'email': email,
                'age': int(age)
            }
            users.append(new_user)
            flash(f'用户 {name} 添加成功！', 'success')
            return redirect(url_for('users_list'))
        else:
            flash('请填写所有字段', 'error')
    
    return render_template('add_user.html', title='添加用户')

# 博客文章路由
@app.route('/posts')
def posts_list():
    """文章列表页面"""
    return render_template('posts.html', posts=posts, title='博客文章')

@app.route('/posts/<int:post_id>')
def post_detail(post_id):
    """文章详情页面"""
    post = next((p for p in posts if p['id'] == post_id), None)
    if post:
        return render_template('post_detail.html', post=post, title=post['title'])
    else:
        flash('文章不存在', 'error')
        return redirect(url_for('posts_list'))

# API路由
@app.route('/api/users')
def api_users():
    """用户API - 返回JSON格式的用户列表"""
    return jsonify({
        'status': 'success',
        'data': users,
        'count': len(users)
    })

@app.route('/api/users/<int:user_id>')
def api_user_detail(user_id):
    """用户详情API"""
    user = next((u for u in users if u['id'] == user_id), None)
    if user:
        return jsonify({
            'status': 'success',
            'data': user
        })
    else:
        return jsonify({
            'status': 'error',
            'message': '用户不存在'
        }), 404

@app.route('/api/posts')
def api_posts():
    """文章API - 返回JSON格式的文章列表"""
    return jsonify({
        'status': 'success',
        'data': posts,
        'count': len(posts)
    })

# 搜索功能
@app.route('/search')
def search():
    """搜索功能"""
    query = request.args.get('q', '')
    results = []
    
    if query:
        # 搜索用户
        user_results = [u for u in users if query.lower() in u['name'].lower() or query.lower() in u['email'].lower()]
        # 搜索文章
        post_results = [p for p in posts if query.lower() in p['title'].lower() or query.lower() in p['content'].lower()]
        
        results = {
            'users': user_results,
            'posts': post_results,
            'query': query
        }
    
    return render_template('search.html', results=results, title='搜索结果')


# 论文信息路由
@app.route('/paper-info')
def paper_info():
    """显示论文信息页面"""
    import subprocess
    import os
    import importlib
    import sys
    
    try:
        # 执行extract_info.py脚本
        script_path = os.path.join(os.path.dirname(__file__), 'extract_info.py')
        result = subprocess.run(['python', script_path], 
                              capture_output=True, 
                              text=True, 
                              cwd=os.path.dirname(__file__))
        
        if result.returncode == 0:
            # 脚本执行成功，重新加载当前模块以获取更新的PAPER_INFO
            global PAPER_INFO
            
            # 重新读取a.txt文件并更新PAPER_INFO
            try:
                with open('a.txt', 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # 解析内容
                lines = content.strip().split('\n')
                updated_info = {'title': None, 'author': None, 'time': None}
                
                for line in lines:
                    line = line.strip()
                    if line.startswith('标题：') or line.startswith('题目：') or line.startswith('论文标题：') or line.startswith('论文题目：'):
                        updated_info['title'] = line.split('：', 1)[1].strip()
                    elif line.startswith('作者：'):
                        updated_info['author'] = line.split('：', 1)[1].strip()
                    elif line.startswith('时间：') or line.startswith('年份：'):
                        updated_info['time'] = line.split('：', 1)[1].strip()
                
                # 更新全局变量
                PAPER_INFO.update(updated_info)
                
            except Exception as read_error:
                print(f"读取a.txt文件时出错: {read_error}")
            
            return jsonify({
                'status': 'success',
                'data': PAPER_INFO,
                'message': '论文信息提取并更新成功',
                'script_output': result.stdout
            })
        else:
            # 脚本执行失败
            return jsonify({
                'status': 'error',
                'message': '论文信息提取失败',
                'error': result.stderr
            }), 500
            
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'执行extract_info.py时发生错误: {str(e)}'
        }), 500


# 关于页面
@app.route('/about')
def about():
    """关于页面"""
    app_info = {
        'name': 'Flask示例应用',
        'version': '1.0.0',
        'description': '这是一个完整的Flask Web应用示例，展示了路由、模板、表单处理、API等功能。',
        'features': [
            '用户管理系统',
            '博客文章展示',
            'RESTful API接口',
            '搜索功能',
            '响应式设计',
            '错误处理'
        ],
        'technologies': ['Flask', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap']
    }
    return render_template('about.html', app_info=app_info, title='关于我们')

# 错误处理
@app.errorhandler(404)
def not_found(error):
    """404错误处理"""
    return render_template('error.html', 
                         error_code=404, 
                         error_message='页面未找到',
                         title='页面未找到'), 404

@app.errorhandler(500)
def internal_error(error):
    """500错误处理"""
    return render_template('error.html', 
                         error_code=500, 
                         error_message='服务器内部错误',
                         title='服务器错误'), 500

# 模板过滤器
@app.template_filter('datetime')
def datetime_filter(date_string):
    """日期格式化过滤器"""
    try:
        date_obj = datetime.strptime(date_string, '%Y-%m-%d')
        return date_obj.strftime('%Y年%m月%d日')
    except:
        return date_string

# 模板上下文处理器
@app.context_processor
def inject_globals():
    """注入全局模板变量"""
    return {
        'current_year': datetime.now().year,
        'app_name': 'Flask示例应用'
    }

if __name__ == '__main__':
    # 确保templates和static目录存在
    os.makedirs('templates', exist_ok=True)
    os.makedirs('static/css', exist_ok=True)
    os.makedirs('static/js', exist_ok=True)
    
    print("Flask应用启动中...")
    print("访问地址: http://localhost:5000")
    print("可用路由:")
    print("  - 首页: /")
    print("  - 用户管理: /users")
    print("  - 博客文章: /posts")
    print("  - 搜索: /search")
    print("  - 关于: /about")
    print("  - API: /api/users, /api/posts")
    
    # 启动应用
    app.run(debug=True, host='0.0.0.0', port=5000)