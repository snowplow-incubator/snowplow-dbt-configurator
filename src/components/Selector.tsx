import { useState, MouseEvent } from 'react';
import { Schema, schemata } from '../schemata';

interface SelectorProps {
  onSelected: (data: any) => void;
}

export default function Selector({ onSelected }: SelectorProps) {
  const [current, setCurrent] = useState<Schema>('Conversions');

  function onLabelClick(label: Schema) {
    return (event: MouseEvent) => {
      event.preventDefault();
      setCurrent(label);
      setTimeout(() => onSelected(schemata[label]), 0);
    };
  }

  return (
    <ul className='nav nav-pills'>
      {Object.keys(schemata).map((label, i) => {
        return (
          <li key={i} role='presentation' className={current === label ? 'active' : ''}>
            <a href='#' onClick={onLabelClick(label as Schema)}>
              {label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
