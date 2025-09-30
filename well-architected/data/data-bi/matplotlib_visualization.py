#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
学术数据可视化脚本
使用Matplotlib创建各种类型的图表和可视化
"""

import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import seaborn as sns
from matplotlib.animation import FuncAnimation
import warnings
warnings.filterwarnings('ignore')

# 设置中文字体支持
plt.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei']
plt.rcParams['axes.unicode_minus'] = False

class DataVisualizer:
    """数据可视化类"""
    
    def __init__(self):
        self.colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8']
        self.style = 'seaborn-v0_8'
        
    def set_style(self, style='seaborn-v0_8'):
        """设置图表样式"""
        try:
            plt.style.use(style)
        except:
            plt.style.use('default')
    
    def generate_sample_data(self):
        """生成示例数据"""
        np.random.seed(42)
        
        # 时间序列数据
        dates = pd.date_range('2023-01-01', periods=365, freq='D')
        values = np.cumsum(np.random.randn(365)) + 100
        
        # 分类数据
        categories = ['研究A', '研究B', '研究C', '研究D', '研究E']
        counts = np.random.randint(10, 100, len(categories))
        
        # 散点图数据
        x_scatter = np.random.randn(100)
        y_scatter = 2 * x_scatter + np.random.randn(100)
        
        # 热力图数据
        heatmap_data = np.random.randn(10, 12)
        
        return {
            'time_series': {'dates': dates, 'values': values},
            'categories': {'names': categories, 'counts': counts},
            'scatter': {'x': x_scatter, 'y': y_scatter},
            'heatmap': heatmap_data
        }
    
    def create_line_chart(self, data, title="时间序列图", save_path=None):
        """创建折线图"""
        fig, ax = plt.subplots(figsize=(12, 6))
        
        ax.plot(data['dates'], data['values'], 
                color=self.colors[0], linewidth=2, alpha=0.8)
        ax.fill_between(data['dates'], data['values'], alpha=0.3, color=self.colors[0])
        
        ax.set_title(title, fontsize=16, fontweight='bold', pad=20)
        ax.set_xlabel('日期', fontsize=12)
        ax.set_ylabel('数值', fontsize=12)
        ax.grid(True, alpha=0.3)
        
        # 添加趋势线
        z = np.polyfit(range(len(data['values'])), data['values'], 1)
        p = np.poly1d(z)
        ax.plot(data['dates'], p(range(len(data['values']))), 
                "--", color='red', alpha=0.8, label='趋势线')
        
        ax.legend()
        plt.xticks(rotation=45)
        plt.tight_layout()
        
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
        
        return fig
    
    def create_bar_chart(self, data, title="柱状图", save_path=None):
        """创建柱状图"""
        fig, ax = plt.subplots(figsize=(10, 6))
        
        bars = ax.bar(data['names'], data['counts'], 
                     color=self.colors[:len(data['names'])], alpha=0.8)
        
        # 添加数值标签
        for bar in bars:
            height = bar.get_height()
            ax.text(bar.get_x() + bar.get_width()/2., height + 1,
                   f'{int(height)}', ha='center', va='bottom', fontsize=10)
        
        ax.set_title(title, fontsize=16, fontweight='bold', pad=20)
        ax.set_xlabel('类别', fontsize=12)
        ax.set_ylabel('数量', fontsize=12)
        ax.grid(True, alpha=0.3, axis='y')
        
        plt.xticks(rotation=45)
        plt.tight_layout()
        
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
        
        return fig
    
    def create_scatter_plot(self, data, title="散点图", save_path=None):
        """创建散点图"""
        fig, ax = plt.subplots(figsize=(10, 8))
        
        scatter = ax.scatter(data['x'], data['y'], 
                           c=data['y'], cmap='viridis', 
                           alpha=0.7, s=60, edgecolors='black', linewidth=0.5)
        
        # 添加回归线
        z = np.polyfit(data['x'], data['y'], 1)
        p = np.poly1d(z)
        ax.plot(data['x'], p(data['x']), "r--", alpha=0.8, linewidth=2)
        
        # 计算相关系数
        correlation = np.corrcoef(data['x'], data['y'])[0, 1]
        ax.text(0.05, 0.95, f'相关系数: {correlation:.3f}', 
                transform=ax.transAxes, fontsize=12,
                bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))
        
        ax.set_title(title, fontsize=16, fontweight='bold', pad=20)
        ax.set_xlabel('X变量', fontsize=12)
        ax.set_ylabel('Y变量', fontsize=12)
        ax.grid(True, alpha=0.3)
        
        plt.colorbar(scatter, label='Y值')
        plt.tight_layout()
        
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
        
        return fig
    
    def create_heatmap(self, data, title="热力图", save_path=None):
        """创建热力图"""
        fig, ax = plt.subplots(figsize=(12, 8))
        
        im = ax.imshow(data, cmap='RdYlBu_r', aspect='auto')
        
        # 添加数值标签
        for i in range(data.shape[0]):
            for j in range(data.shape[1]):
                text = ax.text(j, i, f'{data[i, j]:.1f}',
                             ha="center", va="center", color="black", fontsize=8)
        
        ax.set_title(title, fontsize=16, fontweight='bold', pad=20)
        ax.set_xlabel('列索引', fontsize=12)
        ax.set_ylabel('行索引', fontsize=12)
        
        plt.colorbar(im, label='数值')
        plt.tight_layout()
        
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
        
        return fig
    
    def create_pie_chart(self, data, title="饼图", save_path=None):
        """创建饼图"""
        fig, ax = plt.subplots(figsize=(10, 8))
        
        wedges, texts, autotexts = ax.pie(data['counts'], labels=data['names'], 
                                         colors=self.colors[:len(data['names'])],
                                         autopct='%1.1f%%', startangle=90,
                                         explode=[0.05] * len(data['names']))
        
        # 美化文本
        for autotext in autotexts:
            autotext.set_color('white')
            autotext.set_fontweight('bold')
        
        ax.set_title(title, fontsize=16, fontweight='bold', pad=20)
        
        plt.tight_layout()
        
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
        
        return fig
    
    def create_subplot_dashboard(self, data, title="数据仪表板", save_path=None):
        """创建多子图仪表板"""
        fig = plt.figure(figsize=(16, 12))
        
        # 折线图
        ax1 = plt.subplot(2, 3, 1)
        ax1.plot(data['time_series']['dates'][-30:], 
                data['time_series']['values'][-30:], 
                color=self.colors[0], linewidth=2)
        ax1.set_title('近30天趋势', fontweight='bold')
        ax1.grid(True, alpha=0.3)
        plt.xticks(rotation=45)
        
        # 柱状图
        ax2 = plt.subplot(2, 3, 2)
        ax2.bar(data['categories']['names'], data['categories']['counts'], 
               color=self.colors[:len(data['categories']['names'])], alpha=0.8)
        ax2.set_title('类别分布', fontweight='bold')
        ax2.grid(True, alpha=0.3, axis='y')
        plt.xticks(rotation=45)
        
        # 散点图
        ax3 = plt.subplot(2, 3, 3)
        ax3.scatter(data['scatter']['x'], data['scatter']['y'], 
                   alpha=0.6, color=self.colors[2])
        ax3.set_title('相关性分析', fontweight='bold')
        ax3.grid(True, alpha=0.3)
        
        # 热力图
        ax4 = plt.subplot(2, 3, 4)
        im = ax4.imshow(data['heatmap'][:5, :6], cmap='viridis', aspect='auto')
        ax4.set_title('数据热力图', fontweight='bold')
        plt.colorbar(im, ax=ax4, shrink=0.6)
        
        # 饼图
        ax5 = plt.subplot(2, 3, 5)
        ax5.pie(data['categories']['counts'], labels=data['categories']['names'],
               colors=self.colors[:len(data['categories']['names'])],
               autopct='%1.1f%%', startangle=90)
        ax5.set_title('比例分布', fontweight='bold')
        
        # 箱线图
        ax6 = plt.subplot(2, 3, 6)
        box_data = [np.random.randn(100) + i for i in range(5)]
        ax6.boxplot(box_data, labels=data['categories']['names'])
        ax6.set_title('数据分布', fontweight='bold')
        ax6.grid(True, alpha=0.3)
        plt.xticks(rotation=45)
        
        plt.suptitle(title, fontsize=18, fontweight='bold', y=0.98)
        plt.tight_layout()
        
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
        
        return fig
    
    def create_3d_plot(self, title="3D可视化", save_path=None):
        """创建3D图表"""
        fig = plt.figure(figsize=(12, 9))
        ax = fig.add_subplot(111, projection='3d')
        
        # 生成3D数据
        x = np.linspace(-5, 5, 50)
        y = np.linspace(-5, 5, 50)
        X, Y = np.meshgrid(x, y)
        Z = np.sin(np.sqrt(X**2 + Y**2))
        
        # 创建3D表面图
        surf = ax.plot_surface(X, Y, Z, cmap='viridis', alpha=0.8)
        
        # 添加等高线
        ax.contour(X, Y, Z, zdir='z', offset=-2, cmap='viridis', alpha=0.5)
        
        ax.set_title(title, fontsize=16, fontweight='bold', pad=20)
        ax.set_xlabel('X轴', fontsize=12)
        ax.set_ylabel('Y轴', fontsize=12)
        ax.set_zlabel('Z轴', fontsize=12)
        
        plt.colorbar(surf, shrink=0.5, aspect=5)
        
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
        
        return fig
    
    def save_all_charts(self, output_dir="./charts/"):
        """保存所有图表"""
        import os
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
        
        data = self.generate_sample_data()
        
        # 创建各种图表
        charts = {
            'line_chart': self.create_line_chart(data['time_series'], "学术数据时间序列分析"),
            'bar_chart': self.create_bar_chart(data['categories'], "研究项目统计"),
            'scatter_plot': self.create_scatter_plot(data['scatter'], "变量相关性分析"),
            'heatmap': self.create_heatmap(data['heatmap'], "数据相关性热力图"),
            'pie_chart': self.create_pie_chart(data['categories'], "研究领域分布"),
            'dashboard': self.create_subplot_dashboard(data, "学术数据综合仪表板"),
            '3d_plot': self.create_3d_plot("3D数学函数可视化")
        }
        
        # 保存图表
        for name, fig in charts.items():
            fig.savefig(f"{output_dir}{name}.png", dpi=300, bbox_inches='tight')
            print(f"已保存: {output_dir}{name}.png")
        
        plt.close('all')
        return charts

def main():
    """主函数 - 演示所有可视化功能"""
    print("=" * 50)
    print("学术数据可视化脚本")
    print("=" * 50)
    
    # 创建可视化器
    visualizer = DataVisualizer()
    
    # 生成示例数据
    data = visualizer.generate_sample_data()
    print("✓ 示例数据生成完成")
    
    # 设置样式
    visualizer.set_style('seaborn-v0_8')
    print("✓ 图表样式设置完成")
    
    print("\n开始创建可视化图表...")
    
    # 创建各种图表
    try:
        # 1. 折线图
        fig1 = visualizer.create_line_chart(data['time_series'], "学术数据时间序列分析")
        print("✓ 折线图创建完成")
        
        # 2. 柱状图
        fig2 = visualizer.create_bar_chart(data['categories'], "研究项目统计")
        print("✓ 柱状图创建完成")
        
        # 3. 散点图
        fig3 = visualizer.create_scatter_plot(data['scatter'], "变量相关性分析")
        print("✓ 散点图创建完成")
        
        # 4. 热力图
        fig4 = visualizer.create_heatmap(data['heatmap'], "数据相关性热力图")
        print("✓ 热力图创建完成")
        
        # 5. 饼图
        fig5 = visualizer.create_pie_chart(data['categories'], "研究领域分布")
        print("✓ 饼图创建完成")
        
        # 6. 综合仪表板
        fig6 = visualizer.create_subplot_dashboard(data, "学术数据综合仪表板")
        print("✓ 综合仪表板创建完成")
        
        # 7. 3D图表
        fig7 = visualizer.create_3d_plot("3D数学函数可视化")
        print("✓ 3D图表创建完成")
        
        print("\n所有图表创建完成！")
        print("提示: 图表已在新窗口中显示，关闭窗口继续执行")
        
        # 显示图表
        plt.show()
        
        # 可选：保存所有图表
        save_choice = input("\n是否保存所有图表到文件？(y/n): ")
        if save_choice.lower() == 'y':
            charts = visualizer.save_all_charts()
            print("\n所有图表已保存到 ./charts/ 目录")
        
    except Exception as e:
        print(f"❌ 创建图表时出错: {e}")
        import traceback
        traceback.print_exc()
    
    print("\n程序执行完成！")

if __name__ == "__main__":
    main()