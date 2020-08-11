// const fs = require("fs");
const webdriverio = require("webdriverio");
const options = require("../wdio.conf");
const client = webdriverio.multiremote(options);
const ScreenShotsInstance = require("../helpers");

jest.setTimeout(30000);

beforeAll(() => {
  return client.init().url("http://localhost:5500/src/overlay");
});

test('на странице есть кнопка "открыть"', () => {
  return client
    .isExisting(".openOverlay")
    .then((browsers) => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(true);
      }
    })
    .screenshot()
    .then((screenshots) => {
      for (const browserName in screenshots) {
        ScreenShotsInstance.save({
          name: `./screenshots/overlay_${browserName}_has_open.png`,
          value: screenshots[browserName].value,
        });
      }
    });
});

test('при нажатии на "открыть" появляется оверлей', () => {
  return client
    .click(".openOverlay")
    .isVisible(".overlay")
    .then((browsers) => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(true);
      }
    })
    .screenshot()
    .then((screenshots) => {
      for (const browserName in screenshots) {
        ScreenShotsInstance.save({
          name: `./screenshots/overlay_${browserName}_has_overlay.png`,
          value: screenshots[browserName].value,
        });
      }
    });
});

test('при нажатии на "закрыть" оверлей должен быть закрыт', () => {
  return client
    .click(".close")
    .isVisible(".overlay")
    .then((browsers) => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(false);
      }
    })
    .screenshot()
    .then((screenshots) => {
      for (const browserName in screenshots) {
        ScreenShotsInstance.save({
          name: `./screenshots/overlay_${browserName}_overlay_closed.png`,
          value: screenshots[browserName].value,
        });
      }
    });
});

test("при нажатии вне оверлея он должен быть закрыт", () => {
  return client
    .pause(300)
    .click(".openOverlay")
    .pause(300)
    .click("body")
    .isVisible(".overlay")
    .then((browsers) => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(false);
      }
    })
    .screenshot()
    .then((screenshots) => {
      for (const browserName in screenshots) {
        ScreenShotsInstance.save({
          name: `./screenshots/overlay_${browserName}_overlay_closed_outside.png`,
          value: screenshots[browserName].value,
        });
      }
    });
});

afterAll(() => {
  ScreenShotsInstance.write();
  return client.end();
});


