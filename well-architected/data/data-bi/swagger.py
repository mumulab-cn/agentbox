# -*- coding: utf-8 -*-
"""
Swagger API文档示例
使用Flask-RESTX生成自动化API文档
"""

from flask import Flask, request, jsonify
from flask_restx import Api, Resource, fields, Namespace
from datetime import datetime
import json
import os
from typing import Dict, List, Any

# 创建Flask应用
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False  # 支持中文JSON输出

# 创建API实例
api = Api(
    app,
    version='1.0',
    title='学术数据管理API',
    description='提供学术文献、用户管理、数据分析等功能的RESTful API服务',
    doc='/docs/',  # Swagger UI路径
    prefix='/api/v1'
)

# 模拟数据存储
users_data = [
    {'id': 1, 'name': '张三', 'email': 'zhangsan@example.com', 'role': 'researcher', 'created_at': '2024-01-15'},
    {'id': 2, 'name': '李四', 'email': 'lisi@example.com', 'role': 'student', 'created_at': '2024-01-16'},
    {'id': 3, 'name': '王五', 'email': 'wangwu@example.com', 'role': 'professor', 'created_at': '2024-01-17'}
]

papers_data = [
    {
        'id': 1,
        'title': '深度学习在自然语言处理中的应用',
        'authors': ['张三', '李四'],
        'journal': '计算机学报',
        'year': 2024,
        'doi': '10.11897/SP.J.1016.2024.00001',
        'keywords': ['深度学习', '自然语言处理', '神经网络'],
        'abstract': '本文综述了深度学习技术在自然语言处理领域的最新进展...',
        'status': 'published'
    },
    {
        'id': 2,
        'title': '机器学习算法比较研究',
        'authors': ['王五'],
        'journal': '人工智能',
        'year': 2023,
        'doi': '10.1234/ai.2023.002',
        'keywords': ['机器学习', '算法比较', '性能评估'],
        'abstract': '对比分析了多种机器学习算法的性能和适用场景...',
        'status': 'published'
    }
]

projects_data = [
    {
        'id': 1,
        'name': 'AI文献分析系统',
        'description': '基于人工智能的学术文献智能分析平台',
        'status': 'active',
        'start_date': '2024-01-01',
        'end_date': '2024-12-31',
        'members': [1, 2, 3],
        'budget': 500000
    }
]

# 定义命名空间
user_ns = Namespace('users', description='用户管理相关接口')
paper_ns = Namespace('papers', description='学术论文管理接口')
project_ns = Namespace('projects', description='项目管理接口')
analytics_ns = Namespace('analytics', description='数据分析接口')

# 注册命名空间
api.add_namespace(user_ns)
api.add_namespace(paper_ns)
api.add_namespace(project_ns)
api.add_namespace(analytics_ns)

# 定义数据模型
user_model = api.model('User', {
    'id': fields.Integer(required=True, description='用户ID'),
    'name': fields.String(required=True, description='用户姓名'),
    'email': fields.String(required=True, description='邮箱地址'),
    'role': fields.String(required=True, description='用户角色', enum=['student', 'researcher', 'professor']),
    'created_at': fields.String(description='创建时间')
})

user_input_model = api.model('UserInput', {
    'name': fields.String(required=True, description='用户姓名'),
    'email': fields.String(required=True, description='邮箱地址'),
    'role': fields.String(required=True, description='用户角色', enum=['student', 'researcher', 'professor'])
})

paper_model = api.model('Paper', {
    'id': fields.Integer(required=True, description='论文ID'),
    'title': fields.String(required=True, description='论文标题'),
    'authors': fields.List(fields.String, description='作者列表'),
    'journal': fields.String(description='期刊名称'),
    'year': fields.Integer(description='发表年份'),
    'doi': fields.String(description='DOI'),
    'keywords': fields.List(fields.String, description='关键词'),
    'abstract': fields.String(description='摘要'),
    'status': fields.String(description='状态', enum=['draft', 'submitted', 'published'])
})

paper_input_model = api.model('PaperInput', {
    'title': fields.String(required=True, description='论文标题'),
    'authors': fields.List(fields.String, required=True, description='作者列表'),
    'journal': fields.String(description='期刊名称'),
    'year': fields.Integer(description='发表年份'),
    'doi': fields.String(description='DOI'),
    'keywords': fields.List(fields.String, description='关键词'),
    'abstract': fields.String(description='摘要'),
    'status': fields.String(description='状态', enum=['draft', 'submitted', 'published'])
})

project_model = api.model('Project', {
    'id': fields.Integer(required=True, description='项目ID'),
    'name': fields.String(required=True, description='项目名称'),
    'description': fields.String(description='项目描述'),
    'status': fields.String(description='项目状态', enum=['planning', 'active', 'completed', 'cancelled']),
    'start_date': fields.String(description='开始日期'),
    'end_date': fields.String(description='结束日期'),
    'members': fields.List(fields.Integer, description='成员ID列表'),
    'budget': fields.Float(description='项目预算')
})

response_model = api.model('Response', {
    'status': fields.String(description='响应状态'),
    'message': fields.String(description='响应消息'),
    'data': fields.Raw(description='响应数据'),
    'timestamp': fields.String(description='时间戳')
})

error_model = api.model('Error', {
    'status': fields.String(description='错误状态'),
    'message': fields.String(description='错误消息'),
    'code': fields.Integer(description='错误代码'),
    'timestamp': fields.String(description='时间戳')
})

# 工具函数
def create_response(data=None, message="操作成功", status="success"):
    """创建标准响应格式"""
    return {
        'status': status,
        'message': message,
        'data': data,
        'timestamp': datetime.now().isoformat()
    }

def create_error_response(message="操作失败", code=400, status="error"):
    """创建错误响应格式"""
    return {
        'status': status,
        'message': message,
        'code': code,
        'timestamp': datetime.now().isoformat()
    }

# 用户管理接口
@user_ns.route('')
class UserList(Resource):
    @user_ns.doc('获取用户列表')
    @user_ns.marshal_list_with(user_model)
    @user_ns.param('page', '页码', type=int, default=1)
    @user_ns.param('size', '每页数量', type=int, default=10)
    @user_ns.param('role', '用户角色筛选', type=str)
    def get(self):
        """获取用户列表"""
        page = request.args.get('page', 1, type=int)
        size = request.args.get('size', 10, type=int)
        role = request.args.get('role')
        
        filtered_users = users_data
        if role:
            filtered_users = [u for u in users_data if u['role'] == role]
        
        # 简单分页
        start = (page - 1) * size
        end = start + size
        paginated_users = filtered_users[start:end]
        
        return paginated_users
    
    @user_ns.doc('创建新用户')
    @user_ns.expect(user_input_model)
    @user_ns.marshal_with(response_model)
    def post(self):
        """创建新用户"""
        data = request.json
        
        # 验证邮箱唯一性
        if any(u['email'] == data['email'] for u in users_data):
            return create_error_response("邮箱已存在", 409), 409
        
        # 创建新用户
        new_user = {
            'id': max([u['id'] for u in users_data]) + 1 if users_data else 1,
            'name': data['name'],
            'email': data['email'],
            'role': data['role'],
            'created_at': datetime.now().strftime('%Y-%m-%d')
        }
        
        users_data.append(new_user)
        return create_response(new_user, "用户创建成功"), 201

@user_ns.route('/<int:user_id>')
class User(Resource):
    @user_ns.doc('获取用户详情')
    @user_ns.marshal_with(user_model)
    @user_ns.response(404, '用户不存在', error_model)
    def get(self, user_id):
        """获取指定用户详情"""
        user = next((u for u in users_data if u['id'] == user_id), None)
        if not user:
            api.abort(404, "用户不存在")
        return user
    
    @user_ns.doc('更新用户信息')
    @user_ns.expect(user_input_model)
    @user_ns.marshal_with(response_model)
    @user_ns.response(404, '用户不存在', error_model)
    def put(self, user_id):
        """更新用户信息"""
        user = next((u for u in users_data if u['id'] == user_id), None)
        if not user:
            return create_error_response("用户不存在", 404), 404
        
        data = request.json
        user.update({
            'name': data.get('name', user['name']),
            'email': data.get('email', user['email']),
            'role': data.get('role', user['role'])
        })
        
        return create_response(user, "用户更新成功")
    
    @user_ns.doc('删除用户')
    @user_ns.marshal_with(response_model)
    @user_ns.response(404, '用户不存在', error_model)
    def delete(self, user_id):
        """删除用户"""
        user = next((u for u in users_data if u['id'] == user_id), None)
        if not user:
            return create_error_response("用户不存在", 404), 404
        
        users_data.remove(user)
        return create_response(message="用户删除成功")

# 论文管理接口
@paper_ns.route('')
class PaperList(Resource):
    @paper_ns.doc('获取论文列表')
    @paper_ns.marshal_list_with(paper_model)
    @paper_ns.param('year', '发表年份', type=int)
    @paper_ns.param('keyword', '关键词搜索', type=str)
    @paper_ns.param('status', '论文状态', type=str)
    def get(self):
        """获取论文列表"""
        year = request.args.get('year', type=int)
        keyword = request.args.get('keyword')
        status = request.args.get('status')
        
        filtered_papers = papers_data
        
        if year:
            filtered_papers = [p for p in filtered_papers if p['year'] == year]
        
        if keyword:
            filtered_papers = [
                p for p in filtered_papers 
                if keyword.lower() in p['title'].lower() or 
                   any(keyword.lower() in kw.lower() for kw in p['keywords'])
            ]
        
        if status:
            filtered_papers = [p for p in filtered_papers if p['status'] == status]
        
        return filtered_papers
    
    @paper_ns.doc('添加新论文')
    @paper_ns.expect(paper_input_model)
    @paper_ns.marshal_with(response_model)
    def post(self):
        """添加新论文"""
        data = request.json
        
        new_paper = {
            'id': max([p['id'] for p in papers_data]) + 1 if papers_data else 1,
            'title': data['title'],
            'authors': data['authors'],
            'journal': data.get('journal', ''),
            'year': data.get('year', datetime.now().year),
            'doi': data.get('doi', ''),
            'keywords': data.get('keywords', []),
            'abstract': data.get('abstract', ''),
            'status': data.get('status', 'draft')
        }
        
        papers_data.append(new_paper)
        return create_response(new_paper, "论文添加成功"), 201

@paper_ns.route('/<int:paper_id>')
class Paper(Resource):
    @paper_ns.doc('获取论文详情')
    @paper_ns.marshal_with(paper_model)
    @paper_ns.response(404, '论文不存在', error_model)
    def get(self, paper_id):
        """获取指定论文详情"""
        paper = next((p for p in papers_data if p['id'] == paper_id), None)
        if not paper:
            api.abort(404, "论文不存在")
        return paper
    
    @paper_ns.doc('更新论文信息')
    @paper_ns.expect(paper_input_model)
    @paper_ns.marshal_with(response_model)
    def put(self, paper_id):
        """更新论文信息"""
        paper = next((p for p in papers_data if p['id'] == paper_id), None)
        if not paper:
            return create_error_response("论文不存在", 404), 404
        
        data = request.json
        paper.update({
            'title': data.get('title', paper['title']),
            'authors': data.get('authors', paper['authors']),
            'journal': data.get('journal', paper['journal']),
            'year': data.get('year', paper['year']),
            'doi': data.get('doi', paper['doi']),
            'keywords': data.get('keywords', paper['keywords']),
            'abstract': data.get('abstract', paper['abstract']),
            'status': data.get('status', paper['status'])
        })
        
        return create_response(paper, "论文更新成功")

# 项目管理接口
@project_ns.route('')
class ProjectList(Resource):
    @project_ns.doc('获取项目列表')
    @project_ns.marshal_list_with(project_model)
    @project_ns.param('status', '项目状态', type=str)
    def get(self):
        """获取项目列表"""
        status = request.args.get('status')
        
        filtered_projects = projects_data
        if status:
            filtered_projects = [p for p in projects_data if p['status'] == status]
        
        return filtered_projects

@project_ns.route('/<int:project_id>')
class Project(Resource):
    @project_ns.doc('获取项目详情')
    @project_ns.marshal_with(project_model)
    def get(self, project_id):
        """获取指定项目详情"""
        project = next((p for p in projects_data if p['id'] == project_id), None)
        if not project:
            api.abort(404, "项目不存在")
        return project

# 数据分析接口
@analytics_ns.route('/stats')
class Statistics(Resource):
    @analytics_ns.doc('获取统计数据')
    def get(self):
        """获取系统统计数据"""
        stats = {
            'users': {
                'total': len(users_data),
                'by_role': {
                    'student': len([u for u in users_data if u['role'] == 'student']),
                    'researcher': len([u for u in users_data if u['role'] == 'researcher']),
                    'professor': len([u for u in users_data if u['role'] == 'professor'])
                }
            },
            'papers': {
                'total': len(papers_data),
                'by_status': {
                    'published': len([p for p in papers_data if p['status'] == 'published']),
                    'draft': len([p for p in papers_data if p['status'] == 'draft']),
                    'submitted': len([p for p in papers_data if p['status'] == 'submitted'])
                },
                'by_year': {}
            },
            'projects': {
                'total': len(projects_data),
                'active': len([p for p in projects_data if p['status'] == 'active'])
            }
        }
        
        # 按年份统计论文
        for paper in papers_data:
            year = str(paper['year'])
            stats['papers']['by_year'][year] = stats['papers']['by_year'].get(year, 0) + 1
        
        return create_response(stats, "统计数据获取成功")

@analytics_ns.route('/trends')
class Trends(Resource):
    @analytics_ns.doc('获取趋势分析')
    @analytics_ns.param('type', '分析类型', type=str, enum=['papers', 'users', 'keywords'])
    def get(self):
        """获取趋势分析数据"""
        analysis_type = request.args.get('type', 'papers')
        
        if analysis_type == 'papers':
            # 论文发表趋势
            trends = {}
            for paper in papers_data:
                year = str(paper['year'])
                trends[year] = trends.get(year, 0) + 1
            
            result = {
                'type': 'papers_by_year',
                'data': trends,
                'description': '按年份统计的论文发表数量'
            }
        
        elif analysis_type == 'keywords':
            # 关键词热度分析
            keyword_count = {}
            for paper in papers_data:
                for keyword in paper['keywords']:
                    keyword_count[keyword] = keyword_count.get(keyword, 0) + 1
            
            # 排序并取前10
            top_keywords = sorted(keyword_count.items(), key=lambda x: x[1], reverse=True)[:10]
            
            result = {
                'type': 'top_keywords',
                'data': dict(top_keywords),
                'description': '热门关键词统计（前10）'
            }
        
        elif analysis_type == 'users':
            # 用户增长趋势（模拟数据）
            result = {
                'type': 'user_growth',
                'data': {
                    '2024-01': 10,
                    '2024-02': 15,
                    '2024-03': 22,
                    '2024-04': 28
                },
                'description': '用户增长趋势（按月统计）'
            }
        
        else:
            return create_error_response("不支持的分析类型", 400), 400
        
        return create_response(result, "趋势分析数据获取成功")

# 健康检查接口
@api.route('/health')
class Health(Resource):
    @api.doc('健康检查')
    def get(self):
        """API健康检查"""
        return {
            'status': 'healthy',
            'timestamp': datetime.now().isoformat(),
            'version': '1.0',
            'services': {
                'api': 'running',
                'database': 'simulated',
                'cache': 'disabled'
            }
        }

# 首页重定向到文档
@app.route('/')
def index():
    """首页重定向到API文档"""
    return '''
    <!DOCTYPE html>
    <html>
    <head>
        <title>学术数据管理API</title>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #333; text-align: center; }
            .btn { display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 4px; margin: 10px; }
            .btn:hover { background: #0056b3; }
            .feature { margin: 20px 0; padding: 15px; background: #f8f9fa; border-left: 4px solid #007bff; }
            .api-list { list-style: none; padding: 0; }
            .api-list li { margin: 10px 0; padding: 10px; background: #e9ecef; border-radius: 4px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🎓 学术数据管理API</h1>
            <p style="text-align: center; color: #666; font-size: 18px;">提供完整的学术文献、用户管理、数据分析功能</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="/docs/" class="btn">📚 查看API文档</a>
                <a href="/api/v1/health" class="btn">🔍 健康检查</a>
            </div>
            
            <div class="feature">
                <h3>🚀 主要功能</h3>
                <ul class="api-list">
                    <li><strong>用户管理</strong> - 完整的用户CRUD操作，支持角色管理</li>
                    <li><strong>论文管理</strong> - 学术论文的添加、查询、更新功能</li>
                    <li><strong>项目管理</strong> - 研究项目的管理和跟踪</li>
                    <li><strong>数据分析</strong> - 统计数据和趋势分析</li>
                </ul>
            </div>
            
            <div class="feature">
                <h3>📋 API接口列表</h3>
                <ul class="api-list">
                    <li><code>GET /api/v1/users</code> - 获取用户列表</li>
                    <li><code>POST /api/v1/users</code> - 创建新用户</li>
                    <li><code>GET /api/v1/papers</code> - 获取论文列表</li>
                    <li><code>POST /api/v1/papers</code> - 添加新论文</li>
                    <li><code>GET /api/v1/analytics/stats</code> - 获取统计数据</li>
                    <li><code>GET /api/v1/analytics/trends</code> - 获取趋势分析</li>
                </ul>
            </div>
            
            <div class="feature">
                <h3>🛠️ 技术特性</h3>
                <ul>
                    <li>✅ RESTful API设计</li>
                    <li>✅ 自动生成Swagger文档</li>
                    <li>✅ 数据验证和错误处理</li>
                    <li>✅ 分页和筛选支持</li>
                    <li>✅ 标准化响应格式</li>
                </ul>
            </div>
            
            <p style="text-align: center; color: #888; margin-top: 40px;">
                Powered by Flask-RESTX | Version 1.0
            </p>
        </div>
    </body>
    </html>
    '''

if __name__ == '__main__':
    print("学术数据管理API服务启动")
    print("=" * 50)
    print(f"API文档地址: http://127.0.0.1:5002/docs/")
    print(f"健康检查: http://127.0.0.1:5002/api/v1/health")
    print(f"首页: http://127.0.0.1:5002/")
    print("=" * 50)
    
    app.run(debug=True, host='0.0.0.0', port=5002)