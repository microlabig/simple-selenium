# Работа с e2e-тестированием

В папке `src` лежат два простейших проекта: оверлей и слайдер.

## Build and test setup

1. Установить jest в проект `npm i -D jest` или глобально `npm i -g jest`
2. Установить браузеры:
    - Chrome
    - Opera
    - Firefox
3. Установить [Java](https://www.java.com/ru/download/help/download_options.xml "Java")
4. Скачать [selenium-сервер](https://www.selenium.dev/downloads/ "selenium")
5. Скачать JavaScript-webdriver's для скачанных версий вышеперечисленных браузеров ([npm](https://www.npmjs.com/package/selenium-webdriver "npm")). Драйверы следует скидывать в папку `/usr/local/bin` на linux и в `c:/windows/system32` на windows
6. Перезагрузить ПК
7. Запустить selenium-сервер командой `java -jar ИМЯ_СЕРВЕРА`, например, `java -jar selenium-server-standalone-3.141.59.jar`
8. Запустить сервер проекта (у меня запускался через плагин VS Code - LiveServer на порту 5500)
9. Запустить тесты командой `npm run test` или `jest`

