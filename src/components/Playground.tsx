import { useCallback, useState, useRef, useEffect, ComponentType, FormEvent } from 'react';
import { withTheme, IChangeEvent, FormProps } from '@rjsf/core';
import {
  ErrorSchema,
  ArrayFieldTemplateProps,
  ObjectFieldTemplateProps,
  RJSFSchema,
  RJSFValidationError,
  TemplatesType,
  ValidatorType,
} from '@rjsf/utils';

import { schemata } from '../schemata';
import Header from './Header';
import DemoFrame from './DemoFrame';
import ErrorBoundary from './ErrorBoundary';
import Editors from './Editors';


export interface PlaygroundProps {
  validators: { [validatorName: string]: ValidatorType };
}

export default function Playground({ validators }: PlaygroundProps) {
  const [loaded, setLoaded] = useState(false);
  const [schema, setSchema] = useState<RJSFSchema>(schemata.Conversions.schema as RJSFSchema);
  const [formData, setFormData] = useState<any>(schemata.Conversions.formData);
  const [extraErrors, setExtraErrors] = useState<ErrorSchema | undefined>();
  const [stylesheet, setStylesheet] = useState<string | null>(null);
  const [validator, setValidator] = useState<string>('AJV8');
  const [showForm, setShowForm] = useState(false);
  const [liveSettings, setLiveSettings] = useState<LiveSettings>({
    showErrorList: 'top',
    validate: false,
    disabled: false,
    noHtml5Validate: false,
    readonly: false,
    omitExtraData: false,
    liveOmit: false,
    experimental_defaultFormStateBehavior: { arrayMinItems: 'populate' },
  });
  const [FormComponent, setFormComponent] = useState<ComponentType<FormProps>>(withTheme({}));
  const [ArrayFieldTemplate, setArrayFieldTemplate] = useState<ComponentType<ArrayFieldTemplateProps>>();
  const [ObjectFieldTemplate, setObjectFieldTemplate] = useState<ComponentType<ObjectFieldTemplateProps>>();

  const playGroundFormRef = useRef<any>(null);

  const load = useCallback(
    (data: any) => {
      // Reset the ArrayFieldTemplate whenever you load new data
      const { ArrayFieldTemplate, ObjectFieldTemplate, extraErrors, liveSettings } = data;
      // uiSchema is missing on some examples. Provide a default to
      // clear the field in all cases.
      const { schema, uiSchema = {}, formData } = data;

      // force resetting form component instance
      setShowForm(false);
      setSchema(schema);
      // setUiSchema(uiSchema);
      setFormData(formData);
      setExtraErrors(extraErrors);
      setArrayFieldTemplate(ArrayFieldTemplate);
      setObjectFieldTemplate(ObjectFieldTemplate);
      setLiveSettings(liveSettings);
      setShowForm(true);
      // setLiveSettings(liveSettings);
    },
    []
  );

  useEffect(() => {
    const hash = document.location.hash.match(/#(.*)/);

    if (hash && typeof hash[1] === 'string' && hash[1].length > 0 && !loaded) {
      try {
        load(JSON.parse(atob(hash[1])));
        setLoaded(true);
      } catch (error) {
        alert('Unable to load form setup data.');
        console.error(error);
      }

      return;
    }

    // initialize theme
    setStylesheet('//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');

    setShowForm(true);
  }, [load, loaded, setShowForm]);

  const onFormDataChange = useCallback(
    ({ formData }: IChangeEvent, id?: string) => {
      if (id) {
        console.log('Field changed, id: ', id);
      }

      setFormData(formData);
    },
    [setFormData]
  );

  const onFormDataSubmit = useCallback(({ formData }: IChangeEvent, event: FormEvent<any>) => {
    console.log('submitted formData', formData);
    console.log('submit event', event);
    window.alert('Form submitted');
  }, []);

  const templates: Partial<TemplatesType> = {};
  if (ArrayFieldTemplate) {
    templates.ArrayFieldTemplate = ArrayFieldTemplate;
  }
  if (ObjectFieldTemplate) {
    templates.ObjectFieldTemplate = ObjectFieldTemplate;
  }

  return (
    <>
      <Header
        load={load}
      />
      <div className='col-sm-7'>
        <ErrorBoundary>
          {showForm && (
            <DemoFrame
              head={
                <>
                  <link rel='stylesheet' id='theme' href={stylesheet || ''} />
                  <link rel='stylesheet' href="./src/static/custom.css" />
                </>
              }
              style={{
                width: '100%',
                height: 1000,
                border: 0,
              }}>
              <FormComponent
                // {...liveSettings}
                templates={templates}
                extraErrors={extraErrors}
                schema={schema}
                formData={formData}
                validator={validators[validator]}
                onChange={onFormDataChange}
                onSubmit={onFormDataSubmit}
                onBlur={(id: string, value: string) => console.log(`Touched ${id} with value ${value}`)}
                onFocus={(id: string, value: string) => console.log(`Focused ${id} with value ${value}`)}
                onError={(errorList: RJSFValidationError[]) => console.log('errors', errorList)}
                ref={playGroundFormRef}
              />
            </DemoFrame>
          )}

        </ErrorBoundary>
      </div>
      <Editors
        formData={formData}
        setFormData={setFormData}
        schema={schema}
        setSchema={setSchema}
        // uiSchema={uiSchema}
        // setUiSchema={setUiSchema}
        extraErrors={extraErrors}
        setExtraErrors={setExtraErrors}
      />

    </>
  );
}
