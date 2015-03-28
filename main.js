/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../../typings/tsd.d.ts" />
	$(function () { return (location.pathname.indexOf('/spec.html') !== -1) ? setupSpec() : setupWebsite(); });
	function setupSpec() {
	    // not all code blocks specify a language
	    // but we know that they are ALL yaml
	    initCodemirror('code', 'yaml');
	}
	function setupWebsite() {
	    $(window).scroll(function () {
	        var scrollVal = $(this).scrollTop();
	        if (scrollVal > 220) {
	            $('.cta-mini').fadeIn('fast');
	        }
	        else {
	            $('.cta-mini').fadeOut('fast');
	        }
	    });
	    /*
	     Apply active class to nav item on scroll
	     */
	    var sections = $(".content-wrapper-pages h2");
	    var navigation_links = $("aside nav a");
	    sections.waypoint({
	        handler: function (direction) {
	            var active_section;
	            active_section = $(this);
	            if (direction === 'up') {
	                var active_id = active_section.attr("id");
	                active_section = $('#' + active_id).waypoint('prev');
	            }
	            var active_link = $('aside nav a[href="#' + active_section.attr("id") + '"]');
	            navigation_links.removeClass("active");
	            active_link.addClass("active");
	        },
	        offset: 95
	    });
	    /*
	     Anchor link smooth scrolling
	     */
	    $(function () {
	        $('a[href*=#]:not([href=#])').click(function () {
	            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') || location.hostname === this.hostname) {
	                var target = $(this.hash);
	                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	                if (target.length) {
	                    $('html,body').animate({
	                        scrollTop: target.offset().top - 95
	                    }, 400);
	                    return false;
	                }
	            }
	        });
	    });
	    /*
	     Add active class to last nav item on scroll to bottom
	     */
	    $(window).scroll(function () {
	        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
	            $('aside nav a').removeClass('active');
	            $('aside nav ul:first-of-type li:last-child a').addClass('active');
	        }
	    });
	    /*
	     Show confirm message on marketing signup submit
	     */
	    $("#ss-form").submit(function () {
	        $(".signup input").hide();
	        $("#ss-form-response").fadeIn();
	    });
	    /*
	     Copy to clipboard
	     */
	    $(function () {
	        $('.copy-clipboard').clipboard({
	            path: 'jquery.clipboard.swf',
	            copy: function () {
	                $('.copy-clipboard span').fadeIn('fast');
	                return $('#home .content code').text();
	            }
	        });
	    });
	    /* Project page */
	    if ($('#section-projects').length > 0) {
	        $('.projects-subnav a').click(function () {
	            var section = $(this).attr('href').replace('#', '');
	            window.location.hash = section;
	            project_activate_section();
	            return false;
	        });
	        $('h3 a.anchor').click(function () {
	            var section = $(this).attr('href').replace('#', '');
	            window.location.hash = section;
	            project_activate_section();
	            return false;
	        });
	        var project_activate_section = function () {
	            var section = window.location.hash.substring(1);
	            if (!section)
	                return;
	            var orig_section = '';
	            if (section.indexOf('-') >= 0) {
	                orig_section = section;
	                var sections = section.split('-');
	                section = sections[0];
	            }
	            $('.projects-subnav a').removeClass('active').each(function () {
	                if ($(this).attr('href') == '#' + section) {
	                    $(this).addClass('active');
	                }
	            });
	            $('#section-projects section').hide();
	            $('#section-' + section).show();
	            if (orig_section && $('h3 a[href=#' + orig_section + ']').length > 0) {
	                $('html,body').animate({
	                    scrollTop: $('h3 a[href=#' + orig_section + ']').offset().top - 105
	                }, 400);
	            }
	        };
	        project_activate_section();
	    }
	    /* Project "try it" slidedown interaction */
	    $('.project-html').click(function () {
	        $(this).closest('li').find('.project-steps').toggleClass('open');
	    });
	    initRamlCodemirrors();
	    // $('ul').css('list-style-type', 'circle')
	}
	function initRamlCodemirrors() {
	    initCodemirror('code.lang-yaml', 'yaml');
	    initCodemirror('code.lang-javascript', 'javascript');
	    initCodemirror('code.lang-json', 'javascript');
	}
	function initCodemirror(selector, mode) {
	    $(selector).each(function () {
	        initCodemirrorOnElement(this, mode);
	    });
	}
	function initCodemirrorOnElement(el, mode) {
	    var opts = { value: $(el).text(), mode: mode, readOnly: true };
	    CodeMirror(function (cmel) {
	        el.parentNode.replaceChild(cmel, el);
	        $(cmel).css({ height: 'auto', backgroundColor: '#eee' });
	    }, opts);
	}


/***/ }
/******/ ])