/**
 * build 配置
 */

var path = require('path');

// 当前项目的实际路径【文件夹具体路径】
var CURR_PROJECT_DIR = __dirname;
// 当前项目的名称
var CURR_PROJECT = path.basename(path.dirname(__filename));

// 静态资源前缀
var STATIC_PREFIX = path.join('resource', CURR_PROJECT);
// 模板资源前缀
var TPL_PREFIX = path.join('template', CURR_PROJECT);

// 静态资源的发布目录
var STATIC_TARGET = STATIC_PREFIX + '$0';

// django模板的发布目录
var TPL_TARGET = TPL_PREFIX + '$0';

// 设置此项目的依赖项【目录最后不要加斜杠】
fis.set(
    'project.dependencies', [

    ]
);



var PAGELET_SCRIPT_TAG = '<!-- PAGELET_SCRIPT -->';

var PAGELET_STYLE_TAG = '<!-- PAGELET_STYLE -->';

//------------------------------以下配置针对通用配置---------------------------------//

// 静态资源构建目标目录
fis.match('*', {
    release: STATIC_TARGET
});

// 模板
fis.match('*.html', {
    parser: [
        STATIC_PATH_REPLACE,
        REQUIRE_ROOT_REPLACE,
        TEMPLATE_REPLACE,
        fis.plugin('pagelet', {
            scriptTag: PAGELET_SCRIPT_TAG,
            styleTag: PAGELET_STYLE_TAG
        })
    ],
    release: TPL_TARGET
});

// css
fis.match('*.css', {
    parser: [
        // STATIC_PATH_REPLACE
    ],
    postprocessor: fis.plugin('cssprefixer', {
        browsers: [
            'iOS > 5',
            'Android >= 4',
            'Chrome >= 31'
        ]
    })
});

// js
fis.match('*.js', {
    parser: [
        STATIC_PATH_REPLACE
    ]
});

// 启用 es6-babel 插件，解析 .es6 后缀为 .js
fis.match('*.es6', {
    rExt: '.js',
    parser: [
        // STATIC_PATH_REPLACE,
        fis.plugin('es6-babel')
    ]
});

// 前端模板解析【需要在页面中手动引入handlebars的库文件】
fis.match('*.tmpl', {
    rExt: '.js',
    parser: fis.plugin('handlebars-4.x'),
    release: false // handlebars 源文件不需要编译
});

// less【less中的import指令，最好使用相对路径来引用】
fis.match('*.less', {
    rExt: '.css', // from .less to .css
    parser: [
        STATIC_PATH_REPLACE,
        fis.plugin('less-2.x')
    ],
    postprocessor: fis.plugin('cssprefixer', {
        browsers: [
            'iOS > 5',
            'Android >= 4',
            'Chrome >= 31'
        ]
    })
});

fis.match('*.{js,less,css,png,jpg,jpeg,gif,es6}', {
    useHash: true,
    domain: STATIC_DOMAIN
});

fis.hook('amd');

fis.match('{component,test,tools,dataController}/**.js', {
    isMod: true
});


fis.match('{component,test,tools,dataController}/**.js', {
    postprocessor: fis.plugin('jswrapper', {
        type: 'amd'
    })
});

fis.match('main/index.js', {
    isMod: true
});

fis.match('main/index.js', {
    postprocessor: fis.plugin('jswrapper', {
        type: 'amd'
    })
});

//------------------------------以下配置针对online部署---------------------------------//

fis.media('online').match('*.{less,css}', {
    optimizer: fis.plugin('clean-css')
});

fis.media('online').match('*.{js,es6,tmpl}', {
    optimizer: fis.plugin('uglify-js')
});

/* 以下两处为上线路径配置 */

// 静态资源
fis.media('online').match('*', {
    release: path.join('webroot', STATIC_TARGET),
    url: path.join('/', STATIC_TARGET)
});

// 模板
fis.media('online').match('*.html', {
    release: path.join('djangosite/templates', TPL_TARGET)
});

//------------------------------以下配置针对newol部署---------------------------------//

fis.media('newol').match('*.{less,css}', {
    optimizer: fis.plugin('clean-css')
});

fis.media('newol').match('*.{js,es6,tmpl}', {
    optimizer: fis.plugin('uglify-js')
});

/* 以下两处为上线路径配置 */

// 静态资源
fis.media('newol').match('*', {
    release: path.join('', STATIC_TARGET),
    url: path.join('/', STATIC_TARGET)
});

// 模板
fis.media('newol').match('*.html', {
    release: path.join('', TPL_TARGET)
});

//------------------------------以下配置针对local调试---------------------------------//

// 静态资源
fis.media('local').match('*', {
    release: '$0'
});

// 模板
fis.media('local').match('*.html', {
    parser: [
        STATIC_PATH_REPLACE,
        REQUIRE_ROOT_REPLACE_4LOCAL,
        TEMPLATE_REPLACE_4LOCAL,
        fis.plugin('pagelet', {
            scriptTag: PAGELET_SCRIPT_TAG,
            styleTag: PAGELET_STYLE_TAG
        })
    ],
    release: '$0'
});

fis.media('local').match('*.{js,less,css,png,jpg,jpeg,gif,es6}', {
    useHash: false,
    domain: null
});

//-----------------------------针对Django解析的local调试【测试阶段】------------------------------//

// 需要注册django母模板的模板【在这里注册以后，在发布时这几个文件就会被编译成纯粹的html】
var djangoExportTpl = [
    '{',
    '/page/index/recommend4dj.html',
    '}'
].join(',');

fis.media('dlocal').match(djangoExportTpl, {
    extras: {
        django: true
    }
});

fis.media('dlocal').match('*', {
    release: '$0'
});

// 在local的情况下调试，才会调用django的mock数据
fis.media('dlocal').match('*.html', {
    parser: [
        STATIC_PATH_REPLACE,
        REQUIRE_ROOT_REPLACE_4LOCAL,
        DJANGO_REPLACE,
        fis.plugin('pagelet', {
            scriptTag: PAGELET_SCRIPT_TAG,
            styleTag: PAGELET_STYLE_TAG
        })
    ],
    // 调起django插件
    postprocessor: [fis.plugin('html-django')],
    release: '/$0'
});

fis.media('dlocal').match('*.{js,less,css,png,jpg,jpeg,gif,es6}', {
    useHash: false,
    domain: null
});

//-----------------------------map.json------------------------------//

fis.match('/map.json', {
    release: '/config/$0'
});

//------------------------------远程发布设置-----------------------------//

for (var username in REMOTE_TARGET_MAP) {
    (function(username) {
        var cur = REMOTE_TARGET_MAP[username];
        var rec = cur.receiver;
        for (var selector in cur.deploy) {
            fis.media(username).match(selector, {
                deploy: fis.plugin('http-push', {
                    receiver: rec,
                    to: cur.deploy[selector]
                })
            });
        }
    })(username);
}

//------------------------------忽略项-------------------------- -------//

// 设置忽略项
fis.set('project.ignore',
    fis.get('project.ignore').concat([
        '/config/**',
        '/fis-*.js',
        '/*.md',
        '/*.txt',
        '/**/*.md',
        '/**/*.txt',
        '/.watchingignore'
    ]));

//-----------------------------特殊标记替换函数--------------------------//

// 静态资源路径
function STATIC_PATH_REPLACE(content, file, settings) {
    var curdeppro = file.id.split('/')[0];
    return content
        .replace(/\[\[curresroot\]\]/ig, path.join('/', curdeppro));
}

// 针对实际发布的模板路径
function TEMPLATE_REPLACE(content, file, settings) {
    var curdeppro = file.id.split('/')[0];
    return content
        /* for online or remote */
        .replace(/\[\[tplroot\]\]/ig, TPL_PREFIX)
        .replace(/\[\[curtplroot\]\]/ig,
            path.join(TPL_PREFIX, curdeppro));
}

function TEMPLATE_REPLACE_4LOCAL(content, file, settings) {
    var curdeppro = file.id.split('/')[0];
    return content
        /* for local */
        .replace(/\[\[tplroot\]\]\//ig, '')
        .replace(/\[\[curtplroot\]\]\//ig,
            path.join(curdeppro, '/')
        );
}

// 以下函数做requireroot的替换
function REQUIRE_ROOT_REPLACE(content, file, settings) {
    var curdeppro = file.id.split('/')[0];
    return content
        .replace(/\[\[requireroot\]\]/ig, STATIC_PREFIX);
}

function REQUIRE_ROOT_REPLACE_4LOCAL(content, file, settings) {
    var curdeppro = file.id.split('/')[0];
    return content
        .replace(/\[\[requireroot\]\]/ig, '/');
}

// 针对local模式的django模板路径
function DJANGO_REPLACE(content, file, settings) {
    var curdeppro = file.id.split('/')[0];
    // 默认django模板在local模式下，模板根目录是当前项目的上一级目录
    return content
        .replace(/\[\[tplroot\]\]/ig, CURR_PROJECT)
        .replace(/\[\[curtplroot\]\]/ig,
            CURR_PROJECT + '/' + curdeppro);
}
