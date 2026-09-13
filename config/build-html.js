const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier-terser');

async function start() {
    let template = fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf8');
    let script = fs.readFileSync(path.resolve(__dirname, '../tmp/main.roadrolled.js'), 'utf8');
    let style = fs.readFileSync(path.resolve(__dirname, '../tmp/style.css'), 'utf8');
    let html = template.replace('{{ script }}', script).replace('{{ style }}', style);

    const result = await minify(html, {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
        removeAttributeQuotes: true
    });

    fs.writeFileSync(path.resolve(__dirname, '../build/index.html'), result, 'utf8');
    console.log('HTML build done');
}

start()