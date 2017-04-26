import { ClueLessPage } from './app.po';

describe('clue-less App', () => {
  let page: ClueLessPage;

  beforeEach(() => {
    page = new ClueLessPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
