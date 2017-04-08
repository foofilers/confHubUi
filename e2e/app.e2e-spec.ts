import { ConfHubUiPage } from './app.po';

describe('conf-hub-ui App', () => {
  let page: ConfHubUiPage;

  beforeEach(() => {
    page = new ConfHubUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
