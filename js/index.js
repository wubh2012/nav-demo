var log = console.log.bind(console);
var localStorageKey = 'keymaps';
var defaultIcon = 'https://i.loli.net/2017/11/10/5a05afbc5e183.png';
var hash = {};

var getDefaultOption = function(){
    var keys = {
        0: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        1: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        2: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
        length: 3
    }
    var hash = {
        'q': 'qq.com',
        'w': 'weibo.com',
        'e': undefined,
        'r': 'renren.com',
        't': 't.tt',
        'y': 'youtube.com',
        'u': undefined,
        'i': 'iqiyi.com',
        'o': undefined,
        'j': 'jd.com',
        'a': 'alibaba.com',
        'z': 'zhihu.com',
        'b': 'douban.com'
    }

    var localStorageHash = JSON.parse(localStorage.getItem(localStorageKey) || 'null');
    if (localStorageHash) {
        hash = localStorageHash;
    }

    return {
        keys: keys,
        hash: hash,
    }
}


var createTag = function (tagName) {
    return document.createElement(tagName);
}

var createButton = function (key) {
    var editButton = createTag('button');
    editButton.textContent = '编辑';
    editButton.dataset.key = key;
    editButton.onclick = function (event) {
        var targetkey = event.target.dataset.key
        log('点击编辑按钮', event);
        var domain = prompt('请输入 URL');
        hash[targetkey] = domain;

        var img = event.target.previousSibling;
        img.src = 'http://' + domain + '/favicon.ico';
        img.onerror = function (event) {
            event.target.src = defaultIcon;
        }
        // 保存到 localstorage
        localStorage.setItem(localStorageKey, JSON.stringify(hash));
    }
    return editButton;
}

var createImage = function (key) {
    var img = createTag('img');
    if (hash[key]) {
        img.src = 'http://' + hash[key] + '/favicon.ico';
    } else {
        img.src = defaultIcon;
    }
    img.onerror = function (event) {
        log('icon 加载失败..', event);
        event.target.src = defaultIcon;
    }
    return img;
}

var createSpan = function(text){
    var span = createTag('span');
    span.textContent = text;
    return span;
}

var createKeyboard = function(keys){
    for (let index = 0; index < keys['length']; index++) {
        var div = createTag('div');
        for (let j = 0; j < keys[index].length; j++) {
            var key = keys[index][j];
    
            var kbd = createTag('kbd');
            var span = createSpan(key);
            var editButton = createButton(key);
            var img = createImage(key);
    
            kbd.appendChild(span)
            kbd.appendChild(img);
            kbd.appendChild(editButton);
            div.appendChild(kbd);
    
        }    
        mainContent.appendChild(div);    
    }
}

var registerListener = function(){
    document.onkeypress = function (event) {
        log(event);
        var url = hash[event.key];
        if (url !== undefined) {
            log('打开链接', url);
            window.open('http://' + url, '_blank');
        }
    }
}

var __main = function(){
    var option = getDefaultOption();
    hash = option.hash;
    createKeyboard(option.keys);
    registerListener();
}

__main();

