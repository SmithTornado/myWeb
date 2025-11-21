// 获取目录结构根容器
const directoryStructure = document.querySelector('.directory-structure')
// 目录结构数据，键代表分类名，数组里的才是具体内容
const data = {
    "C语言": {
        "基础": ["常量", "变量", "数据类型", "运算符", "表达式", "输入输出", "顺序结构", "选择结构", "循环结构", "函数", "数组", "指针"],
        "进阶": ["结构体", "共用体", "枚举", "位域", "预处理", "文件操作", "动态内存管理", "链表", "栈", "队列", "二叉树", "图", "排序算法", "查找算法"],
        "高级": ["系统调用", "进程管理", "线程管理", "网络编程", "数据库编程", "嵌入式开发", "驱动开发", "汇编混合编程", "性能优化", "调试技巧"]
    },
    
    "Python": {
        "基础": ["常量", "变量", "数据类型", "运算符", "表达式", "输入输出", "顺序结构", "选择结构", "循环结构", "函数", "模块", "包"],
        "进阶": ["元组", "列表", "字典", "集合", "字符串", "列表推导式", "生成器", "迭代器", "装饰器", "异常处理", "文件操作", "正则表达式", "面向对象编程"],
        "高级": ["并发编程", "网络编程", "数据库编程", "Web开发框架", "数据分析与科学计算", "机器学习与人工智能", "自动化脚本", "爬虫技术", "性能优化", "调试技巧"]
    },
    
    "Java": {
        "基础": ["常量", "变量", "数据类型", "运算符", "表达式", "输入输出", "顺序结构", "选择结构", "循环结构", "函数", "数组", "字符串"],
        "进阶": ["类与对象", "继承与多态", "接口与抽象类", "异常处理", "集合框架", "泛型", "多线程与并发", "文件操作", "网络编程", "反射机制", "注解", "JVM内存模型"],
        "高级": ["Spring框架", "Spring Boot", "Spring Cloud", "MyBatis", "Hibernate", "分布式与微服务", "消息队列", "数据库编程", "性能优化", "调试技巧", "大数据处理", "机器学习与人工智能"]
    },    
}

// 调用生成目录结构函数传入目录结构根容器和数据生成目录结构
generateStructure(directoryStructure, data)

// 调用页面适配函数传输一个元素选择器和自动计算和的元素
initResponsiveLayout('.container', '.site-content')
window.onresize = function() {
    initResponsiveLayout('.container', '.site-content')   
}

// 设置选项切换状态事件，传入目录结构和只有触发A标签才触发
setToggleListener('.directory-structure', 'A')

// 显示第一个页面
directoryStructure.querySelector('a').click()

/**
 * @desc 设置选项切换状态的点击事件监听
 * @param {HTMLElement} el - 需绑定点击事件的监听元素（DOM节点）
 * @param {string} tagName - 触发切换时需操作的目标元素标签名（如"li"、"div"）
 * @author HiddenWhite
 * @version 1.0.0
 */
function setToggleListener(elSelector, tagName) {
    const el = document.querySelector(elSelector)
    // 上一次点击元素，第一次为空
    let previousEl
    
    el.addEventListener('click', function(e) {
        const target = e.target
        // 如果点击元素标签名为tagName才触发
        if (target.tagName === tagName) {
            // 移除上一个点击元素的激活样式
            if (previousEl) {
                previousEl.classList.remove('active')
            }
            // 给当前元素添加点击样式
            target.classList.add('active')
            // 上一个点击元素置为当前点击元素
            previousEl = target
        }        
    })
}

/**
 * @desc 生成目录结构
 * @param {HTMLElemtn} root - 需要生成到的容器
 * @param {Object} data - 生成用到的数据
 * @param {string} label - 目录的分类名第一次调用为空
 * @param {string} path - 具体内容的文件路径第一次为空字符串
 */

function generateStructure(root, data, label, path = '') {
    // 如果为基本数据类型执行这个代码块
	if (typeof data !== 'object' || data === null) {
        /*
         使用js代码创建如下结构：
         <li class="leaf-node">
             <a href=${path} target="frame-content">${data}</a>
         </li>
         最后添加到当前根容器root中
        */
		const li = document.createElement('li')
		const a = document.createElement('a')
		li.className = 'leaf-node'
		path = './article/' + path.slice(0, -3) + '/' + data + '.html'               	
		a.href = path
		a.target = 'frame-content'
		a.textContent = data
		li.append(a)
		root.appendChild(li)
        // 结束当前函数
		return
	}
   
    // 执行到这里说明data为对象（Object）类型需要创建分类元素
	
    // 保存创建的ul后面遍历递归时作为下个递归的根容器
	let ulEl
   
	// 如果没有分类名（label）第一次在就执行该代码块
	if (label !== undefined) {
        /*
         用js代码创建如下结构：
         <li>
             <details open>
                 <summary class="category-label">
                     ${label}  
                 </summary>
                 <ul>
                 </ul>
             </details>
         </li>
         最后添加到当前根容器root中
        */
		const li = document.createElement('li')
		const details = document.createElement('details')
		const summary = document.createElement('summary')
		ulEl = document.createElement('ul')
		
		details.open = true
		summary.className = 'category-label'
		summary.textContent = label
		details.appendChild(summary)
		details.appendChild(ulEl)
		li.appendChild(details)
		root.appendChild(li)
	} else {
        // 第一次没有分类（label）就创建一个ul添加当前根容器root中
		ulEl = document.createElement('ul')
		root.appendChild(ulEl)
	}
	
    // 遍历每个元素递归生成目录结构，ulEl为根元素，value作为data，key作为分类名（label），path就是累加当前分类名（label）
	for (const key in data) {
		const value = data[key]
		generateStructure(ulEl, value, key, path + key + '/')
	}
}

/**
 * @desc 初始化响应式布局，动态调整内容区域高度及最后一个子元素宽度
 * @param {string} parentSelector - 父容器选择器（用于获取包含子元素的父DOM节点）
 * @param {string} contentSelector - 内容区域选择器（用于获取需调整尺寸的内容容器）
 * @note 1. 计算父容器中子元素高度总和时，会忽略带"ignore"类的子元素；2. 内容区域最小高度限制为500px，不足时按500px设置；3. 内容区域高度会额外增加1px（避免布局缝隙）；4. 最后一个子元素宽度由页面 body 宽度与第一个子元素宽度的差值决定
 * @example initResponsiveLayout('.parent-container', '.content-area') // 初始化响应式布局，父容器为.parent-container，内容区域为.content-area
 */
function initResponsiveLayout(parentSelector, contentSelector) {
    // 获取父元素
	const parent = document.querySelector(parentSelector)
    // 获取它所有的子元素
	const children = parent.children
    // 获取内容元素
	const content = document.querySelector(contentSelector)
    // 记录除带有ignore类元素的总高度
	let heightSum = 0
    
	for (let i = 0; i < children.length; i++) {
		const element = children[i]
        // 不累加带有ignore类的元素
		if (!element.classList.contains('ignore')) {
			heightSum += element.offsetHeight
		}
	}
    
    // 剩余高度=内部窗口高度 - 累加的高度（heightSum）
	let remainingHeight = window.innerHeight - heightSum
    // 最小高度
	const minHeight = 500
    // 不足500就按500
	remainingHeight = remainingHeight < minHeight ? minHeight : remainingHeight
    // 最后加1px避免间隙
	content.style.height = remainingHeight + 1 + 'px'
	//获取body高度
	const bodyWidth = document.body.offsetWidth
    // 获取内容元素的第一个元素也就是(.directory-structure)的宽度
	const firstElementWidth = content.firstElementChild.offsetWidth
    //获取存放内容的元素（.main-content）
	const lastElementChild = content.lastElementChild
    // 剩余宽度等于= body宽度 - (.directory-structure)宽度
	const remainingWidth = bodyWidth - firstElementWidth
    //主要内容元素设置计算好的宽度
	lastElementChild.style.width = remainingWidth + 'px'
}