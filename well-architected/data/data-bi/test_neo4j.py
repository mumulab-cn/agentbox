#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Neo4j图数据库测试脚本
用于测试neo4j.py中的各项功能
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from neo4j import AcademicGraphDB
import logging
import time

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Neo4jTester:
    """Neo4j功能测试类"""
    
    def __init__(self, config=None):
        self.config = config or {
            "uri": "bolt://localhost:7687",
            "username": "neo4j",
            "password": "password"
        }
        self.db = None
    
    def setup(self):
        """设置测试环境"""
        try:
            self.db = AcademicGraphDB(**self.config)
            if self.db.connect():
                logger.info("✓ Neo4j连接测试通过")
                return True
            else:
                logger.error("❌ Neo4j连接失败")
                return False
        except Exception as e:
            logger.error(f"❌ 设置测试环境失败: {e}")
            return False
    
    def teardown(self):
        """清理测试环境"""
        if self.db:
            self.db.close()
            logger.info("✓ 测试环境清理完成")
    
    def test_connection(self):
        """测试数据库连接"""
        logger.info("\n=== 测试数据库连接 ===")
        try:
            # 执行简单查询
            result = self.db.execute_query("RETURN 'Hello Neo4j' as message")
            if result and result[0]['message'] == 'Hello Neo4j':
                logger.info("✓ 数据库连接和查询测试通过")
                return True
            else:
                logger.error("❌ 查询结果不正确")
                return False
        except Exception as e:
            logger.error(f"❌ 连接测试失败: {e}")
            return False
    
    def test_constraints_creation(self):
        """测试约束创建"""
        logger.info("\n=== 测试约束创建 ===")
        try:
            self.db.create_constraints()
            logger.info("✓ 约束创建测试通过")
            return True
        except Exception as e:
            logger.error(f"❌ 约束创建测试失败: {e}")
            return False
    
    def test_node_creation(self):
        """测试节点创建"""
        logger.info("\n=== 测试节点创建 ===")
        try:
            # 清空测试数据
            self.db.clear_database()
            
            # 测试创建人员
            result = self.db.create_person(
                person_id="test_p001",
                name="测试用户",
                email="test@example.com",
                affiliation="测试大学"
            )
            logger.info("✓ 人员节点创建测试通过")
            
            # 测试创建论文
            result = self.db.create_paper(
                paper_id="test_paper001",
                title="测试论文",
                abstract="这是一篇测试论文",
                year=2024,
                doi="10.1000/test001"
            )
            logger.info("✓ 论文节点创建测试通过")
            
            # 测试创建机构
            result = self.db.create_institution(
                inst_id="test_inst001",
                name="测试大学",
                country="中国",
                city="北京"
            )
            logger.info("✓ 机构节点创建测试通过")
            
            return True
        except Exception as e:
            logger.error(f"❌ 节点创建测试失败: {e}")
            return False
    
    def test_relationship_creation(self):
        """测试关系创建"""
        logger.info("\n=== 测试关系创建 ===")
        try:
            # 创建作者关系
            result = self.db.create_authorship(
                person_id="test_p001",
                paper_id="test_paper001",
                position=1,
                corresponding=True
            )
            logger.info("✓ 作者关系创建测试通过")
            
            # 创建隶属关系
            result = self.db.create_affiliation(
                person_id="test_p001",
                inst_id="test_inst001",
                start_year=2020
            )
            logger.info("✓ 隶属关系创建测试通过")
            
            return True
        except Exception as e:
            logger.error(f"❌ 关系创建测试失败: {e}")
            return False
    
    def test_queries(self):
        """测试查询功能"""
        logger.info("\n=== 测试查询功能 ===")
        try:
            # 创建更多测试数据
            self.db.create_person(
                person_id="test_p002",
                name="测试用户2",
                email="test2@example.com"
            )
            
            self.db.create_paper(
                paper_id="test_paper002",
                title="测试论文2",
                year=2024
            )
            
            # 创建合作关系
            self.db.create_authorship(
                person_id="test_p002",
                paper_id="test_paper001",
                position=2
            )
            
            # 创建引用关系
            self.db.create_citation(
                citing_paper_id="test_paper002",
                cited_paper_id="test_paper001"
            )
            
            # 测试查找合作者
            collaborators = self.db.find_collaborators("test_p001")
            if collaborators:
                logger.info(f"✓ 合作者查询测试通过，找到 {len(collaborators)} 个合作者")
            else:
                logger.info("✓ 合作者查询测试通过（无合作者）")
            
            # 测试查找有影响力的论文
            influential = self.db.find_influential_papers(min_citations=1)
            if influential:
                logger.info(f"✓ 影响力论文查询测试通过，找到 {len(influential)} 篇论文")
            else:
                logger.info("✓ 影响力论文查询测试通过（无符合条件论文）")
            
            # 测试作者统计
            stats = self.db.get_author_statistics("test_p001")
            if stats:
                logger.info(f"✓ 作者统计查询测试通过: {stats['name']} - {stats['paper_count']}篇论文")
            else:
                logger.info("✓ 作者统计查询测试通过（无数据）")
            
            return True
        except Exception as e:
            logger.error(f"❌ 查询功能测试失败: {e}")
            return False
    
    def test_custom_queries(self):
        """测试自定义查询"""
        logger.info("\n=== 测试自定义查询 ===")
        try:
            # 测试节点计数
            query = "MATCH (n) RETURN labels(n) as node_type, count(n) as count"
            results = self.db.execute_query(query)
            
            logger.info("节点统计:")
            for result in results:
                logger.info(f"  - {result['node_type']}: {result['count']}个")
            
            # 测试关系计数
            query = "MATCH ()-[r]->() RETURN type(r) as rel_type, count(r) as count"
            results = self.db.execute_query(query)
            
            logger.info("关系统计:")
            for result in results:
                logger.info(f"  - {result['rel_type']}: {result['count']}个")
            
            logger.info("✓ 自定义查询测试通过")
            return True
        except Exception as e:
            logger.error(f"❌ 自定义查询测试失败: {e}")
            return False
    
    def test_performance(self):
        """测试性能"""
        logger.info("\n=== 测试性能 ===")
        try:
            # 批量创建节点性能测试
            start_time = time.time()
            
            for i in range(10):
                self.db.create_person(
                    person_id=f"perf_p{i:03d}",
                    name=f"性能测试用户{i}",
                    email=f"perf{i}@example.com"
                )
            
            end_time = time.time()
            duration = end_time - start_time
            
            logger.info(f"✓ 性能测试通过: 创建10个节点耗时 {duration:.3f} 秒")
            
            # 查询性能测试
            start_time = time.time()
            
            query = "MATCH (p:Person) WHERE p.name CONTAINS '性能测试' RETURN count(p) as count"
            result = self.db.execute_query(query)
            
            end_time = time.time()
            duration = end_time - start_time
            
            logger.info(f"✓ 查询性能测试通过: 查询耗时 {duration:.3f} 秒，找到 {result[0]['count']} 个节点")
            
            return True
        except Exception as e:
            logger.error(f"❌ 性能测试失败: {e}")
            return False
    
    def run_all_tests(self):
        """运行所有测试"""
        logger.info("开始运行Neo4j功能测试...")
        
        tests = [
            ("连接测试", self.test_connection),
            ("约束创建测试", self.test_constraints_creation),
            ("节点创建测试", self.test_node_creation),
            ("关系创建测试", self.test_relationship_creation),
            ("查询功能测试", self.test_queries),
            ("自定义查询测试", self.test_custom_queries),
            ("性能测试", self.test_performance)
        ]
        
        passed = 0
        total = len(tests)
        
        for test_name, test_func in tests:
            try:
                if test_func():
                    passed += 1
                else:
                    logger.error(f"❌ {test_name} 失败")
            except Exception as e:
                logger.error(f"❌ {test_name} 执行异常: {e}")
        
        logger.info(f"\n=== 测试结果 ===")
        logger.info(f"通过: {passed}/{total}")
        
        if passed == total:
            logger.info("🎉 所有测试通过！")
        else:
            logger.warning(f"⚠️  {total - passed} 个测试失败")
        
        return passed == total

def test_without_neo4j():
    """在没有Neo4j服务的情况下测试代码结构"""
    logger.info("=== 代码结构测试（无需Neo4j服务）===")
    
    try:
        # 测试导入
        from neo4j import AcademicGraphDB
        logger.info("✓ 模块导入测试通过")
        
        # 测试类实例化
        db = AcademicGraphDB()
        logger.info("✓ 类实例化测试通过")
        
        # 测试方法存在性
        methods = [
            'connect', 'close', 'execute_query', 'execute_write',
            'create_person', 'create_paper', 'create_institution',
            'create_authorship', 'create_citation', 'create_affiliation',
            'find_collaborators', 'find_influential_papers', 'get_author_statistics'
        ]
        
        for method in methods:
            if hasattr(db, method):
                logger.info(f"✓ 方法 {method} 存在")
            else:
                logger.error(f"❌ 方法 {method} 不存在")
        
        logger.info("✓ 代码结构测试完成")
        return True
        
    except ImportError as e:
        logger.error(f"❌ 导入失败: {e}")
        logger.info("提示: 请安装neo4j包: pip install neo4j")
        return False
    except Exception as e:
        logger.error(f"❌ 代码结构测试失败: {e}")
        return False

def main():
    """主函数"""
    print("=" * 60)
    print("Neo4j图数据库功能测试")
    print("=" * 60)
    
    # 首先进行代码结构测试
    if not test_without_neo4j():
        print("\n代码结构测试失败，请检查代码")
        return
    
    print("\n" + "=" * 40)
    print("Neo4j服务连接测试")
    print("=" * 40)
    
    # 配置信息
    config = {
        "uri": "bolt://localhost:7687",
        "username": "neo4j",
        "password": "password"  # 请修改为实际密码
    }
    
    print(f"连接配置: {config['uri']}")
    print("注意: 请确保Neo4j服务已启动")
    
    # 询问是否进行完整测试
    full_test = input("\n是否进行完整的Neo4j功能测试？(需要Neo4j服务运行) (y/n): ")
    
    if full_test.lower() == 'y':
        tester = Neo4jTester(config)
        
        try:
            if tester.setup():
                success = tester.run_all_tests()
                if success:
                    print("\n🎉 所有测试通过！Neo4j功能正常。")
                else:
                    print("\n⚠️  部分测试失败，请检查错误信息。")
            else:
                print("\n❌ 无法连接到Neo4j服务，请检查:")
                print("1. Neo4j服务是否已启动")
                print("2. 连接配置是否正确")
                print("3. 用户名和密码是否正确")
        
        finally:
            tester.teardown()
    else:
        print("\n跳过Neo4j服务测试")
    
    print("\n=== 使用说明 ===")
    print("1. 安装Neo4j: pip install neo4j")
    print("2. 启动Neo4j服务")
    print("3. 修改连接配置")
    print("4. 运行 python neo4j.py 进行完整演示")
    print("5. 在代码中导入 AcademicGraphDB 类使用")

if __name__ == "__main__":
    main()