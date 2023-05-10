import Selector from './Selector';

export default function Header({
  load
}: any) {


  return (
    <div className='page-header'>
      <div className='row'>
        <div className='col-sm-5'>
          <Selector onSelected={load} />
        </div>
      </div>
    </div>
  );
}
