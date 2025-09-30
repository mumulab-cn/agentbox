#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
学术文献智能处理API
提供文献解析、信息提取、格式化等功能的RESTful API服务
"""

import os
import re
import json
import datetime
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict
from flask import Flask, request, jsonify, render_template_string
import requests
from urllib.parse import urlparse
import hashlib

# 创建Flask应用
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False  # 支持中文JSON输出

@dataclass
class LiteratureInfo:
    """文献信息数据类"""
    title: str = ""
    authors: List[str] = None
    abstract: str = ""
    keywords: List[str] = None
    publication_date: str = ""
    journal: str = ""
    doi: str = ""
    volume: str = ""
    issue: str = ""
    pages: str = ""
    citation_count: int = 0
    language: str = "zh"
    document_type: str = "article"
    
    def __post_init__(self):
        if self.authors is None:
            self.authors = []
        if self.keywords is None:
            self.keywords = []

class LiteratureProcessor:
    """学术文献处理器"""
    
    def __init__(self):
        self.supported_formats = ['txt', 'json', 'bibtex', 'endnote']
        self.extraction_patterns = {
            'title': [
                r'标题[：:](.*?)(?=\n|$)',
                r'题目[：:](.*?)(?=\n|$)',
                r'论文标题[：:](.*?)(?=\n|$)',
                r'Title[：:](.*?)(?=\n|$)',
                r'^(.+?)(?=\n.*作者|\n.*Author)'
            ],
            'authors': [
                r'作者[：:](.*?)(?=\n|$)',
                r'Authors?[：:](.*?)(?=\n|$)',
                r'By[：:](.*?)(?=\n|$)'
            ],
            'abstract': [
                r'摘要[：:](.*?)(?=\n关键词|\n.*Keywords?|$)',
                r'Abstract[：:](.*?)(?=\n.*Keywords?|\n.*关键词|$)',
                r'概要[：:](.*?)(?=\n|$)'
            ],
            'keywords': [
                r'关键词[：:](.*?)(?=\n|$)',
                r'Keywords?[：:](.*?)(?=\n|$)',
                r'主题词[：:](.*?)(?=\n|$)'
            ],
            'journal': [
                r'期刊[：:](.*?)(?=\n|$)',
                r'Journal[：:](.*?)(?=\n|$)',
                r'发表于[：:](.*?)(?=\n|$)'
            ],
            'date': [
                r'时间[：:](.*?)(?=\n|$)',
                r'日期[：:](.*?)(?=\n|$)',
                r'年份[：:](.*?)(?=\n|$)',
                r'Date[：:](.*?)(?=\n|$)',
                r'Year[：:](.*?)(?=\n|$)',
                r'(\d{4})年',
                r'(\d{4}-\d{1,2}-\d{1,2})'
            ],
            'doi': [
                r'DOI[：:]\s*(10\.\d+/[^\s]+)',
                r'doi[：:]\s*(10\.\d+/[^\s]+)',
                r'(10\.\d+/[^\s]+)'
            ]
        }
    
    def extract_from_text(self, text: str) -> LiteratureInfo:
        """从文本中提取文献信息"""
        info = LiteratureInfo()
        
        # 清理文本
        text = text.strip().replace('\r\n', '\n').replace('\r', '\n')
        
        # 提取标题
        for pattern in self.extraction_patterns['title']:
            match = re.search(pattern, text, re.MULTILINE | re.DOTALL)
            if match:
                info.title = match.group(1).strip()
                break
        
        # 提取作者
        for pattern in self.extraction_patterns['authors']:
            match = re.search(pattern, text, re.MULTILINE)
            if match:
                authors_str = match.group(1).strip()
                # 分割作者名
                info.authors = [author.strip() for author in re.split(r'[,，;；、]', authors_str) if author.strip()]
                break
        
        # 提取摘要
        for pattern in self.extraction_patterns['abstract']:
            match = re.search(pattern, text, re.MULTILINE | re.DOTALL)
            if match:
                info.abstract = match.group(1).strip()
                break
        
        # 提取关键词
        for pattern in self.extraction_patterns['keywords']:
            match = re.search(pattern, text, re.MULTILINE)
            if match:
                keywords_str = match.group(1).strip()
                info.keywords = [kw.strip() for kw in re.split(r'[,，;；、]', keywords_str) if kw.strip()]
                break
        
        # 提取期刊
        for pattern in self.extraction_patterns['journal']:
            match = re.search(pattern, text, re.MULTILINE)
            if match:
                info.journal = match.group(1).strip()
                break
        
        # 提取日期
        for pattern in self.extraction_patterns['date']:
            match = re.search(pattern, text, re.MULTILINE)
            if match:
                info.publication_date = match.group(1).strip()
                break
        
        # 提取DOI
        for pattern in self.extraction_patterns['doi']:
            match = re.search(pattern, text, re.MULTILINE)
            if match:
                info.doi = match.group(1).strip()
                break
        
        # 检测语言
        chinese_chars = len(re.findall(r'[\u4e00-\u9fff]', text))
        total_chars = len(re.sub(r'\s', '', text))
        if total_chars > 0 and chinese_chars / total_chars > 0.3:
            info.language = 'zh'
        else:
            info.language = 'en'
        
        return info
    
    def format_citation(self, info: LiteratureInfo, style: str = 'apa') -> str:
        """格式化引用"""
        if style.lower() == 'apa':
            return self._format_apa_citation(info)
        elif style.lower() == 'mla':
            return self._format_mla_citation(info)
        elif style.lower() == 'chicago':
            return self._format_chicago_citation(info)
        elif style.lower() == 'gb':
            return self._format_gb_citation(info)
        else:
            return self._format_apa_citation(info)
    
    def _format_apa_citation(self, info: LiteratureInfo) -> str:
        """APA格式引用"""
        citation_parts = []
        
        # 作者
        if info.authors:
            if len(info.authors) == 1:
                citation_parts.append(info.authors[0])
            elif len(info.authors) <= 6:
                citation_parts.append(', '.join(info.authors[:-1]) + ', & ' + info.authors[-1])
            else:
                citation_parts.append(', '.join(info.authors[:6]) + ', ... ' + info.authors[-1])
        
        # 年份
        if info.publication_date:
            year = re.search(r'(\d{4})', info.publication_date)
            if year:
                citation_parts.append(f"({year.group(1)})")
        
        # 标题
        if info.title:
            citation_parts.append(f"{info.title}.")
        
        # 期刊
        if info.journal:
            journal_part = f"*{info.journal}*"
            if info.volume:
                journal_part += f", {info.volume}"
            if info.issue:
                journal_part += f"({info.issue})"
            if info.pages:
                journal_part += f", {info.pages}"
            citation_parts.append(journal_part + ".")
        
        # DOI
        if info.doi:
            citation_parts.append(f"https://doi.org/{info.doi}")
        
        return ' '.join(citation_parts)
    
    def _format_gb_citation(self, info: LiteratureInfo) -> str:
        """国标格式引用"""
        citation_parts = []
        
        # 作者
        if info.authors:
            citation_parts.append(', '.join(info.authors))
        
        # 标题
        if info.title:
            citation_parts.append(f"{info.title}[J]")
        
        # 期刊
        if info.journal:
            journal_part = info.journal
            if info.publication_date:
                year = re.search(r'(\d{4})', info.publication_date)
                if year:
                    journal_part += f", {year.group(1)}"
            if info.volume:
                journal_part += f", {info.volume}"
            if info.issue:
                journal_part += f"({info.issue})"
            if info.pages:
                journal_part += f": {info.pages}"
            citation_parts.append(journal_part + ".")
        
        return '. '.join(citation_parts)
    
    def _format_mla_citation(self, info: LiteratureInfo) -> str:
        """MLA格式引用"""
        # 简化的MLA格式实现
        citation_parts = []
        
        if info.authors:
            citation_parts.append(info.authors[0])
        
        if info.title:
            citation_parts.append(f'"{info.title}."')
        
        if info.journal:
            citation_parts.append(f"*{info.journal}*,")
        
        if info.publication_date:
            year = re.search(r'(\d{4})', info.publication_date)
            if year:
                citation_parts.append(f"{year.group(1)}.")
        
        return ' '.join(citation_parts)
    
    def _format_chicago_citation(self, info: LiteratureInfo) -> str:
        """Chicago格式引用"""
        # 简化的Chicago格式实现
        citation_parts = []
        
        if info.authors:
            citation_parts.append(info.authors[0])
        
        if info.title:
            citation_parts.append(f'"{info.title}."')
        
        if info.journal:
            citation_parts.append(f"*{info.journal}*")
        
        if info.publication_date:
            year = re.search(r'(\d{4})', info.publication_date)
            if year:
                citation_parts.append(f"({year.group(1)}).")
        
        return ' '.join(citation_parts)
    
    def generate_bibtex(self, info: LiteratureInfo) -> str:
        """生成BibTeX格式"""
        # 生成引用键
        key = self._generate_citation_key(info)
        
        bibtex = f"@article{{{key},\n"
        
        if info.title:
            bibtex += f"  title={{{info.title}}},\n"
        
        if info.authors:
            authors_str = ' and '.join(info.authors)
            bibtex += f"  author={{{authors_str}}},\n"
        
        if info.journal:
            bibtex += f"  journal={{{info.journal}}},\n"
        
        if info.publication_date:
            year = re.search(r'(\d{4})', info.publication_date)
            if year:
                bibtex += f"  year={{{year.group(1)}}},\n"
        
        if info.volume:
            bibtex += f"  volume={{{info.volume}}},\n"
        
        if info.issue:
            bibtex += f"  number={{{info.issue}}},\n"
        
        if info.pages:
            bibtex += f"  pages={{{info.pages}}},\n"
        
        if info.doi:
            bibtex += f"  doi={{{info.doi}}},\n"
        
        bibtex = bibtex.rstrip(',\n') + "\n}"
        return bibtex
    
    def _generate_citation_key(self, info: LiteratureInfo) -> str:
        """生成引用键"""
        key_parts = []
        
        # 第一作者姓氏
        if info.authors:
            first_author = info.authors[0].split()[-1]  # 取最后一个词作为姓氏
            key_parts.append(first_author.lower())
        
        # 年份
        if info.publication_date:
            year = re.search(r'(\d{4})', info.publication_date)
            if year:
                key_parts.append(year.group(1))
        
        # 标题首词
        if info.title:
            first_word = re.search(r'\b\w+', info.title)
            if first_word:
                key_parts.append(first_word.group().lower())
        
        return ''.join(key_parts) if key_parts else 'unknown'

# 创建处理器实例
processor = LiteratureProcessor()

# API路由定义
@app.route('/')
def index():
    """API首页"""
    return render_template_string("""
    <!DOCTYPE html>
    <html>
    <head>
        <title>学术文献智能处理API</title>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
            .endpoint { background: #ecf0f1; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #3498db; }
            .method { background: #27ae60; color: white; padding: 3px 8px; border-radius: 3px; font-size: 12px; }
            .method.post { background: #e74c3c; }
            code { background: #34495e; color: white; padding: 2px 6px; border-radius: 3px; }
            .example { background: #f8f9fa; padding: 10px; border-radius: 5px; margin-top: 10px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>📚 学术文献智能处理API</h1>
            <p>提供文献解析、信息提取、格式化等功能的RESTful API服务</p>
            
            <h2>🔗 API接口</h2>
            
            <div class="endpoint">
                <h3><span class="method post">POST</span> /api/extract</h3>
                <p>从文本中提取文献信息</p>
                <div class="example">
                    <strong>请求体:</strong><br>
                    <code>{"text": "标题：机器学习在自然语言处理中的应用\n作者：张三，李四"}</code>
                </div>
            </div>
            
            <div class="endpoint">
                <h3><span class="method post">POST</span> /api/format-citation</h3>
                <p>格式化文献引用</p>
                <div class="example">
                    <strong>参数:</strong> style (apa, mla, chicago, gb)<br>
                    <strong>请求体:</strong> 文献信息JSON
                </div>
            </div>
            
            <div class="endpoint">
                <h3><span class="method post">POST</span> /api/generate-bibtex</h3>
                <p>生成BibTeX格式</p>
                <div class="example">
                    <strong>请求体:</strong> 文献信息JSON
                </div>
            </div>
            
            <div class="endpoint">
                <h3><span class="method">GET</span> /api/health</h3>
                <p>API健康检查</p>
            </div>
            
            <h2>📖 使用示例</h2>
            <div class="example">
                <strong>提取文献信息:</strong><br>
                <code>curl -X POST http://localhost:5000/api/extract -H "Content-Type: application/json" -d '{"text": "标题：深度学习研究\n作者：王五"}'</code>
            </div>
        </div>
    </body>
    </html>
    """)

@app.route('/api/health', methods=['GET'])
def health_check():
    """健康检查"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.datetime.now().isoformat(),
        'version': '1.0.0',
        'supported_formats': processor.supported_formats
    })

@app.route('/api/extract', methods=['POST'])
def extract_literature_info():
    """提取文献信息"""
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({
                'error': '请提供text参数',
                'status': 'error'
            }), 400
        
        text = data['text']
        
        # 提取信息
        info = processor.extract_from_text(text)
        
        return jsonify({
            'status': 'success',
            'data': asdict(info),
            'message': '文献信息提取成功'
        })
    
    except Exception as e:
        return jsonify({
            'error': f'提取失败: {str(e)}',
            'status': 'error'
        }), 500

@app.route('/api/format-citation', methods=['POST'])
def format_citation():
    """格式化引用"""
    try:
        data = request.get_json()
        style = request.args.get('style', 'apa').lower()
        
        if not data:
            return jsonify({
                'error': '请提供文献信息',
                'status': 'error'
            }), 400
        
        # 创建LiteratureInfo对象
        info = LiteratureInfo(**data)
        
        # 格式化引用
        citation = processor.format_citation(info, style)
        
        return jsonify({
            'status': 'success',
            'data': {
                'citation': citation,
                'style': style
            },
            'message': '引用格式化成功'
        })
    
    except Exception as e:
        return jsonify({
            'error': f'格式化失败: {str(e)}',
            'status': 'error'
        }), 500

@app.route('/api/generate-bibtex', methods=['POST'])
def generate_bibtex():
    """生成BibTeX"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'error': '请提供文献信息',
                'status': 'error'
            }), 400
        
        # 创建LiteratureInfo对象
        info = LiteratureInfo(**data)
        
        # 生成BibTeX
        bibtex = processor.generate_bibtex(info)
        
        return jsonify({
            'status': 'success',
            'data': {
                'bibtex': bibtex
            },
            'message': 'BibTeX生成成功'
        })
    
    except Exception as e:
        return jsonify({
            'error': f'生成失败: {str(e)}',
            'status': 'error'
        }), 500

@app.route('/api/batch-process', methods=['POST'])
def batch_process():
    """批量处理文献"""
    try:
        data = request.get_json()
        
        if not data or 'texts' not in data:
            return jsonify({
                'error': '请提供texts参数（文本数组）',
                'status': 'error'
            }), 400
        
        texts = data['texts']
        if not isinstance(texts, list):
            return jsonify({
                'error': 'texts必须是数组',
                'status': 'error'
            }), 400
        
        results = []
        for i, text in enumerate(texts):
            try:
                info = processor.extract_from_text(text)
                results.append({
                    'index': i,
                    'status': 'success',
                    'data': asdict(info)
                })
            except Exception as e:
                results.append({
                    'index': i,
                    'status': 'error',
                    'error': str(e)
                })
        
        return jsonify({
            'status': 'success',
            'data': results,
            'message': f'批量处理完成，共处理{len(texts)}条文献'
        })
    
    except Exception as e:
        return jsonify({
            'error': f'批量处理失败: {str(e)}',
            'status': 'error'
        }), 500

@app.route('/api/validate', methods=['POST'])
def validate_literature():
    """验证文献信息完整性"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'error': '请提供文献信息',
                'status': 'error'
            }), 400
        
        # 验证必要字段
        required_fields = ['title', 'authors']
        missing_fields = []
        
        for field in required_fields:
            if field not in data or not data[field]:
                missing_fields.append(field)
        
        # 验证数据格式
        validation_errors = []
        
        if 'authors' in data and not isinstance(data['authors'], list):
            validation_errors.append('authors字段必须是数组')
        
        if 'keywords' in data and not isinstance(data['keywords'], list):
            validation_errors.append('keywords字段必须是数组')
        
        if 'doi' in data and data['doi']:
            doi_pattern = r'^10\.\d+/.+'
            if not re.match(doi_pattern, data['doi']):
                validation_errors.append('DOI格式不正确')
        
        # 计算完整性分数
        total_fields = ['title', 'authors', 'abstract', 'keywords', 'publication_date', 'journal', 'doi']
        filled_fields = sum(1 for field in total_fields if field in data and data[field])
        completeness_score = (filled_fields / len(total_fields)) * 100
        
        return jsonify({
            'status': 'success',
            'data': {
                'is_valid': len(missing_fields) == 0 and len(validation_errors) == 0,
                'missing_fields': missing_fields,
                'validation_errors': validation_errors,
                'completeness_score': round(completeness_score, 2),
                'filled_fields': filled_fields,
                'total_fields': len(total_fields)
            },
            'message': '验证完成'
        })
    
    except Exception as e:
        return jsonify({
            'error': f'验证失败: {str(e)}',
            'status': 'error'
        }), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'error': '接口不存在',
        'status': 'error',
        'available_endpoints': [
            'GET /',
            'GET /api/health',
            'POST /api/extract',
            'POST /api/format-citation',
            'POST /api/generate-bibtex',
            'POST /api/batch-process',
            'POST /api/validate'
        ]
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'error': '服务器内部错误',
        'status': 'error'
    }), 500

if __name__ == '__main__':
    print("🚀 学术文献智能处理API启动中...")
    print("📍 访问地址: http://localhost:5001")
    print("📚 API文档: http://localhost:5001")
    print("🔍 健康检查: http://localhost:5001/api/health")
    print("\n可用接口:")
    print("  - POST /api/extract - 提取文献信息")
    print("  - POST /api/format-citation - 格式化引用")
    print("  - POST /api/generate-bibtex - 生成BibTeX")
    print("  - POST /api/batch-process - 批量处理")
    print("  - POST /api/validate - 验证文献信息")
    
    app.run(host='0.0.0.0', port=5001, debug=True)