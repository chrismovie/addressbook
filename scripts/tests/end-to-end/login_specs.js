describe('Login Page', function () {
    
    it('should redirect to addressbook homepage if login is correct', function () {
        
        browser.get('http://localhost:3000/#/login');
        element(by.id('username')).sendKeys('alaneicker');
        element(by.id('password')).sendKeys('tellnoone44');
        element(by.id('login-btn')).click();
        
        expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/');
    });

    it('should show login error if login is incorect', function () {
      
        browser.get('http://localhost:3000/#/login');
        element(by.id('username')).sendKeys('foo');
        element(by.id('password')).sendKeys('bar');
        element(by.id('login-btn')).click();

        expect(element(by.id('login-error')).isDisplayed()).toBeTruthy();
    });

});