/*
Updated by Elsabe Lessing to work with time format of HH:MM
*/
(function($) {
    $.spinit = function(element, options) {
        this.options = {};

        element.data('spinit', this);

        this.init = function(element, options) {
            this.options = $.extend({ min: 0, max: 100, initValue: 0, callback: null, stepInc: 1, pageInc: 10, width: 50, height: 15, btnWidth: 10, mask: '', timer: false, timerInc: 15, timerMax: 12, timerMin:1 }, options);
            
            var UP = 38;
            var DOWN = 40;
            var PAGEUP = 33;
            var PAGEDOWN = 34;
            var mouseCaptured = false;
            var mouseIn = false;
            var interval;
            var direction = 'none';
            var isPgeInc = false;
            var value = 0;
            if (this.options.timer) value = this.options.initValue;
            else value = Math.max(this.options.initValue, this.options.min);
            el = $(element).val(value).css('width', (this.options.width) + 'px').css('height', this.options.height + 'px').addClass('smartspinner');
            raiseCallback(value);
            if (this.options.mask !== '') $(element).val(this.options.mask);
            $.fn.reset = function(val) {
                if (isNaN(val)) val = 0;
                value = Math.max(val, this.options.min);
                $(this).val(value);
                raiseCallback(this, value);
            };

            el.focusin(function() {
                $(this).val(value);
            });
            el.click(function(e) {
                mouseCaptured = true;
                isPgeInc = false;
                clearInterval(interval);
                onValueChange();
            });
            el.mouseenter(function(e) {
                $(this).val(value);
            });
            el.mousemove(function(e) {

                if (e.pageX > ($(this).offset().left + element.data('spinit').options.width) - element.data('spinit').options.btnWidth - 4) {
                    if (e.pageY < $(this).offset().top + element.data('spinit').options.height / 2)
                        setDirection('up');
                    else
                        setDirection('down');
                }
                else
                    setDirection('none');
            });
            el.mousedown(function(e) {
                isPgeInc = false;
                clearInterval(interval);
                interval = setInterval(onValueChange, 100);
            });
            el.mouseup(function(e) {
                mouseCaptured = false;
                isPgeInc = false;
                clearInterval(interval);

            });
            el.mouseleave(function(e) {
                setDirection('none');
                if (element.data('spinit').options.mask !== '') $(this).val(element.data('spinit').options.mask);
            });
            el.keydown(function(e) {
                switch (e.which) {
                    case UP:
                        setDirection('up');
                        onValueChange();
                        break; // Arrow Up
                    case DOWN:
                        setDirection('down');
                        onValueChange();
                        break; // Arrow Down
                    case PAGEUP:
                        setDirection('pup');
                        onValueChange();
                        break; // Page Up
                    case PAGEDOWN:
                        setDirection('pdown');
                        onValueChange();
                        break; // Page Down
                    default:
                        setDirection('none');
                        break;
                }
            });

            el.keyup(function(e) {
                setDirection('none');
            });
            el.keypress(function(e) {
                if ($(this).val() == element.data('spinit').options.mask) $(this).val(value);
                var sText = getSelectedText();
                if (sText !== '') {
                    sText = $(this).val().replace(sText, '');
                    $(this).val(sText);
                }
                if (e.which >= 48 && e.which <= 57) {
                    var temp = parseFloat($(element).val() + (e.which - 48));
                    if (temp >= element.data('spinit').options.min && temp <= element.data('spinit').options.max) {
                        value = temp;
                        raiseCallback(value);
                    }
                    else {
                        e.preventDefault();
                    }
                }
            });
            el.blur(function() {
                if (element.data('spinit').options.mask === '') {
                    if ($(this).val() === '')
                        $(this).val(element.data('spinit').options.min);
                }
                else {
                    $(this).val(element.data('spinit').options.mask);
                }
            });
            el.bind("mousewheel", function(e) {
                if (e.wheelDelta >= 120) {
                    setDirection('down');
                    onValueChange();
                }
                else if (e.wheelDelta <= -120) {
                    setDirection('up');
                    onValueChange();
                }

                e.preventDefault();
            });
            if (this.addEventListener) {
                this.addEventListener('DOMMouseScroll', function(e) {
                    if (e.detail > 0) {
                        setDirection('down');
                        onValueChange();
                    }
                    else if (e.detail < 0) {
                        setDirection('up');
                        onValueChange();
                    }
                    e.preventDefault();
                }, false);
            }
    function setDirection(dir) {
        direction = dir;
        isPgeInc = false;
        switch (dir) {
            case 'up':
                setClass('up');
                break;
            case 'down':
                setClass('down');
                break;
            case 'pup':
                isPgeInc = true;
                setClass('up');
                break;
            case 'pdown':
                isPgeInc = true;
                setClass('down');
                break;
            case 'none':
                setClass('');
                break;
        }
    }
    function getSelectedText() {
        var startPos = $(element).get(0).selectionStart;
        var endPos = $(element).get(0).selectionEnd;
        var doc = document.selection;

        if (doc && doc.createRange().text.length > 0) {
            return doc.createRange().text;
        } else if (!doc && $(element).val().substring(startPos, endPos).length > 0) {
            return $(element).val().substring(startPos, endPos);
        }
        return '';
    }
    function setValue(a, b) {
        if (a >= element.data('spinit').options.min && a <= element.data('spinit').options.max) {
            value = b;
        } $(element).val(value);
    }
    function onValueChange() {
        if (element.data('spinit').options.timer) {
            var pieces = [];
            var hour = 0;
            var min = 0;
            try {
                pieces = value.split(':');
            } catch(e) {
                pieces = [value, 0];
            }
            try {   hour = parseInt(pieces[0], 10); } catch(e) {hour = 0;}
            try {  min = parseInt(pieces[1], 10);  }  catch(e) {min = 0;}
            if (direction == 'up') {
                min += element.data('spinit').options.timerInc;
                if (min >= 60) {
                    hour += Math.floor(min/60);
                    min = min%60;
                }
            }
            if (direction == 'down') {
                min -= element.data('spinit').options.timerInc;
                if (min < 0) {
                    hour -= 1;
                    
                    min = 60+min;
                }

            }
            if (direction == 'pup') {
                min += element.data('spinit').options.timerInc;
                if (min >= 60) {
                    hour += Math.floor(min/60);
                    min = min%60;
                }
            }
            if (direction == 'pdown') {
                min -= element.data('spinit').options.timerInc;
                if (min < 0) {
                    hour -= 1;
                    min = 60+min;
                }
            }
            if (hour < element.data('spinit').options.timerMin) { hour = element.data('spinit').options.timerMax; }
            if (hour > element.data('spinit').options.timerMax) { hour = element.data('spinit').options.timerMin; }
            value = hour+":"+pad(min, 2);
            $(element).val(value);
        } else {
            if (direction == 'up') {
                value += element.data('spinit').options.stepInc;
                if (value > element.data('spinit').options.max) value = element.data('spinit').options.max;
                setValue(parseFloat($(element).val()), value);
            }
            if (direction == 'down') {
                value -= element.data('spinit').options.stepInc;
                if (value < element.data('spinit').options.min) value = element.data('spinit').options.min;
                setValue(parseFloat($(element).val()), value);
            }
            if (direction == 'pup') {
                value += element.data('spinit').options.pageInc;
                if (value > element.data('spinit').options.max) value = element.data('spinit').options.max;
                setValue(parseFloat($(element).val()), value);
            }
            if (direction == 'pdown') {
                value -= element.data('spinit').options.pageInc;
                if (value < element.data('spinit').options.min) value = element.data('spinit').options.min;
                setValue(parseFloat($(element).val()), value);
            }
        }
        raiseCallback(this, value);
    }
    function setClass(element, name) {
        $(element).removeClass('up').removeClass('down');
        if (name !== '') $(element).addClass(name);
    }

    function raiseCallback(val) {
        if ($(element).data('spinit').options.callback !== null) $(element).data('spinit').options.callback(val);
    }

    function pad(number, length) {
        var str = '' + number;
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    }
        };

        //Public Function
        this.setTimerMax = function(max) {
            element.data('spinit').options.timerMax = max;
            $(element).click();        };
        this.setTimerMin = function(min) {
            element.data('spinit').options.timerMin = min;
            $(element).click();
        };

        this.init(element, options);
    };

     $.fn.spinit = function(options) {
        return this.each(function() {
           (new $.spinit($(this), options));
        });
    };

     
    
})(jQuery);