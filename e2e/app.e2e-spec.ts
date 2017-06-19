import { AngularPracticePage } from './app.po';

describe('angular-practice App', () => {
  let page: AngularPracticePage;

  beforeEach(() => {
    page = new AngularPracticePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
