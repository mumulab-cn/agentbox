# -*- coding: utf-8 -*-
"""
EndNote格式导出工具
支持将学术文献信息导出为EndNote格式文件
"""

import os
import re
import json
from datetime import datetime
from typing import Dict, List, Optional, Any
from dataclasses import dataclass

@dataclass
class EndNoteRecord:
    """EndNote记录数据类"""
    record_type: str = "Journal Article"  # 文献类型
    title: str = ""
    authors: List[str] = None
    journal: str = ""
    year: str = ""
    volume: str = ""
    issue: str = ""
    pages: str = ""
    abstract: str = ""
    keywords: List[str] = None
    doi: str = ""
    url: str = ""
    notes: str = ""
    
    def __post_init__(self):
        if self.authors is None:
            self.authors = []
        if self.keywords is None:
            self.keywords = []

class EndNoteExporter:
    """EndNote格式导出器"""
    
    def __init__(self):
        self.records = []
        self.record_types = {
            "Journal Article": "0",
            "Book": "1",
            "Book Section": "2",
            "Conference Paper": "3",
            "Thesis": "4",
            "Report": "5",
            "Web Page": "6",
            "Patent": "7",
            "Newspaper Article": "8",
            "Magazine Article": "9"
        }
    
    def add_record(self, record: EndNoteRecord):
        """添加文献记录"""
        self.records.append(record)
    
    def load_from_json(self, json_file: str):
        """从JSON文件加载文献数据"""
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            if isinstance(data, list):
                for item in data:
                    record = self._convert_dict_to_record(item)
                    self.add_record(record)
            elif isinstance(data, dict):
                record = self._convert_dict_to_record(data)
                self.add_record(record)
            
            print(f"成功加载 {len(self.records)} 条文献记录")
            
        except FileNotFoundError:
            print(f"错误：文件 {json_file} 不存在")
        except json.JSONDecodeError:
            print(f"错误：JSON文件格式不正确")
        except Exception as e:
            print(f"加载文件时发生错误：{e}")
    
    def load_from_txt(self, txt_file: str):
        """从文本文件加载文献数据"""
        try:
            with open(txt_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            record = self._parse_text_content(content)
            if record:
                self.add_record(record)
                print("成功从文本文件加载文献记录")
            
        except FileNotFoundError:
            print(f"错误：文件 {txt_file} 不存在")
        except Exception as e:
            print(f"加载文件时发生错误：{e}")
    
    def _convert_dict_to_record(self, data: Dict) -> EndNoteRecord:
        """将字典数据转换为EndNote记录"""
        record = EndNoteRecord()
        
        # 映射字段
        field_mapping = {
            'title': 'title',
            'authors': 'authors',
            'author': 'authors',  # 单个作者字段
            'journal': 'journal',
            'year': 'year',
            'time': 'year',  # 时间字段映射到年份
            'volume': 'volume',
            'issue': 'issue',
            'pages': 'pages',
            'abstract': 'abstract',
            'keywords': 'keywords',
            'doi': 'doi',
            'url': 'url',
            'notes': 'notes'
        }
        
        for key, value in data.items():
            if key in field_mapping:
                attr_name = field_mapping[key]
                if attr_name == 'authors' and isinstance(value, str):
                    # 处理单个作者字符串
                    setattr(record, attr_name, [value])
                elif attr_name == 'keywords' and isinstance(value, str):
                    # 处理关键词字符串
                    keywords = [kw.strip() for kw in value.split(',') if kw.strip()]
                    setattr(record, attr_name, keywords)
                else:
                    setattr(record, attr_name, value)
        
        return record
    
    def _parse_text_content(self, content: str) -> Optional[EndNoteRecord]:
        """解析文本内容提取文献信息"""
        record = EndNoteRecord()
        
        # 提取模式
        patterns = {
            'title': [r'标题[：:](.*?)(?=\n|$)', r'题目[：:](.*?)(?=\n|$)', r'Title[：:](.*?)(?=\n|$)'],
            'author': [r'作者[：:](.*?)(?=\n|$)', r'Authors?[：:](.*?)(?=\n|$)'],
            'journal': [r'期刊[：:](.*?)(?=\n|$)', r'Journal[：:](.*?)(?=\n|$)'],
            'year': [r'年份[：:](.*?)(?=\n|$)', r'时间[：:](.*?)(?=\n|$)', r'Year[：:](.*?)(?=\n|$)', r'(\d{4})年'],
            'abstract': [r'摘要[：:](.*?)(?=\n关键词|\n.*Keywords?|$)', r'Abstract[：:](.*?)(?=\n|$)'],
            'keywords': [r'关键词[：:](.*?)(?=\n|$)', r'Keywords?[：:](.*?)(?=\n|$)']
        }
        
        for field, pattern_list in patterns.items():
            for pattern in pattern_list:
                match = re.search(pattern, content, re.IGNORECASE | re.DOTALL)
                if match:
                    value = match.group(1).strip()
                    if field == 'author':
                        record.authors = [value] if value else []
                    elif field == 'keywords':
                        record.keywords = [kw.strip() for kw in value.split(',') if kw.strip()]
                    else:
                        setattr(record, field, value)
                    break
        
        # 如果没有提取到标题，返回None
        if not record.title:
            return None
        
        return record
    
    def export_to_endnote(self, output_file: str) -> bool:
        """导出为EndNote格式文件"""
        try:
            with open(output_file, 'w', encoding='utf-8') as f:
                for i, record in enumerate(self.records, 1):
                    endnote_text = self._format_endnote_record(record, i)
                    f.write(endnote_text)
                    f.write('\n\n')  # 记录之间的分隔
            
            print(f"成功导出 {len(self.records)} 条记录到 {output_file}")
            return True
            
        except Exception as e:
            print(f"导出文件时发生错误：{e}")
            return False
    
    def _format_endnote_record(self, record: EndNoteRecord, record_number: int) -> str:
        """格式化单条EndNote记录"""
        lines = []
        
        # 记录类型
        record_type_code = self.record_types.get(record.record_type, "0")
        lines.append(f"%0 {record.record_type}")
        
        # 标题
        if record.title:
            lines.append(f"%T {record.title}")
        
        # 作者
        for author in record.authors:
            if author:
                lines.append(f"%A {author}")
        
        # 期刊
        if record.journal:
            lines.append(f"%J {record.journal}")
        
        # 年份
        if record.year:
            lines.append(f"%D {record.year}")
        
        # 卷号
        if record.volume:
            lines.append(f"%V {record.volume}")
        
        # 期号
        if record.issue:
            lines.append(f"%N {record.issue}")
        
        # 页码
        if record.pages:
            lines.append(f"%P {record.pages}")
        
        # 摘要
        if record.abstract:
            lines.append(f"%X {record.abstract}")
        
        # 关键词
        if record.keywords:
            keywords_str = ', '.join(record.keywords)
            lines.append(f"%K {keywords_str}")
        
        # DOI
        if record.doi:
            lines.append(f"%R {record.doi}")
        
        # URL
        if record.url:
            lines.append(f"%U {record.url}")
        
        # 备注
        if record.notes:
            lines.append(f"%Z {record.notes}")
        
        return '\n'.join(lines)
    
    def export_to_ris(self, output_file: str) -> bool:
        """导出为RIS格式文件（Research Information Systems）"""
        try:
            with open(output_file, 'w', encoding='utf-8') as f:
                for record in self.records:
                    ris_text = self._format_ris_record(record)
                    f.write(ris_text)
                    f.write('\n\n')
            
            print(f"成功导出 {len(self.records)} 条记录到RIS格式文件 {output_file}")
            return True
            
        except Exception as e:
            print(f"导出RIS文件时发生错误：{e}")
            return False
    
    def _format_ris_record(self, record: EndNoteRecord) -> str:
        """格式化单条RIS记录"""
        lines = []
        
        # 文献类型
        lines.append("TY  - JOUR")  # Journal Article
        
        # 标题
        if record.title:
            lines.append(f"TI  - {record.title}")
        
        # 作者
        for author in record.authors:
            if author:
                lines.append(f"AU  - {author}")
        
        # 期刊
        if record.journal:
            lines.append(f"JO  - {record.journal}")
        
        # 年份
        if record.year:
            lines.append(f"PY  - {record.year}")
        
        # 卷号
        if record.volume:
            lines.append(f"VL  - {record.volume}")
        
        # 期号
        if record.issue:
            lines.append(f"IS  - {record.issue}")
        
        # 页码
        if record.pages:
            lines.append(f"SP  - {record.pages}")
        
        # 摘要
        if record.abstract:
            lines.append(f"AB  - {record.abstract}")
        
        # 关键词
        for keyword in record.keywords:
            if keyword:
                lines.append(f"KW  - {keyword}")
        
        # DOI
        if record.doi:
            lines.append(f"DO  - {record.doi}")
        
        # URL
        if record.url:
            lines.append(f"UR  - {record.url}")
        
        # 结束标记
        lines.append("ER  - ")
        
        return '\n'.join(lines)
    
    def clear_records(self):
        """清空所有记录"""
        self.records.clear()
        print("已清空所有文献记录")
    
    def get_records_count(self) -> int:
        """获取记录数量"""
        return len(self.records)
    
    def preview_records(self, limit: int = 5):
        """预览文献记录"""
        print(f"\n=== 文献记录预览 (共{len(self.records)}条) ===")
        
        for i, record in enumerate(self.records[:limit], 1):
            print(f"\n记录 {i}:")
            print(f"  标题: {record.title}")
            print(f"  作者: {', '.join(record.authors)}")
            print(f"  期刊: {record.journal}")
            print(f"  年份: {record.year}")
            if record.doi:
                print(f"  DOI: {record.doi}")
        
        if len(self.records) > limit:
            print(f"\n... 还有 {len(self.records) - limit} 条记录")

def main():
    """主函数 - 演示EndNote导出功能"""
    print("EndNote格式导出工具")
    print("=" * 50)
    
    # 创建导出器
    exporter = EndNoteExporter()
    
    # 示例：从a.txt文件加载数据
    txt_file = "a.txt"
    if os.path.exists(txt_file):
        print(f"\n从 {txt_file} 加载文献数据...")
        exporter.load_from_txt(txt_file)
    
    # 示例：手动添加文献记录
    if exporter.get_records_count() == 0:
        print("\n添加示例文献记录...")
        sample_record = EndNoteRecord(
            title="基于机器学习的文本分类研究",
            authors=["张三", "李四"],
            journal="计算机科学",
            year="2024",
            volume="51",
            issue="3",
            pages="123-130",
            abstract="本文提出了一种基于深度学习的文本分类方法...",
            keywords=["机器学习", "文本分类", "深度学习"],
            doi="10.1234/example.2024.001"
        )
        exporter.add_record(sample_record)
    
    # 预览记录
    exporter.preview_records()
    
    # 导出为EndNote格式
    endnote_file = "literature_export.enw"
    print(f"\n导出为EndNote格式: {endnote_file}")
    exporter.export_to_endnote(endnote_file)
    
    # 导出为RIS格式
    ris_file = "literature_export.ris"
    print(f"\n导出为RIS格式: {ris_file}")
    exporter.export_to_ris(ris_file)
    
    print("\n导出完成！")

if __name__ == "__main__":
    main()