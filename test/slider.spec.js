const webdriverio = require('webdriverio');
const options = require('../wdio.conf');
const client = webdriverio.multiremote(options);
const ScreenShotsInstance = require("../helpers");

jest.setTimeout(30000);

beforeAll(() => {
    return client.init().url('http://localhost:5500/src/slider');
});

test('на странице есть кнопки "влево"/"вправо" и виден первый элемент', () => {
    return client
        .isVisible('#left')
        .then(browsers => {
            for (const browserName in browsers) {
                expect(browsers[browserName]).toBe(true);
            }
        })
        .isVisible('#right')
        .then(browsers => {
            for (const browserName in browsers) {
                expect(browsers[browserName]).toBe(true);
            }
        })
        .isVisible('.item:nth-child(1)')
        .then(browsers => {
            for (const browserName in browsers) {
                expect(browsers[browserName]).toBe(true);
            }
        })
        .screenshot()
        .then(screenshots => {
            for (const browserName in screenshots) {
                ScreenShotsInstance.save({
                    name: `./screenshots/slider_${browserName}_has_left_right.png`,
                    value: screenshots[browserName].value
                });
            }
        })
});


test('при нажатии кнопки "вправо" слайдер сдвигается влево', () => {
    return client
        .click('#right')
        .pause(500)
        .getCssProperty('.items', 'right')
        .then(browsers => {
            for (const browserName in browsers) {
                expect(browsers[browserName].parsed.value).toBe(100);
            }
        })
        .screenshot()
        .then(async screenshots => {
            for (const browserName in screenshots) {
                ScreenShotsInstance.save({
                    name: `./screenshots/slider_${browserName}_click_right.png`,
                    value: screenshots[browserName].value
                });
            }
        })
        .click('#right')
        .pause(500)
        .getCssProperty('.items', 'right')
        .then(browsers => {
            for (const browserName in browsers) {
                expect(browsers[browserName].parsed.value).toBe(200);
            }
        })
        .screenshot()
        .then(screenshots => {
            for (const browserName in screenshots) {
                ScreenShotsInstance.save({
                    name: `./screenshots/slider_${browserName}_click_right_twice.png`,
                    value: screenshots[browserName].value
                });
            }
        })
});

test('при нажатии кнопки "влево" слайдер сдвигается вправо', () => {
    return client
        .click('#left')
        .pause(500)
        .getCssProperty('.items', 'right')
        .then(browsers => {
            for (const browserName in browsers) {
                expect(browsers[browserName].parsed.value).toBe(100);
            }
        })
        .screenshot()
        .then(screenshots => {
            for (const browserName in screenshots) {
                ScreenShotsInstance.save({
                    name: `./screenshots/slider_${browserName}_click_left.png`,
                    value: screenshots[browserName].value
                });
            }
        })
        .click('#left')
        .pause(500)
        .getCssProperty('.items', 'right')
        .then(browsers => {
            for (const browserName in browsers) {
                expect(browsers[browserName].parsed.value).toBe(0);
            }
        })
        .screenshot()
        .then(screenshots => {
            for (const browserName in screenshots) {
                ScreenShotsInstance.save({
                    name: `./screenshots/slider_${browserName}_click_left_twice.png`,
                    value: screenshots[browserName].value
                });
            }
        })
});

afterAll(() => {
    ScreenShotsInstance.write();
    return client.end();
});
