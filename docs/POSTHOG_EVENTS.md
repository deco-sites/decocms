# PostHog Events Documentation

This document lists all PostHog tracking events implemented in the project.

## Naming Convention

- Format: `{section_name}_{action}` (e.g., `hero_ai_platform_cta_click`)
- Use snake_case
- Be descriptive about the location on the page

---

## Events

### `hero_ai_platform_cta_click`

**Description:** Click on the "Book a demo" CTA button in the Hero AI Platform section (home)

**File:** `sections/HeroAIPlatform.tsx`

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `href` | string | Destination URL |
| `button_text` | string | Button text (e.g., "Book a demo") |
| `device` | string | Device: `mobile` or `desktop` |

**Payload example:**
```json
{
  "event": "hero_ai_platform_cta_click",
  "properties": {
    "href": "#contact",
    "button_text": "Book a demo",
    "device": "desktop"
  }
}
```

---

### `lp_header_github_click`

**Description:** Click on the GitHub Stars button in the header

**File:** `sections/Header.tsx` (uses `islands/GitHubStars.tsx`)

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `href` | string | GitHub repository URL |
| `stars` | number | Number of stars at the time of click |
| `is_mobile` | boolean | `true` if clicked on mobile menu (optional) |

**Payload example:**
```json
{
  "event": "lp_header_github_click",
  "properties": {
    "href": "https://github.com/deco-cx/deco",
    "stars": 1234,
    "is_mobile": true
  }
}
```

---

### `mcp_mesh_hero_copy_command_click`

**Description:** Click on the copy command button on the MCP Mesh page

**File:** `sections/HeroMCPMesh.tsx` (uses `islands/CopyMCPCommand.tsx`)

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `command` | string | Copied command (e.g., "bunx @decocms/mesh") |

---

### `mcp_mesh_hero_docs_click`

**Description:** Click on the "View docs" button on the MCP Mesh page

**File:** `sections/HeroMCPMesh.tsx`

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `href` | string | Documentation URL |
| `button_text` | string | Button text |

---

### `mcp_mesh_video_play_click_play`

**Description:** Video started playing on the MCP Mesh page

**File:** `sections/MCPMeshVideo.tsx` (uses `islands/YouTubeVideoPlayer.tsx`)

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `video_id` | string | YouTube video ID |

---

### `mcp_mesh_video_play_click_progress_25`

**Description:** User watched 25% of the video

**File:** `islands/YouTubeVideoPlayer.tsx`

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `video_id` | string | YouTube video ID |
| `current_time` | number | Current time in seconds |
| `duration` | number | Total video duration in seconds |

---

### `mcp_mesh_video_play_click_progress_50`

**Description:** User watched 50% of the video

**File:** `islands/YouTubeVideoPlayer.tsx`

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `video_id` | string | YouTube video ID |
| `current_time` | number | Current time in seconds |
| `duration` | number | Total video duration in seconds |

---

### `mcp_mesh_video_play_click_progress_75`

**Description:** User watched 75% of the video

**File:** `islands/YouTubeVideoPlayer.tsx`

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `video_id` | string | YouTube video ID |
| `current_time` | number | Current time in seconds |
| `duration` | number | Total video duration in seconds |

---

### `mcp_mesh_video_play_click_pause`

**Description:** Video was paused on the MCP Mesh page

**File:** `islands/YouTubeVideoPlayer.tsx`

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `video_id` | string | YouTube video ID |
| `current_time` | number | Current time in seconds when paused |

---

### `mcp_mesh_video_play_click_complete`

**Description:** Video was watched until the end

**File:** `islands/YouTubeVideoPlayer.tsx`

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `video_id` | string | YouTube video ID |

---

### `mcp_mesh_final_cta_copy_command_click`

**Description:** Click on the copy command button in the final CTA of the MCP Mesh page

**File:** `sections/FinalCTAMCPMesh.tsx`

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `command` | string | Copied command (e.g., "bunx @decocms/mesh") |

---

### `mcp_mesh_final_cta_docs_click`

**Description:** Click on the "Read our Docs" button in the final CTA of the MCP Mesh page

**File:** `sections/FinalCTAMCPMesh.tsx`

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `href` | string | Documentation URL |
| `button_text` | string | Button text |

---

### `deco_sites_hero_talk_to_sales_click`

**Description:** Click on the "Talk to sales" button on the deco.cx page

**File:** `sections/DecoSitesHero.tsx`

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `href` | string | Typeform URL |

---

### `deco_sites_hero_read_docs_click`

**Description:** Click on the "Read our docs" button on the deco.cx page

**File:** `sections/DecoSitesHero.tsx`

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `href` | string | Documentation URL |

---

### `backbone_mcp_mesh_bullet_click`

**Description:** Click on the bullet point that leads to the MCP Mesh card

**File:** `islands/BackboneScrollSection.tsx`

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `bullet_label` | string | Bullet text (e.g., "Context infrastructure") |

---

### `backbone_mcp_studio_bullet_click`

**Description:** Click on the bullet point that leads to the MCP Studio card

**File:** `islands/BackboneScrollSection.tsx`

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `bullet_label` | string | Bullet text (e.g., "Reusable building blocks") |

---

### `backbone_mcp_apps_+_store_bullet_click`

**Description:** Click on the bullet point that leads to the MCP Apps + Store card

**File:** `islands/BackboneScrollSection.tsx`

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `bullet_label` | string | Bullet text (e.g., "Adoption without chaos") |

---

### `backbone_mcp_mesh_link_click`

**Description:** Click on the CTA link of the MCP Mesh card

**File:** `islands/BackboneScrollSection.tsx`

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `link_text` | string | Link text (e.g., "Learn about MCP Mesh") |
| `link_url` | string | Destination URL |
| `device` | string | Device: `mobile` or `desktop` |

---

### `backbone_mcp_studio_link_click`

**Description:** Click on the CTA link of the MCP Studio card

**File:** `islands/BackboneScrollSection.tsx`

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `link_text` | string | Link text (e.g., "Get Studio Early Access") |
| `link_url` | string | Destination URL |
| `device` | string | Device: `mobile` or `desktop` |

---

### `final_cta_simple_click`

**Description:** Click on the CTA button in the final "Ready to get started?" section

**File:** `sections/FinalCTASimple.tsx`

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `href` | string | Destination URL |
| `button_text` | string | Button text (e.g., "Book a demo") |
| `section_title` | string | Section title (e.g., "Ready to get started?") |

**Payload example:**
```json
{
  "event": "final_cta_simple_click",
  "properties": {
    "href": "https://deco.cx/discord",
    "button_text": "Book a demo",
    "section_title": "Ready to get started?"
  }
}
```

---

### `lp_hero_prompt_submit`

**Description:** User submits the prompt in the interactive hero (MCP Studio)

**File:** `islands/HeroInteractiveClient.tsx`

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `source` | string | Event origin (e.g., "landing_hero") |
| `prompt` | string | Submitted prompt text |
| `has_theme` | boolean | Whether a theme was selected |
| `theme` | string \| null | Selected theme name |

---

### `lp_hero_prompt_template_click`

**Description:** Click on a prompt template (Task Manager, Expense Tracker, etc.)

**File:** `islands/HeroInteractiveClient.tsx`

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `source` | string | Event origin (e.g., "landing_hero") |
| `label` | string | Template label (e.g., "Task Manager") |
| `icon` | string | Template icon |
| `fullText_length` | number | Template text length |
| `had_existing_prompt` | boolean | Whether there was already text in the input |

---

### `lp_finalcta_community_click`

**Description:** Click on the "Join our Discord community" button in the final CTA

**File:** `sections/FinalCTA.tsx`

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `href` | string | Discord URL |
| `text` | string | Button text |

---

### `pricing_toggle_ai_platform_click`

**Description:** Click on the toggle to select "AI Platform" (decocms) on the Pricing page

**File:** `sections/PricingToggle.tsx`

---

### `pricing_toggle_deco_cx_click`

**Description:** Click on the toggle to select "deco.cx" on the Pricing page

**File:** `sections/PricingToggle.tsx`

---

### `pricing_ai_platform_free_copy_click`

**Description:** Click on the copy command button for the Free plan (AI Platform)

**File:** `sections/PricingToggle.tsx`

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `command` | string | Copied command (e.g., "npx @decocms/mesh") |

---

### `pricing_ai_platform_enterprise_cta_click`

**Description:** Click on the "Book a demo" button for the Enterprise plan (AI Platform)

**File:** `sections/PricingToggle.tsx`

---

### `pricing_deco_cx_free_cta_click`

**Description:** Click on the "Start building" button for the Free plan (deco.cx)

**File:** `sections/PricingToggle.tsx`

---

### `pricing_deco_cx_pro_cta_click`

**Description:** Click on the "Get started" button for the Pro plan (deco.cx)

**File:** `sections/PricingToggle.tsx`

---

### `pricing_deco_cx_enterprise_cta_click`

**Description:** Click on the "Talk to sales" button for the Enterprise plan (deco.cx)

**File:** `sections/PricingToggle.tsx`

---

### `{page}_scroll_25`

**Description:** User scrolled 25% of the page

**File:** `sections/Analytics/ScrollTracking.tsx` (uses `islands/ScrollTracker.tsx`)

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `scroll_percent` | number | Scroll percentage (25) |
| `scroll_position` | number | Scroll position in pixels |
| `page_height` | number | Total page height in pixels |

---

### `{page}_scroll_50`

**Description:** User scrolled 50% of the page

**File:** `sections/Analytics/ScrollTracking.tsx` (uses `islands/ScrollTracker.tsx`)

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `scroll_percent` | number | Scroll percentage (50) |
| `scroll_position` | number | Scroll position in pixels |
| `page_height` | number | Total page height in pixels |

---

### `{page}_scroll_75`

**Description:** User scrolled 75% of the page

**File:** `sections/Analytics/ScrollTracking.tsx` (uses `islands/ScrollTracker.tsx`)

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `scroll_percent` | number | Scroll percentage (75) |
| `scroll_position` | number | Scroll position in pixels |
| `page_height` | number | Total page height in pixels |

---

### `{page}_scroll_100`

**Description:** User scrolled 100% of the page (reached the end)

**File:** `sections/Analytics/ScrollTracking.tsx` (uses `islands/ScrollTracker.tsx`)

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `scroll_percent` | number | Scroll percentage (100) |
| `scroll_position` | number | Scroll position in pixels |
| `page_height` | number | Total page height in pixels |

**Note:** The `{page}` is configurable via the `eventName` prop. Example: `home_page_scroll_25`, `mcp_mesh_scroll_50`, `home_page_scroll_100`

---

## How to Add New Events

1. Use the `TrackedLink` component from `islands/TrackedLink.tsx`:

```tsx
import TrackedLink from "../islands/TrackedLink.tsx";

<TrackedLink
  href="/destination"
  event="event_name"
  properties={{
    prop1: "value1",
    prop2: "value2",
  }}
>
  Link Text
</TrackedLink>
```

2. Or use the `trackEvent` helper from `sdk/tracking.ts`:

```tsx
import { trackEvent } from "../sdk/tracking.ts";

trackEvent("event_name", {
  prop1: "value1",
  prop2: "value2",
});
```

3. Document the new event in this file.
