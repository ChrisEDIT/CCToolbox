/*CookieClicker HackMenu ChrisEdit */

javascript:(function() {
    var options = {
        panelId: 'cookie-cheater',
        intervalDelay: 1,
        buttons: {
		
		    'UpgradesforFree' : {
			label: 'Upgrades for Free',
			action: function() {
                 Game.UpgradesById.forEach(function (e) { e.basePrice = 0; }); Game.upgradesToRebuild = 1;
			   }
			},
			
            'bigCookie': {
                label: 'Auto-click cookie',
                action: function(){
                    toggleAutoAction('bigCookie', function(){
                        Game.ClickCookie();
                    })
                }
            },
            'autoGoldenCookie': {
                label: 'Auto-click golden cookie',
                action: function(){
                    toggleAutoAction('autoGoldenCookie', function(){
                        Game.goldenCookie.click();
                    })
                }
            },
            'spawnGoldenCookie': {
                label: 'Spawn golden cookie',
                action: function(){
                    Game.goldenCookie.spawn();
                }
            },
            'autoSpawnGoldenCookie': {
                label: 'Auto-spawn golden cookie',
                action: function(){
                    toggleAutoAction('autoSpawnGoldenCookie', function(){
                        options.buttons['spawnGoldenCookie'].action();
                    })
                }
            },
            'buyProducts': {
                label: 'Buy products',
                action: function(){
                    var products = document.getElementsByClassName('product');
                    for(i=0;i<products.length;i++){
                        products[i].click();
                    }
                }
            },
            'autoBuyProducts': {
                label: 'Auto-buy products',
                action: function(){
                    toggleAutoAction('autoBuyProducts', function(){
                        options.buttons['buyProducts'].action();
                    })
                }
            },
            'buyUpgrades': {
                label: 'Buy upgrades',
                action: function(){
                    if (Game.UpgradesInStore.length > 0){
                        Game.UpgradesInStore[0].buy();
                    }
                }
            },
            'autoBuyUpgrades': {
                label: 'Auto-buy upgrades',
                action: function(){
                    toggleAutoAction('autoBuyUpgrades', function(){
                        options.buttons['buyUpgrades'].action();
                    })
                }
            },
            'showGoldenCookieDelay': {
                label: 'Show golden cookie delay in title',
                action: function(){
                    toggleAutoAction('showGoldenCookieDelay', function(){
                        document.title='(' + Math.floor(Game.goldenCookie.delay / Game.fps) + ' s) '+Beautify(Game.cookies)+' '+(Game.cookies==1?'cookie':'cookies');
                    })
                }
            },
			
			'InfinityCookies' : {
			label: 'Give Infinity Cookies',
			action: function() {
                 Game.cookies = 2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000;
			   }
			},
			
            'optimalWin': {
                label: 'All Hacks',
                action: function(){
                    toggleAutoAction('optimalWin', function(){
                    
                        /*UPGRADES FOR FREE */
                        Game.UpgradesById.forEach(function (e) { e.basePrice = 0; }); Game.upgradesToRebuild = 1;

                        /* auto-click big cookie and spawn/auto-click golden cookie */
                        Game.ClickCookie();
                        Game.goldenCookie.spawn();
                        Game.goldenCookie.click();

                        /* vars */
                        var cursorProduct = Game.Objects.Cursor;
                        var timeMachine = Game.ObjectsById[Game.ObjectsById.length-1];
                        var cursUpgrade;

                        /* buy 10 cursors */
                        if (cursorProduct.amount < 10){
                            cursorProduct.buy();
                            return;
                        }

                        /* buy a bunch of cursor upgrades */
                        cursUpgrade = Game.UpgradesById[0];
                        if (!cursUpgrade.bought && cursUpgrade.unlocked){
                            cursUpgrade.buy();
                            return;
                        }
                        cursUpgrade = Game.UpgradesById[1];
                        if (!cursUpgrade.bought && cursUpgrade.unlocked){
                            cursUpgrade.buy();
                            return;
                        }
                        cursUpgrade = Game.UpgradesById[2];
                        if (!cursUpgrade.bought && cursUpgrade.unlocked){
                            cursUpgrade.buy();
                            return;
                        }
                        cursUpgrade = Game.UpgradesById[75];
                        if (!cursUpgrade.bought && cursUpgrade.unlocked){
                            cursUpgrade.buy();
                            return;
                        }
                        cursUpgrade = Game.UpgradesById[76];
                        if (!cursUpgrade.bought && cursUpgrade.unlocked){
                            cursUpgrade.buy();
                            return;
                        }

                        /* buy upgrades if they are available in store and < 1/4 time machine price */
                        if (Game.UpgradesInStore.length > 0 && Game.UpgradesInStore[0].basePrice < timeMachine.price / 4){
                            Game.UpgradesInStore[0].buy();
                        }

                        /* prioritize time machines over everything */
                        timeMachine.buy();

                    })
                }
            },
        }
    };

	
    addStyleSheet();
    addPanel();
    for(var name in options.buttons){
        if (!options.buttons[name]) {
            return;
        }
        addButton(name, options.buttons[name].label, options.buttons[name].action);
    }
    function autoAction(name, action){
        if (!options.buttons[name]){
            return;
        }
        options.buttons[name].interval = setInterval(action, options.intervalDelay);
    }
    function stopAutoAction(name){
        clearInterval(options.buttons[name].interval);
    }
    function toggleAutoAction(name, action){
        if(!options.buttons[name].on){
            autoAction(name, action);
            options.buttons[name].on = true;
            options.buttons[name].element.className = 'active';
        } else {
            stopAutoAction(name);
            options.buttons[name].on = false;
            options.buttons[name].element.className = '';
        }
    }
    function addPanel(){
        if (document.getElementById(options.panelId)){
            document.getElementById(options.panelId).remove();
        }
        options.panel = document.createElement("div");
        options.panel.id = options.panelId;
        document.body.appendChild(options.panel);
    }
    function addButton(name, label, action){
        if (!options.buttons[name]){
            return;
        }
        options.buttons[name].element = document.createElement('button');
        options.buttons[name].element[(typeof document.body.style.WebkitAppearance=="string")?"innerText":"innerHTML"] = label;
        options.buttons[name].element.addEventListener('click', action);
        options.panel.appendChild(options.buttons[name].element);
    }
    function addStyleSheet(){
        var stylesClassName = options.panelId + '-styles';
        var styles = document.getElementsByClassName(stylesClassName);
        if (styles.length <= 0){
            styles = document.createElement('style');
            styles.type = 'text/css';
            styles.className += ' ' + stylesClassName;
            document.body.appendChild(styles);
        }
        var css = '#'+options.panelId+'{border:5px;position:fixed;top:0;right:0;background:#42ADE7;color:FF3C3C;padding:6px;z-index:9999;}#'+options.panelId+' button{margin-left: 5px;}#'+options.panelId+' button.active:after{content:"*";color:red;}';
        styles[(typeof document.body.style.WebkitAppearance=="string")?"innerText":"innerHTML"] = css;
    }
                    
})();
