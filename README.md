# jumbotron

## libraries

* https://github.com/jcmellado/js-aruco

(not used, but could be useful)

* https://github.com/calvinfo/socket-ntp
* https://help.pubnub.com/entries/24122123-How-do-I-Synchronize-Multiple-Devices-

## usage

steps
1. master creates room
2. clients register as being part of the room, display markers
3. master observes clients
4. master closes room, notify clients of world

```js

// mid-level api - recognition

// potentially call several times to observe different angles + new markers
jumbotron.observe(imagedata)

// calculate the world dimensions, and positions of each marker
jumbotron.construct();
// -> {width: 2000, height: 3000, markers: [{id: 32, transform: […]}]}

// get going
jumbotron.start();

```

---

resolves [benfoxall/benfoxall.github.com#16](https://github.com/benfoxall/benfoxall.github.com/issues/16)