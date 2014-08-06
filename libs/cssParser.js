/**
 * fis.baidu.com
 * @type {Function}
 */

'use strict';

var Rules = require('./css/rules.js');
module.exports = function (content, images) {
    var _arr_css = []
        , _content;
    var reg = /(?:\/\*[\s\S]*?(?:\*\/|$))|([^\{\}\/]*)\{([^\{\}]*)\}/gi;  //注释块 或者 规则块
    _content = content.replace(reg, function(m, selector, css) {
        if (css) {
            var rules = Rules.wrap(selector.trim(), css.trim());
            if (rules.isSprites() && images.hasOwnProperty(rules.getImageUrl())) {  //判断一下是否有这张图片
                _arr_css.push(rules);
                css = rules.getCss(); //替换后的css，去掉了background属性，添上了background-repeat等属性
            }
            return selector + '{' + css + '}';
        }
        return m;
    });
    return {
        content: _content,  //替换后的css
        map: _arr_css //rules的列表
    };
};
