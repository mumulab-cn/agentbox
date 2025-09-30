# -*- coding: utf-8 -*-
"""
Swagger API测试脚本
测试学术数据管理API的各项功能
"""

import requests
import json
from datetime import datetime
import time

class SwaggerAPITester:
    """Swagger API测试类"""
    
    def __init__(self, base_url="http://127.0.0.1:5002"):
        self.base_url = base_url
        self.api_base = f"{base_url}/api/v1"
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
    
    def print_separator(self, title):
        """打印分隔符"""
        print("\n" + "=" * 60)
        print(f"  {title}")
        print("=" * 60)
    
    def print_response(self, response, title="响应结果"):
        """格式化打印响应结果"""
        print(f"\n{title}:")
        print(f"状态码: {response.status_code}")
        try:
            data = response.json()
            print(f"响应数据: {json.dumps(data, ensure_ascii=False, indent=2)}")
        except:
            print(f"响应内容: {response.text}")
    
    def test_health_check(self):
        """测试健康检查接口"""
        self.print_separator("健康检查测试")
        
        try:
            response = self.session.get(f"{self.api_base}/health")
            self.print_response(response, "健康检查")
            return response.status_code == 200
        except Exception as e:
            print(f"健康检查失败: {e}")
            return False
    
    def test_user_operations(self):
        """测试用户管理操作"""
        self.print_separator("用户管理测试")
        
        # 1. 获取用户列表
        print("\n1. 获取用户列表")
        response = self.session.get(f"{self.api_base}/users")
        self.print_response(response)
        
        # 2. 按角色筛选用户
        print("\n2. 按角色筛选用户 (researcher)")
        response = self.session.get(f"{self.api_base}/users?role=researcher")
        self.print_response(response)
        
        # 3. 创建新用户
        print("\n3. 创建新用户")
        new_user = {
            "name": "测试用户",
            "email": "test@example.com",
            "role": "student"
        }
        response = self.session.post(f"{self.api_base}/users", json=new_user)
        self.print_response(response)
        
        if response.status_code == 201:
            user_data = response.json().get('data', {})
            user_id = user_data.get('id')
            
            if user_id:
                # 4. 获取用户详情
                print(f"\n4. 获取用户详情 (ID: {user_id})")
                response = self.session.get(f"{self.api_base}/users/{user_id}")
                self.print_response(response)
                
                # 5. 更新用户信息
                print(f"\n5. 更新用户信息 (ID: {user_id})")
                update_data = {
                    "name": "更新后的用户",
                    "email": "updated@example.com",
                    "role": "researcher"
                }
                response = self.session.put(f"{self.api_base}/users/{user_id}", json=update_data)
                self.print_response(response)
                
                # 6. 删除用户
                print(f"\n6. 删除用户 (ID: {user_id})")
                response = self.session.delete(f"{self.api_base}/users/{user_id}")
                self.print_response(response)
        
        # 7. 测试重复邮箱
        print("\n7. 测试重复邮箱创建")
        duplicate_user = {
            "name": "重复邮箱用户",
            "email": "zhangsan@example.com",  # 已存在的邮箱
            "role": "student"
        }
        response = self.session.post(f"{self.api_base}/users", json=duplicate_user)
        self.print_response(response)
    
    def test_paper_operations(self):
        """测试论文管理操作"""
        self.print_separator("论文管理测试")
        
        # 1. 获取论文列表
        print("\n1. 获取论文列表")
        response = self.session.get(f"{self.api_base}/papers")
        self.print_response(response)
        
        # 2. 按年份筛选论文
        print("\n2. 按年份筛选论文 (2024)")
        response = self.session.get(f"{self.api_base}/papers?year=2024")
        self.print_response(response)
        
        # 3. 关键词搜索
        print("\n3. 关键词搜索 (深度学习)")
        response = self.session.get(f"{self.api_base}/papers?keyword=深度学习")
        self.print_response(response)
        
        # 4. 添加新论文
        print("\n4. 添加新论文")
        new_paper = {
            "title": "区块链技术在数据安全中的应用研究",
            "authors": ["测试作者1", "测试作者2"],
            "journal": "信息安全学报",
            "year": 2024,
            "doi": "10.1234/test.2024.001",
            "keywords": ["区块链", "数据安全", "加密技术"],
            "abstract": "本文研究了区块链技术在数据安全领域的应用...",
            "status": "draft"
        }
        response = self.session.post(f"{self.api_base}/papers", json=new_paper)
        self.print_response(response)
        
        if response.status_code == 201:
            paper_data = response.json().get('data', {})
            paper_id = paper_data.get('id')
            
            if paper_id:
                # 5. 获取论文详情
                print(f"\n5. 获取论文详情 (ID: {paper_id})")
                response = self.session.get(f"{self.api_base}/papers/{paper_id}")
                self.print_response(response)
                
                # 6. 更新论文状态
                print(f"\n6. 更新论文状态 (ID: {paper_id})")
                update_data = {
                    "title": "区块链技术在数据安全中的应用研究（修订版）",
                    "authors": ["测试作者1", "测试作者2", "测试作者3"],
                    "status": "submitted"
                }
                response = self.session.put(f"{self.api_base}/papers/{paper_id}", json=update_data)
                self.print_response(response)
    
    def test_project_operations(self):
        """测试项目管理操作"""
        self.print_separator("项目管理测试")
        
        # 1. 获取项目列表
        print("\n1. 获取项目列表")
        response = self.session.get(f"{self.api_base}/projects")
        self.print_response(response)
        
        # 2. 按状态筛选项目
        print("\n2. 按状态筛选项目 (active)")
        response = self.session.get(f"{self.api_base}/projects?status=active")
        self.print_response(response)
        
        # 3. 获取项目详情
        print("\n3. 获取项目详情 (ID: 1)")
        response = self.session.get(f"{self.api_base}/projects/1")
        self.print_response(response)
    
    def test_analytics_operations(self):
        """测试数据分析操作"""
        self.print_separator("数据分析测试")
        
        # 1. 获取统计数据
        print("\n1. 获取统计数据")
        response = self.session.get(f"{self.api_base}/analytics/stats")
        self.print_response(response)
        
        # 2. 获取论文趋势
        print("\n2. 获取论文趋势")
        response = self.session.get(f"{self.api_base}/analytics/trends?type=papers")
        self.print_response(response)
        
        # 3. 获取关键词分析
        print("\n3. 获取关键词分析")
        response = self.session.get(f"{self.api_base}/analytics/trends?type=keywords")
        self.print_response(response)
        
        # 4. 获取用户增长趋势
        print("\n4. 获取用户增长趋势")
        response = self.session.get(f"{self.api_base}/analytics/trends?type=users")
        self.print_response(response)
        
        # 5. 测试不支持的分析类型
        print("\n5. 测试不支持的分析类型")
        response = self.session.get(f"{self.api_base}/analytics/trends?type=invalid")
        self.print_response(response)
    
    def test_error_handling(self):
        """测试错误处理"""
        self.print_separator("错误处理测试")
        
        # 1. 访问不存在的用户
        print("\n1. 访问不存在的用户 (ID: 999)")
        response = self.session.get(f"{self.api_base}/users/999")
        self.print_response(response)
        
        # 2. 访问不存在的论文
        print("\n2. 访问不存在的论文 (ID: 999)")
        response = self.session.get(f"{self.api_base}/papers/999")
        self.print_response(response)
        
        # 3. 访问不存在的项目
        print("\n3. 访问不存在的项目 (ID: 999)")
        response = self.session.get(f"{self.api_base}/projects/999")
        self.print_response(response)
        
        # 4. 无效的API路径
        print("\n4. 访问无效的API路径")
        response = self.session.get(f"{self.api_base}/invalid-endpoint")
        self.print_response(response)
    
    def test_swagger_documentation(self):
        """测试Swagger文档访问"""
        self.print_separator("Swagger文档测试")
        
        # 1. 访问首页
        print("\n1. 访问首页")
        try:
            response = self.session.get(self.base_url)
            print(f"状态码: {response.status_code}")
            if response.status_code == 200:
                print("首页访问成功")
            else:
                print("首页访问失败")
        except Exception as e:
            print(f"首页访问异常: {e}")
        
        # 2. 访问Swagger文档
        print("\n2. 访问Swagger文档")
        try:
            response = self.session.get(f"{self.base_url}/docs/")
            print(f"状态码: {response.status_code}")
            if response.status_code == 200:
                print("Swagger文档访问成功")
            else:
                print("Swagger文档访问失败")
        except Exception as e:
            print(f"Swagger文档访问异常: {e}")
    
    def run_all_tests(self):
        """运行所有测试"""
        print("开始运行Swagger API测试")
        print(f"测试时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"API基础地址: {self.api_base}")
        
        # 首先检查服务是否可用
        if not self.test_health_check():
            print("\n❌ API服务不可用，请先启动swagger.py")
            print("启动命令: python swagger.py")
            return False
        
        try:
            # 运行各项测试
            self.test_swagger_documentation()
            self.test_user_operations()
            self.test_paper_operations()
            self.test_project_operations()
            self.test_analytics_operations()
            self.test_error_handling()
            
            self.print_separator("测试完成")
            print("✅ 所有测试已完成")
            print(f"\n📚 Swagger文档地址: {self.base_url}/docs/")
            print(f"🏠 首页地址: {self.base_url}/")
            print(f"🔍 健康检查: {self.api_base}/health")
            
            return True
            
        except Exception as e:
            print(f"\n❌ 测试过程中发生错误: {e}")
            return False
    
    def test_api_performance(self):
        """测试API性能"""
        self.print_separator("API性能测试")
        
        endpoints = [
            ("/health", "健康检查"),
            ("/users", "用户列表"),
            ("/papers", "论文列表"),
            ("/projects", "项目列表"),
            ("/analytics/stats", "统计数据")
        ]
        
        for endpoint, name in endpoints:
            print(f"\n测试 {name} ({endpoint})")
            
            # 测试多次请求的平均响应时间
            times = []
            for i in range(5):
                start_time = time.time()
                try:
                    response = self.session.get(f"{self.api_base}{endpoint}")
                    end_time = time.time()
                    response_time = (end_time - start_time) * 1000  # 转换为毫秒
                    times.append(response_time)
                    print(f"  请求 {i+1}: {response_time:.2f}ms (状态码: {response.status_code})")
                except Exception as e:
                    print(f"  请求 {i+1}: 失败 - {e}")
            
            if times:
                avg_time = sum(times) / len(times)
                print(f"  平均响应时间: {avg_time:.2f}ms")

def main():
    """主函数"""
    print("Swagger API测试工具")
    print("=" * 50)
    
    # 检查依赖
    try:
        import requests
    except ImportError:
        print("❌ 缺少requests库，请安装: pip install requests")
        return
    
    # 创建测试实例
    tester = SwaggerAPITester()
    
    # 提供测试选项
    while True:
        print("\n请选择测试选项:")
        print("1. 运行所有测试")
        print("2. 健康检查")
        print("3. 用户管理测试")
        print("4. 论文管理测试")
        print("5. 项目管理测试")
        print("6. 数据分析测试")
        print("7. 错误处理测试")
        print("8. Swagger文档测试")
        print("9. API性能测试")
        print("0. 退出")
        
        choice = input("\n请输入选择 (0-9): ").strip()
        
        if choice == '0':
            print("退出测试")
            break
        elif choice == '1':
            tester.run_all_tests()
        elif choice == '2':
            tester.test_health_check()
        elif choice == '3':
            tester.test_user_operations()
        elif choice == '4':
            tester.test_paper_operations()
        elif choice == '5':
            tester.test_project_operations()
        elif choice == '6':
            tester.test_analytics_operations()
        elif choice == '7':
            tester.test_error_handling()
        elif choice == '8':
            tester.test_swagger_documentation()
        elif choice == '9':
            tester.test_api_performance()
        else:
            print("无效选择，请重新输入")

if __name__ == '__main__':
    main()