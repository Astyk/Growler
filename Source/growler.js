/*
---

name: Growler

description: a simple, event-based, Growl-style notification system for mooTools

authors: Stephane P. Pericat (@sppericat)

license: MIT-style license.

requires: [Core]

provides : Growler

...
*/

var Growler = new Class({
	Implements: [Options, Events],
	options: {
		background: 'growl.png',
		width: 298,
		height: 73,
		timeOut: 2000
	},
	container: null,

	initialize: function(options) {
		if(options)
			this.setOptions(options);
			
		this.container = new Element('div', {
			styles: {
				width: this.options.width,
				position: 'fixed',
				top: 0,
				right: 0
			}
		});
		$(document.body).grab(this.container);
	},

	listen: function(el, evt, msg) {
		if($(el)) {
			$(el).addEvent(evt, function() {
				if(msg)
					this.notify(msg);
			}.bind(this));
		} else {
			throw 'invalid element id';
		}
	},
	
	notify: function(msg) {
		var growlWindow = new Element('div', {
			styles: {
				background: 'url('+this.options.background+')',
				position: 'relative',
				top: 10,
				right: 10,
				height: this.options.height - 20,
				width: this.options.width - 20,
				padding: '10px',
				marginBottom: '10px',
				color: '#fafafa',
				fontFamily: 'Helvetica, Arial, sans-serif',
				fontSize: '12px',
				opacity: 0
			}
		});
		growlWindow.set('text', msg);
		this.container.grab(growlWindow);
		growlWindow.morph({opacity: 1});
		(function() {
			growlWindow.morph({opacity: 0});
			(function() {
				growlWindow.dispose();
			}).delay(500);
		}).delay(this.options.timeOut);
	}
});