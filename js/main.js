!function () {
    let css1 = `/* 
* 面试官你好，我是XXX
* 只用文字作做我介绍太单调了
* 我就用代码来介绍吧
* 首先准备一些样式
*/
*{
 transition: all 1s;
}
html{
 background: #eee;
}
#code{
 border: 1px solid #aaa;
 padding: 16px;
}
/* 我需要一点代码高亮 */
.token.selector{ color: #690; }
.token.property{ color: #905; }
/* 加一个呼吸效果 */
#code{
 animation: breath 0.5s infinite alternate-reverse;
}
/* 现在正式开始 */
/* 我需要一张白纸 */
#code-wrapper{
 width: 50%; right: 0; position: fixed; 
 height: 100%;
}
#paper > .content {
display: block;
}
/* 于是我就可以在白纸上写字了，请看右边 */
`

    let css2 = `
/* 接下来用一个优秀的库 marked.js
* 把 Markdown 变成 HTML
*/
`
    let md = `
# 自我介绍
我叫 XXX
1990 年 1 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位
# 技能介绍
熟悉 JavaScript CSS
# 项目介绍
1. XXX 轮播
2. XXX 简历
3. XXX 画板

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
`
    let css3 = `
/*
* 这就是我的会动的简历
* 谢谢观看
*/
`
    /*把code写到#code和style标签里*/
    function writePage(prefix, code, fn) {
        let n = 0
        let id = setInterval(() => {
            n += 1
            $('#code').html(Prism.highlight(prefix + code.substring(0, n), Prism.languages.css));
            $('#styleTag').html(prefix + code.substring(0, n))
            $('#code').scrollTop($('#code').get(0).scrollHeight)
            if (n >= code.length) {
                window.clearInterval(id)
                fn && fn.call()
            }
        }, 0)
    }
    function writeMarkdown(markdown, fn) {

        let m = 0
        let id = setInterval(() => {
            m += 1
            $('#paper>.content').html(markdown.substring(0, m))
            $('#paper>.content').scrollTop($('#paper>.content').get(0).scrollHeight)
            if (m >= markdown.length) {
                window.clearInterval(id)
                fn && fn.call()
            }
        }, 0)
    }

    function createPaper(fn) {
        let paper = document.createElement('div')
        paper.id = 'paper'
        let content = document.createElement('pre')
        $(content).addClass('content')
        paper.appendChild(content)
        document.body.appendChild(paper)
        fn && fn.call()
    }

    function translateMarkdownToHtml(fn) {
        let div = document.createElement('div')
        div.className = 'html markdown-body'
        div.innerHTML = marked(md)
        let markdownContainer = document.querySelector('#paper > .content')
        markdownContainer.replaceWith(div)
        fn && fn.call()
    }
    writePage('', css1, () => { // writePage call the function
        createPaper(() => {
            writeMarkdown(md, () => {
                writePage(css1, css2, () => {
                    translateMarkdownToHtml(() => {
                        writePage(css1 + css2, css3, () => {
                            console.log('完成')
                        })
                    })
                })
            })
        })
    })
}.call()