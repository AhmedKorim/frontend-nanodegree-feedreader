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


    const $body = $('body');
    const $feedContainer = $('.feed');

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed   done
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it(' feed URL is defined', function () {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });


        /* TODO: Write a test that loops through each feed   done
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('feed name is defined', function () {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }

        });
    });


    /* TODO: Write a new test suite named "The menu"  done */
    describe('the menu', () => {
            /* TODO: Write a test that ensures the menu element is done
    * hidden by default. You'll have to analyze the HTML and
    * the CSS to determine how we're performing the
    * hiding/showing of the menu element.
    */
            //hidden body class menu-hidden
            it('menu is hidden initially', function () {
                // dom css Todo: check the project hiding mechanism Done
                expect($body.hasClass('menu-hidden')).toBe(true);
            });


            /* TODO: Write a test that ensures the menu changes done
             * visibility when the menu icon is clicked. This test
             * should have two expectations: does the menu display when
             * clicked and does it hide when clicked again.
             */
            it('should  toggled', function () {
                // hamburger menu class menu-icon-link
                /*
                  let state = $body.hasClass('menu-hidden');
                  $('.menu-icon-link').click();
                  state = !state;
                  expect($body.hasClass('menu-hidden')).toBe(state);
                  */
                // THIS LOOKs BETTER
                const $hamburgerMenu = $('.menu-icon-link');
                $hamburgerMenu.click();
                expect($body.hasClass('menu-hidden')).toBe(false);
                $hamburgerMenu.click();
                expect($body.hasClass('menu-hidden')).toBe(true);

            });
        }
    )

    /* TODO: Write a new test suite named "Initial Entries"  done*/
    describe("Initial Entries", () => {

            /* TODO: Write a test that ensures when the loadFeed done
                * function is called and completes its work, there is at least
                * a single .entry element within the .feed container.
                * Remember, loadFeed() is asynchronous so this test will require
                * the use of Jasmine's beforeEach and asynchronous done() function.
                */
            //  function is called
            beforeEach((done) => {
                    // called
                    loadFeed(0, () => {
                            done();
                        }
                    )
                }
            );
            //there is at least a single .entry element within the .feed container.
            it('there is at least a single entry element with the feed container', function (done) {
                const entries = $feedContainer.find('.entry');
                expect(entries.length).toBeGreaterThan(0);
                done();
            });

        }
    )


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection", () => {
            /* TODO: Write a test that ensures when a new feed is loaded done
               * by the loadFeed function that the content actually changes.
               * Remember, loadFeed() is asynchronous.
               */
            let initEntery;
            beforeEach((done) => {
                loadFeed(0, () => {
                    initEntery = $feedContainer.find('.entry');
                    done();
                });
                loadFeed(1, () => {
                    done()
                });

            });
            it('should be changed', function () {
                expect(initEntery).not.toBe($feedContainer.html())
            });
        }
    )

}());
