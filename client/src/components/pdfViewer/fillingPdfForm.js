import PSPDFKit from "pspdfkit";

 async function load(defaultConfiguration, object) {
  const instance = await PSPDFKit.load(defaultConfiguration);
    console.log("PSPDFKit for Web successfully loaded!!", instance);
    // You can find an introductions to annotations in our guides:
    // https://pspdfkit.com/guides/web/current/forms/introduction-to-forms/
    instance.getFormFields().then(function (formFields) {
        console.log("All form fields", formFields.toJS());

        instance.setFormFieldValues(object);
        // fieldname : value
    });
    return instance;
}