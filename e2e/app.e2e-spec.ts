import { AppPage } from './app.po';
import { browser } from 'protractor';
describe('sm-credit-card-detector App', () => {
  let page: AppPage;
  beforeEach(() => {
    page = new AppPage();
  });
  it('should display welcome message', () => {
    page.navigateTo();
    console.log('return value to text ->' + page.getParagraphText());

    expect(page.getParagraphText()).toEqual('test');
  });
});
