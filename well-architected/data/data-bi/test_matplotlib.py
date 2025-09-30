#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Matplotlib可视化脚本测试文件
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from matplotlib_visualization import DataVisualizer
import matplotlib.pyplot as plt
import numpy as np

def test_basic_functionality():
    """测试基本功能"""
    print("开始测试Matplotlib可视化功能...")
    
    try:
        # 创建可视化器
        visualizer = DataVisualizer()
        print("✓ DataVisualizer初始化成功")
        
        # 生成测试数据
        data = visualizer.generate_sample_data()
        print("✓ 测试数据生成成功")
        
        # 测试各种图表类型
        print("\n测试各种图表类型:")
        
        # 1. 折线图
        fig1 = visualizer.create_line_chart(data['time_series'], "测试折线图")
        print("✓ 折线图测试通过")
        plt.close(fig1)
        
        # 2. 柱状图
        fig2 = visualizer.create_bar_chart(data['categories'], "测试柱状图")
        print("✓ 柱状图测试通过")
        plt.close(fig2)
        
        # 3. 散点图
        fig3 = visualizer.create_scatter_plot(data['scatter'], "测试散点图")
        print("✓ 散点图测试通过")
        plt.close(fig3)
        
        # 4. 热力图
        fig4 = visualizer.create_heatmap(data['heatmap'], "测试热力图")
        print("✓ 热力图测试通过")
        plt.close(fig4)
        
        # 5. 饼图
        fig5 = visualizer.create_pie_chart(data['categories'], "测试饼图")
        print("✓ 饼图测试通过")
        plt.close(fig5)
        
        # 6. 3D图表
        fig6 = visualizer.create_3d_plot("测试3D图表")
        print("✓ 3D图表测试通过")
        plt.close(fig6)
        
        # 7. 综合仪表板
        fig7 = visualizer.create_subplot_dashboard(data, "测试综合仪表板")
        print("✓ 综合仪表板测试通过")
        plt.close(fig7)
        
        print("\n🎉 所有测试通过！")
        return True
        
    except Exception as e:
        print(f"❌ 测试失败: {e}")
        import traceback
        traceback.print_exc()
        return False

def test_custom_data():
    """测试自定义数据"""
    print("\n测试自定义数据可视化...")
    
    try:
        visualizer = DataVisualizer()
        
        # 自定义时间序列数据
        import pandas as pd
        dates = pd.date_range('2024-01-01', periods=100, freq='D')
        values = np.sin(np.linspace(0, 4*np.pi, 100)) * 50 + 100
        
        custom_time_data = {'dates': dates, 'values': values}
        fig = visualizer.create_line_chart(custom_time_data, "自定义正弦波数据")
        print("✓ 自定义时间序列数据测试通过")
        plt.close(fig)
        
        # 自定义分类数据
        custom_cat_data = {
            'names': ['Python', 'JavaScript', 'Java', 'C++', 'Go'],
            'counts': [85, 70, 65, 45, 30]
        }
        fig = visualizer.create_bar_chart(custom_cat_data, "编程语言流行度")
        print("✓ 自定义分类数据测试通过")
        plt.close(fig)
        
        return True
        
    except Exception as e:
        print(f"❌ 自定义数据测试失败: {e}")
        return False

def demo_interactive_charts():
    """演示交互式图表"""
    print("\n创建演示图表...")
    
    try:
        visualizer = DataVisualizer()
        data = visualizer.generate_sample_data()
        
        # 创建一个综合演示
        fig = visualizer.create_subplot_dashboard(data, "Matplotlib可视化演示")
        
        print("\n📊 演示图表已创建！")
        print("提示: 图表将在新窗口中显示")
        print("关闭图表窗口以继续...")
        
        plt.show()
        
        return True
        
    except Exception as e:
        print(f"❌ 演示创建失败: {e}")
        return False

def main():
    """主测试函数"""
    print("=" * 60)
    print("Matplotlib可视化脚本测试")
    print("=" * 60)
    
    # 检查依赖
    try:
        import matplotlib
        import numpy
        import pandas
        print(f"✓ Matplotlib版本: {matplotlib.__version__}")
        print(f"✓ NumPy版本: {numpy.__version__}")
        print(f"✓ Pandas版本: {pandas.__version__}")
    except ImportError as e:
        print(f"❌ 缺少依赖: {e}")
        return
    
    # 运行测试
    tests_passed = 0
    total_tests = 3
    
    if test_basic_functionality():
        tests_passed += 1
    
    if test_custom_data():
        tests_passed += 1
    
    if demo_interactive_charts():
        tests_passed += 1
    
    print("\n" + "=" * 60)
    print(f"测试结果: {tests_passed}/{total_tests} 通过")
    
    if tests_passed == total_tests:
        print("🎉 所有测试通过！Matplotlib可视化脚本工作正常。")
    else:
        print("⚠️  部分测试失败，请检查错误信息。")
    
    print("\n使用说明:")
    print("1. 运行 'python matplotlib_visualization.py' 查看完整演示")
    print("2. 在代码中导入 DataVisualizer 类来创建自定义图表")
    print("3. 使用 save_all_charts() 方法保存图表到文件")

if __name__ == "__main__":
    main()