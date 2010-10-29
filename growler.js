/**
 * Growler.js, a simple, event-based, Growl-style notification system for mooTools
 * @author Stephane P. Pericat
 * @date 2010-10-29
 * @version 0.1
 * @license MIT

	Copyright (c) 2010-2011 Stephane P. Pericat

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
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

	trigger: function(el, evt, msg) {
		if($(el)) {
			$(el).addEvent(evt, function() {
				if(msg)
					this.show(msg);
			}.bind(this));
		} else {
			throw 'invalid element id';
		}
	},
	
	show: function(msg) {
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