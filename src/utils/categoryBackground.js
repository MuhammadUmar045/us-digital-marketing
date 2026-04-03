const categoryTagMap = {
  Clinics: 'clinic,doctor,medical',
  Dentists: 'dentist,dental,clinic',
  Pharmacies: 'pharmacy,medicine,medical',
  Veterinary: 'veterinary,pet,clinic',
  Gyms: 'gym,fitness,workout',
  'Spa & Wellness': 'spa,wellness,relaxation',
  Salons: 'salon,beauty,hairstyle',
  'Real Estate': 'real-estate,property,building',
  Restaurants: 'restaurant,food,dining',
  Caterers: 'catering,food,event',
  Bakeries: 'bakery,bread,pastry',
  Hotels: 'hotel,hospitality,travel',
  Travel: 'travel,tourism,vacation',
  'Car Rentals': 'car,rental,transport',
  'Bike Rentals': 'bike,rental,transport',
  Automobile: 'automobile,car,showroom',
  'Mobile Shops': 'mobile,smartphone,electronics',
  'Retail Shops': 'retail,store,shopping',
  Boutiques: 'boutique,fashion,clothing',
  Jewelry: 'jewelry,gold,showroom',
  'Shoe Stores': 'shoes,footwear,store',
  'Book Stores': 'bookstore,books,library',
  Toys: 'toys,kids,store',
  Stationery: 'stationery,office,supplies',
  Schools: 'school,education,classroom',
  Coaching: 'coaching,education,students',
  'Day Care': 'daycare,children,school',
  'Cyber Cafe': 'computer,cafe,internet',
  'CA/Accounting': 'accounting,finance,office',
  Lawyers: 'lawyer,legal,office',
  Builders: 'construction,building,architecture',
  'Interior Design': 'interior,design,home',
  Plumbing: 'plumber,plumbing,tools',
  Electrician: 'electrician,electrical,repair',
  Carpentry: 'carpentry,woodwork,furniture',
  Painting: 'painting,house,renovation',
  Security: 'security,guard,surveillance',
  Cleaning: 'cleaning,housekeeping,service',
  'Pest Control': 'pest-control,cleaning,service',
  Florists: 'flowers,florist,bouquet',
  Dairy: 'dairy,milk,farm',
  'Organic Food': 'organic,food,fresh',
  Theaters: 'theater,cinema,movie',
  'Wedding Halls': 'wedding,banquet,event',
  'Event Planners': 'event,planning,wedding',
  Photographers: 'photography,camera,studio',
  Hostels: 'hostel,accommodation,dorm',
  Opticians: 'optician,eyewear,glasses',
  Liquor: 'liquor,wine,store',
  'Elder Care': 'elderly,care,health',
}

const buildImageUrl = (searchTerm, seed) => {
  const safeTerm = encodeURIComponent(searchTerm)
  const cacheBuster = encodeURIComponent((seed || 'default').toLowerCase().replace(/\s+/g, '-'))
  return `https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&q=80&search=${safeTerm}&seed=${cacheBuster}`
}

const buildAlternateImageUrl = (searchTerm, seed) => {
  const safeTerm = encodeURIComponent(searchTerm)
  const seedVal = ((seed || 'alt').toLowerCase().charCodeAt(0) * 123) % 1000
  return `https://images.pexels.com/photos/1552664/pexels-photo-1552664.jpeg?w=1920&h=1080&fit=crop&auto=compress&seed=${seedVal}`
}

export const getCategoryBackgroundImage = (categoryName) => {
  if (!categoryName) {
    return buildImageUrl('business marketing', 'fallback')
  }

  const tags = categoryTagMap[categoryName] || 'business office marketing'
  return buildImageUrl(tags, categoryName)
}

export const defaultCategoryBackground = buildImageUrl('business team meeting', 'default')

export const getAlternateBackgroundImage = (categoryName) => {
  if (!categoryName) {
    return buildAlternateImageUrl('business marketing', 'fallback')
  }
  const tags = categoryTagMap[categoryName] || 'business office'
  return buildAlternateImageUrl(tags, categoryName)
}
