#!/bin/bash

# Commit 1: Tracking SDK e componentes
git add sdk/tracking.ts islands/Button.tsx islands/TrackedLink.tsx
git commit -m "feat: add PostHog tracking SDK and components"

# Commit 2: Tracking no Header
git add sections/Header.tsx
git commit -m "feat: add PostHog tracking to Header"

# Commit 3: Tracking no FinalCTA
git add sections/FinalCTA.tsx
git commit -m "feat: add PostHog tracking to FinalCTA"

# Commit 4: Tracking nas páginas de Partners
git add sections/PartnersHero.tsx sections/PartnersFinalCTA.tsx
git commit -m "feat: add PostHog tracking to Partners pages"

# Commit 5: Actions (Airtable e Resend)
git add actions/airtable/createRecord.ts actions/resend/createContact.ts
git commit -m "feat: improve actions with better error handling"

# Commit 6: Blog blocks
git add components/blog/blocks/
git commit -m "refactor: update blog content blocks"

# Commit 7: Islands atualizados
git add islands/BlogFormSearch.tsx islands/CopyMCPCommand.tsx islands/FormModal.tsx islands/GitHubStars.tsx islands/HeroInteractiveClient.tsx islands/PostHogProvider.tsx islands/ScrollToButton.tsx islands/SendFormNewsletter.tsx
git commit -m "refactor: update islands with improvements"

# Commit 8: Sections atualizadas
git add sections/BentoFeatures.tsx sections/BlogCategories.tsx sections/BlogPost.tsx sections/ChallengeHero.tsx sections/ComparisonTable.tsx sections/DecoSitesHero.tsx sections/Document.tsx sections/ExplainerSection.tsx sections/FindPartnerHero.tsx sections/FormNewsletter.tsx sections/HackathonHero.tsx sections/Hero.tsx sections/HeroInteractive.tsx sections/HeroMCPMesh.tsx sections/ImageShowcase.tsx sections/PartnerBenefits.tsx sections/PartnerDirectory.tsx sections/PricingPlans.tsx sections/ProgramSteps.tsx sections/ProgramSteps4Col.tsx sections/RelatedBlogPosts.tsx sections/Sitemap.tsx sections/HeroInteractive.README.md
git commit -m "feat: update sections with UI improvements"

# Commit 9: Loaders e Routes
git add loaders/sitemap.ts routes/sitemap.xml.ts
git commit -m "feat: improve sitemap loader and route"

# Commit 10: Types
git add types/blogContent.ts
git commit -m "feat: update blog content types"

# Commit 11: Hackathon OS
git add hackathon-os/
git commit -m "feat: update hackathon-os components and docs"

# Commit 12: Config e arquivos gerados
git add fresh.gen.ts manifest.gen.ts apps/site.ts decocx-rules.md
git commit -m "chore: update config and generated files"

# Commit 13: Remover Button.tsx antigo (movido para islands)
git add components/ui/Button.tsx
git commit -m "refactor: remove old Button component (moved to islands)"

# Commit 14: Tracking do funil de blog
git add sections/BlogPosts.tsx sections/RelatedBlogPosts.tsx islands/BlogPostsCarousel.tsx
git commit -m "feat: add PostHog tracking to blog posts funnel"

echo "Done! All commits created."
