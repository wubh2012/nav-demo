var log = console.log.bind(console)

var localStorageKey = 'keymaps'
var defaultIcon = 'https://i.loli.net/2017/11/10/5a05afbc5e183.png'
var hash = {}

var localstorageHelper = {
    getData: function () {
        return JSON.parse(localStorage.getItem(localStorageKey) || 'null')
    },
    saveData: function (hash) {
        localStorage.setItem(localStorageKey, JSON.stringify(hash))
    }

}

var loadKeys = function () {
    var keys = {
        0: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        1: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        2: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
        length: 3
    }
    return keys
}

var loadHash = function () {

    var defaultHash = {
        'q': 'www.qq.com',
        'w': 'weibo.com',
        'e': undefined,
        'r': 'renren.com',
        't': 't.tt',
        'y': 'youtube.com',
        'u': undefined,
        'i': 'iqiyi.com',
        'j': 'www.jd.com',
        'a': 'alibaba.com',
        'z': 'zhihu.com',
        'b': 'douban.com',
    }
    var localStorageHash = localstorageHelper.getData()
    if (localStorageHash) {
        hash = localStorageHash
    } else {
        hash = defaultHash
    }
}


var createTag = function (tagName) {
    return document.createElement(tagName)
}

var setImageSrc = function (img, domain) {
    if (domain) {
        img.src = 'http://' + domain + '/favicon.ico'
    } else {
        img.src = defaultIcon
    }    
    img.onerror = function (event) {
        event.target.src = defaultIcon
    }
}

var createButton = function (key) {
    var editButton = createTag('button')
    editButton.textContent = '编辑'
    editButton.dataset.key = key
    editButton.onclick = function (event) {
        var targetkey = event.target.dataset.key
        log('点击编辑按钮', event)
        var domain = prompt('请输入网址，例如: www.qq.com')
        hash[targetkey] = domain

        var img = event.target.previousSibling
        setImageSrc(img, domain)
        localstorageHelper.saveData(hash)
    }
    return editButton
}

var createImage = function (domain) {
    var img = createTag('img')
    setImageSrc(img, domain)    
    return img
}

var createSpan = function (text) {
    var span = createTag('span')
    span.textContent = text
    return span
}

var createKeyboard = function () {
    var keys = loadKeys()

    var mainContent = document.querySelector('#mainContent')
    for (let index = 0; index < keys['length']; index++) {
        var div = createTag('div')
        for (let j = 0; j < keys[index].length; j++) {
            var key = keys[index][j]

            var kbd = createTag('kbd')
            var span = createSpan(key)
            var editButton = createButton(key)
            var img = createImage(hash[key])

            kbd.appendChild(span)
            kbd.appendChild(img)
            kbd.appendChild(editButton)
            div.appendChild(kbd)

        }
        mainContent.appendChild(div)
    }
}

var registerListener = function () {
    document.onkeypress = function (event) {
        log(event)
        var url = hash[event.key]
        if (url !== undefined) {
            log('打开链接', url)
            window.open('http://' + url, '_blank')
        }
    }
}

var __main = function () {
    loadHash()
    createKeyboard()
    registerListener()
}

__main()