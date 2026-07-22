import { setWorldConstructor, World } from '@cucumber/cucumber';

class QaWorld extends World {
  constructor(options) {
    super(options);
    this.browser = undefined;
    this.context = undefined;
    this.page = undefined;
  }
}

setWorldConstructor(QaWorld);
