import Selector from './Selector';

export default function Header({
  load
}: any) {


  return (
    <div className='page-header body'>
      <div className='row'>
        <div className='col-sm-7'>
          <Selector onSelected={load} />
        </div>
      </div>
    </div>
  );
}
