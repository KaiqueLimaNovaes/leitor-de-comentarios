const puppeter = require('puppeteer');

// Ler a página

async function start(){
    
    async function loadMore(page, selector){
        const moreButton = await page.$(selector);
        console.log('teste 1');

        if (moreButton){
            console.log("More");
            await moreButton.click();
            await page.waitFor(selector, {timeout: 3000}).catch(() => {console.log('timeout')});
            await loadMore(page, selector);
        };
    };

    // Pegar os comentários
    async function getComments(page, selector){
        // Os dois $$ indica que eu quero pegar todos os elementos
        const comments = await page.$$eval(selector, links => links.map(link => link.innerText));
        return comments;
    };

    const browser = await puppeter.launch();
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/p/CIGT_RzHNs4/');

    // O selector é o botão de carregar mais comentários do instagram
    await loadMore(page, '.dCJp8');
    const comments = await getComments(page, '.C4VMK span a');

    console.log(comments);
    console.log('teste 2');
};

/*
    const fakeDados = [
        '@kaique',
        '@victor',
        '@kaique',
        '@beatriz',
        '@thiago',
        '@thiago',
        '@sirlene',
        '@kaique',
        '@beatriz',
        '@kaique',
        '@kaique',
        '@victor',
        '@beatriz',
        '@kaique'
    ];
    */

// Contar os repetidos

function count(dados){
    const count = {};
    dados.forEach(dado=>{count[dado] = (count[dado] || 0) + 1});
    return count;
};

// Ordernar

function sort(counted){
    const entries = Object.entries(counted);

    const sorted = entries.sort((a, b) => {return b[1] - a[1]});

    console.log(sorted);
};

//sort(count(fakeDados));

start();