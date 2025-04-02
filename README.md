# Different Not Less Apparel

E-commerce platform for Different Not Less Apparel, featuring sensory-friendly apparel celebrating AAC, autism acceptance, and inclusive communication.

## Project Overview

Different Not Less Apparel is dedicated to creating inclusive, high-quality apparel that celebrates all forms of communication while promoting autism acceptance, AAC awareness, and the inherent value of diverse communication methods. We believe that everyone deserves to be heard and understood, regardless of how they communicate.

### Target Launch Date

April 2, 2025 (World Autism Awareness Day)

## Tech Stack

- **Frontend**: Next.js, React, CSS Modules
- **E-commerce**: Shopify (Headless)
- **CMS**: Sanity
- **Database**: Airtable
- **Deployment**: Vercel

## Product Collections

- **Your Words Matter Collection**: Apparel featuring empowering messages about the importance of communication and inclusive language.
- **Different Not Less Collection**: Our flagship collection celebrating neurodiversity and the message that being different doesn't mean less valuable or capable.
- **SLP Professional Collection**: Apparel designed specifically for speech-language pathologists.
- **Educator Collection**: Apparel for special education teachers and inclusive classroom educators.

## Key Features

- Sensory-friendly product design (tagless, flat seams, pre-washed, soft prints)
- Accurate AAC symbol representation
- Accessible website design
- Headless e-commerce architecture
- Inventory management with Airtable integration

## Development Setup

```bash
# Clone the repository
git clone https://github.com/madezmedia/different-not-less.git
cd different-not-less

# Install dependencies
npm install

# Run the Next.js development server
npm run dev

# Run the Sanity Studio development server
npm run sanity:dev
```

### Sanity Studio

The project uses Sanity as a headless CMS. To work with content:

1. Start the Sanity Studio server:
```bash
npm run sanity:dev
```

2. Access the Sanity Studio at http://localhost:3333

3. Build the Sanity Studio for production:
```bash
npm run sanity:build
```

4. Deploy the Sanity Studio:
```bash
npm run sanity:deploy
```

## Project Structure

```
different-not-less/
├── components/       # React components
├── pages/            # Next.js pages
├── public/           # Static assets
├── styles/           # CSS modules
├── lib/              # Utility functions and API services
├── sanity-studio/    # Sanity CMS configuration and Studio
└── n8n/              # n8n workflow automation
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
