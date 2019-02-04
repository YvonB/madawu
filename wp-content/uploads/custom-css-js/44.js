<!-- start Simple Custom CSS and JS -->
<script type="text/javascript">


(function($){

$.fn.checkBandwidth = function(bwOptions) {
    // support multiple elements
    if (this.length > 1){
        this.each(function() { $(this).checkBandwidth(options); });
        return this;
    }

    var checker = this;
    // setup options
    var defaultOptions = {
        site_url: '/',
        file_size: 5242880,
        divisor: 1024,
        timeout: 60000,
        auto_run: true,
        wp_action: 'w_bandwidth'
    };

    var options = $.extend({}, defaultOptions, bwOptions);

    // private variables
    var kbps = 0;
    var mbps = 0;

    var ksec = 0;
    var msec = 0;

    var downloadtime = 0;
    var latency = 0;

    var timeout_happened = false;
    // ...

    // private methods
    var sendAjaxCall = function() {
        // console.log('sendAjaxCall');
        var result = '';
        var x = new Date();
        x = x.getTime();
        var latency_url = options.site_url+'?latency='+x;
        var url = options.site_url+'?ajax='+x; //you will need to change the "?" to a "&" if your URI already has some $_GET variables in it...

        // console.log(url);

        time = new Date();
        latency_starttime = time.getTime();
        var latency_request = $.ajax({
            type: 'POST',
            url: options.site_url,
            data: 'latency='+x+'&action='+options.wp_action,
            success: function(result){
                if (result!==''){
                     // alert(latency_starttime);
                }
                else{
                    // console.log('Speed test failed!');
                }

            },
             // Define the error method.
            error: function( objAJAXRequest, strError ){
                if (strError === 'timeout') {
                    timeout_happened = true;
                }
            }
        });

        time = new Date();
        starttime = time.getTime();
        var request = $.ajax({
            type: 'POST',
            url: options.site_url,
            data: 'ajax='+x+'&action='+options.wp_action,
            timeout: options.timeout,
            success: function(result){
                if (result!==''){
                    //no point in printing the binary result to the page, just update the speed test results...
                    updateResults();
                }
                else{
                    // console.log('Speed test failed!');
                }
            },
             // Define the error method.
            error: function( objAJAXRequest, strError ){
                if (strError === 'timeout') {
                    timeout_happened = true;
                }
            },
            complete: function (objAJAXRequest, strStatus) {
                if ($.isFunction(options.callback)) {
                          options.callback();
                      }
            }
        });
    };

    var updateResults = function(){
        time = new Date();
        endtime = time.getTime();
        latency = starttime - latency_starttime;
        // console.log(latency_starttime+' '+starttime);
        if (endtime == starttime){
            downloadtime = 0;
        }
        else{
            downloadtime = (endtime - starttime - (latency * 2))/1000;
        }
        // console.log("Download time: "+downloadtime);
        kbytes_of_data = options.file_size / options.divisor;
        mbytes_of_data = options.file_size / options.divisor / options.divisor;

        // console.log (kbytes_of_data);
        // console.log (mbytes_of_data);
        ksec = kbytes_of_data / downloadtime;
        msec = mbytes_of_data / downloadtime;
        
        // kbps = addCommas(Math.round(ksec * 8192)/1000);
        // mbps = addCommas(Math.round(msec * 8192)/1000);

        // ksec = addCommas(Math.round(ksec*100)/100);
        // msec = addCommas(Math.round(msec*100)/100);

        kbps = (Math.round(ksec * 8192)/1000);
        mbps = (Math.round(msec * 8192)/1000);

        ksec = (Math.round(ksec*100)/100);
        msec = (Math.round(msec*100)/100);

    };

    var addCommas = function(nStr){
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    };

    // ...

    // public methods        
    this.initialize = function() {
        if (options.auto_run) {
            sendAjaxCall();
        }
        // console.log('initialized');
        // do something ...
        return this;
    };

    this.check = function() {
        sendAjaxCall();
    };

    this.getSpeed = function() {
        return {
            'kbps':kbps,
            'mbps':mbps,
            'ksec':ksec,
            'msec':msec,
            'timeout':timeout_happened,
            'downloadtime':downloadtime,
            'latency':latency
        };
    };
    return this.initialize();
};
})(jQuery);</script>
<!-- end Simple Custom CSS and JS -->
