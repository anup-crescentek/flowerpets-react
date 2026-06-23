// Location pages for local SEO — popular areas in/near Kolkata and cities
// across West Bengal that Premium Puppy serves. Content is generated per
// location in the LocationDetail page from these fields.
export const locations = [
  // Areas in & around Kolkata
  { slug: 'salt-lake', name: 'Salt Lake', type: 'Area', region: 'Kolkata', blurb: 'Buy healthy, vaccinated puppies in Salt Lake (Bidhannagar) with doorstep delivery.' },
  { slug: 'new-town', name: 'New Town', type: 'Area', region: 'Kolkata', blurb: 'Premium puppies delivered across New Town and Action Area, Kolkata.' },
  { slug: 'rajarhat', name: 'Rajarhat', type: 'Area', region: 'Kolkata', blurb: 'Vaccinated puppies for sale in Rajarhat with cash on delivery.' },
  { slug: 'behala', name: 'Behala', type: 'Area', region: 'Kolkata', blurb: 'Find your perfect puppy in Behala — verified breeders, fair prices.' },
  { slug: 'garia', name: 'Garia', type: 'Area', region: 'Kolkata', blurb: 'Healthy puppies delivered to Garia and South Kolkata.' },
  { slug: 'dum-dum', name: 'Dum Dum', type: 'Area', region: 'Kolkata', blurb: 'Buy a vaccinated puppy in Dum Dum with doorstep delivery.' },
  { slug: 'ballygunge', name: 'Ballygunge', type: 'Area', region: 'Kolkata', blurb: 'Premium puppy sales in Ballygunge, South Kolkata.' },
  { slug: 'tollygunge', name: 'Tollygunge', type: 'Area', region: 'Kolkata', blurb: 'Healthy, ethically-bred puppies for sale in Tollygunge.' },
  { slug: 'howrah', name: 'Howrah', type: 'Area', region: 'Kolkata', blurb: 'Buy puppies in Howrah with cash on delivery and verified breeders.' },
  { slug: 'barasat', name: 'Barasat', type: 'Area', region: 'Kolkata', blurb: 'Vaccinated puppies delivered to Barasat, North 24 Parganas.' },
  { slug: 'barrackpore', name: 'Barrackpore', type: 'Area', region: 'Kolkata', blurb: 'Healthy puppies for sale in Barrackpore with doorstep delivery.' },
  { slug: 'serampore', name: 'Serampore', type: 'Area', region: 'Kolkata', blurb: 'Buy a vaccinated puppy in Serampore, Hooghly.' },

  // Cities across West Bengal
  { slug: 'durgapur', name: 'Durgapur', type: 'City', region: 'West Bengal', blurb: 'Buy healthy puppies in Durgapur with safe delivery from Kolkata.' },
  { slug: 'asansol', name: 'Asansol', type: 'City', region: 'West Bengal', blurb: 'Vaccinated puppies for sale in Asansol — verified breeders, fair prices.' },
  { slug: 'siliguri', name: 'Siliguri', type: 'City', region: 'West Bengal', blurb: 'Premium puppies delivered to Siliguri and North Bengal.' },
  { slug: 'kharagpur', name: 'Kharagpur', type: 'City', region: 'West Bengal', blurb: 'Buy a healthy, vaccinated puppy in Kharagpur.' },
  { slug: 'bardhaman', name: 'Bardhaman', type: 'City', region: 'West Bengal', blurb: 'Healthy puppies for sale in Bardhaman (Burdwan) with delivery.' },
  { slug: 'haldia', name: 'Haldia', type: 'City', region: 'West Bengal', blurb: 'Vaccinated puppies delivered to Haldia, Purba Medinipur.' },
]

export function getLocation(slug) {
  return locations.find((l) => l.slug === slug)
}
