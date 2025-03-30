import React from 'react';

const VisualBrandKit = () => {
  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-8 font-sans">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Different Not Less Apparel</h1>
        <h2 className="text-2xl text-teal-600 mb-8">Visual Brand Kit</h2>
        <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-teal-500 mx-auto mb-8"></div>
      </header>

      {/* Logo Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Logo Variations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-gray-100 rounded-md flex items-center justify-center p-4 mb-4 h-64">
              <div className="w-full h-48 bg-white rounded-md flex items-center justify-center">
                <div className="w-48 h-48 bg-gradient-to-br from-yellow-400 to-teal-500 rounded-full flex items-center justify-center text-white text-6xl">
                  <span>DNL</span>
                </div>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Primary Logo</h3>
            <p className="text-gray-600 text-sm">Full logo with hand gesture symbol and wordmark. Use for most applications.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-gray-100 rounded-md flex items-center justify-center p-4 mb-4 h-64">
              <div className="w-full h-48 bg-white rounded-md flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-teal-500 rounded-full"></div>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Symbol Only</h3>
            <p className="text-gray-600 text-sm">Hand gesture symbol for small applications like social media icons and favicons.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-gray-100 rounded-md flex items-center justify-center p-4 mb-4 h-64">
              <div className="w-full h-48 bg-white rounded-md flex items-center justify-center p-4">
                <div className="w-full bg-white text-center">
                  <div className="text-xl font-bold text-gray-800">DIFFERENT NOT LESS</div>
                  <div className="text-sm text-gray-600">APPAREL</div>
                </div>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Wordmark</h3>
            <p className="text-gray-600 text-sm">Text-only version for horizontal applications where space is limited.</p>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Color Palette</h2>
        
        <h3 className="text-xl font-semibold mb-4">Primary Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="flex flex-col">
            <div className="h-24 bg-yellow-400 rounded-t-lg"></div>
            <div className="bg-white p-3 border border-gray-200 rounded-b-lg">
              <p className="font-semibold">Communication Gold</p>
              <p className="text-sm text-gray-600">#D4B95E</p>
              <p className="text-xs text-gray-500">RGB: 212, 185, 94</p>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="h-24 bg-teal-500 rounded-t-lg"></div>
            <div className="bg-white p-3 border border-gray-200 rounded-b-lg">
              <p className="font-semibold">Heart Teal</p>
              <p className="text-sm text-gray-600">#3DADA7</p>
              <p className="text-xs text-gray-500">RGB: 61, 173, 167</p>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="h-24 bg-blue-900 rounded-t-lg"></div>
            <div className="bg-white p-3 border border-gray-200 rounded-b-lg">
              <p className="font-semibold">Deep Navy</p>
              <p className="text-sm text-gray-600">#1A3A5F</p>
              <p className="text-xs text-gray-500">RGB: 26, 58, 95</p>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="h-24 bg-yellow-50 rounded-t-lg"></div>
            <div className="bg-white p-3 border border-gray-200 rounded-b-lg">
              <p className="font-semibold">Soft Cream</p>
              <p className="text-sm text-gray-600">#F7F3E4</p>
              <p className="text-xs text-gray-500">RGB: 247, 243, 228</p>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-4">Secondary Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <div className="h-24 bg-purple-600 rounded-t-lg"></div>
            <div className="bg-white p-3 border border-gray-200 rounded-b-lg">
              <p className="font-semibold">Neurodiversity Purple</p>
              <p className="text-sm text-gray-600">#7B4C9D</p>
              <p className="text-xs text-gray-500">Different Not Less Collection</p>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="h-24 bg-blue-500 rounded-t-lg"></div>
            <div className="bg-white p-3 border border-gray-200 rounded-b-lg">
              <p className="font-semibold">AAC Blue</p>
              <p className="text-sm text-gray-600">#4C7BD3</p>
              <p className="text-xs text-gray-500">Your Words Matter Collection</p>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="h-24 bg-green-500 rounded-t-lg"></div>
            <div className="bg-white p-3 border border-gray-200 rounded-b-lg">
              <p className="font-semibold">Education Green</p>
              <p className="text-sm text-gray-600">#5AAD54</p>
              <p className="text-xs text-gray-500">SLP/Teacher Collections</p>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="h-24 bg-red-400 rounded-t-lg"></div>
            <div className="bg-white p-3 border border-gray-200 rounded-b-lg">
              <p className="font-semibold">Warm Coral</p>
              <p className="text-sm text-gray-600">#E67358</p>
              <p className="text-xs text-gray-500">Accent Color</p>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Typography</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Primary Font: Montserrat</h3>
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-bold">Montserrat Bold</p>
                <p className="text-gray-600 text-sm">Used for headings (H1, H2)</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">Montserrat SemiBold</p>
                <p className="text-gray-600 text-sm">Used for subheadings (H3, H4)</p>
              </div>
              <div>
                <p className="text-xl">Montserrat Regular</p>
                <p className="text-gray-600 text-sm">Used for body copy</p>
              </div>
              <div>
                <p className="text-xl italic">Montserrat Italic</p>
                <p className="text-gray-600 text-sm">Used for emphasis</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Secondary Font: Open Sans</h3>
            <div className="space-y-4 font-sans">
              <div>
                <p className="text-xl font-semibold">Open Sans SemiBold</p>
                <p className="text-gray-600 text-sm">Used for UI elements</p>
              </div>
              <div>
                <p className="text-xl">Open Sans Regular</p>
                <p className="text-gray-600 text-sm">Used for extended body copy</p>
              </div>
              <div>
                <p className="text-xl font-light">Open Sans Light</p>
                <p className="text-gray-600 text-sm">Used for captions and small text</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Typography Hierarchy</h3>
          <div className="space-y-6">
            <div>
              <p className="text-4xl font-bold">Heading 1 (32px/40px)</p>
              <p className="text-gray-600 text-sm">Montserrat Bold - Page titles, main headings</p>
            </div>
            <div>
              <p className="text-3xl font-semibold">Heading 2 (24px/32px)</p>
              <p className="text-gray-600 text-sm">Montserrat SemiBold - Section headings</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">Heading 3 (18px/24px)</p>
              <p className="text-gray-600 text-sm">Montserrat SemiBold - Subsection headings</p>
            </div>
            <div>
              <p className="text-base">Body Text (16px/24px)</p>
              <p className="text-gray-600 text-sm">Montserrat Regular - Main content</p>
            </div>
            <div>
              <p className="text-sm">Small Text (14px/20px)</p>
              <p className="text-gray-600 text-sm">Open Sans Regular - Captions, labels</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Elements */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Brand Elements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Communication Grid Pattern</h3>
            <div className="h-48 bg-blue-50 rounded-md flex flex-wrap content-start p-2">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-1/4 p-1">
                  <div className={`h-10 rounded border-2 border-blue-500 ${i % 3 === 0 ? 'bg-blue-500' : 'bg-white'}`}></div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-gray-600">AAC-inspired grid pattern for backgrounds and supporting graphics.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Neurodiversity Wave</h3>
            <div className="h-48 bg-gradient-to-r from-purple-100 to-blue-100 rounded-md p-4 flex items-center justify-center">
              <div className="w-full h-24 relative overflow-hidden">
                <div className="absolute w-full">
                  <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path 
                      d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
                      className="fill-purple-500 opacity-20">
                    </path>
                    <path 
                      d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
                      className="fill-blue-500 opacity-20"
                      transform="translate(0, 20)">
                    </path>
                    <path 
                      d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
                      className="fill-teal-500 opacity-20"
                      transform="translate(0, 40)">
                    </path>
                  </svg>
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-600">Flowing curved lines in gradient colors representing neurodiversity.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Speech Bubble Array</h3>
            <div className="h-48 bg-white rounded-md p-2 flex flex-wrap justify-around items-center">
              <div className="w-20 h-16 bg-yellow-100 rounded-tl-lg rounded-tr-lg rounded-br-lg relative p-2 m-1">
                <div className="w-4 h-4 bg-yellow-100 absolute -bottom-1 -left-1 transform rotate-45"></div>
              </div>
              <div className="w-16 h-12 bg-teal-100 rounded-lg relative p-2 m-1">
                <div className="w-2 h-6 bg-teal-100 absolute -bottom-4 left-2 transform skew-x-12"></div>
              </div>
              <div className="w-24 h-12 bg-blue-100 rounded-full relative p-2 m-1">
                <div className="w-3 h-3 bg-blue-100 absolute -bottom-2 right-3"></div>
                <div className="w-2 h-2 bg-blue-100 absolute -bottom-4 right-2"></div>
              </div>
              <div className="w-16 h-14 bg-purple-100 rounded-tl-lg rounded-tr-lg rounded-bl-lg relative p-2 m-1">
                <div className="w-4 h-4 bg-purple-100 absolute -bottom-1 -right-1 transform rotate-45"></div>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-600">Overlapping speech bubbles in various styles representing diverse communication.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Sign Language Pattern</h3>
            <div className="h-48 bg-white rounded-md p-2 relative overflow-hidden">
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-2 p-2">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-blue-50 rounded-md flex items-center justify-center opacity-80">
                    <div className="w-8 h-8 border-2 border-teal-500 rounded-md transform rotate-45"></div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-600">Stylized hand shapes creating a repeating pattern.</p>
          </div>
        </div>
      </section>

      {/* Collection Branding */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Collection Identity</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-16 bg-blue-100 rounded-md flex items-center justify-center mb-4">
              <h3 className="text-xl font-bold text-blue-600">Your Words Matter</h3>
            </div>
            <div className="flex mb-4">
              <div className="w-1/4 h-12 bg-blue-500 rounded-l-md"></div>
              <div className="w-1/4 h-12 bg-blue-400"></div>
              <div className="w-1/4 h-12 bg-blue-300"></div>
              <div className="w-1/4 h-12 bg-blue-200 rounded-r-md"></div>
            </div>
            <p className="text-sm text-gray-600 mb-3">Primary color: AAC Blue (#4C7BD3)</p>
            <div className="flex space-x-2 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center text-blue-500 text-xl font-bold">A</div>
              <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center text-blue-500 text-xl font-bold">B</div>
              <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center text-blue-500 text-xl font-bold">C</div>
            </div>
            <p className="text-sm text-gray-600">Signature elements: Communication device imagery, speech bubbles</p>
            <p className="text-sm text-gray-600 mt-2">Target: SLPs, educators, AAC users and families</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-16 bg-purple-100 rounded-md flex items-center justify-center mb-4">
              <h3 className="text-xl font-bold text-purple-600">Different Not Less</h3>
            </div>
            <div className="flex mb-4">
              <div className="w-1/4 h-12 bg-purple-600 rounded-l-md"></div>
              <div className="w-1/4 h-12 bg-purple-500"></div>
              <div className="w-1/4 h-12 bg-purple-400"></div>
              <div className="w-1/4 h-12 bg-purple-300 rounded-r-md"></div>
            </div>
            <p className="text-sm text-gray-600 mb-3">Primary color: Neurodiversity Purple (#7B4C9D)</p>
            <div className="flex items-center justify-center mb-3">
              <div className="w-16 h-8 border-2 border-purple-500 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-600">Signature elements: Infinity symbol, abstract neurodiversity representations</p>
            <p className="text-sm text-gray-600 mt-2">Target: Autism community, advocates, families</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-16 bg-green-100 rounded-md flex items-center justify-center mb-4">
              <h3 className="text-xl font-bold text-green-600">SLP Professional</h3>
            </div>
            <div className="flex mb-4">
              <div className="w-1/4 h-12 bg-green-600 rounded-l-md"></div>
              <div className="w-1/4 h-12 bg-green-500"></div>
              <div className="w-1/4 h-12 bg-green-400"></div>
              <div className="w-1/4 h-12 bg-green-300 rounded-r-md"></div>
            </div>
            <p className="text-sm text-gray-600 mb-3">Primary color: Education Green (#5AAD54)</p>
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 border-2 border-green-500 rounded-md p-1 flex items-center justify-center">
                <div className="w-full h-full bg-green-100"></div>
              </div>
            </div>
            <p className="text-sm text-gray-600">Signature elements: Professional symbols, subtle therapy references</p>
            <p className="text-sm text-gray-600 mt-2">Target: Speech-Language Pathologists, therapy professionals</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-16 bg-blue-100 rounded-md flex items-center justify-center mb-4">
              <h3 className="text-xl font-bold text-blue-900">BCBA/RBT Collection</h3>
            </div>
            <div className="flex mb-4">
              <div className="w-1/4 h-12 bg-blue-900 rounded-l-md"></div>
              <div className="w-1/4 h-12 bg-blue-800"></div>
              <div className="w-1/4 h-12 bg-blue-700"></div>
              <div className="w-1/4 h-12 bg-blue-600 rounded-r-md"></div>
            </div>
            <p className="text-sm text-gray-600 mb-3">Primary color: Deep Navy (#1A3A5F) with gold accents</p>
            <div className="flex justify-center space-x-1 mb-3">
              <div className="w-4 h-8 bg-blue-900 rounded"></div>
              <div className="w-4 h-8 bg-blue-800 rounded"></div>
              <div className="w-4 h-8 bg-blue-700 rounded"></div>
              <div className="w-4 h-8 bg-yellow-400 rounded"></div>
            </div>
            <p className="text-sm text-gray-600">Signature elements: Professional symbols, behavior-focused imagery</p>
            <p className="text-sm text-gray-600 mt-2">Target: Behavior Analysts, RBTs, therapy centers</p>
          </div>
        </div>
      </section>

      <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
        <p>Different Not Less Apparel - Brand Guidelines</p>
        <p className="mt-2">Last Updated: March 30, 2025</p>
      </footer>
    </div>
  );
};

export default VisualBrandKit;
