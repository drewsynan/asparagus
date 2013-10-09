/*!
 * jquery.scrolldepth.js | v0.1.2
 * Copyright (c) 2012 Rob Flaherty (@robflaherty)
 * Licensed under the MIT and GPL licenses.
 */
;(function ( $, window, document, undefined ) {
  
  "use strict";

  var defaults = {
    elements: [],
    minHeight: 0,
    offset: 0, // Not used yet
    percentage: true,
    testing: true
  },

  $window = $(window),
  cache = [];

  /*
   * Plugin
   */

  $.scrollDepth = function(options) {
    
    var startTime = +new Date;

    options = $.extend({}, defaults, options);

    // Return early if document height is too small
    /*if ( $(document).height() < options.minHeight ) {
      return;
    }*/

    // Establish baseline (0% scroll)
    sendEvent('Percentage', 0);

    /*
     * Functions
     */

    function sendEvent(action, label, timing) {
      /*if (!options.testing) {

        _gaq.push(['_trackEvent', 'Scroll Depth', action, label, 1, true]);

        if (arguments.length > 2) {
          _gaq.push(['_trackTiming', 'Scroll Depth', action, timing, label, 100]);
        }

      } else { */
        //$('#console').html(action + ': ' + label);
        console.log(label);
        $.event.trigger({
          type: "scrollEvent",
          percentage: label
        });
      /*}*/
    }

    function calculateMarks(docHeight) {
      return {
        0.05 : parseInt(docHeight * 0.05, 10),
        0.10 : parseInt(docHeight * 0.10, 10),
        0.15 : parseInt(docHeight * 0.15, 10),
        0.20 : parseInt(docHeight * 0.20, 10),
        0.25 : parseInt(docHeight * 0.25, 10),
        0.30 : parseInt(docHeight * 0.30, 10),
        0.35 : parseInt(docHeight * 0.35, 10),
        0.40 : parseInt(docHeight * 0.40, 10),
        0.45 : parseInt(docHeight * 0.45, 10),
        0.50 : parseInt(docHeight * 0.50, 10),
        0.55 : parseInt(docHeight * 0.55, 10),
        0.60 : parseInt(docHeight * 0.60, 10),
        0.65 : parseInt(docHeight * 0.65, 10),
        0.70 : parseInt(docHeight * 0.70, 10),
        0.75 : parseInt(docHeight * 0.75, 10),
        0.80 : parseInt(docHeight * 0.80, 10),
        0.85 : parseInt(docHeight * 0.85, 10),
        0.90 : parseInt(docHeight * 0.90, 10),
        0.95 : parseInt(docHeight * 0.95, 10),
        // 1px cushion to trigger 100% event in iOS
        1.00 : docHeight - 1
      };
    }

    function checkMarks(marks, scrollDistance, timing) {
      // Check each active mark
      $.each(marks, function(key, val) {
        if ( $.inArray(key, cache) === -1 && scrollDistance >= val ) {
          sendEvent('Percentage', key, timing);
          cache.push(key);
        }
      });
    }

    function checkElements(elements, scrollDistance, timing) {
      $.each(elements, function(index, elem) {
        if ( $.inArray(elem, cache) === -1 && $(elem).length ) {
          if ( scrollDistance >= $(elem).offset().top ) {
            sendEvent('Elements', elem, timing);
            cache.push(elem);
          }
        }
      });
    }

    /*
     * Scroll Event
     */

    $window.on('scroll.scrollDepth', function() {

      /*
       * We calculate document and window height on each scroll event to
       * account for dynamic DOM changes.
       */

      var docHeight = $(document).height(),
        winHeight = window.innerHeight ? window.innerHeight : $window.height(),
        scrollDistance = $window.scrollTop() + winHeight,

        // Offset not being used yet
        offset = parseInt(winHeight * (options.offset / 100), 10),

        // Recalculate percentage marks
        marks = calculateMarks(docHeight),

        // Timing
        timing = +new Date - startTime;

      // If all marks already hit, unbind scroll event
      if (cache.length >= 20 + options.elements.length) {
        $window.off('scroll.scrollDepth');
        return;
      }

      // Check specified DOM elements
      /*if (options.elements) {
        checkElements(options.elements, scrollDistance, timing);
      }*/

      // Check standard marks
      if (options.percentage) {        
        checkMarks(marks, scrollDistance, timing);
      }
    });

  };

})( jQuery, window, document );
