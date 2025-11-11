# HeroInteractive Section

## Overview
A highly interactive hero section designed for AI/SaaS applications featuring a scrolling carousel of app integrations, typing animation in an input field, and clickable prompt templates.

## Features

### 1. **Horizontal Icon Carousel**
- Seamless infinite scroll animation (90s duration)
- Horizontally centered on the page
- Pause on hover for better UX
- Smaller icons compared to the original Hero section (56px instead of 80px)
- Clickable icons that can be selected/deselected

### 2. **App Selection System**
- Click any app icon in the carousel to select it
- Selected state:
  - Background changes to `primary-light` (#D0EC1A)
  - Border changes to `primary-dark` (#07401A) with 2px width
  - Icon image gets a filter applied to match `primary-dark` color
  - Badge appears with the app's mention (e.g., "@gmail", "@slack")
- Click again to deselect (reverts all styling)
- Multiple apps can be selected simultaneously
- Badges are displayed as pills positioned absolutely over the input field
- Uses inline styles for dynamic color changes (more reliable than dynamic classes)

### 3. **Typing Animation in Editable Field**
- **Editable textarea** - User can type freely in the field
- Cycles through predefined phrases with typewriter effect when field is idle
- Typing speed: 50ms per character
- Deleting speed: 30ms per character
- 3-second pause after typing completes
- 500ms pause after deleting completes
- **Smart pause** - Animation stops when user starts typing
- **Auto-resume** - If field is cleared, animation resumes after 3 seconds
- Fully customizable phrases via props

### 4. **Prompt Templates**
- Pre-configured example prompts below the input field
- Each template has:
  - A Material Design icon
  - A descriptive label
  - Full text that fills the input when clicked
- Clicking a template:
  - Stops the typing animation
  - Immediately fills the input field with the template's full text
- Hover effect with background color change

### 5. **GSAP Animations**
- Smooth entrance animations on page load:
  - Title fades in from bottom (30px offset)
  - Subtitle follows with a slight delay
  - Carousel appears with opacity fade
  - Chat input slides up
  - Prompt templates stagger in sequentially
- All animations use `power3.out` easing for smooth deceleration

## Props Configuration

### Main Props

```typescript
interface Props {
  title?: string;              // Main heading
  subtitle?: string;           // Subheading text
  apps?: AppIcon[];           // List of app integrations
  typingPhrases?: TypingPhrase[]; // Phrases for typing animation
  promptTemplates?: PromptTemplate[]; // Quick prompt buttons
}
```

### AppIcon Interface

```typescript
interface AppIcon {
  name: string;        // Internal name (e.g., "Gmail")
  icon: ImageWidget;   // Icon image URL
  mention: string;     // Text shown when selected (e.g., "@gmail")
}
```

### TypingPhrase Interface

```typescript
interface TypingPhrase {
  text: string;  // Full text to be typed
}
```

### PromptTemplate Interface

```typescript
interface PromptTemplate {
  label: string;      // Button text
  icon: string;       // Material Design icon name
  fullText: string;   // Full prompt text for input field
}
```

## Usage Example

Add the section to your page configuration:

```json
{
  "__resolveType": "sections/HeroInteractive.tsx",
  "title": "Generate full-stack internal AI Apps your devs love",
  "subtitle": "Centralize MCP connections, permissions, and spend.\nShip secure, scalable AI apps in TypeScript. Deploy anywhere.",
  "apps": [
    {
      "name": "Gmail",
      "icon": "https://example.com/gmail-icon.svg",
      "mention": "@gmail"
    },
    {
      "name": "Slack",
      "icon": "https://example.com/slack-icon.svg",
      "mention": "@slack"
    }
  ],
  "typingPhrases": [
    {
      "text": "Build an app that watches my \"Leads\" label in @Gmail"
    },
    {
      "text": "Create a dashboard that syncs @Jira tickets with @Notion"
    }
  ],
  "promptTemplates": [
    {
      "label": "Dashboard for team's finance",
      "icon": "dashboard",
      "fullText": "Build a financial dashboard that aggregates data"
    }
  ]
}
```

## Design Tokens Used

- **Colors:**
  - `primary-light` (#D0EC1A) - Selected app background, gradient start
  - `primary-dark` (#07401A) - Selected app border, text color
  - `dc-50` (#FAFAF9) - Section background, gradient end
  - `dc-300` (#D6D3D1) - Input field border
  - `dc-900` (#1C1917) - Text color
  - `purple-500` - Icon accent color

- **Spacing:**
  - Standard Tailwind spacing scale (2, 3, 4, 6, 8, 16, 20, 24, 32)
  - Custom rounded corners: `rounded-xl` (12px), `rounded-3xl` (24px)

## Responsive Behavior

- **Mobile (base):**
  - Title: `text-4xl` (36px)
  - Carousel gradients: 20px wide
  - Padding: `px-4`, `py-16`

- **Tablet (sm:):**
  - Title: `text-5xl` (48px)
  - Carousel gradients: 32px wide
  - Padding: `px-8`, `py-20`

- **Desktop (lg:):**
  - Title: `text-7xl` (72px)
  - Max content width: 1140px
  - Padding: `px-16`, `py-24`

## Technical Implementation

### Client-Side Script
The component uses `useScript` from `@deco/deco/hooks` to inject client-side JavaScript that handles:
- GSAP animation initialization
- Typing animation state machine
- App icon click handlers
- Badge management
- Template click handlers
- Carousel pause on hover

### Performance Considerations
- Icons loaded lazily with `loading="lazy"`
- Carousel uses CSS animation (hardware accelerated)
- GSAP loaded from CDN with `defer` attribute
- Minimal re-renders on selection state changes

## Customization Tips

1. **Change typing speed:** Modify `typingSpeed` and `deletingSpeed` constants in the script
2. **Adjust carousel speed:** Change `animationDuration` style prop (default: "90s")
3. **Modify icon size:** Update `w-14 h-14` classes on `.app-icon` buttons
4. **Change pause durations:** Edit `pauseAfterTyping` and `pauseAfterDeleting` constants
5. **Customize GSAP animations:** Adjust duration, delay, and easing in `initGSAPAnimations`

## Browser Compatibility

- Modern browsers with ES2020+ support
- CSS Grid and Flexbox
- CSS Animations
- CSS Gradients
- JavaScript ES6+ features

## Dependencies

- **Preact** - Component framework
- **Tailwind CSS** - Styling
- **GSAP 3.12.2** - Entrance animations
- **Material Icons** - Icon font (already loaded in `_app.tsx`)
- **@deco/deco/hooks** - `useScript` for client-side code

## Notes

- The carousel creates 8 repetitions of the apps array to ensure smooth infinite scrolling
- Selected app state is maintained in a Set for O(1) lookup
- Typing animation can be interrupted by clicking a prompt template
- All animations respect `prefers-reduced-motion` media query (via GSAP defaults)

