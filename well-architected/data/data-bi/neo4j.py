#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Neo4j图数据库操作示例
包含连接、CRUD操作、图数据建模、查询等功能
"""

from neo4j import GraphDatabase
import logging
from typing import Dict, List, Any, Optional
import json
from datetime import datetime

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Neo4jManager:
    """Neo4j数据库管理类"""
    
    def __init__(self, uri: str, username: str, password: str):
        """
        初始化Neo4j连接
        
        Args:
            uri: Neo4j数据库URI (例如: bolt://localhost:7687)
            username: 用户名
            password: 密码
        """
        self.uri = uri
        self.username = username
        self.password = password
        self.driver = None
        
    def connect(self):
        """建立数据库连接"""
        try:
            self.driver = GraphDatabase.driver(
                self.uri, 
                auth=(self.username, self.password)
            )
            # 测试连接
            with self.driver.session() as session:
                result = session.run("RETURN 1 as test")
                test_value = result.single()["test"]
                if test_value == 1:
                    logger.info("Neo4j连接成功")
                    return True
        except Exception as e:
            logger.error(f"Neo4j连接失败: {e}")
            return False
    
    def close(self):
        """关闭数据库连接"""
        if self.driver:
            self.driver.close()
            logger.info("Neo4j连接已关闭")
    
    def execute_query(self, query: str, parameters: Dict = None) -> List[Dict]:
        """执行Cypher查询"""
        if not self.driver:
            raise Exception("数据库未连接")
        
        try:
            with self.driver.session() as session:
                result = session.run(query, parameters or {})
                return [record.data() for record in result]
        except Exception as e:
            logger.error(f"查询执行失败: {e}")
            raise
    
    def execute_write(self, query: str, parameters: Dict = None) -> Dict:
        """执行写操作"""
        if not self.driver:
            raise Exception("数据库未连接")
        
        try:
            with self.driver.session() as session:
                result = session.write_transaction(self._execute_write_tx, query, parameters or {})
                return result
        except Exception as e:
            logger.error(f"写操作执行失败: {e}")
            raise
    
    @staticmethod
    def _execute_write_tx(tx, query: str, parameters: Dict):
        """写事务执行器"""
        result = tx.run(query, parameters)
        return result.consume().counters

class AcademicGraphDB(Neo4jManager):
    """学术图数据库 - 专门用于学术数据建模"""
    
    def __init__(self, uri: str = "bolt://localhost:7687", 
                 username: str = "neo4j", password: str = "password"):
        super().__init__(uri, username, password)
    
    def create_constraints(self):
        """创建约束和索引"""
        constraints = [
            "CREATE CONSTRAINT IF NOT EXISTS FOR (p:Person) REQUIRE p.id IS UNIQUE",
            "CREATE CONSTRAINT IF NOT EXISTS FOR (paper:Paper) REQUIRE paper.id IS UNIQUE",
            "CREATE CONSTRAINT IF NOT EXISTS FOR (inst:Institution) REQUIRE inst.id IS UNIQUE",
            "CREATE CONSTRAINT IF NOT EXISTS FOR (conf:Conference) REQUIRE conf.id IS UNIQUE",
            "CREATE INDEX IF NOT EXISTS FOR (p:Person) ON (p.name)",
            "CREATE INDEX IF NOT EXISTS FOR (paper:Paper) ON (paper.title)",
            "CREATE INDEX IF NOT EXISTS FOR (paper:Paper) ON (paper.year)"
        ]
        
        for constraint in constraints:
            try:
                self.execute_write(constraint)
                logger.info(f"约束/索引创建成功: {constraint[:50]}...")
            except Exception as e:
                logger.warning(f"约束/索引创建失败: {e}")
    
    def create_person(self, person_id: str, name: str, email: str = None, 
                     affiliation: str = None, **kwargs) -> Dict:
        """创建人员节点"""
        query = """
        CREATE (p:Person {
            id: $person_id,
            name: $name,
            email: $email,
            affiliation: $affiliation,
            created_at: datetime()
        })
        RETURN p
        """
        
        parameters = {
            "person_id": person_id,
            "name": name,
            "email": email,
            "affiliation": affiliation
        }
        parameters.update(kwargs)
        
        return self.execute_write(query, parameters)
    
    def create_paper(self, paper_id: str, title: str, abstract: str = None,
                    year: int = None, doi: str = None, **kwargs) -> Dict:
        """创建论文节点"""
        query = """
        CREATE (paper:Paper {
            id: $paper_id,
            title: $title,
            abstract: $abstract,
            year: $year,
            doi: $doi,
            created_at: datetime()
        })
        RETURN paper
        """
        
        parameters = {
            "paper_id": paper_id,
            "title": title,
            "abstract": abstract,
            "year": year,
            "doi": doi
        }
        parameters.update(kwargs)
        
        return self.execute_write(query, parameters)
    
    def create_institution(self, inst_id: str, name: str, country: str = None,
                          city: str = None, **kwargs) -> Dict:
        """创建机构节点"""
        query = """
        CREATE (inst:Institution {
            id: $inst_id,
            name: $name,
            country: $country,
            city: $city,
            created_at: datetime()
        })
        RETURN inst
        """
        
        parameters = {
            "inst_id": inst_id,
            "name": name,
            "country": country,
            "city": city
        }
        parameters.update(kwargs)
        
        return self.execute_write(query, parameters)
    
    def create_authorship(self, person_id: str, paper_id: str, 
                         position: int = None, corresponding: bool = False) -> Dict:
        """创建作者关系"""
        query = """
        MATCH (p:Person {id: $person_id}), (paper:Paper {id: $paper_id})
        CREATE (p)-[r:AUTHORED {
            position: $position,
            corresponding: $corresponding,
            created_at: datetime()
        }]->(paper)
        RETURN r
        """
        
        parameters = {
            "person_id": person_id,
            "paper_id": paper_id,
            "position": position,
            "corresponding": corresponding
        }
        
        return self.execute_write(query, parameters)
    
    def create_citation(self, citing_paper_id: str, cited_paper_id: str) -> Dict:
        """创建引用关系"""
        query = """
        MATCH (citing:Paper {id: $citing_paper_id}), (cited:Paper {id: $cited_paper_id})
        CREATE (citing)-[r:CITES {
            created_at: datetime()
        }]->(cited)
        RETURN r
        """
        
        parameters = {
            "citing_paper_id": citing_paper_id,
            "cited_paper_id": cited_paper_id
        }
        
        return self.execute_write(query, parameters)
    
    def create_affiliation(self, person_id: str, inst_id: str, 
                          start_year: int = None, end_year: int = None) -> Dict:
        """创建隶属关系"""
        query = """
        MATCH (p:Person {id: $person_id}), (inst:Institution {id: $inst_id})
        CREATE (p)-[r:AFFILIATED_WITH {
            start_year: $start_year,
            end_year: $end_year,
            created_at: datetime()
        }]->(inst)
        RETURN r
        """
        
        parameters = {
            "person_id": person_id,
            "inst_id": inst_id,
            "start_year": start_year,
            "end_year": end_year
        }
        
        return self.execute_write(query, parameters)
    
    def find_collaborators(self, person_id: str, min_papers: int = 1) -> List[Dict]:
        """查找合作者"""
        query = """
        MATCH (p1:Person {id: $person_id})-[:AUTHORED]->(paper:Paper)<-[:AUTHORED]-(p2:Person)
        WHERE p1 <> p2
        WITH p1, p2, count(paper) as collaboration_count
        WHERE collaboration_count >= $min_papers
        RETURN p2.id as collaborator_id, p2.name as collaborator_name, 
               collaboration_count
        ORDER BY collaboration_count DESC
        """
        
        parameters = {
            "person_id": person_id,
            "min_papers": min_papers
        }
        
        return self.execute_query(query, parameters)
    
    def find_influential_papers(self, min_citations: int = 5) -> List[Dict]:
        """查找有影响力的论文"""
        query = """
        MATCH (paper:Paper)<-[c:CITES]-(citing:Paper)
        WITH paper, count(c) as citation_count
        WHERE citation_count >= $min_citations
        RETURN paper.id as paper_id, paper.title as title, 
               paper.year as year, citation_count
        ORDER BY citation_count DESC
        """
        
        parameters = {"min_citations": min_citations}
        return self.execute_query(query, parameters)
    
    def find_research_communities(self, min_size: int = 3) -> List[Dict]:
        """发现研究社区"""
        query = """
        MATCH (p1:Person)-[:AUTHORED]->(paper:Paper)<-[:AUTHORED]-(p2:Person)
        WHERE p1 <> p2
        WITH p1, p2, count(paper) as collaboration_strength
        WHERE collaboration_strength >= 2
        MATCH path = (p1)-[:AUTHORED*..4]-(p2)
        WITH collect(distinct p1) + collect(distinct p2) as community
        WHERE size(community) >= $min_size
        RETURN community
        """
        
        parameters = {"min_size": min_size}
        return self.execute_query(query, parameters)
    
    def get_author_statistics(self, person_id: str) -> Dict:
        """获取作者统计信息"""
        query = """
        MATCH (p:Person {id: $person_id})
        OPTIONAL MATCH (p)-[:AUTHORED]->(paper:Paper)
        OPTIONAL MATCH (paper)<-[:CITES]-(citing:Paper)
        WITH p, count(distinct paper) as paper_count, count(citing) as total_citations
        OPTIONAL MATCH (p)-[:AUTHORED]->(paper:Paper)<-[:AUTHORED]-(collaborator:Person)
        WHERE p <> collaborator
        WITH p, paper_count, total_citations, count(distinct collaborator) as collaborator_count
        RETURN {
            person_id: p.id,
            name: p.name,
            paper_count: paper_count,
            total_citations: total_citations,
            collaborator_count: collaborator_count,
            h_index: 0  // 需要复杂查询计算
        } as statistics
        """
        
        parameters = {"person_id": person_id}
        result = self.execute_query(query, parameters)
        return result[0]["statistics"] if result else {}
    
    def clear_database(self):
        """清空数据库（谨慎使用）"""
        query = "MATCH (n) DETACH DELETE n"
        return self.execute_write(query)

def create_sample_data(db: AcademicGraphDB):
    """创建示例数据"""
    logger.info("开始创建示例数据...")
    
    # 创建人员
    people = [
        {"id": "p001", "name": "张三", "email": "zhangsan@university.edu", "affiliation": "清华大学"},
        {"id": "p002", "name": "李四", "email": "lisi@university.edu", "affiliation": "北京大学"},
        {"id": "p003", "name": "王五", "email": "wangwu@university.edu", "affiliation": "中科院"},
        {"id": "p004", "name": "赵六", "email": "zhaoliu@university.edu", "affiliation": "清华大学"}
    ]
    
    for person in people:
        try:
            db.create_person(**person)
            logger.info(f"创建人员: {person['name']}")
        except Exception as e:
            logger.warning(f"人员创建失败: {e}")
    
    # 创建机构
    institutions = [
        {"id": "inst001", "name": "清华大学", "country": "中国", "city": "北京"},
        {"id": "inst002", "name": "北京大学", "country": "中国", "city": "北京"},
        {"id": "inst003", "name": "中科院", "country": "中国", "city": "北京"}
    ]
    
    for inst in institutions:
        try:
            db.create_institution(**inst)
            logger.info(f"创建机构: {inst['name']}")
        except Exception as e:
            logger.warning(f"机构创建失败: {e}")
    
    # 创建论文
    papers = [
        {
            "id": "paper001", 
            "title": "深度学习在自然语言处理中的应用", 
            "abstract": "本文探讨了深度学习技术在NLP领域的最新进展...",
            "year": 2023,
            "doi": "10.1000/paper001"
        },
        {
            "id": "paper002", 
            "title": "图神经网络综述", 
            "abstract": "图神经网络是处理图结构数据的重要方法...",
            "year": 2023,
            "doi": "10.1000/paper002"
        },
        {
            "id": "paper003", 
            "title": "知识图谱构建技术研究", 
            "abstract": "知识图谱作为人工智能的重要基础设施...",
            "year": 2022,
            "doi": "10.1000/paper003"
        }
    ]
    
    for paper in papers:
        try:
            db.create_paper(**paper)
            logger.info(f"创建论文: {paper['title'][:20]}...")
        except Exception as e:
            logger.warning(f"论文创建失败: {e}")
    
    # 创建作者关系
    authorships = [
        {"person_id": "p001", "paper_id": "paper001", "position": 1, "corresponding": True},
        {"person_id": "p002", "paper_id": "paper001", "position": 2, "corresponding": False},
        {"person_id": "p002", "paper_id": "paper002", "position": 1, "corresponding": True},
        {"person_id": "p003", "paper_id": "paper002", "position": 2, "corresponding": False},
        {"person_id": "p003", "paper_id": "paper003", "position": 1, "corresponding": True},
        {"person_id": "p004", "paper_id": "paper003", "position": 2, "corresponding": False}
    ]
    
    for authorship in authorships:
        try:
            db.create_authorship(**authorship)
            logger.info(f"创建作者关系: {authorship['person_id']} -> {authorship['paper_id']}")
        except Exception as e:
            logger.warning(f"作者关系创建失败: {e}")
    
    # 创建引用关系
    citations = [
        {"citing_paper_id": "paper001", "cited_paper_id": "paper003"},
        {"citing_paper_id": "paper002", "cited_paper_id": "paper003"}
    ]
    
    for citation in citations:
        try:
            db.create_citation(**citation)
            logger.info(f"创建引用关系: {citation['citing_paper_id']} -> {citation['cited_paper_id']}")
        except Exception as e:
            logger.warning(f"引用关系创建失败: {e}")
    
    logger.info("示例数据创建完成")

def demo_queries(db: AcademicGraphDB):
    """演示查询功能"""
    logger.info("\n=== 开始演示查询功能 ===")
    
    # 1. 查找合作者
    logger.info("\n1. 查找张三的合作者:")
    collaborators = db.find_collaborators("p001")
    for collab in collaborators:
        print(f"  - {collab['collaborator_name']}: {collab['collaboration_count']}篇合作论文")
    
    # 2. 查找有影响力的论文
    logger.info("\n2. 查找有影响力的论文:")
    influential_papers = db.find_influential_papers(min_citations=1)
    for paper in influential_papers:
        print(f"  - {paper['title'][:30]}... ({paper['year']}): {paper['citation_count']}次引用")
    
    # 3. 获取作者统计
    logger.info("\n3. 张三的统计信息:")
    stats = db.get_author_statistics("p001")
    if stats:
        print(f"  - 姓名: {stats['name']}")
        print(f"  - 论文数量: {stats['paper_count']}")
        print(f"  - 总引用数: {stats['total_citations']}")
        print(f"  - 合作者数量: {stats['collaborator_count']}")
    
    # 4. 自定义查询示例
    logger.info("\n4. 自定义查询 - 按年份统计论文数量:")
    query = """
    MATCH (paper:Paper)
    WHERE paper.year IS NOT NULL
    RETURN paper.year as year, count(paper) as paper_count
    ORDER BY year DESC
    """
    
    results = db.execute_query(query)
    for result in results:
        print(f"  - {result['year']}年: {result['paper_count']}篇论文")

def main():
    """主函数"""
    print("=" * 60)
    print("Neo4j图数据库操作示例")
    print("=" * 60)
    
    # 配置信息
    config = {
        "uri": "bolt://localhost:7687",
        "username": "neo4j",
        "password": "password"  # 请修改为实际密码
    }
    
    print(f"连接配置: {config['uri']}")
    print("注意: 请确保Neo4j服务已启动，并修改正确的连接信息")
    
    # 创建数据库实例
    db = AcademicGraphDB(**config)
    
    try:
        # 连接数据库
        if not db.connect():
            print("❌ 数据库连接失败，请检查Neo4j服务和连接配置")
            return
        
        print("✓ 数据库连接成功")
        
        # 创建约束和索引
        print("\n创建约束和索引...")
        db.create_constraints()
        
        # 询问是否清空数据库
        clear_db = input("\n是否清空现有数据？(y/n): ")
        if clear_db.lower() == 'y':
            db.clear_database()
            print("✓ 数据库已清空")
        
        # 创建示例数据
        create_sample = input("\n是否创建示例数据？(y/n): ")
        if create_sample.lower() == 'y':
            create_sample_data(db)
        
        # 演示查询
        demo_sample = input("\n是否演示查询功能？(y/n): ")
        if demo_sample.lower() == 'y':
            demo_queries(db)
        
        print("\n=== 可用的操作方法 ===")
        print("1. db.create_person() - 创建人员")
        print("2. db.create_paper() - 创建论文")
        print("3. db.create_institution() - 创建机构")
        print("4. db.create_authorship() - 创建作者关系")
        print("5. db.create_citation() - 创建引用关系")
        print("6. db.find_collaborators() - 查找合作者")
        print("7. db.find_influential_papers() - 查找有影响力论文")
        print("8. db.get_author_statistics() - 获取作者统计")
        print("9. db.execute_query() - 执行自定义查询")
        
    except Exception as e:
        logger.error(f"程序执行出错: {e}")
        import traceback
        traceback.print_exc()
    
    finally:
        # 关闭连接
        db.close()
        print("\n程序执行完成")

if __name__ == "__main__":
    main()