function addCopy(parentSelector, top, right) {
        const parents = document.querySelectorAll(parentSelector)
        parents.forEach(function(parent) {
        parent.style.position = 'relative'
            
        const copyBtn = document.createElement('button')
        copyBtn.className = 'copy-btn'
        copyBtn.textContent = '复制'
        copyBtn.style.position = 'absolute'
        copyBtn.style.top = top + 'px'
        copyBtn.style.right = right + 'px'        
        const codeText = parent.firstElementChild.textContent
        
        copyBtn.onclick = function() {
            copyText(codeText)
            this.textContent = '已复制'
            
            setTimeout(function() {
                copyBtn.textContent = '复制'
            }, 1000)
        }                
                      
        parent.appendChild(copyBtn)        
    })
}

/**
 * 复制文本到剪贴板
 * @param {string} text - 要复制的文本内容
 * @returns {Promise<void>} 成功resolve，失败reject（可捕获权限/格式错误）
 */
function copyText(text) {
    // 校验文本合法性，避免空值复制
    if (!text || typeof text !== 'string') {
        return Promise.reject(new Error('请传入有效字符串'));
    }
    // 核心复制API，兼容主流浏览器
    return navigator.clipboard.writeText(text);
}