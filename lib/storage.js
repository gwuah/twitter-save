/* MINIMAL STORAGE LIBRARY */
(function (global, local) {

    "use strict";
    
    function Storage(appName) {
        return new Storage.init(appName);
    }
    
    Storage.init = function (appName) {
        this.appName = appName;
        this.ls = localStorage;
        
        // check if pointer to database already exists
        // if it does, dont create a new database else create a new database
        
        if (this.ls.getItem(appName)) {
            this.db = JSON.parse(this.ls.getItem(appName));
        } else {
            this.db = [];
        }
    };
    
    Storage.prototype = {

        contains: function(tweetNonce) {
            return this.db.some(entry => entry.tweetNonce == tweetNonce);
        },

        updateDb: function() {
            this.ls.setItem(this.appName, JSON.stringify(this.db));
        }, 
        
        save: function(payload) {
            // check whether tweet already exists in db;
            // if it does, don't save to db!

            if (this.contains(payload.tweetNonce)) {
                console.log("tweet has already been saved!");
                return false

            } else {
                this.db.push(payload);
                this.updateDb();
                console.log("tweet saved!")
                return true
            }
        },
        
        fetchAllSaved: function() {
            return this.db
        }
    };
    
    
    
    
    Storage.init.prototype = Storage.prototype;
    global.d$ = global.Storage = Storage;

}(window, document));