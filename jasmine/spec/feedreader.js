/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    //setting body and feed container variables
    const $body = $('body');
    const $feedContainer = $('.feed');
    describe('RSS Feeds', function () {
        // making sure feeds excite and they are defined
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        // insuring feed urls are defined and they are not empty strings
        it(' feed URL is defined', function () {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });
        // insuring feed names are defined and they are not empty strings

        it('feed name is defined', function () {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }

        });
    });


    // hamburger menu tests
    describe('the menu', () => {

        //the side navigation must be hidden initially

        it('menu is hidden initially', function () {
            // dom css Todo: check the project hiding mechanism Done
            expect($body.hasClass('menu-hidden')).toBe(true);
        });


        // testing  nav bar state change
        it('should  toggled', function () {
            // hamburger menu class menu-icon-link
            /*
              let state = $body.hasClass('menu-hidden');
              $('.menu-icon-link').click();
              state = !state;
              expect($body.hasClass('menu-hidden')).toBe(state);
              */
            // THIS LOOKs BETTER although the previous
            // look more generic but we insured the side nav is hidden initially
            const $hamburgerMenu = $('.menu-icon-link');
            $hamburgerMenu.click();
            expect($body.hasClass('menu-hidden')).toBe(false);
            $hamburgerMenu.click();
            expect($body.hasClass('menu-hidden')).toBe(true);

        });
    });


    describe("Initial Entries", () => {
        //  running before each to insure that the load feed has ran and generate entries use them in testes
        beforeEach((done) => {
            // called
            loadFeed(0, done);
        });
        //there is at least a single .entry element within the .feed container.
        it('there is at least a single entry element with the feed container', function () {
            const entries = $feedContainer.find('.entry');
            expect(entries.length).toBeGreaterThan(0);
        });

    });


    describe("New Feed Selection", () => {
        // setting initial  eatery when we first call load feed we pass feeds to a variable
        // calling load feed again will lead to expected behavior the content should be changed to pass that test
        let initEntery;
        beforeEach((done) => {
            loadFeed(0, () => {
                initEntery = $feedContainer.html();
                loadFeed(1, done);
            });


        });
        it('should be changed', function () {
            expect(initEntery).not.toBe($feedContainer.html())
        });
    });
}());
