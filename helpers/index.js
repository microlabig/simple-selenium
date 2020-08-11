const fs = require("fs");

// Проблема: selenium при сохранении скриншотов в файлы во
// время выполнения определенного теста, сбрасывал браузер
// либо перезагружал страницу.
// Решение: сохранять промежуточные скриншоты в RAM, а после прохождения
// тестов - сбрасывать все результаты на диск

// класс работы со скриншотами:
class ScreenShots {
  constructor() {
    this.arr = []; // массив хранения скриншотов
  }

  // сохранение в RAM
  save(obj) {
    this.arr.push({ ...obj });
  }

  // запись в файл
  write() {
    this.arr.forEach((obj) => {
      fs.writeFileSync(obj.name, obj.value, "base64");
    });
  }
}

// эспортируем инстанс класса
module.exports = new ScreenShots();
