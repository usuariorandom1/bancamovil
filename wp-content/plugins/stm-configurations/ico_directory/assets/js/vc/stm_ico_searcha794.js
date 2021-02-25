window.addEventListener('load', function () {

    /*Timeouts*/
    var inputTimeout = '';

    var ico_search = ajaxurl + '?action=stm_ico_search';

    new Vue({
        el: '#stm_ico_search',
        data: {
            s:'',
            results: [],
            isLoading: 'fa fa-search'
        },
        mounted: function () {

        },
        methods: {
            searchICO() {
                var $this = this;
                clearTimeout(inputTimeout);

                $this.isLoading = 'fa fa-refresh fa-spin';

                if(this.s.length === 0) {
                    $this.results = [];
                }

                inputTimeout = setTimeout(function(){
                    $this.$http.get(ico_search + '&search_ico=' + $this.s ).then(function (response) {
                        $this.results = response.body;
                        $this.isLoading = 'fa fa-search';
                    });
                }, 300);

            }
        }
    })
});