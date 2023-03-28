import React, { useState, FunctionComponent, useEffect } from 'react';
import Form, {
  ButtonItem,
  GroupItem,
  SimpleItem,
  Label,
  CompareRule,
  EmailRule,
  PatternRule,
  RangeRule,
  RequiredRule,
  StringLengthRule,
  AsyncRule,
} from 'devextreme-react/form';
import 'devextreme-react/autocomplete';
import service from './data.js';

import './styles.css';


export type FormWrapperProps = {
    title: '';
    url: '';
    formInfo: {};
};


const FormWrapper: FunctionComponent<FormWrapperProps> = ({
    title,
    url,
    ...props
}) => {
    const [formInfo, setFormInfo] = useState({});

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(service.formData);
        //service call
    }

    useEffect(() => {
        console.log(service);
    }, []);


    return (
        <div id="formWrapper">
            <p>{service.formTitle}</p>
            <form action={service.actionUrl} onSubmit={handleSubmit}>
                <Form
                    formData={service.formData}
                    readOnly={false}
                    showColonAfterLabel={true}
                    showValidationSummary={true}
                    validationGroup="customerData"
                >
                {service.fieldInfo.map((group:any) => (
                   <GroupItem caption={group.groupCaption} colCount={2}>
                       {group.fieldData.map((field:any) => (
                         <SimpleItem dataField={field.inputName} editorType={field.inputType} editorOptions={field.options}>
                           <Label text={field.inputLabel} />
                           <RequiredRule message={field.validatorMessage} />
                         </SimpleItem>
                       ))}
                   </GroupItem>
                ))}
                <ButtonItem horizontalAlignment="left"
                  buttonOptions={service.buttonOptions}
                />
                </Form>
            </form>
        </div>
    );
}


export default FormWrapper;
