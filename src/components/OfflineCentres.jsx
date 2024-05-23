function offlineCentres({ image, data }) {
  return (
    <div
      className={
        'card w-full bg-gray-100 text-gray-950 gap-y-3 flex flex-row items-center justify-between px-3 border border-black-200 shadow-lg hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105'
      }
    >
      <figure className={'px-1 pt- h-20 '}>
        <img src={image} alt={data} className='rounded-xl h-16' />
      </figure>
      <div className='items-center text-center'>
        <p>{data}</p>
      </div>
    </div>
  );
}

export default offlineCentres;
