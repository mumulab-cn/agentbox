# -*- coding: utf-8 -*-
"""
EndNote导出工具测试脚本
演示如何使用EndNote导出功能
"""

import os
import sys
from endnote import EndNoteExporter, EndNoteRecord

def test_basic_export():
    """测试基本导出功能"""
    print("\n=== 测试基本导出功能 ===")
    
    # 创建导出器
    exporter = EndNoteExporter()
    
    # 添加测试数据
    test_records = [
        EndNoteRecord(
            title="深度学习在自然语言处理中的应用",
            authors=["张三", "李四", "王五"],
            journal="计算机学报",
            year="2024",
            volume="47",
            issue="2",
            pages="234-245",
            abstract="本文综述了深度学习技术在自然语言处理领域的最新进展...",
            keywords=["深度学习", "自然语言处理", "神经网络", "机器学习"],
            doi="10.11897/SP.J.1016.2024.00234"
        ),
        EndNoteRecord(
            title="基于Transformer的文本分类模型研究",
            authors=["赵六", "钱七"],
            journal="软件学报",
            year="2023",
            volume="34",
            issue="8",
            pages="3456-3467",
            abstract="提出了一种改进的Transformer模型用于文本分类任务...",
            keywords=["Transformer", "文本分类", "注意力机制"],
            doi="10.13328/j.cnki.jos.006789"
        ),
        EndNoteRecord(
            title="机器学习算法比较研究",
            authors=["孙八"],
            journal="人工智能",
            year="2023",
            volume="15",
            issue="4",
            pages="78-89",
            abstract="对比分析了多种机器学习算法的性能和适用场景...",
            keywords=["机器学习", "算法比较", "性能评估"]
        )
    ]
    
    # 添加记录
    for record in test_records:
        exporter.add_record(record)
    
    print(f"添加了 {exporter.get_records_count()} 条测试记录")
    
    # 预览记录
    exporter.preview_records()
    
    # 导出为EndNote格式
    endnote_file = "test_export.enw"
    success = exporter.export_to_endnote(endnote_file)
    if success:
        print(f"✓ EndNote格式导出成功: {endnote_file}")
    else:
        print("✗ EndNote格式导出失败")
    
    # 导出为RIS格式
    ris_file = "test_export.ris"
    success = exporter.export_to_ris(ris_file)
    if success:
        print(f"✓ RIS格式导出成功: {ris_file}")
    else:
        print("✗ RIS格式导出失败")
    
    return exporter

def test_load_from_txt():
    """测试从文本文件加载数据"""
    print("\n=== 测试从文本文件加载数据 ===")
    
    # 创建测试文本文件
    test_txt_content = """标题: 人工智能技术发展趋势分析
作者: 李明, 张华
期刊: 科技导报
年份: 2024
摘要: 本文分析了人工智能技术的发展现状和未来趋势，探讨了AI在各个领域的应用前景。
关键词: 人工智能, 技术趋势, 应用前景
"""
    
    test_file = "test_literature.txt"
    with open(test_file, 'w', encoding='utf-8') as f:
        f.write(test_txt_content)
    
    # 从文本文件加载
    exporter = EndNoteExporter()
    exporter.load_from_txt(test_file)
    
    if exporter.get_records_count() > 0:
        print("✓ 从文本文件加载成功")
        exporter.preview_records()
        
        # 导出测试
        exporter.export_to_endnote("from_txt_export.enw")
        print("✓ 导出完成")
    else:
        print("✗ 从文本文件加载失败")
    
    # 清理测试文件
    if os.path.exists(test_file):
        os.remove(test_file)
    
    return exporter

def test_load_from_json():
    """测试从JSON文件加载数据"""
    print("\n=== 测试从JSON文件加载数据 ===")
    
    # 创建测试JSON数据
    test_json_data = [
        {
            "title": "区块链技术在金融领域的应用",
            "authors": ["王强", "刘敏"],
            "journal": "金融科技",
            "year": "2024",
            "volume": "12",
            "issue": "3",
            "pages": "45-52",
            "abstract": "探讨了区块链技术在金融服务中的创新应用...",
            "keywords": ["区块链", "金融科技", "数字货币"],
            "doi": "10.1234/fintech.2024.003"
        },
        {
            "title": "云计算安全防护策略研究",
            "author": "陈伟",  # 单个作者字段测试
            "journal": "网络安全技术与应用",
            "time": "2023",  # 时间字段测试
            "abstract": "分析了云计算环境下的安全威胁和防护措施...",
            "keywords": "云计算, 网络安全, 防护策略"  # 字符串格式关键词测试
        }
    ]
    
    import json
    test_file = "test_literature.json"
    with open(test_file, 'w', encoding='utf-8') as f:
        json.dump(test_json_data, f, ensure_ascii=False, indent=2)
    
    # 从JSON文件加载
    exporter = EndNoteExporter()
    exporter.load_from_json(test_file)
    
    if exporter.get_records_count() > 0:
        print("✓ 从JSON文件加载成功")
        exporter.preview_records()
        
        # 导出测试
        exporter.export_to_endnote("from_json_export.enw")
        exporter.export_to_ris("from_json_export.ris")
        print("✓ 导出完成")
    else:
        print("✗ 从JSON文件加载失败")
    
    # 清理测试文件
    if os.path.exists(test_file):
        os.remove(test_file)
    
    return exporter

def test_different_record_types():
    """测试不同文献类型"""
    print("\n=== 测试不同文献类型 ===")
    
    exporter = EndNoteExporter()
    
    # 不同类型的文献记录
    records = [
        EndNoteRecord(
            record_type="Journal Article",
            title="期刊文章示例",
            authors=["作者A"],
            journal="示例期刊",
            year="2024"
        ),
        EndNoteRecord(
            record_type="Book",
            title="图书示例",
            authors=["作者B"],
            year="2023"
        ),
        EndNoteRecord(
            record_type="Conference Paper",
            title="会议论文示例",
            authors=["作者C", "作者D"],
            year="2024"
        ),
        EndNoteRecord(
            record_type="Thesis",
            title="学位论文示例",
            authors=["作者E"],
            year="2023"
        )
    ]
    
    for record in records:
        exporter.add_record(record)
    
    print(f"添加了 {exporter.get_records_count()} 条不同类型的记录")
    exporter.preview_records()
    
    # 导出测试
    exporter.export_to_endnote("different_types.enw")
    print("✓ 不同类型文献导出完成")
    
    return exporter

def test_integration_with_existing_data():
    """测试与现有数据的集成"""
    print("\n=== 测试与现有数据集成 ===")
    
    exporter = EndNoteExporter()
    
    # 尝试从a.txt加载数据
    if os.path.exists("a.txt"):
        print("发现a.txt文件，尝试加载...")
        exporter.load_from_txt("a.txt")
    
    # 如果没有数据，添加默认数据
    if exporter.get_records_count() == 0:
        print("未找到现有数据，添加默认示例...")
        default_record = EndNoteRecord(
            title="叶绿素分析方法研究",
            authors=["张三"],
            year="2025",
            abstract="本研究探讨了叶绿素含量的分析方法和技术...",
            keywords=["叶绿素", "分析方法", "植物生理"]
        )
        exporter.add_record(default_record)
    
    print(f"当前共有 {exporter.get_records_count()} 条记录")
    exporter.preview_records()
    
    # 导出为EndNote格式
    exporter.export_to_endnote("integrated_export.enw")
    exporter.export_to_ris("integrated_export.ris")
    print("✓ 集成数据导出完成")
    
    return exporter

def display_export_files():
    """显示导出的文件内容"""
    print("\n=== 导出文件内容预览 ===")
    
    export_files = [
        "test_export.enw",
        "test_export.ris",
        "integrated_export.enw"
    ]
    
    for filename in export_files:
        if os.path.exists(filename):
            print(f"\n--- {filename} ---")
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()
                # 只显示前500个字符
                if len(content) > 500:
                    print(content[:500] + "\n... (内容已截断)")
                else:
                    print(content)
        else:
            print(f"文件 {filename} 不存在")

def cleanup_test_files():
    """清理测试文件"""
    print("\n=== 清理测试文件 ===")
    
    test_files = [
        "test_export.enw",
        "test_export.ris",
        "from_txt_export.enw",
        "from_json_export.enw",
        "from_json_export.ris",
        "different_types.enw",
        "integrated_export.enw",
        "integrated_export.ris"
    ]
    
    cleaned_count = 0
    for filename in test_files:
        if os.path.exists(filename):
            os.remove(filename)
            cleaned_count += 1
            print(f"✓ 删除 {filename}")
    
    print(f"共清理了 {cleaned_count} 个测试文件")

def main():
    """主测试函数"""
    print("EndNote导出工具测试")
    print("=" * 60)
    
    try:
        # 运行各项测试
        test_basic_export()
        test_load_from_txt()
        test_load_from_json()
        test_different_record_types()
        test_integration_with_existing_data()
        
        # 显示导出文件内容
        display_export_files()
        
        print("\n" + "=" * 60)
        print("✓ 所有测试完成！")
        print("\n生成的文件说明:")
        print("- .enw 文件: EndNote格式，可直接导入EndNote软件")
        print("- .ris 文件: RIS格式，兼容多种文献管理软件")
        
        # 询问是否清理测试文件
        response = input("\n是否清理测试文件？(y/n): ").lower().strip()
        if response in ['y', 'yes', '是']:
            cleanup_test_files()
        else:
            print("测试文件已保留")
            
    except Exception as e:
        print(f"\n测试过程中发生错误: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()