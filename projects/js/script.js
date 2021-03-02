/**
 *
 *  Project FILTER
 * 
 */

$("[data-filter]").on('click', function() {

    let $projects = $('.project');
    let _filters = $(this).attr('data-filter').split(/\s+/);

    $('.overlay').css('transform','translateY(0vh)');

    // show all projects if none selected
    if (_filters == "*") {
        $('.project').css('opacity','1');  
        return true;
    }   

    setTimeout(function(){
        // loop over all projects and types
        $projects.each(function( index, project ) {
            // get classes to compare
            let _projectClasses = $(this).attr('class').split(/\s+/);
            // reset per loop
            let found = 0;

            $.each(_projectClasses, function(idx, value) {

                console.log('v = ', value);            

                if ($.inArray(value, _filters) !== -1) {

                    $(project).css('opacity','1').css('display','flex');
                    console.log('Match class: ' + value);
                    found = 1;
                } else {
                    //console.log('Not Match: ' + value);
                    if (found == 0) {
                        $(project).css('opacity', '0').css('display','none');    
                    }
                    
                }
            });

        });
        setTimeout(function(){
            $('.overlay').css('transform','translateY(-100vh)');    
        }, 350);            

    }, 350);

    //

});
