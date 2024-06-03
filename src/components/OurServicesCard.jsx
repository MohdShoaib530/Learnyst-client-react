function OurServicesCard({ image, title, data, className }) {
  return (
    <div
      className={`card w-full bg-base-100 text-gray-300 shadow-xl gap-y-3 ${className}`}
    >
      <figure className={`px-10 pt-5 h-20 ${className}`}>
        <img src={image} alt={title} className='rounded-xl h-16' />
      </figure>
      <div className='card-body items-center text-center'>
        <h2 className='card-title'>{title}</h2>
        <p>{data}</p>
      </div>
    </div>
  );
}

export default OurServicesCard;
