// Automatically switch out the footer
(function($, win, doc) {
    // Contrib Disclaimer in the main footer module
    var newMainDisclaimer           = 'Contributions or gifts to Obama Victory Fund 2012 are not tax deductible.  The first $2,500 from a contributor to Obama Victory Fund 2012 will be allocated to Obama for America, designated for general election debt retirement.  The next $30,800 from a contributor will be allocated to the Democratic National Committee.  Any additional amount(s) from a contributor will be divided equally among the Florida, Iowa, Pennsylvania, and Virginia State Democratic Party Committees, up to $10,000 per committee and subject to the biennial aggregate limits.  A contributor may designate a contribution for a particular participant. This allocation formula may change if following it would result in an excessive contribution or if Obama for America receives sufficient funds to pay its outstanding debts. Contributions will be used in connection with a Federal election, may be spent on any activities of the participants as each committee determines in its sole discretion, and will not be earmarked for any particular candidate.';
    // Contrib Disclaimer in the absolute last footer module
    var newFooterDisclaimer         = 'Paid for by Obama Victory Fund 2012, a joint fundraising committee authorized by Obama for America, the Democratic National Committee, and the Florida, Iowa, Pennsylvania and Virginia State Democratic Parties.';
    
    var currentDate                 = new Date();
    // Change at November 03 2012, 2:00 AM CST, 7:00AM UTC
    var changeOnDate                = new Date("November 07, 2012 07:00:00");

    if (currentDate.getTime() > changeOnDate.getTime()){
        $('body').find('.disclaimer-hook-footer').html(newFooterDisclaimer);
        $('body').find('.disclaimer-hook').html(newMainDisclaimer);
    }
})(jQuery, window, document);