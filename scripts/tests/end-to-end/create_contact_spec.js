describe('Add Contact Form', function () {

    it('should create a new contact and redirect back to homepage when finished', function () {

        var items, match;

        browser.get('http://localhost:3000/#/login');
        
        element(by.id('username')).sendKeys('alaneicker');
        element(by.id('password')).sendKeys('tellnoone44');
        element(by.id('login-btn')).click();
        
        browser.get('http://localhost:3000/#/create');

        element(by.css('[ng-model="model.firstname"]')).sendKeys('Fred');
        element(by.css('[ng-model="model.lastname"]')).sendKeys('Nelson');
        element(by.css('[ng-model="model.email"]')).sendKeys('fnelson@gmail.com');
        element(by.css('[ng-model="model.homephone"]')).sendKeys('312-334-5678');
        element(by.css('[ng-model="model.cellphone"]')).sendKeys('312-334-5678');
        element(by.css('[ng-model="model.workphone"]')).sendKeys('312-334-5678');
        element(by.css('[ng-model="model.city"]')).sendKeys('Chicago');
        element(by.css('[ng-model="model.state"]')).sendKeys('IL');
        element(by.css('input[type="button"]')).click();

        element.all(by.repeater('m in model')).then(function (items) {
          
        });   

    });

});