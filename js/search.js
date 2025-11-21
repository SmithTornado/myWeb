
setSearchListener('.search-bar input', '.search-result', '.directory-structure a')

setToggleListener('.search-result', 'A')

function setSearchListener(searchInputSelector, searchResultSelector, contentSelector) {
    // 获取搜索输入框
    const searchInput = document.querySelector(searchInputSelector)
    // 获取搜索结构展示栏
    const searchResult = document.querySelector(searchResultSelector)
    //获取要搜索的所有目标元素
    const searchContents = document.querySelectorAll(contentSelector)      
    
    searchInput.oninput = debounce(searchHandler)
    
    function searchHandler(e) {
        searchResult.replaceChildren()
        const keyword = e.target.value
        if (!searchContents || !keyword) return                                
                
        searchContents.forEach(function(el) {
            const text = el.textContent            
            const startIndex = text.indexOf(keyword)            
            if (startIndex !== -1) {
                const pathName = generatePathName(el)                                
                const li = document.createElement('li')              
                const copy = el.cloneNode(true) 
                copy.textContent = pathName
                copy.className = ''                       
                li.appendChild(copy)                               
                searchResult.appendChild(li)
            }
        }) 
    }
}

function generatePathName(el) {
    let pathName = el.textContent.trim()
    let currentEl = el // 用currentEl跟踪元素，避免覆盖原始el
    // 定义两个阶段的「向上遍历父元素次数」（对应原代码的两段操作）
    const stages = [3, 4] 

    // 循环处理每个阶段
    for (const upCount of stages) {
        // 向上遍历指定次数的父元素
        for (let i = 0; i < upCount && currentEl; i++) {
            currentEl = currentEl.parentElement
        }
        // 取第一个子元素并alert文本（需判断currentEl不为空）
        if (currentEl ?. firstElementChild) {
             pathName = currentEl.firstElementChild.textContent + '>' + pathName
            // 更新currentEl为当前子元素，为下一轮向上遍历做准备
            currentEl = currentEl.firstElementChild
        }
    }

    return pathName;
}
