Hooks.once("ready", () => {

	const DONT_REMIND_AGAIN_KEY = "popup-dont-remind-again-2";

	game.settings.register("pf2e-ru", DONT_REMIND_AGAIN_KEY, {
		name: "",
		default: 0,
		type: Number,
		scope: "world",
		config: false,
	});
  
  
  if (game.user.isGM && !game.settings.get("pf2e-ru", DONT_REMIND_AGAIN_KEY)) {
  new Dialog({
            title: "Перевод Pathfinder 2e - ВАЖНО",
			content: `<large>
    <p><strong>Я (Доктор) создал этот модуль не без помощи некоторых людей, для более удобной игры в Pathfinder 2e. Обязательно зайдите на мой <a href=https://discord.gg/YWTSmnh76H>Discord</a> если вы хотите задать вопрос, указать ошибку или просто присоединиться к нашему русскоязычному PF2e сообществу.</strong></p>

    <h1>Настройка модуля</h1>
    <p>Для работы модуля необходимо установить либо модуль Phenomen "Russian Translation" либо мой модуль для перевода интерфейса фаундри "Альтернативный русский перевод интерфейса", оба эти модуля указаны как рекомендуемые зависимости. Для правильной работы этого модуля достаточно установить один из инх и выставить "russian" язык в качестве основного языка VTT Foundry.</p>
	<p>Чтобы игроки видели перевод, зайдите в "настройки игры"/"основные настройки", откройте "настройку прав" и включите игрокам функцию "проводник файлов"</p>
	<p>Уведомите игроков, что для поиска как по оригинальным, так и по переведенным названиям, им следует включить функцию "Отображать оригинальное названия" в настройках модуля Babele.</p></large>

    <h1>Отдельные благодарности</h1>
	<p><strong>Юрию "Бальтазару" Воронину</strong> за титанический труд <a href=https://pf2e-ru-translation.readthedocs.io/ru/latest/index.html>перевода Pathfinder 2e</a>.</p>
	<p><strong>Алишеру "Торговцу Сказками"</strong> за помощь со скриптами Babele, когда был изменен способ обработки данных перевода.</p>`,
            buttons: {
                ok: { icon: '<i class="fas fa-check"></i>', label: "Понял" },
                dont_remind: {
                    icon: '<i class="fas fa-times"></i>',
                    label: "Не показывай это снова",
                    callback: () => game.settings.set("pf2e-ru", DONT_REMIND_AGAIN_KEY, true),
                },
            },
        }).render(true);
    }
});