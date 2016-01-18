if (Meteor.isClient) {
	Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [
        {
        fieldName: 'name',
        fieldLabel: 'Full Name',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Please write your full name");
            return false;
          } else {
            return true;
          }
        }
    },
    {
            fieldName: 'terms',
            fieldLabel: 'I accept the terms and conditions',
            inputType: 'checkbox',
            visible: true,
            validate: function(value, errorFunction){

                if (! value ) {
                    errorFunction("You must accept the terms and conditions.");
                    return false;
                } else {
                    return true;
                }
            },
            saveToProfile: false
        }]

});

}