// Breed data from kolkatadogstore.in (Premium Puppy).
// Prices published on the live site are set; others are marked "Enquire".
// Images live in public/breeds/ and are served at /breeds/<file>.
// Descriptions/traits are general, accurate breed info (not scraped from the
// live site) — edit freely to match your own copy.
export const breeds = [
  {
    name: 'Labrador Retriever',
    slug: 'labrador-retriever',
    price: '₹12,000 – ₹15,000',
    image: '/breeds/Labrador-Retriever.webp',
    featured: true,
    size: 'Large',
    temperament: 'Friendly & outgoing',
    lifespan: '10–12 years',
    energy: 'High',
    description:
      'The Labrador Retriever is one of the most popular family dogs in the world — affectionate, eager to please and wonderful with children. Labs are intelligent and easy to train, making them a great choice for first-time owners.',
  },
  {
    name: 'Golden Retriever',
    slug: 'golden-retriever',
    price: '₹15,000 – ₹20,000',
    image: '/breeds/golden-retriever-puppy.webp',
    featured: true,
    size: 'Large',
    temperament: 'Gentle & devoted',
    lifespan: '10–12 years',
    energy: 'High',
    description:
      'Golden Retrievers are loyal, gentle and famously good-natured. Their loving temperament and trainability make them excellent companions for families and active households alike.',
  },
  {
    name: 'German Shepherd',
    slug: 'german-shepherd',
    price: '₹18,000 – ₹22,000',
    image: '/breeds/german-shepherd-dog.webp',
    featured: true,
    size: 'Large',
    temperament: 'Loyal & confident',
    lifespan: '9–13 years',
    energy: 'High',
    description:
      'German Shepherds are intelligent, courageous and protective — a top choice for guarding and companionship. With proper training and socialisation they are devoted, dependable family dogs.',
  },
  {
    name: 'Siberian Husky',
    slug: 'siberian-husky',
    price: '₹28,000 – ₹35,000',
    image: '/breeds/Siberian-Husky-Puppy.webp',
    featured: true,
    size: 'Medium–Large',
    temperament: 'Playful & energetic',
    lifespan: '12–14 years',
    energy: 'Very high',
    description:
      'Siberian Huskies are striking, friendly and full of energy. They love company and exercise, and their thick coat and bright eyes make them one of the most beautiful breeds around.',
  },
  {
    name: 'American Bully',
    slug: 'american-bully',
    price: 'Enquire',
    image: '/breeds/American-Bully.webp',
    size: 'Medium',
    temperament: 'Affectionate & loyal',
    lifespan: '10–12 years',
    energy: 'Moderate',
    description:
      'Despite their muscular build, American Bullies are gentle, affectionate and devoted to their families. They are confident, friendly companions that thrive on attention and love.',
  },
  {
    name: 'Beagle',
    slug: 'beagle',
    price: 'Enquire',
    image: '/breeds/Beagle.webp',
    size: 'Small–Medium',
    temperament: 'Curious & merry',
    lifespan: '12–15 years',
    energy: 'High',
    description:
      'Beagles are cheerful, curious and great with kids. Their compact size and friendly nature make them a popular family pet, though their nose will lead them on plenty of adventures.',
  },
  {
    name: 'Bichon Frise',
    slug: 'bichon-frise',
    price: 'Enquire',
    image: '/breeds/Bichon-Frise.webp',
    size: 'Small',
    temperament: 'Cheerful & gentle',
    lifespan: '14–15 years',
    energy: 'Moderate',
    description:
      'The Bichon Frise is a small, playful and affectionate companion with a soft, fluffy white coat. Friendly and adaptable, they make wonderful pets for apartments and families.',
  },
  {
    name: 'Boxer',
    slug: 'boxer',
    price: 'Enquire',
    image: '/breeds/Boxer-puppy.webp',
    size: 'Medium–Large',
    temperament: 'Fun-loving & loyal',
    lifespan: '10–12 years',
    energy: 'High',
    description:
      'Boxers are playful, energetic and deeply loyal. Known for their patience with children and protective instincts, they are spirited yet affectionate family dogs.',
  },
  {
    name: 'Cocker Spaniel',
    slug: 'cocker-spaniel',
    price: 'Enquire',
    image: '/breeds/cocker-spaniel-kolkata.webp',
    size: 'Small–Medium',
    temperament: 'Sweet & gentle',
    lifespan: '12–15 years',
    energy: 'Moderate',
    description:
      'Cocker Spaniels are gentle, affectionate and eager to please. With their silky coats and soulful eyes, they are loving companions that bond closely with their families.',
  },
  {
    name: 'Doberman',
    slug: 'doberman',
    price: 'Enquire',
    image: '/breeds/Doberman-Pinscher-Puppy.webp',
    size: 'Large',
    temperament: 'Alert & loyal',
    lifespan: '10–13 years',
    energy: 'High',
    description:
      'Dobermans are sleek, intelligent and fearless — prized as both guardians and companions. Loyal and trainable, they form strong bonds with their owners.',
  },
  {
    name: 'English Bulldog',
    slug: 'english-bulldog',
    price: 'Enquire',
    image: '/breeds/english-bulldog-puppy-kolkata.webp',
    size: 'Medium',
    temperament: 'Calm & courageous',
    lifespan: '8–10 years',
    energy: 'Low',
    description:
      'English Bulldogs are calm, friendly and famously easygoing. Their gentle, affectionate nature and low energy make them great companions for relaxed households.',
  },
  {
    name: 'Great Dane',
    slug: 'great-dane',
    price: 'Enquire',
    image: '/breeds/Great-Dane-kolkata.webp',
    size: 'Giant',
    temperament: 'Friendly & patient',
    lifespan: '7–10 years',
    energy: 'Moderate',
    description:
      'Gentle giants at heart, Great Danes are friendly, patient and devoted to their families. Despite their imposing size, they are calm, loving companions.',
  },
  {
    name: 'Lhasa Apso',
    slug: 'lhasa-apso',
    price: 'Enquire',
    image: '/breeds/Lhasa-Apso.jpg',
    size: 'Small',
    temperament: 'Confident & loyal',
    lifespan: '12–15 years',
    energy: 'Moderate',
    description:
      'The Lhasa Apso is a small, dignified breed with a long, flowing coat. Independent yet devoted, they make alert little watchdogs and loving companions.',
  },
  {
    name: 'Maltese',
    slug: 'maltese',
    price: 'Enquire',
    image: '/breeds/Maltese-kolkata.webp',
    size: 'Toy',
    temperament: 'Gentle & playful',
    lifespan: '12–15 years',
    energy: 'Moderate',
    description:
      'The Maltese is a tiny, elegant companion with a silky white coat. Gentle, affectionate and lively, they are perfect lap dogs that adore their families.',
  },
  {
    name: 'Maltipoo',
    slug: 'maltipoo',
    price: 'Enquire',
    image: '/breeds/Maltipoo.webp',
    size: 'Toy–Small',
    temperament: 'Affectionate & smart',
    lifespan: '12–15 years',
    energy: 'Moderate',
    description:
      'A cross between the Maltese and Poodle, the Maltipoo is affectionate, intelligent and low-shedding. Friendly and adaptable, they make delightful family companions.',
  },
  {
    name: 'Pitbull',
    slug: 'pitbull',
    price: 'Enquire',
    image: '/breeds/Pitbull-kolkata.webp',
    size: 'Medium',
    temperament: 'Loyal & affectionate',
    lifespan: '12–14 years',
    energy: 'High',
    description:
      'Pitbulls are strong, loyal and affectionate dogs that thrive on human companionship. With proper training and socialisation they are devoted, loving family members.',
  },
  {
    name: 'Pomeranian',
    slug: 'pomeranian',
    price: 'Enquire',
    image: '/breeds/Pomeranian.webp',
    size: 'Toy',
    temperament: 'Lively & bold',
    lifespan: '12–16 years',
    energy: 'Moderate',
    description:
      'Pomeranians are tiny, fluffy and full of personality. Bold, curious and affectionate, these little companions are as charming as they are adorable.',
  },
  {
    name: 'Poodle',
    slug: 'poodle',
    price: 'Enquire',
    image: '/breeds/Poodle-kolkata.webp',
    size: 'Varies',
    temperament: 'Smart & elegant',
    lifespan: '12–15 years',
    energy: 'Moderate–High',
    description:
      'Poodles are highly intelligent, elegant and low-shedding. Easy to train and eager to please, they are versatile companions that fit beautifully into family life.',
  },
  {
    name: 'Pug',
    slug: 'pug',
    price: 'Enquire',
    image: '/breeds/pug.jpg.webp',
    size: 'Small',
    temperament: 'Charming & loving',
    lifespan: '12–15 years',
    energy: 'Low–Moderate',
    description:
      'Pugs are charming, mischievous and full of love. Their wrinkly faces and playful personalities make them irresistible companions for families and apartment living.',
  },
  {
    name: 'Rottweiler',
    slug: 'rottweiler',
    price: 'Enquire',
    image: '/breeds/Rottweiler-for-sale-in-kolkata.jpg',
    size: 'Large',
    temperament: 'Confident & loyal',
    lifespan: '9–10 years',
    energy: 'Moderate–High',
    description:
      'Rottweilers are powerful, confident and deeply loyal. Devoted guardians and affectionate with their families, they thrive with consistent training and companionship.',
  },
  {
    name: 'Samoyed',
    slug: 'samoyed',
    price: 'Enquire',
    image: '/breeds/Samoyed.webp',
    size: 'Medium–Large',
    temperament: 'Friendly & gentle',
    lifespan: '12–14 years',
    energy: 'High',
    description:
      'With their signature “Sammy smile” and fluffy white coat, Samoyeds are friendly, gentle and sociable. They love their families and bring joy wherever they go.',
  },
  {
    name: 'Shih Tzu',
    slug: 'shih-tzu',
    price: 'Enquire',
    image: '/breeds/Shih-Tzu-for-sale-in-kolkata.jpg',
    size: 'Small',
    temperament: 'Affectionate & friendly',
    lifespan: '10–16 years',
    energy: 'Low–Moderate',
    description:
      'Shih Tzus are affectionate, friendly little companions bred to be lap dogs. Their flowing coats and sweet temperament make them beloved family pets.',
  },
  {
    name: 'Toy Pomeranian',
    slug: 'toy-pomeranian',
    price: 'Enquire',
    image: '/breeds/Toy-Pomeranian.webp',
    size: 'Toy',
    temperament: 'Lively & affectionate',
    lifespan: '12–16 years',
    energy: 'Moderate',
    description:
      'The Toy Pomeranian is an extra-small, extra-fluffy bundle of personality. Affectionate, alert and adorable, they make charming companions for any home.',
  },
  {
    name: 'Yorkshire Terrier',
    slug: 'yorkshire-terrier',
    price: 'Enquire',
    image: '/breeds/Yorkshire-Terrier.webp',
    size: 'Toy',
    temperament: 'Feisty & affectionate',
    lifespan: '13–16 years',
    energy: 'Moderate',
    description:
      'Yorkshire Terriers are tiny, confident and full of character. With their silky coats and big personalities, these affectionate companions are favourites the world over.',
  },
]

export function getBreed(slug) {
  return breeds.find((b) => b.slug === slug)
}

export const PHONE = '8013988082'
export const PHONE_INTL = '918013988082' // for tel: / wa.me links
