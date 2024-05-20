Hooks.on('init', () => {

    if(typeof Babele !== 'undefined') {
        Babele.get().register({
            module: 'pf2e-ru',
            lang: 'ru',
            dir: 'compendium'
        });
    }
});
