
/**
 * Lesson4. 1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.
 2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.
 */

class  ReplacementText {
  constructor(container = '.text') {
    this.container = container;
    this.getText();
  }
  getText(){
    const data = document.querySelector(this.container);

    let rex = /'/g;
    let res = data.innerHTML.replace((rex),'"');

    rex = /\b"\b/g;
    res = res.replace((rex),'\'');
    data.innerHTML = res;
  }

}

const replacementText = new ReplacementText();

