# Optical Paths: Optical Layout Drawing Tool

[中文说明](./README_zh.md) | [Back to overview](./README.md)

Optical Paths is a browser-based drawing tool for quickly arranging laboratory optical layouts. It models breadboards, optical components, posts, and fork clamps in millimeters and automatically aligns clamp screws with threaded breadboard holes.

Live app: [https://windsweeps.github.io/Optical-Paths/](https://windsweeps.github.io/Optical-Paths/)

## Current Features

- Five metric breadboards: `900 x 600 mm`, `600 x 600 mm`, `600 x 300 mm`, `450 x 300 mm`, and `300 x 300 mm`
- `25 mm` hole pitch with the first row of holes `12.5 mm` from each edge
- Component picker with a suspended placement preview before committing a new component
- Automatic selection of an available threaded hole with the smallest clamp-angle adjustment
- Fork-clamp overlap prevention
- Warning when a post blocks access to a screw while still allowing placement
- Direct numeric component-angle input
- Editable horizontal component labels
- Chinese and English interface toggle with persisted language preference
- SVG and PNG export preview with local download

## Optical Rules

The current version focuses on layout and basic ray tracing:

- Sources emit rays along the component angle
- Ray color responds to the source wavelength input
- Mirrors reflect rays using equal angles of incidence and reflection
- Lenses transmit rays
- Beamsplitter cubes generate transmitted and reflected branches
- When a source is outside the breadboard, its ray still extends in the correct direction to the visible canvas edge

Polarization matrices and Gaussian-beam ABCD calculations are not implemented yet.

## Built-in Components

| Component | Type | Notes |
| --- | --- | --- |
| Ultrastable Mirror Mount Beam Coupler | Source | Adjustable emission angle and wavelength |
| Ultrastable 1-inch Mirror Mount | Reflective element | Reflects rays at its optical surface |
| Lens Mount | Transmissive element | Allows rays to pass through |
| 1-inch Wave Plate Mount | Polarization element | Currently displayed as a transmissive element |
| 1-inch Beamsplitter Cube | Beamsplitter | `25.4 x 25.4 mm` with a diagonal surface that reflects and transmits |

## Usage

1. Select a breadboard size.
2. Click **Add Component** and choose an item from the library.
3. Drag the suspended component while inspecting the automatically selected hole, clamp angle, and mounting status.
4. Click **Place** to commit the component.
5. Select a component to edit its label, component angle, clamp angle, or source wavelength.
6. Click **Export SVG** or **Export PNG**, preview the output, and download the image.

## Run Locally

The project is a static website with no frontend dependencies. Run this command from the project directory:

```bash
python3 -m http.server 4175
```

Then open:

```text
http://localhost:4175/
```

## Embed in WordPress

Host the app with GitHub Pages, then add a Custom HTML block to the WordPress page:

```html
<iframe
  src="https://windsweeps.github.io/Optical-Paths/"
  title="Optical Path Tool"
  style="display:block;width:100%;height:calc(100vh - 40px);min-height:820px;border:0;"
></iframe>
```

If the page template constrains the content width, place the Custom HTML block inside a full-width Group block or create a dedicated full-width template that only keeps Post Content.

## Project Structure

```text
.
├── index.html             # Page structure
├── styles.css             # Interface and SVG styling
├── app.js                 # Layout, snapping, ray tracing, export, and i18n logic
└── component-library.js   # Published optical component library
```

## Scope

- No accounts
- No cloud sync
- No collaborative editing
- Not a mechanical CAD tool and not intended for manufacturing drawings
- Basic two-dimensional layout and ray illustration only
