# jumbotron

## libraries

* https://github.com/jcmellado/js-aruco
* http://sylvester.jcoglan.com/

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
# Development

This should only matter if you are hacking on the internals and fixing stuff (which would be very appreciated).

## recognition approach

The marker recognition is performed by [js-aruco](https://github.com/jcmellado/js-aruco).  The [pose estimation](https://github.com/jcmellado/js-aruco#3d-pose-estimation) component requires the physical size of the marker, which we don't have.  Instead, we use the constraint that all markers lie on the same plane to work out their positions relative to each other.

```js
// the structure of marker output from js-aruco
[
	{id:a, corners:[/*pixel coords*/]},
	{id:b, corners:[/*  ...  */]}
]
```

The first step is to work out the relative positions from the context of each marker (where the other markers have been transformed to make the marker a 1&times;1 square positioned at 0,0).

From this, we build a 'relative vector grid', which stores observations between markers.

```js
{
	'a-b':[[2,2]],
	'b-a':[[-2,0]]
}
```

We then take this to build a representation of the markers in an arbitraty space.  The current approach is to cycle through observations:

* first item becomes the base for the rest of the space
* any linked markers are translated based from that marker
* any existing marker is scaled, rotated based on it's own view of other markers

Which should end up with something like:

```js
{
	a: [[1,0,0],[0,1,0],[0,0,1]], // identity
	b: [/* rotate(-45) translate(2,2) scale(2) */],
}
```



---

resolves [benfoxall/benfoxall.github.com#16](https://github.com/benfoxall/benfoxall.github.com/issues/16)