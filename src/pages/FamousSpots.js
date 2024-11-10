import React from 'react';
import './FamousSpots.css'; // Add some custom styling

const spots = [
  { id: 1, name: 'Marina Beach', location: 'Chennai', rating: 4.8, imageUrl: 'https://media.istockphoto.com/id/1211952929/photo/marina-beach-chennai-city-tamil-nadu-india-bay-of-bengal-chennai-tourism-east-coast-road.jpg?s=612x612&w=0&k=20&c=kpAeGGwy3TyyD97PJYULLBhxZV9bM_zVP0CU7f1HIZc=' },
  { id: 2, name: 'Meenakshi Temple', location: 'Madurai', rating: 4.9, imageUrl: 'https://t4.ftcdn.net/jpg/00/77/16/29/360_F_77162906_340SK0WwATrqWXAY6RDnYcEOL6bhpiZi.jpg' },
  { id: 3, name: 'Ooty Lake', location: 'Ooty', rating: 4.7, imageUrl: 'https://www.ttdconline.com/_next/boat-house/ooty/2.jpg' },
  { id: 4, name: 'Kodaikanal', location: 'Kodaikanal', rating: 4.6, imageUrl: 'https://media.istockphoto.com/id/1175506409/photo/small-village-amidst-terrace-farms-on-hills-of-kodaikanal-tamil-nadu.jpg?s=612x612&w=0&k=20&c=E_SZ5ejTB3kuHej2RMX6HAWq26V3n0Jyfx4nSxs5rUY=' },
  { id: 5, name: 'Mahabalipuram', location: 'Mahabalipuram', rating: 4.8, imageUrl: 'https://t3.ftcdn.net/jpg/01/16/69/12/360_F_116691256_ur8n7iou4bp6gtir9bTDNwXArCLFCnXx.jpg' },
  { id: 6, name: 'Rameswaram', location: 'Rameswaram', rating: 4.7, imageUrl: 'https://www.tamilnadutourism.tn.gov.in/img/pages/medium-desktop/rameswaram-temple-1656167436_f2c551193bb7d4bc6f70.webp' },
  { id: 7, name: 'Yercaud', location: 'Yercaud', rating: 4.6, imageUrl: 'https://t3.ftcdn.net/jpg/06/14/32/28/360_F_614322810_Qx1pGGTyK27aot4rMMBbDTqcGfatPgu1.jpg' },
  { id: 8, name: 'Kanyakumari', location: 'Kanyakumari', rating: 4.7, imageUrl: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/thiruvalluvar-statue-kanyakumari-1655196623_b2c20ff64e13e74324d6.webp' },
  { id: 9, name: 'Thanjavur Temple', location: 'Thanjavur', rating: 4.9, imageUrl: 'https://media.istockphoto.com/id/1198004449/photo/thanjavur-brihadeeswara-temple-image.jpg?s=612x612&w=0&k=20&c=_LxuN28QPYAZWMy82LrQJzTLKWn_zRVU0yKZFFauw2I=' },
  { id: 10, name: 'Courtallam Falls', location: 'Courtallam', rating: 4.6, imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/18/15/c8/72/engacourtallam.jpg' },
  { id: 11, name: 'Coaker’s Walk', location: 'Kodaikanal', rating: 4.8, imageUrl: 'https://kodaikanaltourism.co.in/images/headers/coakers-walk-kodaikanal-timings-entry-fee-kodaikanal-tourism-header.jpg' },
  { id: 12, name: 'Pichavaram Mangrove', location: 'Chidambaram', rating: 4.7, imageUrl: 'https://tnswa.org/image/14ramsarsite/pichavaram/pichavaram%20baoting.jpg' },
  { id: 13, name: 'Mudumalai Wildlife Sanctuary', location: 'Nilgiris', rating: 4.7, imageUrl: 'https://www.goldentriangletour.com/userfiles/MuduMalai-Wildlife-Sanctuary.jpg' },
  { id: 14, name: 'Yelagiri', location: 'Yelagiri', rating: 4.5, imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/23/b4/7f/view-of-the-town-below.jpg?w=1200&h=-1&s=1' },
  { id: 15, name: 'Vivekananda Rock Memorial', location: 'Kanyakumari', rating: 4.9, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/RockMemorial.jpg' },
  { id: 16, name: 'Anamalai Tiger Reserve', location: 'Coimbatore', rating: 4.6, imageUrl: 'https://c1.staticflickr.com/5/4741/27834614469_9df569d0e3_h.jpg' },
  { id: 17, name: 'Sivaganga Gardens', location: 'Thanjavur', rating: 4.5, imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/1b/c6/29/inside-sivaganga-gardens.jpg?w=1200&h=-1&s=1' },
  { id: 18, name: 'Vellore Fort', location: 'Vellore', rating: 4.5, imageUrl: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/vellore-fort-1656160538_62debb42d3702725aa57.webp' },
  { id: 19, name: 'Nilgiri Mountain Railway', location: 'Ooty', rating: 4.8, imageUrl: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/the-nilgiri-mountain-railway-1653904566_39d2e58ed7221faa8057.webp' },
  { id: 20, name: 'Arignar Anna Zoological Park', location: 'Vandalur', rating: 4.7, imageUrl: 'https://www.trawell.in/admin/images/upload/705431315Anna_Zoo_Main.jpg' }
];

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="stars">
      {'★'.repeat(fullStars)}
      {halfStar ? '☆' : ''}
      {'☆'.repeat(emptyStars)}
    </div>
  );
};


const FamousSpots = () => {
  return (
    <div className="famous-spots-container">
      <h2>Famous Tourist Spots in Tamil Nadu</h2>
      <div className="cards-container">
        {spots.map(spot => (
          <div key={spot.id} className="card">
            <img src={spot.imageUrl} alt={spot.name} className="card-image" />
            <div className="card-content">
              <h3>{spot.name}</h3>
              <p><strong>Location:</strong> {spot.location}</p>
              <StarRating rating={spot.rating} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamousSpots;
