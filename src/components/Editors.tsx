import { useCallback, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import isEqualWith from 'lodash/isEqualWith';


const monacoEditorOptions = {
  minimap: {
    enabled: false,
  },
  automaticLayout: true,
};

type EditorProps = {
  title: string;
  code: string;
  onChange: (code: string) => void;
};

function Editor({ title, code, onChange }: EditorProps) {
  const [valid, setValid] = useState(true);

  const onCodeChange = useCallback(
    (code: string | undefined) => {
      if (!code) {
        return;
      }

      try {
        const parsedCode = JSON.parse(code);
        setValid(true);
        onChange(parsedCode);
      } catch (err) {
        setValid(false);
      }
    },
    [setValid, onChange]
  );

  const icon = valid ? 'ok' : 'remove';
  const cls = valid ? 'valid' : 'invalid';

  return (
    <div className='panel panel-default'>
      <div className='panel-heading'>
        <span className={`${cls} glyphicon glyphicon-${icon}`} />
        {' ' + title}
      </div>
      <MonacoEditor
        language='yaml'
        value={code}
        theme='vs-light'
        onChange={onCodeChange}
        height={400}
        options={monacoEditorOptions}
      />
    </div>
  );
}

const toJson = (val: unknown) => JSON.stringify(val, null, 1);

type EditorsProps = {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export default function Editors({
  formData,
  setFormData,
}: EditorsProps) {
  const onFormDataEdited = useCallback(
    (newFormData) => {
      if (
        !isEqualWith(newFormData, formData, (newValue, oldValue) => {
          return JSON.stringify(oldValue) === JSON.stringify(newValue);
        })
      ) {
        setFormData(newFormData);
      }
    },
    [formData, setFormData]
  );


  return (
    <div className='col-sm-5'>
      <div className='row'>
        <Editor title='Project Variable' code={toJson(formData)} onChange={onFormDataEdited} />
      </div>
    </div>
  );
}
