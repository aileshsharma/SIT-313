const photos = [
  "/images/photo1.JPG",
  "/images/photo2.JPG",
  "/images/photo3.JPG",
  "/images/photo4.JPG",
];

function PhotoGallery() {
  return (
    <section className="gallery-section">
      <hr />

      <h2>My Photos</h2>

      <div className="gallery">
        {photos.map((photo, index) => (
          <img
            key={photo}
            src={photo}
            alt={`My photo ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default PhotoGallery;