exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        'login_specs.js',
        'create_contact_spec.js'
    ]
};