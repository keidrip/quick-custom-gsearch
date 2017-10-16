const Parser = require('./parser.js');
const LanguageController = require('./language/controller.js');
const TermController = require('./term/controller.js');
const LanguageView = require('./language/view.js');
const TermView = require('./term/view.js');
const MainView = require('./mainView.js');

const Add = () => {
  const own = document.querySelector('.quick-custom-gsearch');
  if (own !== null) {
    return false;
  }

  if (Parser.IsTextSearch() === true && Parser.IsUCS() === true) {
    // MainView
    const mainDiv = MainView.CreateElement();
    MainView.BindElement(mainDiv);
    // LanguageView
    const languageDiv = LanguageView.CreateElement();
    LanguageView.BindElement(languageDiv);
    // TermView
    const termDiv = TermView.CreateElement();
    TermView.BindElement(termDiv);

    const o = Parser.QueryHashToArray();
    const range = TermController.Validate(o.tbs);
    const language = LanguageController.Validate(o.lr);

    TermView.SetCssState(range);
    LanguageView.SetCssState(language);
    return true;
  }
  return false;
};

const Main = () => {
  const Observer = new MutationObserver(() => {
    Add();
  });

  const elm = document.getElementById('main');
  if (elm !== null) {
    Add();
    Observer.observe(elm, { childList: true });
  }
};

Main();
