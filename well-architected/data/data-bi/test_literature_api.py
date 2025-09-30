#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
学术文献智能处理API测试脚本
演示API的各种功能和使用方法
"""

import requests
import json
import time

class LiteratureAPITester:
    """文献API测试器"""
    
    def __init__(self, base_url="http://localhost:5001"):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({'Content-Type': 'application/json'})
    
    def test_health_check(self):
        """测试健康检查"""
        print("\n🔍 测试健康检查...")
        try:
            response = self.session.get(f"{self.base_url}/api/health")
            if response.status_code == 200:
                data = response.json()
                print(f"✅ API状态: {data['status']}")
                print(f"📅 时间戳: {data['timestamp']}")
                print(f"🔢 版本: {data['version']}")
                print(f"📋 支持格式: {', '.join(data['supported_formats'])}")
                return True
            else:
                print(f"❌ 健康检查失败: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ 连接失败: {e}")
            return False
    
    def test_extract_literature(self):
        """测试文献信息提取"""
        print("\n📚 测试文献信息提取...")
        
        # 测试数据
        test_cases = [
            {
                "name": "中文文献",
                "text": """
标题：基于深度学习的自然语言处理技术研究
作者：张三，李四，王五
摘要：本文研究了深度学习在自然语言处理领域的应用，提出了一种新的神经网络架构。通过大量实验验证，该方法在多个NLP任务上取得了显著的性能提升。
关键词：深度学习，自然语言处理，神经网络，机器学习
期刊：计算机学报
时间：2024年
DOI：10.11897/SP.J.1016.2024.00123
                """.strip()
            },
            {
                "name": "英文文献",
                "text": """
Title: Advanced Machine Learning Techniques for Computer Vision
Authors: John Smith, Jane Doe, Bob Johnson
Abstract: This paper presents novel machine learning approaches for computer vision tasks. We demonstrate significant improvements in image classification and object detection using our proposed methods.
Keywords: machine learning, computer vision, deep learning, neural networks
Journal: IEEE Transactions on Pattern Analysis and Machine Intelligence
Date: 2024-03-15
DOI: 10.1109/TPAMI.2024.1234567
                """.strip()
            },
            {
                "name": "简单格式",
                "text": """
论文题目：量子计算在密码学中的应用
作者：赵六
时间：2025年
                """.strip()
            }
        ]
        
        for i, test_case in enumerate(test_cases, 1):
            print(f"\n  📄 测试案例 {i}: {test_case['name']}")
            try:
                response = self.session.post(
                    f"{self.base_url}/api/extract",
                    json={"text": test_case["text"]}
                )
                
                if response.status_code == 200:
                    data = response.json()
                    info = data['data']
                    print(f"    ✅ 提取成功")
                    print(f"    📝 标题: {info.get('title', 'N/A')}")
                    print(f"    👥 作者: {', '.join(info.get('authors', []))}")
                    print(f"    🏷️ 关键词: {', '.join(info.get('keywords', []))}")
                    print(f"    📅 日期: {info.get('publication_date', 'N/A')}")
                    print(f"    📖 期刊: {info.get('journal', 'N/A')}")
                    print(f"    🔗 DOI: {info.get('doi', 'N/A')}")
                    print(f"    🌐 语言: {info.get('language', 'N/A')}")
                else:
                    print(f"    ❌ 提取失败: {response.status_code}")
                    print(f"    错误: {response.text}")
            
            except Exception as e:
                print(f"    ❌ 请求异常: {e}")
    
    def test_format_citation(self):
        """测试引用格式化"""
        print("\n📖 测试引用格式化...")
        
        # 示例文献信息
        literature_info = {
            "title": "深度学习在自然语言处理中的应用研究",
            "authors": ["张三", "李四", "王五"],
            "journal": "计算机学报",
            "publication_date": "2024年",
            "volume": "45",
            "issue": "3",
            "pages": "123-135",
            "doi": "10.11897/SP.J.1016.2024.00123"
        }
        
        styles = ['apa', 'mla', 'chicago', 'gb']
        
        for style in styles:
            print(f"\n  📋 {style.upper()}格式:")
            try:
                response = self.session.post(
                    f"{self.base_url}/api/format-citation?style={style}",
                    json=literature_info
                )
                
                if response.status_code == 200:
                    data = response.json()
                    citation = data['data']['citation']
                    print(f"    ✅ {citation}")
                else:
                    print(f"    ❌ 格式化失败: {response.status_code}")
            
            except Exception as e:
                print(f"    ❌ 请求异常: {e}")
    
    def test_generate_bibtex(self):
        """测试BibTeX生成"""
        print("\n📚 测试BibTeX生成...")
        
        literature_info = {
            "title": "Machine Learning Applications in Healthcare",
            "authors": ["John Smith", "Jane Doe"],
            "journal": "Nature Medicine",
            "publication_date": "2024",
            "volume": "30",
            "issue": "2",
            "pages": "456-467",
            "doi": "10.1038/s41591-024-1234-5"
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/api/generate-bibtex",
                json=literature_info
            )
            
            if response.status_code == 200:
                data = response.json()
                bibtex = data['data']['bibtex']
                print(f"✅ BibTeX生成成功:")
                print(f"\n{bibtex}")
            else:
                print(f"❌ BibTeX生成失败: {response.status_code}")
        
        except Exception as e:
            print(f"❌ 请求异常: {e}")
    
    def test_batch_process(self):
        """测试批量处理"""
        print("\n🔄 测试批量处理...")
        
        texts = [
            "标题：人工智能伦理研究\n作者：陈七\n时间：2024年",
            "Title: Quantum Computing Advances\nAuthor: Alice Brown\nDate: 2024",
            "论文题目：区块链技术应用\n作者：刘八，周九\n期刊：软件学报\n年份：2023年"
        ]
        
        try:
            response = self.session.post(
                f"{self.base_url}/api/batch-process",
                json={"texts": texts}
            )
            
            if response.status_code == 200:
                data = response.json()
                results = data['data']
                print(f"✅ 批量处理成功，共处理 {len(results)} 条文献")
                
                for result in results:
                    index = result['index']
                    status = result['status']
                    if status == 'success':
                        info = result['data']
                        print(f"  📄 文献 {index + 1}: {info.get('title', 'N/A')}")
                    else:
                        print(f"  ❌ 文献 {index + 1}: 处理失败 - {result.get('error', 'Unknown error')}")
            else:
                print(f"❌ 批量处理失败: {response.status_code}")
        
        except Exception as e:
            print(f"❌ 请求异常: {e}")
    
    def test_validate_literature(self):
        """测试文献验证"""
        print("\n✅ 测试文献验证...")
        
        test_cases = [
            {
                "name": "完整文献",
                "data": {
                    "title": "完整的研究论文",
                    "authors": ["作者一", "作者二"],
                    "abstract": "这是一个完整的摘要...",
                    "keywords": ["关键词1", "关键词2"],
                    "publication_date": "2024年",
                    "journal": "顶级期刊",
                    "doi": "10.1000/journal.2024.123"
                }
            },
            {
                "name": "不完整文献",
                "data": {
                    "title": "只有标题的论文"
                }
            },
            {
                "name": "格式错误",
                "data": {
                    "title": "格式有问题的论文",
                    "authors": "应该是数组但给了字符串",
                    "doi": "错误的DOI格式"
                }
            }
        ]
        
        for i, test_case in enumerate(test_cases, 1):
            print(f"\n  📋 验证案例 {i}: {test_case['name']}")
            try:
                response = self.session.post(
                    f"{self.base_url}/api/validate",
                    json=test_case["data"]
                )
                
                if response.status_code == 200:
                    data = response.json()
                    validation = data['data']
                    
                    print(f"    🔍 验证结果: {'✅ 有效' if validation['is_valid'] else '❌ 无效'}")
                    print(f"    📊 完整性分数: {validation['completeness_score']}%")
                    print(f"    📈 已填字段: {validation['filled_fields']}/{validation['total_fields']}")
                    
                    if validation['missing_fields']:
                        print(f"    ⚠️ 缺失字段: {', '.join(validation['missing_fields'])}")
                    
                    if validation['validation_errors']:
                        print(f"    ❌ 格式错误: {'; '.join(validation['validation_errors'])}")
                else:
                    print(f"    ❌ 验证失败: {response.status_code}")
            
            except Exception as e:
                print(f"    ❌ 请求异常: {e}")
    
    def run_all_tests(self):
        """运行所有测试"""
        print("🚀 开始学术文献智能处理API测试")
        print("=" * 50)
        
        # 健康检查
        if not self.test_health_check():
            print("\n❌ API服务不可用，请先启动服务器")
            return
        
        # 运行各项测试
        self.test_extract_literature()
        self.test_format_citation()
        self.test_generate_bibtex()
        self.test_batch_process()
        self.test_validate_literature()
        
        print("\n" + "=" * 50)
        print("🎉 所有测试完成！")
        print("\n💡 使用提示:")
        print("  1. 确保API服务器正在运行 (python academic_literature_api.py)")
        print("  2. 可以通过浏览器访问 http://localhost:5001 查看API文档")
        print("  3. 使用 curl 或 Postman 进行更多测试")

def main():
    """主函数"""
    import argparse
    
    parser = argparse.ArgumentParser(description='学术文献API测试工具')
    parser.add_argument('--url', default='http://localhost:5001', help='API服务器地址')
    parser.add_argument('--test', choices=['health', 'extract', 'citation', 'bibtex', 'batch', 'validate', 'all'], 
                       default='all', help='要运行的测试')
    
    args = parser.parse_args()
    
    tester = LiteratureAPITester(args.url)
    
    if args.test == 'all':
        tester.run_all_tests()
    elif args.test == 'health':
        tester.test_health_check()
    elif args.test == 'extract':
        tester.test_extract_literature()
    elif args.test == 'citation':
        tester.test_format_citation()
    elif args.test == 'bibtex':
        tester.test_generate_bibtex()
    elif args.test == 'batch':
        tester.test_batch_process()
    elif args.test == 'validate':
        tester.test_validate_literature()

if __name__ == '__main__':
    main()