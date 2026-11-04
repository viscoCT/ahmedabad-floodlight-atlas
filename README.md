# Ahmedabad Floodlight Atlas

use given logo and make  theme in water bluish white glowy and blury color gradient

PROJECT: Smart Monsoon Ahemdabad

1. ROLE DEFINITION

Act as a senior full-stack developer, GIS application developer, geospatial data analyst, UI/UX designer, and product architect.

Build a complete, premium-quality, responsive web application named Ahmedabad Urban Waterlogging Analysis.

The website will present satellite imagery comparisons, an interactive waterlogging safety portal, identified hotspot areas, statistical visualisations, and the effects and solutions associated with urban waterlogging in Ahmedabad, Gujarat, India.

This must be a fully functional web application, not merely a static design or visual prototype.

The website must contain exactly five primary sections:

Before & After Satellite Image Analysis.

Waterlogging Safety Portal.

Top 10 Waterlogging Hotspots.

Statistics & Data Analysis.

Effects & Solutions.

All supplied images, GeoJSON files, charts, tables, and text documents must be used as the primary source material.

Do not fabricate research data or replace supplied project material with mock content.

2. PROJECT OVERVIEW

Business / Project Name: Ahmedabad Urban Waterlogging Analysis

Industry: GIS, Remote Sensing, Urban Planning, Environmental Monitoring, Disaster Management and Public Safety.

Geographical Focus: Ahmedabad, Gujarat, India.

Target Users:

Ahmedabad residents.

Commuters and daily travellers.

Urban planners.

Researchers and students.

Municipal authorities.

Environmental and disaster-management professionals.

General public.

Main Objective:

Develop a centralised web application that presents the waterlogging analysis of Ahmedabad through satellite imagery, geospatial hotspot mapping, a location-based safety portal, statistical visualisations, and public awareness information.

Core Features:

Before-and-after satellite imagery comparison for 2024, 2025 and 2026.

Interactive waterlogging safety portal.

Location search and waterlogging hotspot status detection.

Map showing all identified waterlogging hotspots.

Top 10 hotspot areas.

Statistical charts, tables and density maps.

Effects of waterlogging and recommended solutions.

USP:

Combine satellite-based waterlogging analysis, interactive GIS mapping, location-based hotspot awareness, and research findings in one premium public-facing platform.

3. WEBSITE STRUCTURE AND NAVIGATION

Build a single-page website with five full-width primary sections and smooth navigation.

Main navigation bar

Include:

Project name or logo.

Before & After.

Safety Portal.

Top 10 Hotspots.

Statistics.

Effects & Solutions.

Requirements:

Sticky navigation bar.

Smooth scrolling between sections.

Highlight the currently active section.

Responsive mobile navigation.

Consistent navigation across the entire website.

Landing / Hero section

Create a premium introductory hero section.

Display:

Project name: Ahmedabad Urban Waterlogging Analysis.

A concise description of the project.

An attractive Ahmedabad geographical or satellite-based visual.

Primary CTA: Explore Analysis.

Secondary CTA: Check Waterlogging Status.

The hero must immediately communicate the purpose of the project.

Do not create additional primary sections beyond the five specified sections. The hero and footer are supporting components.

4. SECTION 1 – BEFORE & AFTER SATELLITE IMAGE ANALYSIS

Objective

Display before-and-after satellite images of Ahmedabad for three years: 2024, 2025 and 2026.

4.1 Section heading

Before & After Satellite Image Analysis

Keep the introduction minimal. Do not add lengthy explanations or paragraphs about satellite technology or the purpose of comparing images.

4.2 Year selection

Create three interactive tabs:

2024

2025

2026

When a user selects a year, display its corresponding before-and-after satellite images.

4.3 Satellite image comparison

Display two images side by side.

Use the following supplied files:

Year

Before image

After image

2024

14 june.png

18 aug.png

2025

8 jun

18 september

2026

18 jun

23 august

The actual uploaded filenames may include extensions. Match the files using their names and year grouping.

Layout:

Left image: BEFORE.

Right image: AFTER.

Clearly visible labels above each image.

Equal-sized image containers.

Consistent spacing.

Preserve the original image aspect ratio.

Do not stretch or distort the images.

Display images at a sufficiently large size for geographical inspection.

4.4 Image interaction

Keep image interaction simple.

Provide:

Click to enlarge.

Full-screen or modal image viewing.

Close button to return to the comparison.

Do not implement:

Draggable before-and-after sliders.

Image panning controls.

Image zoom controls.

Complicated image comparison interactions.

Unnecessary image metadata panels.

Do not add separate capture-date metadata, imagery-source information, geographical study-area descriptions, or observation-note sections.

The year tabs and before-and-after images are the primary focus of this section.

5. SECTION 2 – WATERLOGGING SAFETY PORTAL

Objective

Build a premium, Google Maps-style interactive portal that allows users to search for any location in Ahmedabad and determine whether that location is within a mapped waterlogging hotspot danger zone.

The portal must be intuitive for ordinary people who may not understand GIS, GeoJSON, buffers, or geospatial analysis.

The interface must communicate the final result in simple language.

5.1 Supplied geographical datasets

Use the following two files:

File 1: Ahmedabad_All_Waterlogging_Hotspots.geojson

Contains all original waterlogging hotspot polygons.

Use it to:

Display all hotspot polygons on the map.

Provide the geographical hotspot distribution.

File 2: Ahmedabad_Danger_Zones.geojson

Contains the supplied 50-metre danger-zone buffer polygons.

Use it to:

Determine whether a searched location falls within a mapped danger zone.

Display the danger-zone layer on the map.

Both files must be loaded from the supplied project assets.

Recommended file structure:

public/
  data/
    Ahmedabad_All_Waterlogging_Hotspots.geojson
    Ahmedabad_Danger_Zones.geojson

Do not connect the application to Google Earth Engine.

Do not generate new buffers in the frontend.

Do not replace the supplied datasets with mock geographical data.

5.2 Google Maps-style interface

The portal must look and behave like a modern Google Maps-style location search interface.

Prioritise:

Large map occupying most of the available screen.

Prominent search bar.

Clean map controls.

Smooth map movement.

Clear location markers.

Simple layer controls.

Floating result cards.

Minimal unnecessary panels.

Use Leaflet.js with React-Leaflet.

The map should initially focus on Ahmedabad and display the supplied geographical data.

5.3 Map layers

Display two independent geographical layers.

Layer 1 – All Waterlogging Hotspots

Use the original hotspot GeoJSON.

Display the polygon distribution clearly.

Make individual polygons selectable.

Layer 2 – Danger Zones

Use the supplied danger-zone GeoJSON.

Display the danger-zone polygons with a visually distinct style.

Make the layer independently switchable.

Provide simple layer toggles:

Show / Hide Waterlogging Hotspots.

Show / Hide Danger Zones.

Include a small, clear legend explaining the visible map layers.

5.4 Location search – VERY IMPORTANT

The previous standalone checker had poor search accuracy.

It frequently failed to identify locations unless users entered a complete and accurately spelled address. It also struggled with short or single-word searches.

Fix this problem in the new website.

The search functionality must support:

Single-word searches.

Locality names.

Road names.

Landmark names.

Society names.

Common place names.

Partial addresses.

Full addresses.

Minor spelling mistakes.

Common spelling variations.

Incomplete or approximate user queries.

Examples of expected searches:

Maninagar.

Danilimda.

Gita Mandir.

Sarangpur.

Narayan Nagar.

Sabarmati Ashram.

A road name.

A society name.

An approximate locality spelling.

The user must not be forced to type "Ahmedabad, Gujarat, India" after every search.

5.5 Search implementation requirements

Use a reliable geocoding service with autocomplete and typo-tolerant search.

Preferred implementation:

Photon API as the primary geocoding service.

A configurable fallback geocoding provider.

Search suggestions displayed below the search bar.

Debounced search requests.

Ahmedabad geographical filtering.

Normalisation of whitespace and common spelling variations.

Support for partial and single-word searches.

Clear handling of ambiguous results.

Where multiple possible locations match:

Display a list of suggestions.

Include locality or address context.

Allow the user to choose the correct result.

Do not automatically select an unrelated result.

For minor spelling errors, implement a reasonable fuzzy-matching strategy using available geocoding results and locality names.

Do not rely exclusively on exact string matching.

If the primary geocoding service fails, attempt the fallback provider.

If both fail, display a clear message explaining that the address could not be found and allow the user to click directly on the map.

5.6 Search result behaviour

When a user selects a search suggestion:

Identify the selected geographical coordinates.

Move the map to that location.

Place a prominent location marker.

Run the danger-zone check.

Display the final result in an animated floating result card.

The result card must appear automatically after a successful search.

It must be visually prominent without covering too much of the map.

5.7 Map-click functionality

Users must also be able to click directly on the map.

When the user clicks:

Capture the selected latitude and longitude.

Place a location marker.

Check the selected point against the supplied danger-zone GeoJSON.

Display the animated result card.

This must work independently of address search.

5.8 Current location

Provide a button:

Use My Location

When clicked:

Request browser geolocation permission.

Obtain the user's coordinates.

Place a marker.

Run the danger-zone check.

Display the animated result card.

If permission is denied, display a helpful message.

5.9 Danger-zone detection

Use Turf.js for point-in-polygon detection.

The selected location must be checked against the complete Ahmedabad_Danger_Zones.geojson dataset.

Use:

turf.booleanPointInPolygon(point, polygon, {
  ignoreBoundary: false
});

Support both Polygon and MultiPolygon geometries.

The location is classified as being in a waterlogging hotspot if it lies inside or on the boundary of at least one supplied danger-zone polygon.

Otherwise, classify it as outside the mapped waterlogging hotspots.

Use a spatial index or bounding-box prefilter where necessary to improve performance with thousands of polygons.

Do not use polygon centroids as a substitute for polygon containment.

5.10 IMPORTANT – DO NOT REVEAL INTERNAL DETECTION LOGIC

The portal is intended for ordinary citizens, not GIS professionals.

Do not reveal the technical method used to identify danger zones in the public-facing interface.

Specifically, do not display:

Nearest hotspot.

Distance to hotspot.

Distance to polygon boundary.

Buffer used.

Buffer distance.

Geospatial calculations.

Point-in-polygon terminology.

Internal detection algorithms.

Technical details explaining why a location is classified as dangerous.

Do not show these details in the result card, map popup, search panel, or public-facing explanatory text.

The underlying application must still perform the correct geographical detection internally.

5.11 Result card – IMPORTANT DESIGN REQUIREMENT

The result card is one of the most important parts of the portal.

After every successful location search or map click, show a visually polished result card with a smooth entrance animation.

The card must clearly communicate whether the selected location is in a mapped waterlogging hotspot.

Create two visual states.

STATE A – WATERLOGGING HOTSPOT

Display:

HOTSPOT AREA

You are in a waterlogging hotspot.

This location falls within an identified waterlogging-prone area. Please remain cautious, especially during heavy rainfall.

STATE B – OUTSIDE MAPPED HOTSPOT

Display:

OUTSIDE MAPPED HOTSPOT

You are not in a mapped waterlogging hotspot.

This location is outside the identified waterlogging hotspot areas. Continue to follow local weather and safety advisories.

These are example content states for the generated interface.

5.12 Result card animation

The result card must:

Appear automatically after search or map selection.

Use a smooth slide-up and fade-in animation.

Include a subtle scale transition.

Have a clear visual hierarchy.

Use an appropriate icon for each result.

Include a close button.

Remain readable on mobile.

Avoid blocking the selected location on the map.

Animate cleanly when a new search produces another result.

Do not use excessive animations.

The result must be immediately understandable without reading a long paragraph.

5.13 Result card information

Only display:

Whether the selected location is in a waterlogging hotspot.

Selected location name, if available.

A short cautionary message.

Do not display latitude/longitude unless specifically required for a secondary technical information view.

Do not display nearest hotspot, distance, buffer distance, or any explanation of the detection algorithm.

5.14 Map controls

Include:

Zoom in.

Zoom out.

Reset to Ahmedabad.

Full-screen map.

Layer visibility toggles.

Location marker.

Search suggestions.

5.15 Map tile provider

Use a reliable and appropriately attributed map tile provider.

Use Esri World Street Map as the initial basemap provider, subject to its current service terms and usage requirements.

Do not use:

Blocked OpenStreetMap public tile endpoints.

CARTO tile endpoints that require an unavailable API key.

Any map provider configuration that displays API-key-required watermarks.

Keep the tile provider configuration separate from the GIS detection logic.

If the map tiles fail:

Display a clear basemap error message.

Keep the GeoJSON layers available where possible.

Preserve the danger-zone detection functionality.

Do not crash the entire portal.

5.16 Public-facing disclaimer

Include a small, unobtrusive disclaimer:

"This portal provides indicative waterlogging hotspot information based on mapped project data. It does not provide real-time flood monitoring or guarantee that locations outside mapped hotspots are safe. Actual conditions may change depending on rainfall, drainage conditions, and local circumstances."

Do not add a lengthy public-facing methodology section explaining the detection algorithm.

6. SECTION 3 – TOP 10 WATERLOGGING HOTSPOTS

Objective

Display the ten important waterlogging hotspot areas identified for Ahmedabad and show their geographical distribution on a map.

6.1 Section heading

Top 10 Waterlogging Hotspot Areas in Ahmedabad

Include a short introductory line.

6.2 Top 10 hotspot areas

The following ten hotspot names will be provided as the project's top hotspot locations.

They are not provided in any particular order.

Display them without implying a ranking or assigning rank numbers.

Danilimda

Chipakuva

Khodiyarnagar

Narayan Nagar

Gita Mandir

Prem Darwaza

Sarangpur

Maninagar

Dariyapur

Narayan Park Society

Use the spelling provided above.

6.3 Hotspot card design

Display ten attractive and consistent location cards.

Each card should contain:

Hotspot locality name.

A location icon.

A View on Map button.

Do not invent:

Rankings.

Hotspot area measurements.

Coordinates.

Population statistics.

Descriptions of local waterlogging severity.

The ten cards must have equal visual importance.

6.4 Complete hotspot distribution map

Reuse the original Ahmedabad_All_Waterlogging_Hotspots.geojson file from Section 2.

Do not create a separate geographical dataset.

Display all valid hotspot polygons on an interactive map.

Features:

Zoom and pan.

Display all supplied polygons.

Select individual hotspot polygons.

Show available properties when a polygon is clicked.

Reset map view.

Layer visibility control.

6.5 Top 10 card and map interaction

When a user clicks View on Map:

Move the map to the corresponding locality.

Display an appropriate marker or highlighted location.

Clearly identify the selected locality.

Do not arbitrarily select an unrelated polygon if a locality cannot be accurately matched to the supplied GeoJSON features.

The map must still display the complete original hotspot dataset.

7. SECTION 4 – STATISTICS & DATA ANALYSIS

Objective

Display the statistical findings of the project using the supplied charts, tables, and density map.

This section must be highly visual and data-focused.

IMPORTANT: Use the supplied visualisations directly. Do not create long explanations, reasoning, or analytical paragraphs.

7.1 Section heading

Statistics & Data Analysis

Keep the introduction minimal.

7.2 Supplied files

Use:

File 1: ahemdabad_waterlog_density.png

Purpose:

Display the waterlogging density map.

Preserve the original image proportions.

Provide a large, clear viewing area.

Allow clicking to enlarge the image.

File 2: charts.html

Purpose:

Contains all project charts combined.

Use the supplied chart content as the source for the statistics section.

Integrate the charts into the website while preserving their original data, labels, chart types, and visual meaning.

Inspect the supplied HTML before deciding how to integrate it.

Do not simply display the raw HTML file as a download link.

If the charts are self-contained:

Extract and integrate their chart components into the main website.

Maintain responsive sizing.

Preserve chart interactivity where available.

If the charts require external scripts or libraries:

Identify their dependencies.

Integrate them safely.

Do not introduce unnecessary duplicate frameworks.

7.3 Display layout

Create a premium data-dashboard layout containing:

Density map.

Supplied charts.

Supplied tables.

Other supplied statistical visualisations.

Use clear section headings and compact labels.

Prioritise the supplied visualisations over explanatory text.

7.4 Strict content rules

Do not:

Generate additional charts from invented data.

Add fictional statistical indicators.

Write long explanations of chart logic.

Add lengthy reasoning or interpretations.

Add paragraphs explaining why a chart matters.

Change the meaning of supplied data.

Replace the supplied charts with generic dashboard charts.

Display the actual charts, tables, and density map supplied by the project owner.

The purpose of this section is to let users explore the project's results visually.

8. SECTION 5 – EFFECTS & SOLUTIONS

Objective

Present the effects of urban waterlogging and practical recommendations through four topics.

8.1 Supplied content file

Use:

effectsandsolutions.txt

Read and use the complete contents of this file as the primary source for this section.

Do not omit important information.

Do not invent additional research findings or statistics.

8.2 Four required topics

Divide the content into exactly four categories.

1. Affected Population

Present information about the population affected by waterlogging.

Use the supplied text to display the relevant details.

2. Safety Measures

Display the recommended safety measures in an easy-to-read format.

Use cards, icons, or numbered instructions where appropriate.

3. What Can Normal People Do?

Present the actions ordinary citizens can take to reduce waterlogging impacts and improve public safety.

4. What Can Government Do?

Present the government-level measures and solutions contained in the supplied file.

8.3 Design

Use:

Four visually distinct content blocks.

Clear headings.

Readable text.

Relevant icons.

Short paragraphs or bullet points.

Good spacing.

Do not turn this section into a long academic report.

Make the content accessible to ordinary citizens.

Do not change the meaning of the supplied recommendations.

9. GLOBAL UI/UX AND BRANDING REQUIREMENTS

9.1 Design direction

The website must have a premium, modern, polished, professional appearance.

It should feel like a combination of:

A modern Google Maps-style mapping platform.

A premium GIS research dashboard.

A professional urban-analysis website.

The design must be visually impressive without compromising usability.

9.2 Branding and colours

The project owner will provide:

Logo.

Brand identity.

Colour theme.

Do not decide or hardcode the final brand colour palette yet.

For now:

Use a premium neutral design system.

Use restrained, professional colours.

Keep the design tokens easy to modify.

Make the logo replaceable without redesigning the navigation.

Keep danger and safe result states visually distinguishable.

Do not commit to a permanent colour scheme before the logo and colour theme are supplied.

9.3 Google Maps-style portal appearance

The Waterlogging Safety Portal must be visually similar in usability to Google Maps.

Include:

Large map canvas.

Floating search bar.

Floating controls.

Smooth map interactions.

Location markers.

Layer controls.

Animated search-result card.

Minimal visual clutter.

Do not make the portal look like a conventional data-entry dashboard.

9.4 Typography

Use a premium, modern sans-serif typeface.

Recommended: Inter or a similarly clean font.

Maintain:

Clear heading hierarchy.

Readable paragraph text.

Compact labels.

Consistent button typography.

9.5 Cards and components

Use:

Clean cards.

Subtle shadows.

Consistent corner radii.

Clear spacing.

Professional icons.

Subtle hover effects.

Smooth transitions.

Avoid:

Excessively rounded components everywhere.

Oversized text.

Too many floating panels.

Unnecessary gradients.

Excessive animations.

Cluttered layouts.

9.6 Responsiveness

The website must work properly on:

Desktop.

Laptop.

Tablet.

Mobile.

Mobile requirements:

Responsive navigation.

Stacked satellite image comparisons.

Touch-friendly search and map controls.

Responsive hotspot cards.

Readable result card.

Proper chart scaling.

No horizontal overflow.

10. TECHNICAL STACK

Use:

Frontend

React.

TypeScript.

Vite.

Tailwind CSS.

shadcn/ui.

Lucide React icons.

GIS and maps

Leaflet.js.

React-Leaflet.

Turf.js.

GeoJSON.

Charts

Reuse the chart implementation already present in charts.html.

Use Recharts only if necessary for additional integration or components.

Image viewing

Responsive image components.

Modal or lightbox for enlarged satellite images and density map.

State management

React state or Zustand.

Keep map state, selected location, layer visibility, and result state synchronised.

Suggested folder structure

public/
  data/
    Ahmedabad_All_Waterlogging_Hotspots.geojson
    Ahmedabad_Danger_Zones.geojson

  images/
    satellite/
      2024/
        14 june.png
        18 aug.png
      2025/
        8 jun.png
        18 september.png
      2026/
        18 jun.png
        23 august.png

    statistics/
      ahemdabad_waterlog_density.png

  content/
    effectsandsolutions.txt

src/
  components/
    Navbar/
    Footer/
    ImageViewer/
    Map/
    Search/
    ResultCard/

  sections/
    BeforeAfter/
    SafetyPortal/
    TopHotspots/
    Statistics/
    EffectsSolutions/

  data/
    hotspotAreas.ts

  services/
    geocoding.ts
    geojson.ts

  utils/
    geoAnalysis.ts

  types/

Use a structured and reusable architecture.

Keep the data and content separate from the UI components.

11. FUNCTIONAL AND NON-FUNCTIONAL REQUIREMENTS

Functional requirements

The website must support:

Navigation across all five sections.

Year selection for satellite image comparisons.

Enlarged image viewing.

GeoJSON loading.

Interactive map rendering.

Hotspot and danger-zone layer toggles.

Address search.

Typo-tolerant search.

Single-word search.

Search autocomplete.

Map-click danger-zone detection.

Current-location danger-zone detection.

Animated danger/safe result cards.

Top 10 locality cards.

Map navigation from hotspot cards.

Density map viewing.

Supplied chart integration.

Effects and solutions content display.

Performance requirements

Load GeoJSON asynchronously.

Cache parsed GeoJSON during the session.

Avoid unnecessarily rerendering thousands of polygons.

Use spatial indexing or efficient filtering for geospatial operations.

Lazy-load satellite imagery and below-the-fold assets.

Avoid loading every large image immediately.

Ensure the map remains responsive.

Optimise the supplied charts for their display area.

Reliability requirements

GeoJSON loading errors must not crash the website.

Geocoding failures must not disable map-click detection.

Map tile failure must not disable hotspot detection.

Missing images must display a clear empty state.

Missing chart content must not break other sections.

Invalid search input must be handled gracefully.

All buttons and navigation elements must work.

Security requirements

Do not expose private API keys.

Do not insert untrusted GeoJSON properties as raw HTML.

Validate user input.

Use HTTPS external services.

Do not store precise user-location data unnecessarily.

Do not collect personal information.

12. STRICT CONTENT AND DATA CONSTRAINTS

The following requirements are mandatory:

Use the exact project name: Ahmedabad Urban Waterlogging Analysis.

Use the supplied satellite images.

Use the supplied original hotspot GeoJSON.

Use the supplied danger-zone GeoJSON.

Use the supplied ten hotspot locality names.

Use the supplied density map.

Use the supplied charts HTML.

Use the supplied effects and solutions text file.

Do not invent satellite images or dates.

Do not invent hotspot rankings.

Do not invent hotspot statistics.

Do not invent affected population figures.

Do not generate fictional charts.

Do not add lengthy statistical explanations.

Do not reveal the internal danger-zone detection logic.

Do not display nearest hotspot, distance, or buffer information in the safety portal.

Do not create a draggable before-and-after slider.

Do not add unnecessary image metadata.

Do not introduce a permanent colour palette before the logo and branding are provided.

Do not add features outside the five requested sections unless technically necessary.

If any file is missing:

Build the component structure.

Display a clear empty state.

Do not replace missing research material with fabricated information.

13. FOOTER

Create a minimal premium footer containing:

Ahmedabad Urban Waterlogging Analysis.

Links to the five website sections.

Brief project identification.

Relevant data-source and map attribution.

A concise public safety disclaimer.

Do not invent institutional affiliations, government endorsements, or research partnerships.

14. DEVELOPMENT PRIORITY

Build the application in this order.

PHASE 1 – Website foundation

Establish the design system.

Create navigation.

Create hero section.

Build all five primary sections.

Implement responsive layouts.

PHASE 2 – Safety portal

Integrate both GeoJSON files.

Build Google Maps-style Leaflet interface.

Implement geocoding and autocomplete.

Implement typo-tolerant location search.

Implement map-click detection.

Implement current-location detection.

Implement danger-zone classification.

Implement animated result cards.

Remove all technical distance and buffer details from the public interface.

PHASE 3 – Satellite comparison

Integrate the six supplied satellite images.

Create year tabs.

Build the before-and-after layouts.

Implement image enlargement.

PHASE 4 – Hotspot section

Add the ten supplied locality names.

Build the hotspot cards.

Display all hotspot polygons.

Implement card-to-map navigation.

PHASE 5 – Statistics

Integrate ahemdabad_waterlog_density.png.

Inspect and integrate charts.html.

Preserve the supplied visualisations.

Avoid invented statistics and explanatory paragraphs.

PHASE 6 – Effects and solutions

Read effectsandsolutions.txt.

Organise its content into the four specified topics.

Implement the final content layout.

PHASE 7 – Testing

Test all five sections.

Test all six satellite images.

Test GeoJSON loading.

Test all map layers.

Test single-word searches.

Test minor spelling mistakes.

Test ambiguous search results.

Test map-click detection.

Test current-location detection.

Test points inside and outside danger zones.

Test the result card animations.

Test all ten hotspot cards.

Test chart integration.

Test mobile responsiveness.

Test map tile and geocoding failures.

15. FINAL OUTPUT EXPECTATIONS

Generate a complete, working, production-ready React and TypeScript website suitable for deployment.

The final application must include:

Premium landing experience.

Five-section navigation.

2024 satellite comparison.

2025 satellite comparison.

2026 satellite comparison.

Fully functional Google Maps-style Waterlogging Safety Portal.

Integration of both supplied GeoJSON files.

Accurate location-based danger-zone detection.

Improved address search with typo tolerance and single-word support.

Animated danger/safe result cards.

No public display of nearest hotspot, distance, or buffer information.

Ten unranked hotspot locality cards.

Complete hotspot distribution map.

Supplied waterlogging density map.

Supplied charts and tables.

Four-topic Effects & Solutions section.

Responsive design.

Loading, error, and empty states.

Proper project folder structure.

Reusable and maintainable components.

Final acceptance criteria

The application is complete only when:

All five sections work.

All supplied assets are correctly integrated.

The before-and-after images appear under the correct years.

The safety portal loads both GeoJSON files.

The map has a clean, Google Maps-style appearance.

Search accepts single words and common spelling variations.

Search suggestions are useful and geographically relevant.

Map clicks independently trigger danger-zone detection.

The result card appears automatically after a successful location selection.

The result card clearly states whether the user is in a mapped waterlogging hotspot.

No internal detection logic is exposed to users.

All ten hotspot names are displayed without invented rankings.

The density map and charts are displayed using supplied material.

Effects and solutions use the supplied text file.

The website works on desktop and mobile.

Map tile or geocoding service failures do not crash the core application.

FINAL PRODUCT VISION

Create a premium, visually polished, Google Maps-inspired Ahmedabad Urban Waterlogging Analysis website that combines satellite image comparisons, a highly usable location-based waterlogging safety portal, hotspot mapping, supplied statistical visualisations, and public awareness recommendations into one unified platform.

The result should look like a professionally developed GIS and urban research product, with a particularly strong emphasis on the usability, search accuracy, map experience, and animated result presentation of the Waterlogging Safety Portal.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/aa4884ac-ba86-432c-83d6-b4bcdf555af8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
