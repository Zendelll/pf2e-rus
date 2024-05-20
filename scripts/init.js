Hooks.once('init', async function () {
	
	const systemTranslationsFolder = "modules/pf2e-ru/";
	const moduleTranslationsFolder = systemTranslationsFolder + "modules/";
	
	const systemFiles = ["pf2e.json", "re-pf2e.json", "action-pf2e.json", "kingmaker.json"]	
	const moduleFiles = [
		{"id":"babele", "path":"babele.json"},
		{"id":"hover-distance", "path":"hover-distance.json"},
		{"id":"hurry-up", "path":"hurry-up.json"},
		{"id":"lib-wrapper", "path":"lib-wrapper.json"},
		{"id":"pf2e-alignment-damage", "path":"pf2e-alignment-damage.json"},
		{"id":"pf2e-ap187-190-gatewalkers", "path":"pf2e-ap187-190-gatewalkers.json"},
		{"id":"pf2e-arp", "path":"pf2e-arp.json"},
		{"id":"pf2e-bardic-inspiration", "path":"pf2e-bardic-inspiration.json"},
		{"id":"pf2e-dailies", "path":"pf2e-dailies.json"},
		{"id":"pf2e-decks-harrow", "path":"pf2e-decks-harrow.json"},
		{"id":"pf2e-dorako-ui", "path":"pf2e-dorako.json"},
		{"id":"pf2e-dragruler", "path":"pf2e-dragruler.json"},
		{"id":"pf2e-effect-description", "path":"pf2e-effect-description.json"},
		{"id":"pf2e-exploration-activities", "path":"pf2e-exploration-activities.json"},
		{"id":"pf2e-extempore-effects", "path":"pf2e-extempore-effects.json"},
		{"id":"pf2e-fatigue", "path":"pf2e-fatigue.json"},
		{"id":"pf2e-flatten", "path":"pf2e-flatten.json"},
		{"id":"pf2e-giveth", "path":"pf2e-giveth.json"},
		{"id":"pf2e-hero-actions", "path":"pf2e-hero-actions.json"},
		{"id":"pf2e-inspire-courage", "path":"pf2e-inspire-courage.json"},
		{"id":"pf2e-modifiers-matter", "path":"pf2e-modifiers-matter.json"},
		{"id":"pf2e-npc-knowledges", "path":"pf2e-npc-knowledges.json"},
		{"id":"pf2e-persistent-damage", "path":"pf2e-persistent-damage.json"},
		{"id":"pf2e-ranged-combat", "path":"pf2e-ranged-combat.json"},
		{"id":"pf2e-reaction", "path":"pf2e-reaction.json"},
		{"id":"pf2e-spells-summary", "path":"pf2e-spells-summary.json"},
		{"id":"pf2e-stances", "path":"pf2e-stances.json"},
		{"id":"pf2e-target-damage", "path":"pf2e-target-damage.json"},
		{"id":"pf2e-thaum-vuln", "path":"pf2e-thaum-vuln.json"},
		{"id":"pf2e-token-hud", "path":"pf2e-token-hud.json"},
		{"id":"pf2e-unided", "path":"pf2e-unided.json"},
		{"id":"pf2-flat-check", "path":"pf2-flat-check.json"},
		{"id":"sequencer", "path":"sequencer.json"},
		{"id":"token-action-hud", "path":"token-action-hud.json"},
		{"id":"token-action-hud-core", "path":"token-action-hud-core.json"},
		{"id":"token-action-hud-pf2e", "path":"token-action-hud-pf2e.json"},
		{"id":"xdy-pf2e-workbench", "path":"xdy-pf2e-workbench.json"},
		{"id":"pf2e-jb2a-macros", "path":"pf2e-jb2a-macros.json"}
	]

	game.settings.register('pf2e-ru', 'translateSystem', {
        name: "Перевод системы Pathfinder 2e",
        scope: 'world',
        type: Boolean,
        config: true,
        default: true,
        restricted: true,
        requiresReload: true
    });
	
	moduleFiles.forEach(m =>{
		let id = m.id;		
		let module = game.modules.get(m.id);
		
		console.log("Checking mod: " + m.id);
		if(module?.active){
			game.settings.register("pf2e-ru", "translateModule_" + m.id, {
				name: "Перевод модуля " + module.title,
				scope: 'world',
				type: Boolean,
				config: true,
				default: true,
				restricted: true,
				requiresReload: true
			});
		}
	});

    if (typeof libWrapper === "function") {
        libWrapper.register("pf2e-ru",
            "game.i18n._getTranslations",
            loadSelectedTranslations,
            "MIXED");
    }
    else {
        new Dialog({
            title: "Выбор перевода",
            content: `<p>Для работы модуля перевода необходимо активировать модуль <b>libWrapper</b></p>`,
            buttons: {
                done: {
                    label: "Хорошо",
                },
            },
        }).render(true);
    }

    async function loadSelectedTranslations(wrapped, lang) {
        const defaultTranslations = await wrapped(lang);
        const promises = [];
		
		if (game.i18n.lang != "ru")
			return defaultTranslations;
		
		if(game.settings.get("pf2e-ru", "translateSystem")){
			systemFiles.forEach(f =>{
				promises.push(this._loadTranslationFile(systemTranslationsFolder + f));
			});
		}
		
		moduleFiles.forEach(m =>{
			let id = m.id;		
			let module = game.modules.get(m.id);
		
			if(module?.active && game.settings.get("pf2e-ru", "translateModule_" + m.id)){
				promises.push(this._loadTranslationFile(moduleTranslationsFolder + m.path));
			}
		});

        await Promise.all(promises);
        for (let p of promises) {
            let json = await p;
            foundry.utils.mergeObject(defaultTranslations, json, { inplace: true });
        }

        return defaultTranslations;
    }

});