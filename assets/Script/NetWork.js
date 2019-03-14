let instance = null;
let Network = cc.Class({
    properties: {
        socket: null
    },
    initNetwork() {
        // let socketIo = io.connect('http://123.207.138.166:3000');
        let socketIo = io.connect('http://localhost:3000');
        this.socket = socketIo;
    },
    // 发送消息给服务器并接收
    send: function (type, sendData, callback) {
        if (cc.sys.isNative) {
            sendData = JSON.stringify(sendData);
        }
        this.socket.emit(type, sendData);
        // 由于目前 Native 不支持 once
        // 并且 on 是只执行一次的所以暂时先这样修改
        if (cc.sys.isNative) {
            this.socket.on(type, function (data) {
                if (cc.sys.isNative) {
                    data = JSON.parse(data);
                }
                callback(data || null);
            });
        } else {
            this.socket.once(type, function (data) {
                if (cc.sys.isNative) {
                    data = JSON.parse(data);
                }
                callback(data || null);
            });
        }
    },

    // 单纯接收服务器消息
    receive: function (type, callback) {
        // 由于目前 Native 不支持 once
        // 并且 on 是只执行一次的所以暂时先这样修改
        if (cc.sys.isNative) {
            this.socket.on(type, function (data) {
                if (cc.sys.isNative) {
                    data = JSON.parse(data);
                }
                callback(data || null);
            });
        } else {
            this.socket.once(type, function (data) {
                if (cc.sys.isNative) {
                    data = JSON.parse(data);
                }
                callback(data || null);
            });
        }
    },
    //字符串转json
    parseJson(s) {
	try {
		return JSON.parse(s);
	} catch (e) { }
},

//json转字符串
    stringifyJson(j) {
	try {
		return JSON.stringify(j);
	} catch (e) { }
},
});

window.Network = instance ? instance : new Network();